import {
  setConversation,
  setConversationFirst,
  setFriends,
  setIdConversation,
  setLsConversation,
  setLsGroupChat,
  setLsPersonalChats,
} from '@/redux/Slice/userSlice'
import { getConversations } from '@/services/messageService'
import userService from '@/services/userService'
import { all } from 'axios'
import { call, fork, put, spawn, takeEvery, takeLatest } from 'redux-saga/effects'
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
  console.log('check conver')
  try {
    const response = yield call(getConversations)
    yield put(setLsConversation(response.data))
    yield put(setLsPersonalChats(response.data.filter((value) => value.isGroupChat == false)))
    yield put(setLsGroupChat(response.data.filter((value) => value.isGroupChat == true)))
    yield put(setIdConversation(response.data[0]?._id))
  } catch (error) {
    console.error('Lỗi khi lấy idConversation:', error.message)
  }
}
function* fetchLsFriends() {
  console.log('check fr')
  try {
    const response = yield call(userService.getAllFriends)
    console.log(response)
    yield put(setFriends(response))
  } catch (error) {
    console.log('error fetch friends in Saga', error)
  }
}
function* fetchConversationAndFriends() {
  console.log('check conver and friend')
  try {
    yield fork(fetchConversation)
    yield fork(fetchLsFriends)
  } catch (error) {
    console.error('Lỗi khi gọi fetchConversationAndFriends:', error.message)
  }
}
function* authSaga() {
  yield takeLatest('user/getIdConversation', fetchIdConversation)
  yield takeLatest('user/getLsConversation', fetchConversation)
  yield takeLatest('user/getFriends', fetchLsFriends)
  yield takeEvery('user/getFriendsAndConversation', fetchConversationAndFriends)
}

export default authSaga
