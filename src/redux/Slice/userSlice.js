import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lsFriends: [
    {
      id: 12345,
      name: 'Thien Hoang Ba',
      avatarLink: '',
      newMessage: 'Thanks',
      time: '',
    },
    {
      id: 12345,
      name: 'Thien Hoang Ba',
      avatarLink: '',
      newMessage: 'Thanks',
      time: '',
    },
    {
      id: 12345,
      name: 'Thien Hoang Ba',
      avatarLink: '',
      newMessage: 'Thanks',
      time: '',
    },
    {
      id: 12345,
      name: 'Thien Hoang Ba',
      avatarLink: '',
      newMessage: 'Thanks',
      time: '',
    },
  ],
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // sendMessage: (state, action) => {
    //   console.log(action.payload)
    //   return {
    //     ...state,
    //     message: [...state.message, { id: 1, message: action.payload, time: '' }],
    //   }
    // },
    setUser: (state) => {
      return { ...state }
    },
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
