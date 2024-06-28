import axios from 'axios'
import { setCookie, getCookie } from '@/services/Cookies'

const baseURL = 'https://genzu-chatting-be.onrender.com/'

const axiosClient = axios.create({
  baseURL: baseURL,
})

// Request interceptor to add access token to headers
axiosClient.interceptors.request.use(
  (config) => {
    const userLogin = JSON.parse(getCookie('userLogin'))
    const accessToken = userLogin ? userLogin?.accessToken : null
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor to handle 401 or 403 errors and retry the original request
axiosClient.interceptors.response.use(
  (response) => {
    const userLogin = JSON.parse(getCookie('userLogin'))

    if (response.data.accessToken) {
      setCookie(
        'userLogin',
        JSON.stringify({
          ...userLogin,
          accessToken: response.data.accessToken,
        }),
      )
    }

    if (response.data.refreshToken) {
      setCookie(
        'userLogin',
        JSON.stringify({
          ...userLogin,
          refreshToken: response.data.refreshToken,
        }),
      )
    }

    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (
      error?.response?.status === 401 ||
      (error?.response?.status === 403 && !originalRequest._retry)
    ) {
      originalRequest._retry = true

      const userLogin = JSON.parse(getCookie('userLogin'))
      const refresh_token = userLogin ? userLogin.refreshToken : null

      if (!refresh_token) {
        return Promise.reject(error)
      }

      try {
        const { data } = await axiosClient.post('/auth/refresh-token', {
          refresh_token: refresh_token,
        })

        const { newAccessToken, newRefreshToken } = data

        setCookie(
          'userLogin',
          JSON.stringify({
            ...userLogin,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          }),
        )

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        return axiosClient(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }

    // alert(error.message)
    return Promise.reject(error)
  },
)

export default axiosClient
