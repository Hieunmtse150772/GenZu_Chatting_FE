import { call, put, takeLatest } from 'redux-saga/effects'
import { getConversations, getMessages } from '../utils/api'
import { setIdConversation } from './Slice/userSlice'

// Export hàm `fetchIdConversation`
function* fetchIdConversation() {
  try {
    const response = yield call(getConversations)
    const firstConversationId = response.data[0]._id
    console.log(firstConversationId)
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
