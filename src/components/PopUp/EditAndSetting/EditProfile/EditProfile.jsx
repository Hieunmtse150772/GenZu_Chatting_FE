import { useState } from 'react'
import { getCookie, setCookie } from '../../../../services/Cookies'
import { useDispatch } from 'react-redux'
import userService from '@/services/userService'
import { updateUser } from '../../../../redux/Slice/userSlice'
import { useTranslation } from 'react-i18next'

const EditProfile = ({ user, token }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [profile, setProfile] = useState({
    fullName: user?.fullName || '',
    address: user?.address || '',
    gender: user?.gender || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber,
    picture: user?.picture || '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile({
      ...profile,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userId = user?._id
    try {
      const updatedUser = await userService.updateUser(userId, profile)
      dispatch(updateUser(true))
      if (getCookie('userLogin')) {
        let jsonUser = JSON.parse(getCookie('userLogin'))
        setCookie(
          'userLogin',
          JSON.stringify({
            accessToken: jsonUser.accessToken,
            refreshToken: jsonUser.refreshToken,
            user: updatedUser.user,
          }),
          7,
        )
      }
    } catch (error) {
      console.error('Failed to update user', error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='w-6/12 rounded-lg bg-white p-4 shadow-md dark:bg-[#1E1E1E]'
    >
      <h2 className='mb-4 text-2xl font-semibold dark:text-white'>{t('edit_profile')}</h2>
      {Object.keys(profile).map((key) => (
        <div key={key} className='mb-4'>
          <label className='mb-2 block text-sm font-bold capitalize text-gray-700 dark:text-white'>
            {key.replace(/([A-Z])/g, ' $1')}
          </label>
          {key === 'gender' ? (
            <select
              name={key}
              value={profile[key]}
              onChange={handleChange}
              className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none dark:text-white'
            >
              <option value='male'>{t('male')}</option>
              <option value='female'>{t('female')}</option>
              <option value='other'>{t('other')}</option>
            </select>
          ) : (
            <input
              type={key === 'email' ? 'email' : 'text'}
              name={key}
              value={profile[key]}
              onChange={handleChange}
              className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
            />
          )}
        </div>
      ))}
      <button
        type='submit'
        className='focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
      >
        {t('update_profile')}
      </button>
    </form>
  )
}

export default EditProfile
