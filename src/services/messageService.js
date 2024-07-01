import axiosClient from '@/utils/axiosClient'

export const getConversations = () => {
  return axiosClient.get('/conversations')
}

export const getMessages = (messageId) => {
  console.log(messageId)
  return axiosClient.get(`/messages/${messageId}`)
}
export const sendMessage = (message, id) => {
  console.log(message, id)
  return axiosClient.post('/messages/send/', {
    message,
    id,
  })
}
