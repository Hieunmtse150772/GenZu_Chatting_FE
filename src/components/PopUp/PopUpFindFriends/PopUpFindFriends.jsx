import axios from 'axios'
import './PopUpFindFriends.scss'
import { useEffect, useRef, useState } from 'react'
import { getCookie } from '../../../services/Cookies'
import { MdPersonSearch } from 'react-icons/md'
import { IoPersonAdd } from 'react-icons/io5'
import userService from '@/services/userService'
export default function PopUpFindFriends({ isVisible, onClose }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')

  const handleSearch = async () => {
    try {
      const token = JSON.parse(getCookie('userLogin')).accessToken
      const response = await axios.get(
        `https://genzu-chatting-be.onrender.com/users/searchUsers?search=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
          },
        },
      )
      setSearchResult(response.data)
    } catch (error) {
      setError(error.message)
    }
  }
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSearch()
    }
  }
  const popupRef = useRef()
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isVisible, onClose])
  if (!isVisible) {
    return null
  }

  const handleSendFriendRequest = async (userID) => {
    try {
      const response = await userService.sendFriendRequest(userID)
      console.log(response)
      if (response.status === 201) {
        setSuccessMessage('Friend request sent successfully!')
        setTimeout(() => {
          setSuccessMessage('')
        }, 5000)
      } else if (response.status === 409) {
        setSuccessMessage('Friend request had sent already!')
        setTimeout(() => {
          setSuccessMessage('')
        }, 5000)
      }
    } catch (error) {
      console.error('Failed to send friend request', error)
    }
  }
  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='relative flex justify-around rounded-lg bg-white p-6 shadow-lg'>
          <button
            className='absolute right-2 top-2 text-gray-500 hover:text-gray-700'
            onClick={onClose}
          >
            &times;
          </button>
          <div className='mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow-xl'>
            <div className='flex justify-between'>
              <input
                type='text'
                className='w-5/6 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Enter search term'
              />
              <MdPersonSearch onClick={handleSearch} size={40} />
            </div>

            {error && <p className='mt-2 text-red-500'>{error}</p>}

            {successMessage && (
              <div
                className='relative z-50 mt-2 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700'
                role='alert'
              >
                <span className='block sm:inline'>{successMessage}</span>
                <span className='absolute bottom-0 right-0 top-0 ml-2 px-4 py-3'>
                  <svg
                    className='h-6 w-6 fill-current text-red-500'
                    role='button'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                  >
                    <title>Close</title>
                    <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
                  </svg>
                </span>
              </div>
            )}

            {searchResult.user && (
              <ul className='mt-4'>
                {searchResult.user.map((user, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between border-b border-gray-200'
                  >
                    <div>
                      <li>{user.fullName}</li>
                      <li className='py-2'>{user.email}</li>
                    </div>
                    <button onClick={() => handleSendFriendRequest(user?._id)}>
                      <IoPersonAdd size={24} />
                    </button>
                  </div>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
