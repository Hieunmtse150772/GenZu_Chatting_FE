import { setIdConversation, setLsConversation } from '@/redux/Slice/userSlice'
import { getConversations } from '@/services/messageService'
import { call, put, takeLatest } from 'redux-saga/effects'

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

function* authSaga() {
  yield takeLatest('user/getIdConversation', fetchIdConversation)
}

export default authSaga
