import axios from 'axios'
import { setCookie, getCookie } from '@/services/Cookies'

const baseURL = 'https://genzu-chatting-be.onrender.com/'

const axiosClient = axios.create({
  baseURL: baseURL,
})

// Request interceptor to add access token to headers
axiosClient.interceptors.request.use(
  (config) => {
    const userLogin = JSON.parse(getCookie('userLogin') || '{}')
    const accessToken = userLogin?.accessToken
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
    const userLogin = JSON.parse(getCookie('userLogin') || '{}')

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

      const userLogin = JSON.parse(getCookie('userLogin') || '{}')
      const refreshToken = userLogin?.refreshToken

      if (!refreshToken) {
        return Promise.reject(error)
      }

      try {
        const { data } = await axios.post(`${baseURL}/auth/refresh-token`, {
          refresh_token: refreshToken,
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
        // Optionally, you can clear the cookies and redirect to login if refresh fails
        setCookie('userLogin', '')
        // Redirect to login page
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default axiosClient
