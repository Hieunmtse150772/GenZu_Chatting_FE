// src/slices/chatSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  socketConnected: false,
  typing: false,
  isTyping: false,
  loadMore: false,
  listSearch: '',
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
    leaveRoomSlice: (state, action) => {},
    setLoadMore: (state, action) => {
      return {
        ...state,
        loadMore: action.payload,
      }
    },
    plusPage: (state) => {
      return {
        ...state,
        page: state.page + 1,
      }
    },
    resetChat: () => {
      return initialState
    },
    createNewConversation: (state, action) => {},
    searchMessageByKeyword: (state, action) => {},
    searchMessageById: (state, action) => {},
    setListSearch: (state, action) => {
      console.log('setListSearch', action.payload)
      return {
        ...state,
        listSearch: action.payload.data,
      }
    },
  },
})

export const {
  setLoadMore,
  setListSearch,
  setLoading,
  setSocketConnected,
  searchMessageById,
  setTyping,
  searchMessageByKeyword,
  setIsTyping,
  connectSocket,
  plusPage,
  leaveRoomSlice,
  resetChat,
  createNewConversation,
} = chatSlice.actions

export default chatSlice.reducer
