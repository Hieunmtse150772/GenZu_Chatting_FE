// src/slices/chatSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  socketConnected: false,
  typing: false,
  isTyping: false,
  loadMore: false,
  page: 2,
}
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setSocketConnected: (state, action) => {
      state.socketConnected = action.payload
    },
    setTyping: (state, action) => {
      state.typing = action.payload
    },
    setIsTyping: (state, action) => {
      state.isTyping = action.payload
    },
    connectSocket: (state, action) => {},
    setLoadMore: (state, action) => {
      return {
        ...state,
        loadMore: action.payload,
      }
    },
    plusPage: (state) => {
      console.log('helo helo')
      return {
        ...state,
        page: state.page + 1,
      }
    },
    resetChat: () => {
      return initialState
    },
  },
})

export const {
  setLoadMore,
  setLoading,
  setSocketConnected,
  setTyping,
  setIsTyping,
  connectSocket,
  plusPage,
  resetChat,
} = chatSlice.actions

export default chatSlice.reducer
