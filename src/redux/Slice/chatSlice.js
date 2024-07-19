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
  minPage: 0,
  isCreateNewConversation: false,
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
    minusPage: (state) => {
      return {
        ...state,
        minPage: state.minPage - 1,
      }
    },
    setPage: (state, action) => {
      return {
        ...state,
        page: action.payload,
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
    setLsPage: (state, action) => {
      return { ...state, minPage: action.payload - 1 }
    },
    getMessageMoreBottom: (state, action) => {},
    setIsCreateNewConversation: (state) => {
      return {
        ...state,
        isCreateNewConversation: !state.isCreateNewConversation,
      }
    },
  },
})

export const {
  setLoadMore,
  setLsPage,
  setIsCreateNewConversation,
  getMessageMoreBottom,
  setPage,
  setListSearch,
  setLoading,
  minusPage,
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
