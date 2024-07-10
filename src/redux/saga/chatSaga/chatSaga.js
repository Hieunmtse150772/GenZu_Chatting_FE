// Import các actions cần thiết để cập nhật state trong Redux store.
import { plusPage, setIsTyping, setLoadMore, setSocketConnected } from '@/redux/Slice/chatSlice'
import {
  setMessage,
  setNewMessage,
  setTranslationMessage,
  setEmojiOnMessage,
  setDeleteHistoryMessage,
  setMessagesMore,
  updateMessage,
} from '@/redux/Slice/messageSlice'
import {
  setFriendRequestNotification,
  setFriendRequestReply,
  setNewFriendRequestNotification,
} from '../../Slice/userSlice'

// Import các hàm tiện ích và service để xử lý cookie, dịch thuật, và tương tác với API.
import { getCookie } from '@/services/Cookies'
import { translateText } from '@/services/TranslationService'
import {
  getMessages,
  sendMessageApi,
  addEmoji,
  updateEmoji,
  deleteEmoji,
  deleteConversation,
  recallMessage,
} from '@/services/messageService'

// Import thư viện socket.io-client để tạo kết nối WebSocket.
import { io } from 'socket.io-client'

// Import các effect từ redux-saga để xử lý logic bất đồng bộ.
import { eventChannel } from 'redux-saga'
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
import { BsEmojiDizzyFill } from 'react-icons/bs'

// Biến toàn cục để lưu trữ socket connection.
var socket

/**
 * Tạo một event channel để lắng nghe các sự kiện từ socket.io.
 * @param {Socket} socket - Socket.io connection.
 * @param {string} idConversation - ID của cuộc trò chuyện hiện tại.
 * @returns {EventChannel} Event channel để lắng nghe các sự kiện socket.io.
 */
function createSocketChannel(socket, idConversation) {
  return eventChannel((emit) => {
    // Đăng ký lắng nghe các sự kiện socket.io.
    socket.on('connected', () => emit(setSocketConnected(true)))
    socket.on('typing', () => emit(setIsTyping(true)))
    socket.on('stop_typing', () => emit(setIsTyping(false)))
    socket.on('message received', (message) => {
      // Kiểm tra xem tin nhắn có thuộc về cuộc trò chuyện hiện tại hay không.
      if (message.conversation._id == idConversation) {
        // Dispatch action để cập nhật state với tin nhắn mới.
        emit(setNewMessage(message))
      }
    })

    // Lắng nghe các sự kiện liên quan đến lời mời kết bạn.
    socket.on('received request', (newRequest) => {
      console.log('new req', newRequest)
      emit(setFriendRequestNotification(newRequest))
    })
    socket.on('received reply', (newReply) => {
      console.log('new reply', newReply)
      emit(setNewFriendRequestNotification(newReply))
    })
    // Lắng nghe các sự kiện liên quan tới emoji
    socket.on('emoji received', (emoji) => {
      console.log('co emoji moi', emoji)
      emit(setEmojiOnMessage(emoji))
    })
    // Lắng nghe sự kiện đã đọc thông báo.
    socket.on('isRead', (read) => {
      console.log(read)
    })
    socket.on('recall received', (message) => {
      console.log('hello anh')
      console.log(message)
    })
    // Trả về hàm unsubscribe để hủy đăng ký lắng nghe các sự kiện khi event channel bị đóng.
    return () => {
      socket.off('connected')
      socket.off('typing')
      socket.off('stop_typing')
      socket.off('message received')
    }
  })
}

/**
 * Saga để xử lý kết nối socket.io.
 * @param {object} action - Redux action.
 */
function* handleSocketConnect(action) {
  // Tạo kết nối socket.io.
  socket = io(import.meta.env.VITE_ENDPOINT, {
    extraHeaders: { Authorization: `Bearer ${JSON.parse(getCookie('userLogin')).accessToken}` },
  })

  // Lấy thông tin người dùng từ cookie.
  const user = JSON.parse(getCookie('userLogin')).user

  // Gửi sự kiện 'setup' và 'join chat' đến server.
  socket.emit('setup', user)
  socket.emit('join chat', action.payload.idConversation)

  // Tạo event channel để lắng nghe các sự kiện socket.io.
  const socketChannel = yield call(createSocketChannel, socket, action.payload.idConversation)

  // Lắng nghe các action từ event channel và dispatch chúng đến Redux store.
  while (true) {
    const action = yield take(socketChannel)
    yield put(action)
  }
}

/**
 * Saga để lấy danh sách tin nhắn từ API.
 * @param {object} action - Redux action.
 */
function* fetchMessages(action) {
  try {
    // Gọi API để lấy danh sách tin nhắn.
    const response = yield call(() => {
      return getMessages(action.payload.idConversation)
    })

    // Dispatch action để cập nhật state với danh sách tin nhắn.
    yield put(setMessage(response))
  } catch (error) {
    console.error('Lỗi khi lấy lsMessages:', error)
  }
}
function* fetchMessagesMore(action) {
  console.log(action.payload)
  try {
    // Gọi API để lấy danh sách tin nhắn.
    const response = yield call(() => {
      return getMessages(action.payload.idConversation, action.payload.page)
    })
    console.log(response)
    // Dispatch action để cập nhật state với danh sách tin nhắn.
    yield put(setMessagesMore(response))
    yield put(plusPage())
    yield put(setLoadMore(false))
  } catch (error) {
    console.error('Lỗi khi lấy lsMessages:', error)
  }
}
/**
 * Saga để gửi lời mời kết bạn.
 * @param {object} action - Redux action.
 */
