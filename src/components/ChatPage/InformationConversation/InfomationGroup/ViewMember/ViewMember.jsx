import { useRef, useState, useEffect } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { removeMemberFromGroup } from '@/redux/Slice/userSlice'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

const ViewMember = ({ members, onClose, isVisible, groupAdminId }) => {
  const { idConversation } = useParams()
  const popupRef = useRef()
  const dispatch = useDispatch()
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

  const handleRemoveMember = (idConversation, idMember) => {
    const groupId = idConversation
    const memberId = idMember
    dispatch(removeMemberFromGroup({ groupId, memberId }))
  }

  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div
          className='relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-[#333333]'
          ref={popupRef}
        >
          <button
            className='absolute right-2 top-2 text-gray-500 hover:text-gray-700'
            onClick={onClose}
          >
            <MdOutlineClose size={24} />
          </button>
          <h2 className='mb-4 text-center text-2xl font-bold dark:text-white'>All Member</h2>
          <ul className='space-y-4'>
            {members.map((member, index) => (
              <li
                key={index}
                className='flex items-center justify-between rounded-lg bg-gray-100 p-4 shadow'
              >
                <div className='flex items-center'>
                  <img
                    src={member?.picture}
                    alt={member?.fullName}
                    className='mr-4 h-10 w-10 rounded-full'
                  />
                  <div>
                    <p className='font-semibold'>{member?.fullName}</p>
                    <p className='text-sm text-gray-500'>{member?.email}</p>
                  </div>
                </div>

                {member._id !== groupAdminId ? (
                  <button
                    className={`rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-400`}
                    onClick={() => handleRemoveMember(idConversation, member?._id)}
                    // disabled={addedMembers.has(friend.friend?._id)}
                  >
                    Remove
                  </button>
                ) : (
                  <p className='text-gray-500'>Nhóm trưởng</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default ViewMember
