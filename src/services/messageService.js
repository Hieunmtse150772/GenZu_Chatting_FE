import axiosClient from '@/utils/axiosClient'

export const getConversations = () => {
  return axiosClient.get('/conversations')
}

export const getMessages = async (messageId, page = 1) => {
  console.log(messageId, page)
  try {
    const response = await axiosClient.get(
      `/messages/getMessagePagination?id=${messageId}&limit=40&page=${page}`,
    )
    return response.data.data
  } catch (error) {
    console.error('Lỗi khi gửi tin nhắn qua API:', error)
    throw error // Ném lỗi để saga có thể bắt
  }
}
export const sendMessageApi = async (message, id) => {
  console.log(message)
  try {
    const response = await axiosClient.post(`/messages/send?id=${id}`, message)
    return response.data
  } catch (error) {
    console.error('Lỗi khi gửi tin nhắn qua API:', error)
    throw error // Ném lỗi để saga có thể bắt
  }
}

export const addEmoji = async (messageId, emoji) => {
  try {
    console.log(messageId, emoji)
    const response = await axiosClient.post(`/messages/emoji?id=${messageId}`, {
      emoji,
    })
    return response.data
  } catch (error) {
    console.error('lỗi add emoji vao db', error)
    throw error
  }
}

export const updateEmoji = (emojiId, newEmoji) => {
  console.log(emojiId, newEmoji)
  return axiosClient.patch(`/messages/emoji?id=${emojiId}`, {
    newEmoji,
  })
}

export const deleteEmoji = (messageId, emojiId) => {
  console.log(messageId, emojiId)
  return axiosClient.delete(`/messages/emoji?emojiId=${emojiId}&messageId=${messageId}`)
}

export const deleteConversation = (idConversation) => {
  console.log(idConversation)
  return axiosClient.delete(`/conversations?id=${idConversation}`)
}

export const deleteMessageOnesite = (idMessage) => {
  console.log(idMessage)
  return axiosClient.patch(`/messages/deleteMessageByOneSide?id=${idMessage.idMessage}`)
}
export const recallMessage = (idMessage) => {
  console.log(idMessage)
  return axiosClient.delete(`messages/recall?id=${idMessage}`)
}
export const createNewConversationService = async (idUser) => {
  console.log(idUser)
  try {
    const response = await axiosClient.post(`/conversations`, { userId: idUser })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Lỗi khi gửi tin nhắn qua API:', error)
    throw error // Ném lỗi để saga có thể bắt
  }
}
