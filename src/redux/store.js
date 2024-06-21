// store.js

import messageSlice from './messageSlice'
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import saMessage from './saga'

// disalbe thunk and add redux-saga middleware
const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    message: messageSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
})
sagaMiddleware.run(saMessage)

export default store
