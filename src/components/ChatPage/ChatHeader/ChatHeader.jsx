import { SlOptions } from 'react-icons/sl'
import { MdPhone, MdVideocam } from 'react-icons/md'
import { getCookie } from '@/services/Cookies'
import { useSelector } from 'react-redux'
import ChatHeaderSkeleton from './ChatHeaderSkeleton/ChatHeaderSkeleton'
import { useEffect, useState } from 'react'

function ChatHeader({ toggleInfo }) {
  const personalChat = useSelector((state) => state.user.conversation)
  const [customer, setCustomer] = useState(null)
  const [timeOffline, setTimeOffline] = useState('')
  const [offlineTime, setOfflineTime] = useState(null)
  useEffect(() => {
    if (personalChat) {
      setCustomer(
        personalChat.users[0]?._id == JSON.parse(getCookie('userLogin')).user._id
          ? personalChat?.users[1]
          : personalChat?.users[0],
      )
      setOfflineTime(
        personalChat.users[0]?._id == JSON.parse(getCookie('userLogin')).user._id
          ? personalChat.users[1]?.offline_at
          : personalChat.users[0]?.offline_at,
      )
    }
  }, [personalChat])

  useEffect(() => {
    const calculateOfflineTime = () => {
      const offlineDate = new Date(offlineTime)
      const now = new Date()
      const diffInMilliseconds = now - offlineDate

      const minutes = Math.floor(diffInMilliseconds / (1000 * 60))
      const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60))
      const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24))

      if (minutes < 60) {
        setTimeOffline(`${minutes} minutes`)
      } else if (hours < 24) {
        const remainingMinutes = minutes % 60
        setTimeOffline(`${hours} hour ${remainingMinutes} minutes`)
      } else {
        // const remainingHours = hours % 24
        // const remainingMinutes = minutes % 60
        setTimeOffline(`${days} days`)
        // setTimeOffline(`${days} ngày ${remainingHours} giờ ${remainingMinutes} phút`)
      }
    }

    // Tính toán khi component mount
    calculateOfflineTime()

    // Tính toán lại mỗi phút
    const intervalId = setInterval(calculateOfflineTime, 60000)

    // Clear interval khi component unmount
    return () => clearInterval(intervalId)
  }, [offlineTime])
  return (
    <>
      {console.log(customer)}
      {personalChat ? (
        <header className='mb-2 flex items-center justify-between rounded-lg bg-mainBlue px-8 py-4 shadow-xl dark:bg-darkTheme'>
          <div className='flex cursor-pointer items-center space-x-4'>
            <img
              src={
                !personalChat.isGroupChat
                  ? customer?.picture
                  : personalChat.avatar != null
                    ? personalChat.avatar
                    : `https://i.pinimg.com/736x/e8/13/74/e8137457cebc9f60266ffab0ca4e83a6.jpg`
              }
              alt='user avatar'
              className='h-16 w-16 rounded-full'
            />
            <div className='flex flex-col'>
              <span className='text-xl font-semibold text-black dark:text-white md:text-2xl'>
                {!personalChat.isGroupChat ? customer?.fullName : personalChat?.chatName}
              </span>
              {customer?.is_online ? (
                <span className='font-semibold text-green-500 dark:text-green-400'>
                  Is Online Now
                </span>
              ) : (
                <span className='font-semibold text-gray-500 dark:text-slate-500'>
                  Active {timeOffline} ago
                </span>
              )}
            </div>
          </div>
          <div className='flex space-x-2 dark:text-white md:space-x-6'>
            <button className='rounded-md p-2 hover:bg-blue-400 dark:hover:bg-[#357ABD]'>
              <MdPhone size={22} />
            </button>
            <button className='rounded-md p-2 hover:bg-blue-400 dark:hover:bg-[#357ABD]'>
              <MdVideocam size={22} />
            </button>
            <button
              className='rounded-md p-2 hover:bg-blue-400 dark:hover:bg-[#357ABD]'
              onClick={toggleInfo}
            >
              <SlOptions size={22} color='' />
            </button>
          </div>
        </header>
      ) : (
        <ChatHeaderSkeleton />
      )}
    </>
  )
}

export default ChatHeader
