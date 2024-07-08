// Import các actions cần thiết để cập nhật state trong Redux store.
import { setIsTyping, setSocketConnected } from '@/redux/Slice/chatSlice'
import {
  setMessage,
  setNewMessage,
  setTranslationMessage,
  setEmojiOnMessage,
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
              emit(setFriendRequestNotification(newRequest))
      })
    socket.on('received reply', (newReply) => {
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
  socket = io(import.meta.env.VITE_ENDPOINT)

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
    yield put(setMessage(response.data))
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
    emojiBy: action.payload.emojiBy
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
        yield call([socket, 'emit'], 'add emoji', apiCall.data)
        break
      case 'UPDATE':
        apiCall = yield call(updateEmoji, rest.id_emoji, rest.emoji)
        apiCall.data.data.conversation = { idConversation: action.payload.idConversation}
        yield call([socket, 'emit'], 'edit emoji', apiCall.data.data)
        break
      default: // Default là "DELETE"
        apiCall = yield call(deleteEmoji, rest.id_message, rest.id_emoji)
        yield call([socket, 'emit'], 'delete emoji', apiCall.data.data)
    }

    // Gọi API một lần duy nhất
    const { data } = apiCall
    data.type = action.payload.type
    if(action.payload.type === 'UPDATE' || action.payload.type === 'DELETE'){
      data._id = action.payload.id_message
      data.data.sender = { _id: data.data.sender}
    }
    // Dispatch action với payload ban đầu
    yield put(setEmojiOnMessage(data))
      } catch (error) {
    console.error('Lỗi khi xử lý emoji:', error)
  }
}

/**
 * Root saga để theo dõi tất cả các action và chạy các saga tương ứng.
 */
export default function* chatSaga() {
// Sử dụng takeLatest để chỉ xử lý action cuối cùng được dispatch.
  yield takeLatest('user/setReadNotification', sendReadNotification)
  yield takeLatest('user/setFriendRequestNotification', sendAddFriendRequest)
  yield takeLatest('user/setNewFriendRequestNotification', replyAddFriendRequest)
  yield takeLatest('user/alertFriendRequest', sendAddFriendRequest)
  yield takeLatest('message/translationMessage', translationTextSaga)
  yield takeLatest('chat/connectSocket', handleSocketConnect)
  yield takeLatest('message/getMessagesById', fetchMessages)
  yield takeLatest('message/sendMessage', sendMessageSaga)
  yield takeLatest('message/handleEmojiOnMessage', setEmoji)
  // yield takeLatest('message/setEmojiOnMessage', fetchMessages) // Xem xét lại việc gọi fetchMessages sau khi setEmojiOnMessage, có thể cần thiết hoặc không.
}
