import { getCookie } from '@/services/Cookies'
import { translateText } from '@/services/TranslationService'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: [
    {
      id_user: 1,
      id_message: 1,
      message: "Hey, how's your day going?",
      time: '',
      styles: {},
      emojiBy: [
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
    sendMessage: (state, action) => {},
    setMessage: (state, action) => {
      console.log(action.payload)
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
          messageType: value.messageType == null ? 'text' : value.messageType,
          readBy: value.readBy,
          emojiBy: value.emojiBy,
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
    handleEmojiOnMessage: (state, action) => {
      console.log('emoji_payload:', action.payload)
      const { id_user, id_message, emoji } = action.payload
      action.payload.type = 'ADD'
      let isDiffUserId

      state.message = [...state.message]

      state.message.map((item, index) => {
        if (item._id == id_message) {
          state.message[index].emojiBy.map((emote, i) => {
            isDiffUserId = emote.sender._id == id_user
            // neu cung user id
            if (isDiffUserId) {
              action.payload.type = emote.emoji == emoji ? 'DELETE' : 'UPDATE'
            }
          })
        }
      })
      console.log('action.payload.type:', action.payload.type)
    },
    setEmojiOnMessage: (state, action) => {
      console.log('action:', action.payload)
    },
    getMessagesById: (state, action) => {},
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
            messageType: newMs.messageType,
            readBy: newMs.readBy,
            emojiBy: [
              {
                id_user: 1,
                url_emoji: '😡',
              },
            ],
          },
        ],
      }
    },
    translationMessage: (state, action) => {},
    setTranslationMessage: (state, action) => {
      console.log(action.payload)
      return {
        ...state,
        message: state.message.map((message) => {
          if (message._id === action.payload.id) {
            return {
              ...message,
              message: action.payload.message,
              updatedAt: new Date().toISOString(), // Cập nhật thời gian updatedAt
            }
          } else {
            return message
          }
        }),
      }
    },
  },
})

export const {
  sendMessage,
  setMessage,
  selectEmoji,
  deleteEmoji,
  handleEmojiOnMessage,
  setEmojiOnMessage,
  setMessageSpoiled,
  setAnswerSuggestion,
  setAnswerClick,
  getMessagesById,
  setNewMessage,
  translationMessage,
  setTranslationMessage,
} = messageSlice.actions
export default messageSlice.reducer
