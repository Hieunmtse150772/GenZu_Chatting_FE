import { createSlice } from '@reduxjs/toolkit'
import Fuse from 'fuse.js'
import userIcon from '../../assets/user_icon.jpg'
const initialState = {
  lsFriends: [],
  lsSearchUser: [],
  lsPersonalChats: [],
  lsGroupChats: [],
  lsConversation: [],
  editUser: false,
  idConversation: null,
  conversation: null,
  toastMessage: '',
  friendRequestNotification: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state) => {
      return { ...state }
    },
    searchUser: (state, action) => {
      const fuse = new Fuse(state.lsFriends, {
        keys: ['phoneNumber', 'email'],
        threshold: 0.5, // Ngưỡng tìm kiếm mờ
      })
      const result = fuse.search(action.payload)
      return {
        ...state,
        lsSearchUser: result.map((res) => res.item),
      }
    },
    updateUser: (state, action) => {
      return {
        ...state,
        editUser: action.payload,
      }
    },
    setIdConversation: (state, action) => {
      return {
        ...state,
        idConversation: action.payload,
      }
    },
    getIdConversation: (state, action) => {},
    getLsConversation: (state, action) => {},
    setLsConversation: (state, action) => {
      return {
        ...state,
        lsConversation: action.payload,
      }
    },
    setLsGroupChat: (state, action) => {
      return {
        ...state,
        lsGroupChats: action.payload,
      }
    },
    setLsPersonalChats: (state, action) => {
      return {
        ...state,
        lsPersonalChats: action.payload,
      }
    },
    setToastMessage: (state, action) => {
      state.toastMessage = action.payload
    },
    clearToastMessage: (state) => {
      state.toastMessage = null
    },
    alertFriendRequest: (state, action) => {},
    setReadNotification: (state, action) => {},
    setFriendRequestReply: (state, action) => {},
    setFriendRequestNotification: (state, action) => {
      state.friendRequestNotification = action.payload
    },
    setNewFriendRequestNotification: (state, action) => {
      return {
        ...state,
        friendRequestNotification: [...state.friendRequestNotification, action.payload],
      }
    },
    setConversation: (state, action) => {
      console.log(action.payload, state.lsConversation)
      return {
        ...state,
        conversation: state.lsConversation.find(
          (item) => item._id == action.payload.idConversation,
        ),
      }
    },
    setConversationFirst: (state, action) => {
      console.log(action.payload)
    },
  },
})

export const {
  setUser,
  setUserInfo,
  searchUser,
  updateUser,
  setIdConversation,
  getIdConversation,
  setLsConversation,
  getLsConversation,
  setLsGroupChat,
  setLsPersonalChats,
  alertFriendRequest,
  setFriendRequestNotification,
  setNewFriendRequestNotification,
  setConversation,
  setConversationFirst,
  setToastMessage,
  clearToastMessage,
  setFriendRequestReply,
} = userSlice.actions
export default userSlice.reducer
