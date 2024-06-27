import axios from 'axios'
import { getCookie } from '../services/Cookies'

const api = axios.create({
  baseURL: 'https://genzu-chatting-be.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
})
api.interceptors.request.use((config) => {
  const accessToken = JSON.parse(getCookie('userLogin')).accessToken // Lấy accessToken từ Cookies
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

export const getConversations = () => {
  return api.get('/conversations')
}

export const getMessages = (messageId) => {
  console.log(messageId)
  return api.get(`/messages/${messageId}`)
}
