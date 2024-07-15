import { useDispatch } from 'react-redux'
import './PopUpAddMember.scss'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { MdOutlineSavedSearch, MdOutlinePhotoCamera } from 'react-icons/md'
import axios from 'axios'
import { getCookie } from '@/services/Cookies'
import Fuse from 'fuse.js'
import { createGroupChat, searchFriends } from '@/redux/Slice/userSlice'

export default function PopUpAddMember({ isVisible, onClose }) {
  const [input, setInput] = useState('')
  const [inputChatName, setInputChatName] = useState('')
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
  const [group, setGroup] = useState({
    chatName: '',
    avatar: 'https://i.pinimg.com/564x/49/fb/92/49fb9228c75ed3066c3d859783c1708e.jpg',
    users: [],
  })
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

  const handleChangeInputChatName = (e) => {
    setInputChatName(e.target.value)
    setGroup({
      ...group,
      chatName: e.target.value,
    })
  }
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      dispatch(searchFriends(input))
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

  const handleAddToGroup = (friendId) => {
    group.users.push(friendId)
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

  const handleCreateGroup = () => {
    dispatch(createGroupChat(group))
  }

  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div
          ref={popupRef}
          className='relative h-screen w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-lg dark:bg-[#1E1E1E]'
        >
          <button
            className='absolute right-2 top-2 text-gray-500 hover:text-gray-700'
            onClick={onClose}
          >
            &times;
          </button>
          <div className='mb-6 text-center'>
            <div className='mb-4 flex flex-row items-center justify-center'>
              <div className='mr-4 h-12 w-12 rounded-full border border-indigo-500 bg-white p-3 shadow-md backdrop-blur-2xl'>
                <label htmlFor='upload' className='flex cursor-pointer flex-col items-center gap-2'>
                  <MdOutlinePhotoCamera size={24} />
                </label>
                <input id='upload' type='file' className='hidden' />
              </div>
              <div className='mr-6 mt-4 flex flex-col items-center'>
                <label htmlFor='groupName' className='text-lg font-bold dark:text-white'>
                  Nhập tên nhóm của bạn
                </label>
                <input
                  id='groupName'
                  onChange={handleChangeInputChatName}
                  onKeyDown={handleKeyPress}
                  value={inputChatName}
                  type='text'
                  placeholder='Nhập tên nhóm của bạn'
                  className='mt-2 w-64 rounded-lg border border-gray-400 px-4 py-2 focus:outline-none'
                />
              </div>
            </div>
            <h1 className='text-2xl font-semibold text-black dark:text-[#E1F1FF]'>
              Find Your Friend
            </h1>
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
          <div>
            <button className='mt-2 bg-slate-300 p-4' onClick={handleCreateGroup}>
              Create group
            </button>
          </div>
          <ul className='h-screen space-y-4 overflow-y-auto'>
            {friends.map((friend) => (
              <li
                key={friend?.info?._id}
                className='flex items-center rounded-lg bg-gray-100 p-4 shadow dark:bg-[#2A2A2A] dark:text-white'
              >
                <img
                  src={friend?.info?.picture}
                  alt={friend?.info?.fullName}
                  className='mr-4 h-12 w-12 rounded-full'
                />
                <div className='flex-1'>
                  <p className='font-semibold'>{friend?.info?.fullName}</p>
                  <p className='text-gray-500'>{friend?.info?.email}</p>
                </div>
                <button
                  onClick={() => handleAddToGroup(friend?.info?._id)}
                  className='rounded-lg bg-blue-500 px-4 py-2 text-white dark:bg-blue-500'
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
