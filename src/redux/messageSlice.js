import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: [],
}
const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    sendMessage: (state) => {
      return { ...state }
    },
    setMessage: (state) => {
      return { ...state }
    },
  },
})

export const { sendMessage, setMessage } = messageSlice.actions
export default messageSlice.reducer
