import { createSlice } from '@reduxjs/toolkit'
import Fuse from 'fuse.js'

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
      name: 'Thien Hoang Ba',
      email: 'Thienhoangba99@gmail.com',
      phoneNumber: '0987654321',
      avatarLink: '',
      newMessage: 'Thanks',
      time: '',
    },
    {
      id: 12345,
      name: 'Thien Hoang Ba',
      email: 'Thienhoangba99@gmail.com',
      phoneNumber: '0987654321',
      avatarLink: '',
      newMessage: 'Thanks',
      time: '',
    },
    {
      id: 12345,
      name: 'Thien Hoang Ba',
      email: 'Thienhoangba99@gmail.com',
      phoneNumber: '0987654321',
      avatarLink: '',
      newMessage: 'Thanks',
      time: '',
    },
    {
      id: 12345,
      name: 'Thien Hoang Ba',
      email: 'Thienhoangba99@gmail.com',
      phoneNumber: '0987654321',
      avatarLink: '',
      newMessage: 'Thanks',
      time: '',
    },
    {
      id: 12345,
      name: 'Thien Hoang Ba',
      email: 'Thienhoangba99@gmail.com',
      phoneNumber: '0987654321',
      avatarLink: '',
      newMessage: 'Thanks',
      time: '',
    },
    {
      id: 12345,
      name: 'Thien Hoang Ba',
      email: 'Thienhoangba99@gmail.com',
      phoneNumber: '0987654321',
      avatarLink: '',
      newMessage: 'Thanks',
      time: '',
    },
  ],
  lsSearchUser: [],
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
  },
})

export const { setUser, searchUser } = userSlice.actions
export default userSlice.reducer
