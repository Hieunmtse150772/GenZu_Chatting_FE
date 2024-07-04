import axiosClient from '@/utils/axiosClient'

export const getConversations = () => {
  return axiosClient.get('/conversations')
}

export const getMessages = (messageId) => {
  console.log(messageId)
  return axiosClient.get(`/messages/${messageId}`)
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
