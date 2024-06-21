// store.js

import messageSlice from './messageSlice'
import createSagaMiddleware from 'redux-saga'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import saMessage from './saga'

// disalbe thunk and add redux-saga middleware
const sagaMiddleware = createSagaMiddleware()
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]

const store = configureStore({
  reducer: {
    counter: messageSlice,
  },
  middleware,
})
sagaMiddleware.run(saMessage)

export default store
