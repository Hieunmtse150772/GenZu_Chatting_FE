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
  lsPersonalChats: [
    {
      id: '1',
      name: 'Huy Nguyen',
      image: userIcon,
      message: "Let's go",
    },
    {
      id: '2',
      name: 'Ba Thien',
      image: userIcon,
      message:
        'Elephants have the largest brains among land animals and demonstrate remarkable intelligence.',
    },
    {
      id: '3',
      name: 'Helena Hills',
      image: userIcon,
      message: 'Will head to the Help Center...',
    },
    {
      id: '4',
      name: 'Oscar Davis',
      image: userIcon,
      message: 'Trueeeeee',
    },
    {
      id: '5',
      name: 'Daniel Jay Park',
      image: userIcon,
      message: 'lol yeah, are you coming to the lunc...',
    },
    {
      id: '6',
      name: 'Daniel Jay Park',
      image: userIcon,
      message: 'lol yeah, are you coming to the lunc...',
    },
  ],
  lsGroupChats: [
    {
      id: '3',
      name: 'Ngan Tran',
      image: userIcon,
      message: 'Cheetahs are the fastest land animals, capable of reaching speeds up',
    },
    {
      id: '4',
      name: 'Minh Hieu',
      image: userIcon,
      message: 'Koalas sleep around 20 hours a day and are known for their eucalyptus diet.',
    },
  ],
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
