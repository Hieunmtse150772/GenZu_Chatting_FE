import { createSlice } from '@reduxjs/toolkit'
import Fuse from 'fuse.js'

const initialState = {
  message: [],
  selectedEmojis: [],
  answerAI: [],
  testMessage: '',
  totalPage: 1,
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
        totalPage: action.payload.totalPages,
        message: action.payload.Messages.map((value) => ({
          sender: value.sender,
          _id: value._id,
          conversation: value.conversation,
          message: value.message,
          createdAt: value.createdAt,
          updatedAt: value.updatedAt,
          styles: value.styles,
          isSpoiled: true,
          messageType: value.messageType == null ? 'text' : value.messageType,
          readBy: value.readBy,
          emojiBy: value.emojiBy,
          status: value.status,
          replyMessage: value.replyMessage || null,
        })),
      }
    },
    updateMessage: (state, action) => {
      const index = state.message.findIndex((item) => item._id == action.payload._id)

      if (index != -1) {
        state.message[index] = {
          ...state.message[index],
          message: action.payload.message,
          status: action.payload.status,
        }
      }
      console.log(action.payload.status)
    },
    setReplyTo: (state, action) => {
      state.replyMessage = action.payload
    },
    clearReplyTo: (state) => {
      state.replyMessage = null
    },
    setDeleteMessageOneSite: (state, action) => {
      const index = state.message.findIndex((item) => item._id == action.payload)
      if (index != -1) {
        state.message.splice(index, 1)
      }
    },
    recallMessageSlice: (state, action) => {},
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

      const message = state.message.find((msg) => msg._id === id_message)
      const emojiBy = message.emojiBy.find((emote) => emote.sender._id === id_user)
      if (message) {
        if (emojiBy) {
          action.payload.type = emojiBy.emoji == emoji ? 'DELETE' : 'UPDATE'
        }
      }
    },
    setEmojiOnMessage: (state, action) => {
      console.log('action:', action.payload)

      let message = state.message.find((msg) => msg._id === action.payload._id)
      // hanh dong update/delete emoji tren tin nhan
      // lay emoji
      let indexEmoji
      if (action.payload.type === 'UPDATE' || action.payload.type === 'DELETE') {
        indexEmoji = message.emojiBy.findIndex((emoji) => emoji._id === action.payload.data._id)
      }

      switch (action.payload.type) {
        case 'ADD':
          message.emojiBy = action.payload.emojiBy
          break
        case 'UPDATE':
          message.emojiBy[indexEmoji] = action.payload.data
          break
        default:
          message.emojiBy.splice(indexEmoji, 1)
          break
      }
    },
    getMessagesById: (state, action) => {},
    getMessagesMore: (state, action) => {},
    setMessagesMore: (state, action) => {
      console.log(action.payload.Messages)
      return {
        ...state,
        message: [...state.message, ...action.payload.Messages],
      }
    },
    setNewMessage: (state, action) => {
      const newMs = action.payload
      console.log('new mesg', newMs)
      return {
        ...state,
        message: [
          {
            sender: newMs.sender,
            _id: newMs._id,
            conversation: newMs.conversation,
            message: newMs.message,
            createdAt: newMs.createdAt,
            updatedAt: newMs.updatedAt,
            styles: newMs.styles,
            isSpoiled: true,
            message_type: newMs.message_type,
            messageType: newMs.messageType,
            readBy: newMs.readBy,
            emojiBy: newMs.emojiBy,
            status: newMs.status,
            replyMessage: newMs.replyMessage,
          },
          ...state.message,
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
    deleteConversation: (state, action) => {},
    setDeleteHistoryMessage: (state, action) => {
      return {
        ...state,
        message: [],
      }
    },
    updateStateSearch: (state, action) => {
      return {
        ...state,
        isSearchMessage: action.payload,
      }
    },
    searchMessage: (state, action) => {
      const lstMessage = JSON.parse(JSON.stringify(state.message))
      const fuse = new Fuse(lstMessage, {
        keys: ['message'],
        threshold: 0.5,
      })

      const result = fuse.search(action.payload)
      // const indexMsg = 0
      // const temp ={
      //   lstMessage:  result.map((res) => res.item),
      //   indexMsg : 0
      // }

      console.log('result search:', result)
      return {
        ...state,
        resultMessage: result.map((res) => res.item),
      }
    },
  },
})

export const {
  sendMessage,
  setMessage,
  setReplyTo,
  clearReplyTo,
  getMessagesMore,
  setMessagesMore,
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
  recallMessageSlice,
  deleteConversation,
  setDeleteHistoryMessage,
  setDeleteMessageOneSite,
  updateMessage,
  searchMessage,
  updateStateSearch,
} = messageSlice.actions
export default messageSlice.reducer
