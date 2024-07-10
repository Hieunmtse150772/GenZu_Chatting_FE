import axiosClient from '@/utils/axiosClient'

const changeLanguage = async (language) => {
  try {
    const response = await axiosClient.patch('/auth/update-language', { language })
    return response.data
  } catch (error) {
    console.error('Failed to change language', error)
  }
}

export default { changeLanguage }
