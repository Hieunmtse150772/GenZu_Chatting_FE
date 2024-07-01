import { all } from 'axios'
import chatSaga from './chatSaga/chatSaga'
import authSaga from './userSaga/userSaga'

export default function* rootSaga() {
  yield all([
    chatSaga(),
    authSaga(),
    // other sagas
  ])
}
