import { SlOptions } from 'react-icons/sl'
import { MdPhone, MdVideocam } from 'react-icons/md'
import { getCookie } from '@/services/Cookies'
import { useSelector } from 'react-redux'
import ChatHeaderSkeleton from './ChatHeaderSkeleton/ChatHeaderSkeleton'

function ChatHeader({ toggleInfo }) {
  const personalChat = useSelector((state) => state.user.conversation)

  return (
    <>
      {personalChat ? (
        <header className='mb-2 flex items-center justify-between rounded-lg bg-mainBlue px-8 py-4 shadow-xl dark:bg-[#6c8ea3]'>
          <div className='flex cursor-pointer items-center space-x-4'>
            {console.log(toggleInfo)}
            <img
              src={
                !personalChat.isGroupChat
                  ? personalChat.users[0]?._id == JSON.parse(getCookie('userLogin')).user._id
                    ? personalChat.users[1]?.picture
                    : personalChat.users[0]?.picture
                  : personalChat.avatar != null
                    ? personalChat.avatar
                    : `https://i.pinimg.com/736x/e8/13/74/e8137457cebc9f60266ffab0ca4e83a6.jpg`
              }
              alt='user avatar'
              className='h-16 w-16 rounded-full'
            />
            <div className='flex flex-col'>
              <span className='text-xl font-semibold text-black dark:text-white md:text-2xl'>
                {!personalChat.isGroupChat
                  ? personalChat.users[0]?._id == JSON.parse(getCookie('userLogin')).user._id
                    ? personalChat.users[1]?.fullName
                    : personalChat.users[0]?.fullName
                  : personalChat.chatName}
              </span>
              <span className='font-semibold text-gray-500 dark:text-slate-500'>Active 2h ago</span>
            </div>
          </div>
          <div className='flex space-x-2 md:space-x-6'>
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
