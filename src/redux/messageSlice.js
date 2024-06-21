import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: [
    {
      id: 1,
      message: "Hey, how's your day going?",
      time: '',
    },
    {
      id: 2,
      message: 'Not too bad, just a bit busy. How about you?',
      time: '',
    },
    {
      id: 1,
      message: "I'm good, thanks. Anything exciting happening?",
      time: '',
    },
    {
      id: 2,
      message: "I'm good, thanks. Anything exciting happening?",
      time: '',
    },
    {
      id: 1,
      message: 'Not really, just the usual. Work and errands.',
      time: '',
    },
    {
      id: 2,
      message: 'Sounds like a typical day. Got any plans for the weekend?',
      time: '',
    },
    {
      id: 1,
      message: "Not yet, I'm hoping to relax and maybe catch up on some reading. How about you?",
      time: '',
    },
    {
      id: 2,
      message: "I might go hiking if the weather's nice. Otherwise, just taking it easy",
      time: '',
    },
    {
      id: 1,
      message: 'Hiking sounds fun. Hope the weather cooperates for you!',
      time: '',
    },
    {
      id: 2,
      message: 'You too, take care!',
      time: '',
    },
    {
      id: 1,
      message: ' Sure',
      time: '',
    },
    {
      id: 2,
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
        message: [...state.message, { id: 1, message: action.payload, time: '' }],
      }
    },
    setMessage: (state) => {
      return { ...state }
    },
  },
})

export const { sendMessage, setMessage } = messageSlice.actions
export default messageSlice.reducer
