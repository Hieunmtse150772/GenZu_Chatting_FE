import { setIsTyping, setSocketConnected } from '@/redux/Slice/chatSlice'
import { setMessage, setNewMessage } from '@/redux/Slice/messageSlice'
import { getCookie } from '@/services/Cookies'
import { getMessages, sendMessageApi } from '@/services/messageService'
import { eventChannel } from 'redux-saga'
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
import { io } from 'socket.io-client'

var socket

function createSocketChannel(socket) {
  return eventChannel((emit) => {
    socket.on('connected', () => emit(setSocketConnected(true)))
    socket.on('typing', () => emit(setIsTyping(true)))
    socket.on('stop_typing', () => emit(setIsTyping(false)))
    socket.on('message received', (message) => {
      emit(setNewMessage(message))
    })
    return () => {
      socket.off('connected')
      socket.off('typing')
      socket.off('stop_typing')
      socket.off('message received')
    }
  })
}

function* handleSocketConnect() {
  socket = io(import.meta.env.VITE_ENDPOINT)
  const user = JSON.parse(getCookie('userLogin')).user
  console.log(user)
  socket.emit('setup', user)
  socket.emit('join chat', '667bc019d4df68dfbbd89ab0')

  socket.on('message received', (newMessageReceived) => {
    console.log(newMessageReceived)
  })
  const socketChannel = yield call(createSocketChannel, socket)
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

export default function* chatSaga() {
  yield takeEvery('chat/connectSocket', handleSocketConnect)
  yield takeLatest('message/getMessagesById', fetchMessages)
  yield takeLatest('message/sendMessage', sendMessageSaga)
}
