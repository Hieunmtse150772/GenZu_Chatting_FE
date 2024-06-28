import axios from 'axios'
import { getCookie, setCookie } from '../services/Cookies'

const api = axios.create({
  baseURL: 'https://genzu-chatting-be.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(getCookie('userLogin')).accessToken // Lấy accessToken từ Cookies
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const userLogin = JSON.parse(getCookie('userLogin'))
    const response = api.post('/auth/refresh-token', {
      refreshToken: userLogin.refreshToken,
    })

    const { newAccessToken, newRefreshToken } = (await response).data

    setCookie(
      'userLogin',
      JSON.stringify({
        ...userLogin,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      }),
    )

    return newAccessToken
  } catch (error) {
    console.error('Failed to refresh access token', error)
    throw error
  }
}

// Response interceptor to handle 401 errors and retry the original request
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const newAccessToken = await refreshAccessToken()
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export const getConversations = () => {
  return api.get('/conversations')
}

export const getMessages = (messageId) => {
  console.log(messageId)
  return api.get(`/messages/${messageId}`)
}
