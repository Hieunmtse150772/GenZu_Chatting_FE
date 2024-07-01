import {
  appendMessage,
  setIsTyping,
  setNewMessage,
  setSocketConnected,
} from '@/redux/Slice/chatSlice'
import { setMessage, setTestMessage } from '@/redux/Slice/messageSlice'
import { getCookie } from '@/services/Cookies'
import { getMessages } from '@/services/messageService'
import { eventChannel } from 'redux-saga'
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
import { io } from 'socket.io-client'

var socket

function createSocketChannel(socket) {
  return eventChannel((emit) => {
    socket.on('connected', () => emit(setSocketConnected(true)))
    socket.on('typing', () => emit(setIsTyping(true)))
    socket.on('stop_typing', () => emit(setIsTyping(false)))
    socket.on('message received', (message) => emit(appendMessage(message)))
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
  socket.emit('setup', user)
  socket.emit('join chat', '667bc019d4df68dfbbd89ab0')
  socket.on('connected', () => {
    console.log('check connect')
  })
  socket.on('message received', (newMessageReceived) => {
    console.log(newMessageReceived)
    console.log('check')
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
    socket = io(import.meta.env.VITE_ENDPOINT)
    socket.emit('join chat', action.payload)

    yield put(setMessage(lsMessage))
    console.log(lsMessage)
  } catch (error) {
    console.error('Lỗi khi lấy lsMessages:', error)
  }
}

function* sendMessage(action) {
  const inforChat = action.payload
  console.log(inforChat)
  try {
    yield call([socket, 'emit'], 'stop_typing', inforChat.idConversation.idConversation)
    yield put(setNewMessage(''))
    const { data } = yield call(
      sendMessageApi,
      inforChat.message,
      inforChat.idConversation.idConversation,
    )

    yield call([socket, 'emit'], 'new message', data)
    yield put(appendMessage(data))
  } catch (error) {
    console.error('Failed to send message', error)
  }
}

export default function* chatSaga() {
  yield takeEvery('chat/connectSocket', handleSocketConnect)
  yield takeLatest('message/getMessagesById', fetchMessages)
  yield takeLatest('chat/sendTestMessage', sendMessage)
}
