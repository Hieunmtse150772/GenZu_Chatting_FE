import { createSlice } from "@reduxjs/toolkit"

const messageSlice = createSlice({
  name: 'message',
  initialState: {},
  reducers: {
    sendMessage: (state) => {
      return {...state}
    },
  },
})

export const { sendMessage } = messageSlice.actions
export default messageSlice.reducer
