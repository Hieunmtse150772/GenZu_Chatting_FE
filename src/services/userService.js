import axiosClient from '@/utils/axiosClient'
import { setCookie } from './Cookies'

const signIn = async (email, password, rememberMe) => {
  try {
    const response = await axiosClient.post('/auth/sign-in', { email, password })

    const { accessToken, refreshToken, user } = response.data

    const userData = {
      accessToken,
      refreshToken,
      user,
    }
    console.log(rememberMe)
    if (!rememberMe) {
      sessionStorage.setItem('userLogin', JSON.stringify(userData))
    } else {
      setCookie('userLoginTets', JSON.stringify(userData), 7) // Set cookie with 7 days expiry
    }

    return userData
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to sign in')
  }
}

const updateUser = async (id_user, formData) => {
  try {
    const response = await axiosClient.patch(`/users/update/${id_user}`, formData)
    return response.data
  } catch (error) {
    console.error('Failed to update user', error)
    throw error
  }
}

export default { signIn, updateUser }
