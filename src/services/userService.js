import axiosClient from '@/utils/axiosClient'

const updateUser = async (id_user, formData) => {
  try {
    const response = await axiosClient.patch(`/users/update/${id_user}`, formData)
    console.log(response)
    return response.data
  } catch (error) {
    console.error('Failed to update user', error)
    throw error
  }
}

export default { updateUser }
