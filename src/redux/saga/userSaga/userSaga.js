import { setTestMessage } from '@/redux/Slice/messageSlice'
import { setIdConversation, setLsConversation } from '@/redux/Slice/userSlice'
import { getCookie } from '@/services/Cookies'
import { getConversations, getMessages } from '@/services/messageService'
import { call, put, takeLatest } from 'redux-saga/effects'
import { io } from 'socket.io-client'

var socket
// Export hàm `fetchIdConversation`
function* fetchIdConversation() {
  try {
    const response = yield call(getConversations)
    const firstConversationId = response?.data[0]?._id
    console.log(response.data)
    yield put(setLsConversation(response.data))
    yield put(setIdConversation(firstConversationId)) // Sử dụng put
  } catch (error) {
    console.error('Lỗi khi lấy idConversation:', error)
  }
}
function* fetchMessageById(action) {
  console.log(action.payload)
  try {
    const response = yield call(() => {
      return getMessages(action.payload.idConversation)
    })
    const lsMessage = response.data.data
    socket = io(import.meta.env.VITE_ENDPOINT)
    socket.emit('join chat', JSON.parse(getCookie('userLogin')).user._id)

    yield put(setTestMessage(lsMessage))
    console.log(lsMessage)
  } catch (error) {
    console.error('Lỗi khi lấy lsMessages:', error)
  }
}
function* authSaga() {
  yield takeLatest('user/getIdConversation', fetchIdConversation)
  yield takeLatest('message/getMessagesById', fetchMessageById)
}

export default authSaga
