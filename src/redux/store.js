// store.js
import { configureStore } from '@reduxjs/toolkit'
import messageSlice from './messageSlice'

const store = configureStore({
  reducer: {
    counter: messageSlice,
  },
})

export default store
