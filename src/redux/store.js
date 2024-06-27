// store.js

import messageSlice from './Slice/messageSlice'
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'

import userSlice from './Slice/userSlice'
import authSaga from './saga'

// disalbe thunk and add redux-saga middleware
const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    message: messageSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})
sagaMiddleware.run(authSaga)

export default store
