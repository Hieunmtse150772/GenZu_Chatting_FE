import React, { useEffect, useState, useRef } from 'react'
import userService from '@/services/userService'
import { useParams } from 'react-router-dom'
import { MdOutlineClose } from 'react-icons/md'

const AddNewMember = ({ isVisible, onClose }) => {
  const [loading, setLoading] = useState(true)
  const [friends, setFriends] = useState([])
  const [groupMembers, setGroupMembers] = useState([])
  const popupRef = useRef()
  const idConversation = useParams()

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await userService.getAllFriends()
        console.log('add new member', response)
        if (response && Array.isArray(response)) {
          const friends = response
            .map((item) => ({
              friend: item?.info,
              createdAt: item?.createdAt,
              friendshipId: item?.friendShip,
              groupConversation: item?.groupConversation,
            }))
            .filter((friend) => {
              // Lọc ra những bạn bè có ít nhất một phần tử trong groupConversation có _id trùng với idConversation
              return friend.groupConversation.some((gc) => gc?._id === idConversation)
            })

          setFriends(friends)
        } else {
          console.error('Unexpected data format:', response)
        }
      } catch (error) {
        console.error('Failed to fetch friends:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFriends()
  }, [])

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

  const handleAddToGroup = (friend) => {
    setGroupMembers([...groupMembers, friend])
  }

  if (!isVisible) return null

  return (
    <>
      {console.log(friends)}
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg' ref={popupRef}>
          <button
            className='absolute right-2 top-2 text-gray-500 hover:text-gray-700'
            onClick={onClose}
          >
            <MdOutlineClose size={24} />
          </button>
          <h2 className='mb-4 text-2xl font-bold'>Add New Member</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className='space-y-4'>
              {friends.map((friend, index) => (
                <li
                  key={index}
                  className='flex items-center justify-between rounded-lg bg-gray-100 p-4 shadow'
                >
                  <div className='flex items-center'>
                    <img
                      src={friend?.friend?.picture}
                      alt={friend?.friend?.fullName}
                      className='mr-4 h-10 w-10 rounded-full'
                    />
                    <div>
                      <p className='font-semibold'>{friend?.friend?.fullName}</p>
                      <p className='text-sm text-gray-500'>{friend?.friend?.email}</p>
                    </div>
                  </div>
                  <button
                    className='rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
                    onClick={() => handleAddToGroup(friend)}
                  >
                    Add to Group
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default AddNewMember
