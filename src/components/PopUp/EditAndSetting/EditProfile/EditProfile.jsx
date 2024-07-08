import { useState } from 'react'
import { getCookie, setCookie } from '../../../../services/Cookies'
import { useDispatch } from 'react-redux'
import userService from '@/services/userService'
import { updateUser } from '../../../../redux/Slice/userSlice'

const EditProfile = ({ user, token }) => {
  const dispatch = useDispatch()
  const [profile, setProfile] = useState({
    fullName: user?.fullName || '',
    address: user?.address || '',
    gender: user?.gender || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber,
    picture: user?.picture || '',
  })
  console.log(profile)
  console.log(user.phoneNumber)

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile({
      ...profile,
      [name]: value,
    })
    console.log(profile)
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
      <h2 className='mb-4 text-2xl font-semibold dark:text-white'>Edit Profile</h2>
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
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
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
        Update Profile
      </button>
    </form>
  )
}

export default EditProfile
