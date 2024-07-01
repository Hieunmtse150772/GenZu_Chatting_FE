import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: [
    {
      id_user: 1,
      id_message: 1,
      message: "Hey, how's your day going?",
      time: '',
      styles: {},
      emoji_user: [
        {
          id_user: 1,
          url_emoji: '😡',
        },
      ],
    },
  ],
  selectedEmojis: [],
  answerAI: [],
  testMessage: '',
}
const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      const { message, styles, isSpoiled } = action.payload
      const newMessage = {
        id_user: 1,
        id_message: state.message.length + 1,
        message,
        time: '',
        styles: styles || {},
        isSpoiled: isSpoiled || false,
        emoji_user: [],
      }
      return {
        ...state,
        message: [...state.message, newMessage],
      }
    },
    setMessage: (state, action) => {
      return {
        ...state,
        message: action.payload.map((value) => ({
          sender: value.sender,
          _id: value._id,
          conversation: value.conversation,
          message: value.message,
          createdAt: value.createdAt,
          updatedAt: value.updatedAt,
          styles: {},
          isSpoiled: true,
          message_type: value.message_type,
          readBy: value.readBy,
          emoji_user: [
            {
              id_user: '66799c2cd1395cf4636fab74',
              url_emoji: '😡',
            },
          ],
        })),
      }
    },
    setMessageSpoiled: (state, action) => {
      const { id_message } = action.payload
      const message = state.message.find((msg) => msg.id_message === id_message)
      if (message) {
        message.isSpoiled = !message.isSpoiled
      }
    },
    selectEmoji: (state, action) => {
      const emojiToAdd = action.payload

      // Thêm emoji vào selectedEmojis nếu chưa tồn tại
      state.selectedEmojis.push(emojiToAdd)
    },
    setAnswerSuggestion: (state, action) => {
      const answerSuggestion = action.payload
      const newAIMessage = {
        answerSuggestion: answerSuggestion.message,
        isAnswerAI: answerSuggestion.isAIClick,
      }

      console.log('state', state)
      return {
        ...state,
        answerAI: [newAIMessage],
      }
    },
    setAnswerClick: (state, action) => {
      return {
        ...state,
        answerAI: [
          {
            answerSuggestion: '',
            isAnswerAI: action.payload,
          },
        ],
      }
    },
    deleteEmoji: (state) => {
      return { ...state, selectedEmojis: [] }
    },
    selectedEmjiOnMessage: (state, action) => {
      console.log('emoji_payload:', action.payload)
      let isDiffUserId;
      
      state.message = [...state.message]

      state.message.map((item, index) => {
        if (item._id == action.payload.id_message) {
          state.message[index].emoji_user.map((emoji, i) => {
            console.log('emoji:', emoji)
            isDiffUserId = emoji.id_user == action.payload.id_user
            // neu cung user id
            if (isDiffUserId) {
              state.message[index].emoji_user[i] = emoji.url_emoji == action.payload.emoji 
                                                  ? state.message[index].emoji_user.splice(i, 1) : { id_user: action.payload.id_user, url_emoji: action.payload.emoji }
            } else if (state.message[index].emoji_user[0].url_emoji == '') {
              state.message[index].emoji_user[i] = {
                id_user: action.payload.id_user,
                url_emoji: action.payload.emoji,
              }
            }
          })
          // neu emoji da ton tai va cung user Id=> click  emoji khac se bi ghi de
          
          if ((state.message[index].emoji_user[0] == null) || !isDiffUserId) {
            state.message[index].emoji_user = [
              ...state.message[index].emoji_user,
              { id_user: action.payload.id_user, url_emoji: action.payload.emoji },
            ]

          } else if(state.message[index].emoji_user[0] != null){
            
            state.message[index].emoji_user = [...state.message[index].emoji_user]
            
          }
        }
      })
      console.log('state:', state.message)
    },
    setTestMessage: (state, action) => {
      return {
        ...state,
        testMessage: action.payload,
      }
    },
    getMessagesById: (state, action) => {
      console.log(action.payload)
    },
    setNewMessage: (state, action) => {
      const newMs = action.payload
      return {
        ...state,
        message: [
          ...state.message,
          {
            sender: newMs.sender,
            _id: newMs._id,
            conversation: newMs.conversation,
            message: newMs.message,
            createdAt: newMs.createdAt,
            updatedAt: newMs.updatedAt,
            styles: {},
            isSpoiled: true,
            message_type: newMs.message_type,
            readBy: newMs.readBy,
            emoji_user: [
              {
                id_user: 1,
                url_emoji: '😡',
              },
            ],
          },
        ],
      }
    },
  },
})

export const {
  sendMessage,
  setMessage,
  selectEmoji,
  deleteEmoji,
  selectedEmjiOnMessage,
  setMessageSpoiled,
  setAnswerSuggestion,
  setAnswerClick,
  getMessagesById,
  setTestMessage,
  setNewMessage,
} = messageSlice.actions
export default messageSlice.reducer
