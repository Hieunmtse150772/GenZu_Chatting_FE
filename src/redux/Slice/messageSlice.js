import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: [
    {
      id_user: 1,
      id_message:1,
      message: "Hey, how's your day going?",
      time: '',
    },
    {
      id_user: 2,
      id_message:2,
      message: 'Not too bad, just a bit busy. How about you?',
      time: '',
    },
    {
      id_user: 1,
      id_message:3,
      message: "I'm good, thanks. Anything exciting happening?",
      time: '',
    },
    {
      id_user: 2,
      id_message:4,
      message: "I'm good, thanks. Anything exciting happening?",
      time: '',
    },
    {
      id_user: 1,
      id_message:5,
      message: 'Not really, just the usual. Work and errands.',
      time: '',
    },
    {
      id_user: 2,
      id_message:6,
      message: 'Sounds like a typical day. Got any plans for the weekend?',
      time: '',
    },
    {
      id_user: 1,
      id_message:7,
      message: "Not yet, I'm hoping to relax and maybe catch up on some reading. How about you?",
      time: '',
    },
    {
      id_user: 2,
      id_message:8,
      message: "I might go hiking if the weather's nice. Otherwise, just taking it easy",
      time: '',
    },
    {
      id_user: 1,
      id_message:9,
      message: 'Hiking sounds fun. Hope the weather cooperates for you!',
      time: '',
    },
    {
      id_user: 2,
      id_message:10,
      message: 'You too, take care!',
      time: '',
    },
    {
      id_user: 1,
      id_message:11,
      message: ' Sure',
      time: '',
    },
    {
      id_user: 2,
      id_message:12,
      message: 'Thanks',
      time: '',
    },
  ],
}
const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      console.log(action.payload)
      return {
        ...state,
        message: [...state.message, { id_user: 1, id_message:1, message: action.payload, time: '' }],
      }
    },
    setMessage: (state) => {
      return { ...state }
    },
  },
})

export const { sendMessage, setMessage } = messageSlice.actions
export default messageSlice.reducer