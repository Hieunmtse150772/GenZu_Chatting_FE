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
      setCookie('userLogin', JSON.stringify(userData), 7) // Set cookie with 7 days expiry
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

const searchUser = async (search) => {
  try {
    const response = await axiosClient.get('/users/searchUsers', { params: { search } })
    return response.data
  } catch (error) {
    console.error('Failed to search user', error)
    throw error
  }
}

const sendFriendRequest = async (receiverId) => {
  try {
    const response = await axiosClient.post(`/friends/addFriendRequest?receiverId=${receiverId}`)
    return {
      data: response.data,
      statusCode: response.status,
    }
  } catch (error) {
    console.error('Failed to send friend request:', error)
    throw error
  }
}

const deleteFriendRequestHasBeenSent = async (requestId) => {
  try {
    const response = await axiosClient.delete(
      `/friends/friendRequestHasBeenSent?requestId=${requestId}`,
    )
    return {
      statusCode: response.status,
      data: response.data,
    }
  } catch (error) {
    console.error('Failed to delete friend request', error)
  }
}

const getFriendRequestHasBeenSent = async () => {
  try {
    const response = await axiosClient.get('/friends/friendRequestHasBeenSent')
    return response.data
  } catch (error) {
    console.error('Failed to get friend request has been sent', error)
  }
}

export default {
  signIn,
  updateUser,
  searchUser,
  sendFriendRequest,
  getFriendRequestHasBeenSent,
  deleteFriendRequestHasBeenSent,
}