function* sendAddFriendRequest(action) {
  // Gửi sự kiện 'friend request' đến server.
  console.log('send add friend req')
  yield call([socket, 'emit'], 'friend request', action.payload)
}

/**
 * Saga để gửi thông báo đã đọc.
 * @param {object} action - Redux action.
 */
function* sendReadNotification(action) {
  // Gửi sự kiện 'read request' đến server.
  yield call([socket, 'emit'], 'read request', action.payload)
}

/**
 * Saga để phản hồi lời mời kết bạn.
 * @param {object} action - Redux action.
 */
function* replyAddFriendRequest(action) {
  // Gửi sự kiện 'accept request' đến server.
  console.log('accepted')
  yield call([socket, 'emit'], 'accept request', action.payload)
}

/**
 * Saga để gửi tin nhắn.
 * @param {object} action - Redux action.
 */
function* sendMessageSaga(action) {
  // Tạo object chứa thông tin tin nhắn.
  const inforChat = {
    message: action.payload.message,
    isSpoiled: action.payload.isSpoiled,
    messageType: action.payload.messageType ? action.payload.messageType : 'text',
    styles: action.payload.styles,
    emojiBy: action.payload.emojiBy,
  }

  try {
    // Gửi sự kiện 'stop_typing' đến server.
    yield call([socket, 'emit'], 'stop_typing', action.payload.idConversation.idConversation)

    // Gọi API để gửi tin nhắn.
    const data = yield call(sendMessageApi, inforChat, action.payload.idConversation.idConversation)

    // Gửi sự kiện 'new message' đến server.
    yield call([socket, 'emit'], 'new message', data.data)

    // Dispatch action để cập nhật state với tin nhắn mới.
    yield put(setNewMessage(data.data))
  } catch (error) {
    console.error('Failed to send message', error)
  }
}

/**
 * Saga để dịch văn bản.
 * @param {object} action - Redux action.
 */
function* translationTextSaga(action) {
  try {
    // Gọi service để dịch văn bản.
    const message = yield call(() => {
      return translateText(action.payload.message, 'en')
    })

    // Dispatch action để cập nhật state với văn bản đã dịch.
    yield put(setTranslationMessage({ message: message, id: action.payload.id }))
  } catch (error) {
    console.log('Translation Error:', error)
  }
}

/**
 * Saga để xử lý emoji trên tin nhắn.
 * @param {object} action - Redux action.
 */

function* setEmoji(action) {
  try {
    let apiCall
    const { type, ...rest } = action.payload // Tách type và các thuộc tính khác

    // Dùng switch-case để chọn API call dựa trên "type"
    switch (type) {
      case 'ADD':
        apiCall = yield call(addEmoji, rest.id_message, rest.emoji)
        apiCall.data.type = type
        yield call([socket, 'emit'], 'add emoji', apiCall.data)
        break
      case 'UPDATE':
        apiCall = yield call(updateEmoji, rest.id_emoji, rest.emoji)
        // set du lieu cho viec gui xu kien update len server
        apiCall.data.type = type
        apiCall.data.conversation = action.payload.idConversation
        apiCall.data._id = action.payload.id_message
        apiCall.data.data.sender = { _id: apiCall.data.data.sender }
        yield call([socket, 'emit'], 'edit emoji', apiCall.data)
        break
      default: // Default là "DELETE"
        apiCall = yield call(deleteEmoji, rest.id_message, rest.id_emoji)
        // set du lieu cho viec gui xu kien delete len server
        apiCall.data.type = type
        apiCall.data.conversation = action.payload.idConversation
        apiCall.data._id = action.payload.id_message
        apiCall.data.data.sender = { _id: apiCall.data.data.sender }
        yield call([socket, 'emit'], 'delete emoji', apiCall.data)
    }

    // Gọi API một lần duy nhất
    const { data } = apiCall
    // Dispatch action với payload ban đầu
    yield put(setEmojiOnMessage(data))
  } catch (error) {
    console.error('Lỗi khi xử lý emoji:', error)
  }
}

function* deleteHistoryMessage(action) {
  try {
    const { data } = yield call(deleteConversation, action.payload._id)
    yield put(setDeleteHistoryMessage(action.payload._id))
  } catch (error) {
    console.error('Lỗi khi xóa cuộc hội thoại:', error)
  }
}
function* recallMessageSaga(action) {
  console.log(action.payload)
  try {
    const response = yield call(recallMessage, action.payload)
    console.log(response)
    yield call([socket, 'emit'], 'recall', response)
    yield put(updateMessage(response.data.data))
  } catch (error) {
    console.log(error)
  }
}
/**
 * Root saga để theo dõi tất cả các action và chạy các saga tương ứng.
 */
export default function* chatSaga() {
  // Sử dụng takeLatest để chỉ xử lý action cuối cùng được dispatch.
  yield takeLatest('user/setReadNotification', sendReadNotification)
  // yield takeLatest('user/setFriendRequestNotification', sendAddFriendRequest)
  yield takeLatest('message/recallMessageSlice', recallMessageSaga)
  yield takeLatest('user/sendReplyFriendRequest', replyAddFriendRequest)
  yield takeLatest('user/alertFriendRequest', sendAddFriendRequest)
  yield takeLatest('message/translationMessage', translationTextSaga)
  yield takeLatest('chat/connectSocket', handleSocketConnect)
  yield takeLatest('message/getMessagesById', fetchMessages)
  yield takeLatest('message/getMessagesMore', fetchMessagesMore)
  yield takeLatest('message/sendMessage', sendMessageSaga)
  yield takeLatest('message/deleteConversation', deleteHistoryMessage)
  yield takeLatest('message/handleEmojiOnMessage', setEmoji)
}
