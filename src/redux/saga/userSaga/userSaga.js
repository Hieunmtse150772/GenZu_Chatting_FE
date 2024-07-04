import {
  setConversation,
  setConversationFirst,
  setIdConversation,
  setLsConversation,
  setLsGroupChat,
  setLsPersonalChats,
} from '@/redux/Slice/userSlice'
import { getConversations } from '@/services/messageService'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

// Export hàm `fetchIdConversation`
function* fetchIdConversation() {
  console.log('firstConversationId')
  try {
    const response = yield call(getConversations)
    const firstConversationId = response?.data[0]?._id
    yield put(setLsConversation(response.data))
    yield put(setLsPersonalChats(response.data.filter((value) => value.isGroupChat == false)))
    yield put(setLsGroupChat(response.data.filter((value) => value.isGroupChat == true)))
    yield put(setIdConversation(firstConversationId)) // Sử dụng put
    yield put(
      setConversationFirst({ lsConversation: response.data, idConversation: firstConversationId }),
    ) // Sử dụng put
  } catch (error) {
    console.error('Lỗi khi lấy idConversation:', error)
  }
}
function* fetchConversation() {
  try {
    const response = yield call(getConversations)
    yield put(setLsConversation(response.data))
    yield put(setLsPersonalChats(response.data.filter((value) => value.isGroupChat == false)))
    yield put(setLsGroupChat(response.data.filter((value) => value.isGroupChat == true)))
  } catch (error) {
    console.error('Lỗi khi lấy idConversation:', error)
  }
}

function* authSaga() {
  yield takeEvery('user/getIdConversation', fetchIdConversation)
  yield takeLatest('user/getLsConversation', fetchConversation)
}

export default authSaga
