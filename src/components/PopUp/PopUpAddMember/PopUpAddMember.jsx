import { useDispatch } from 'react-redux'
import './PopUpAddMember.scss'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { searchUser } from '../../../redux/Slice/userSlice'
import { MdOutlineSavedSearch } from 'react-icons/md'
import axios from 'axios'
import { getCookie } from '@/services/Cookies'
import Fuse from 'fuse.js'

export default function PopUpAddMember({ isVisible, onClose }) {
  const [input, setInput] = useState('')
  const [friends, setFriends] = useState([
    {
      id: 1,
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    {
      id: 2,
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
  ])
  const [filteredFriends, setFilteredFriends] = useState(friends)
  const dispatch = useDispatch()
  const fuse = new Fuse(friends, {
    keys: ['name', 'email'],
    threshold: 0.3, // Adjust this value to change the sensitivity of the search
  })
  const handleChangeInput = (e) => {
    setInput(e.target.value)
    const result = fuse.search(e.target.value)
    setFilteredFriends(result.map(({ item }) => item))
  }
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      dispatch(searchUser(input))
      console.log(input)
      setInput('') // Clear input field after dispatch
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

  const handleAddToGroup = (friendID) => {
    console.log(friendID)
  }
  useLayoutEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get('https://genzu-chatting-be.onrender.com/friends', {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${JSON.parse(getCookie('userLogin')).accessToken}`,
          },
        })
        setFriends(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchFriends()
  }, [])
  if (!isVisible) {
    return null
  }

  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div ref={popupRef} className='relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg'>
          <button
            className='absolute right-2 top-2 text-gray-500 hover:text-gray-700'
            onClick={onClose}
          >
            &times;
          </button>
          <div className='mb-6 text-center'>
            <h1 className='text-2xl font-semibold text-mainBlue'>Find Your Friend</h1>
            <div className='mt-4 flex justify-center'>
              <input
                onChange={handleChangeInput}
                onKeyDown={handleKeyPress}
                value={input}
                type='text'
                placeholder='Enter email or phone number'
                className='w-2/3 rounded-l-lg border px-4 py-2 focus:outline-none'
              />
              <button className='rounded-r-lg bg-blue-500 px-4 py-2 text-white'>
                <MdOutlineSavedSearch size={24} />
              </button>
            </div>
          </div>
          <ul className='space-y-4'>
            {filteredFriends.map((friend) => (
              <li key={friend.id} className='flex items-center rounded-lg bg-gray-100 p-4 shadow'>
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className='mr-4 h-12 w-12 rounded-full'
                />
                <div className='flex-1'>
                  <p className='font-semibold'>{friend.name}</p>
                  <p className='text-gray-500'>{friend.email}</p>
                </div>
                <button
                  onClick={() => handleAddToGroup(friend.id)}
                  className='rounded-lg bg-mainBlue px-4 py-2 text-white'
                >
                  Add to Group
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
