import { setIsTyping, setSocketConnected } from '@/redux/Slice/chatSlice'
import {
  setMessage,
  setNewMessage,
  setTranslationMessage,
  setEmojiOnMessage,
} from '@/redux/Slice/messageSlice'
import { getCookie } from '@/services/Cookies'
import { translateText } from '@/services/TranslationService'
import {
  getMessages,
  sendMessageApi,
  addEmoji,
  updateEmoji,
  deleteEmoji,
} from '@/services/messageService'
import {
  setFriendRequestNotification,
  setFriendRequestReply,
  setNewFriendRequestNotification,
} from '../../Slice/userSlice'
import { eventChannel } from 'redux-saga'
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
import { io } from 'socket.io-client'

var socket

function createSocketChannel(socket, idConversation) {
  return eventChannel((emit) => {
    socket.on('connected', () => emit(setSocketConnected(true)))
    socket.on('typing', () => emit(setIsTyping(true)))
    socket.on('stop_typing', () => emit(setIsTyping(false)))
    socket.on('message received', (message) => {
      console.log(message.conversation)
      console.log('message recived new ')
      if (message.conversation._id == idConversation) {
        console.log(message)
        emit(setNewMessage(message))
      }
    })
    socket.on('received request', (newRequest) => {
      console.log('received request', newRequest)
      emit(setFriendRequestNotification(newRequest))
    })

    socket.on('received reply', (newReply) => {
      console.log('new reply:', newReply)
      emit(setNewFriendRequestNotification(newReply))
    })

    socket.on('isRead', (read) => {
      console.log(read)
    })
    return () => {
      socket.off('connected')
      socket.off('typing')
      socket.off('stop_typing')
      socket.off('message received')
    }
  })
}

function* handleSocketConnect(action) {
  socket = io(import.meta.env.VITE_ENDPOINT)
  const user = JSON.parse(getCookie('userLogin')).user
  socket.emit('setup', user)
  socket.emit('join chat', action.payload.idConversation)
  const socketChannel = yield call(createSocketChannel, socket, action.payload.idConversation)
  while (true) {
    const action = yield take(socketChannel)
    yield put(action)
  }
}

function* fetchMessages(action) {
  try {
    const response = yield call(() => {
      return getMessages(action.payload.idConversation)
    })
    const lsMessage = response.data
    yield put(setMessage(lsMessage))
    console.log(lsMessage)
  } catch (error) {
    console.error('Lỗi khi lấy lsMessages:', error)
  }
}

function* sendAddFriendRequest(action) {
  console.log('send add friend')
  yield call([socket, 'emit'], 'friend request', action.payload)
}

function* sendReadNotification(action) {
  yield call([socket, 'emit'], 'read request', action.payload)
}

function* replyAddFriendRequest(action) {
  console.log('accepted')
  yield call([socket, 'emit'], 'accept request', action.payload)
}

function* sendMessageSaga(action) {
  console.log(action.payload)
  const inforChat = {
    message: action.payload.message,
    isSpoiled: action.payload.isSpoiled,
    messageType: action.payload.messageType ? action.payload.messageType : 'text',
    styles: action.payload.styles,
  }
  console.log(inforChat)

  try {
    yield call([socket, 'emit'], 'stop_typing', action.payload.idConversation.idConversation)
    const data = yield call(sendMessageApi, inforChat, action.payload.idConversation.idConversation)
    yield call([socket, 'emit'], 'new message', data.data)
    console.log(data.data)
    yield put(setNewMessage(data.data))
  } catch (error) {
    console.error('Failed to send message', error)
  }
}
function* translationTextSaga(action) {
  console.log(action.payload)
  try {
    const message = yield call(() => {
      return translateText(action.payload.message, 'en')
    })
    yield put(setTranslationMessage({ message: message, id: action.payload.id }))
  } catch (error) {
    console.log('Translation Error:', error)
  }
}

function* setEmoji(action) {
  console.log('action:', action)
  try {
    if (action.payload.type == 'ADD') {
      const { data } = yield call(addEmoji, action.payload.id_message, action.payload.emoji)

      console.log(data)
      yield put(setEmojiOnMessage(action.payload))
    } else if (action.payload.type == 'UPDATE') {
      const { data } = yield call(updateEmoji, action.payload.id_emoji, action.payload.emoji)

      console.log(data)
      yield put(setEmojiOnMessage(action.payload))
    } else {
      const { data } = yield call(deleteEmoji, action.payload.id_message, action.payload.id_emoji)
      console.log(data)
      yield put(setEmojiOnMessage(action.payload))
    }

    // console.log(data)
    // yield call([socket, 'emit'], 'add emoji message', data)
  } catch (error) {
    console.error('Failed to add emoji message', error)
  }
}

export default function* chatSaga() {
  yield takeLatest('user/setReadNotification', sendReadNotification)
  yield takeLatest('user/setFriendRequestNotification', replyAddFriendRequest)
  yield takeLatest('user/alertFriendRequest', sendAddFriendRequest)
  yield takeLatest('message/translationMessage', translationTextSaga)
  yield takeLatest('chat/connectSocket', handleSocketConnect)
  yield takeLatest('message/getMessagesById', fetchMessages)
  yield takeLatest('message/sendMessage', sendMessageSaga)
  yield takeLatest('message/handleEmojiOnMessage', setEmoji)
  yield takeLatest('message/setEmojiOnMessage', fetchMessages)
}
