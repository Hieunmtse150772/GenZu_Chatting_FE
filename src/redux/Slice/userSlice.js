import { createSlice } from '@reduxjs/toolkit'
import Fuse from 'fuse.js'
import userIcon from '../../assets/user_icon.jpg'
const initialState = {
  lsFriends: [
    {
      id: 12345,
      name: 'Huu Huy',
      email: 'HuuHuy@gmail.com',
      phoneNumber: '0987654321',
      avatarLink: '',
      newMessage: 'Thanks',
      time: '',
    },
    {
      id: 12345,
      name: 'Thien Hoang Minh',
      email: 'Thienhoangba99@gmail.com',
      phoneNumber: '0987654321',
      avatarLink: '',
      newMessage: 'Thanks',
      time: '',
    },
    {
      id: 12345,
      name: 'Thien Tran Ba',
      email: 'Thienhoangba99@gmail.com',
      phoneNumber: '0987654321',
      avatarLink: '',
      newMessage: 'Thanks',
      time: '',
    },
    {
      id: 12345,
      name: 'Nguyen Hoang Ba',
      email: 'Thienhoangba99@gmail.com',
      phoneNumber: '0987654321',
      avatarLink: '',
      newMessage: 'Thanks',
      time: '',
    },
    {
      id: 12345,
      name: 'Thien Minh Ba',
      email: 'Thienhoangba99@gmail.com',
      phoneNumber: '0987654321',
      avatarLink: '',
      newMessage: 'Thanks',
      time: '',
    },
    {
      id: 12345,
      name: 'Tran Hoang Ba',
      email: 'Thienhoangba99@gmail.com',
      phoneNumber: '0987654321',
      avatarLink: '',
      newMessage: 'Thanks',
      time: '',
    },
    {
      id: 12345,
      name: 'Thien Hoang Ngoc',
      email: 'Thienhoangba99@gmail.com',
      phoneNumber: '0987654321',
      avatarLink: '',
      newMessage: 'Thanks',
      time: '',
    },
  ],
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
    setFriendRequestNotification: (state, action) => {
      state.friendRequestNotification = action.payload
    },
    setConversation: (state, action) => {
      console.log(action.payload)
      return {
        ...state,
        conversation: state.lsConversation.find((item) => item._id == action.payload),
      }
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
  setConversation,
  setToastMessage,
  clearToastMessage,
} = userSlice.actions
export default userSlice.reducer
