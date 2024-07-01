import { useDispatch, useSelector } from 'react-redux'
import './PopUpAddMember.scss'
import { useEffect, useRef, useState } from 'react'
import { searchUser } from '../../../redux/Slice/userSlice'
import { MdOutlineSavedSearch } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'
import axios from 'axios'
export default function PopUpAddMenber({ isVisible, onClose }) {
  let lsSearchUser = useSelector((state) => state.user.lsSearchUser)
  const [input, setInput] = useState('')
  const [friends, setFriends] = useState([])
  const dispatch = useDispatch()
  const handleChangeInput = (e) => {
    setInput(e.target.value)
  }
  const handleKeyPress = (e) => {
    if (e.keyCode == 13) {
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
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get('https://genzu-chatting-be.onrender.com/friends', {
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjY3OTljMmNkMTM5NWNmNDYzNmZhYjc0IiwiaWF0IjoxNzE5ODIxOTQyLCJleHAiOjE3MTk4MzI3NDJ9.KLHgJGMFwHpxMtDPT2pOh0rvBDZqUHdC_I44wk_MUnw',
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
      {console.log(friends)}
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='relative flex justify-around rounded-lg bg-white p-6 shadow-lg'>
          <button
            className='absolute right-2 top-2 text-gray-500 hover:text-gray-700'
            onClick={onClose}
          >
            &times;
          </button>
          <div className='AddMember flex items-center justify-center'>
            <div className='bg-mainBlue p-4'>
              <h1>Find Your Friend</h1>
              <div className='flex justify-around'>
                <input
                  onChange={handleChangeInput}
                  onKeyDown={handleKeyPress}
                  type='text'
                  placeholder='Enter email or number phone'
                />
                <button>
                  <MdOutlineSavedSearch size={35} />
                </button>
              </div>
              <div>
                {lsSearchUser.map((item, index) => (
                  <div key={index} className='flex items-center justify-around'>
                    <p className=''>{item.name}</p>
                    <FaUsers size={24} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
