import axiosClient from '@/utils/axiosClient'

export const getConversations = () => {
  return axiosClient.get('/conversations')
}

export const getMessages = (messageId) => {
  console.log(messageId)
  return axiosClient.get(`/messages/${messageId}`)
}
export const sendMessageApi = async (message, id) => {
  try {
    console.log(message, id)
    const response = await axiosClient.post(`/messages/send?id=${id}`, { message })
    console.log(response)
    return response.data
  } catch (error) {
    console.error('Lỗi khi gửi tin nhắn qua API:', error)
    throw error // Ném lỗi để saga có thể bắt
  }
}
