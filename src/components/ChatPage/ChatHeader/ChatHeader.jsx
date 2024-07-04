import { SlOptions } from 'react-icons/sl'
import { MdPhone, MdVideocam } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { getCookie } from '@/services/Cookies'

function ChatHeader({ toggleInfo }) {
  const conversation = useSelector((state) => state.user?.conversation)
  return (
    <header className='mb-2 flex items-center justify-between rounded-lg bg-mainBlue px-8 py-4 shadow-xl dark:bg-[#6c8ea3]'>
      <div className='flex cursor-pointer items-center space-x-4'>
        {console.log(conversation)}
        <img
          src={
            conversation?.isGroupChat
              ? conversation?.avatar != null
                ? conversation?.avatar
                : `https://i.pinimg.com/736x/e8/13/74/e8137457cebc9f60266ffab0ca4e83a6.jpg`
              : conversation.users[0]?._id == JSON.parse(getCookie('userLogin'))?.user?._id
                ? conversation.users[0]?.picture
                : conversation.users[1]?.picture
          }
          className='h-16 w-16 rounded-full'
        />
        <div className='flex flex-col'>
          <span className='text-xl font-semibold text-black dark:text-white md:text-2xl'>
            {conversation.isGroupChat
              ? conversation.chatName
              : conversation.users[0]?._id == JSON.parse(getCookie('userLogin'))?.user?._id
                ? conversation.users[0]?.fullName
                : conversation.users[1]?.fullName}
          </span>
          <span className='font-semibold text-gray-500 dark:text-slate-500'>Active 2h ago</span>
        </div>
      </div>
      <div className='flex space-x-2 md:space-x-6'>
        <button className='rounded-md p-2 hover:bg-blue-400 dark:hover:opacity-85'>
          <MdPhone size={22} />
        </button>
        <button className='rounded-md p-2 hover:bg-blue-400 dark:hover:opacity-85'>
          <MdVideocam size={22} />
        </button>
        <button
          className='rounded-md p-2 hover:bg-blue-400 dark:hover:opacity-85'
          onClick={toggleInfo}
        >
          <SlOptions size={22} />
        </button>
      </div>
    </header>
  )
}

export default ChatHeader
