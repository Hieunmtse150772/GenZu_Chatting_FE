import { call, put, takeEvery } from 'redux-saga/effects'
import { setMessage } from './Slice/messageSlice'


async function CallMessage() {
  let res = await fetch('API_DOMAIN', {
    headers: {
      accept: 'application/json',
    },
  })
  let data = await res.json()
  return data
}
function* GetMessage() {
  let data = yield call(CallMessage)
  yield put({ type: setMessage, payload: data })
}

function* saMessage() {
  yield takeEvery(setMessage, GetMessage)
}
export default saMessage
