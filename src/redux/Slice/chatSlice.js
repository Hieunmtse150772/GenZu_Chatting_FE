// src/slices/chatSlice.js
import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    loading: false,
    newMessage: '',
    socketConnected: false,
    typing: false,
    isTyping: false,
    selectedChat: null,
    notification: [],
    user: null, // thêm user để lưu thông tin người dùng
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setNewMessage: (state, action) => {
      state.newMessage = action.payload
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
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload
    },
    setNotification: (state, action) => {
      state.notification = action.payload
    },
    appendMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    connectSocket: () => {},
    sendTestMessage: (state, action) => {}, // thêm connectSocket reducer trống
  },
})

export const {
  setLoading,
  setNewMessage,
  setSocketConnected,
  setTyping,
  setIsTyping,
  setSelectedChat,
  setNotification,
  appendMessage,
  setUser,
  connectSocket,
  sendTestMessage, // thêm connectSocket vào đây
} = chatSlice.actions

export default chatSlice.reducer
