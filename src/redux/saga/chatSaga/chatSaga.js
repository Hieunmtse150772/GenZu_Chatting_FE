import { setIsTyping, setSocketConnected } from '@/redux/Slice/chatSlice'
import { setMessage, setNewMessage, setTranslationMessage } from '@/redux/Slice/messageSlice'
import { getCookie } from '@/services/Cookies'
import { translateText } from '@/services/TranslationService'
import { getMessages, sendMessageApi } from '@/services/messageService'
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
      if (message.conversation._id == idConversation) {
        emit(setNewMessage(message))
      }
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
    const lsMessage = response.data.data
    yield put(setMessage(lsMessage))
    console.log(lsMessage)
  } catch (error) {
    console.error('Lỗi khi lấy lsMessages:', error)
  }
}

function* sendMessageSaga(action) {
  const inforChat = {
    message: action.payload.message,
    isSpoiled: action.payload.isSpoiled,
    messageType: 'string',
    styles: action.payload.styles,
  }
  console.log(inforChat)
  try {
    yield call([socket, 'emit'], 'stop_typing', action.payload.idConversation.idConversation)
    const data = yield call(
      sendMessageApi,
      inforChat.message,
      action.payload.idConversation.idConversation,
    )
    yield call([socket, 'emit'], 'new message', data)
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
export default function* chatSaga() {
  yield takeLatest('message/translationMessage', translationTextSaga)
  yield takeLatest('chat/connectSocket', handleSocketConnect)
  yield takeLatest('message/getMessagesById', fetchMessages)
  yield takeLatest('message/sendMessage', sendMessageSaga)
}
