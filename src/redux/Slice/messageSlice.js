import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: [
    {
      id_user: 1,
      id_message: 1,
      message: "Hey, how's your day going?",
      time: '',
      emoji_user:[
        {
          id_user:1,
          url_emoji:"https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f603.png"
        },
        {
          id_user:2,
          url_emoji:"https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f603.png"
        }
      ]
    },
    {
      id_user: 2,
      id_message: 2,
      message: 'Not too bad, just a bit busy. How about you?',
      time: '',
      emoji_user:[
      ]
    },
    {
      id_user: 1,
      id_message: 3,
      message: "I'm good, thanks. Anything exciting happening?",
      time: '',
      emoji_user:[
        
       ]
    },
    {
      id_user: 2,
      id_message: 4,
      message: "I'm good, thanks. Anything exciting happening?",
      time: '',
      emoji_user:[
       ]
    },
    {
      id_user: 1,
      id_message: 5,
      message: 'Not really, just the usual. Work and errands.',
      time: '',
      emoji_user:[
        ]
    },
    {
      id_user: 2,
      id_message: 6,
      message: 'Sounds like a typical day. Got any plans for the weekend?',
      time: '',
      emoji_user:[
       ]
    },
    {
      id_user: 1,
      id_message: 7,
      message: "Not yet, I'm hoping to relax and maybe catch up on some reading. How about you?",
      time: '',
      emoji_user:[
        ]
    },
    {
      id_user: 2,
      id_message: 8,
      message: "I might go hiking if the weather's nice. Otherwise, just taking it easy",
      time: '',
      emoji_user:[
        ]
    },
    {
      id_user: 1,
      id_message: 9,
      message: 'Hiking sounds fun. Hope the weather cooperates for you!',
      time: '',
      emoji_user:[
        ]
    },
    {
      id_user: 2,
      id_message: 10,
      message: 'You too, take care!',
      time: '',
      emoji_user:[
       ]
    },
    {
      id_user: 1,
      id_message: 11,
      message: ' Sure',
      time: '',
      emoji_user:[
        ]
    },
    {
      id_user: 2,
      id_message: 12,
      message: 'Thanks',
      time: '',
      emoji_user:[
        ]
    },
  ],
  selectedEmojis: [],
}
const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    sendMessage: (state, action) => {
            return {
        ...state,
        message: [
          ...state.message,
          { id_user: 1, id_message: 13, message: action.payload, time: '' },
        ],
      }
    },
    setMessage: (state) => {
      return { ...state }
    },
    selectEmoji: (state, action) => {
      const emojiToAdd = action.payload

      // Thêm emoji vào selectedEmojis nếu chưa tồn tại
      state.selectedEmojis.push(emojiToAdd)
    },
    deleteEmoji: (state) => {
      return { ...state, selectedEmojis: [] }
    },
    selectedEmjiOnMessage: (state, action) => {
      console.log('emoji_payload:', action.payload);

      state.message = [
        ...state.message,
      ]
      state.message.map((item, index) =>{
        if(item.id_message == action.payload.id_message){
          state.message[index].emoji_user = [ 
            ...state.message[index].emoji_user,
            { id_user: action.payload.id_user, url_emoji: action.payload.url},
          ]
        }
      }
      )
      console.log('state:', state.message)
  },
  },
})

export const { sendMessage, setMessage, selectEmoji, deleteEmoji, selectedEmjiOnMessage } = messageSlice.actions
export default messageSlice.reducer
