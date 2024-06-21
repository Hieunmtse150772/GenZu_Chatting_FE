// store.js

import messageSlice from './Slice/messageSlice'
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import saMessage from './saga'
import userSlice from './Slice/userSlice'

// disalbe thunk and add redux-saga middleware
const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    message: messageSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
})
sagaMiddleware.run(saMessage)

export default store
