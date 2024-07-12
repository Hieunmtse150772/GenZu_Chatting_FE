import { useState } from 'react'
import DetailProfile from './DetailProfile/DetailProfile'
import { useSelector } from 'react-redux'
import { getCookie } from '@/services/Cookies'

export default function ViewProfile({ user, onClose }) {
  // const personalChat = useSelector((state) => state.user.conversation)
  // console.log('personalChat', personalChat)
  // const [user, setUser] = useState(
  //   !personalChat?.isGroupChat
  //     ? personalChat.users[0]?._id === JSON.parse(getCookie('userLogin'))?.user?._id
  //       ? personalChat?.users[1]
  //       : personalChat?.users[0]
  //     : personalChat?.avatar != null
  //       ? personalChat?.avatar
  //       : '',
  // )
  return (
    <div className='ViewProfile fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative flex justify-around rounded-lg bg-mainBlue p-6 shadow-lg'>
        <button
          className='absolute right-2 top-2 text-gray-500 hover:text-gray-700'
          onClick={onClose}
        >
          &times;
        </button>
        <DetailProfile user={user} />
      </div>
    </div>
  )
}
