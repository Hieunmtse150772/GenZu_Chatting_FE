import { RxAvatar } from 'react-icons/rx'
import { SlOptions } from 'react-icons/sl'
import { MdPhone, MdVideocam } from 'react-icons/md'

function ChatHeader({ toggleInfo }) {
  return (
    <header className='flex justify-between items-center py-4 bg-mainBlue px-8 rounded-lg mb-2'>
      <div className='flex items-center space-x-4 cursor-pointer'>
        <RxAvatar size={40} className='text-orange-500' />
        <div className='flex flex-col'>
          <span className='text-2xl text-black font-semibold'>Username</span>
          <span className='text-base text-gray-500 font-semibold'>Active 2h ago</span>
        </div>
      </div>
      <div className='flex space-x-6'>
        <button className='hover:bg-blue-400 rounded-md p-2'>
          <MdPhone size={22} />
        </button>
        <button className='hover:bg-blue-400 rounded-md p-2'>
          <MdVideocam size={22} />
        </button>
        <button className='hover:bg-blue-400 rounded-md p-2' onClick={toggleInfo}>
          <SlOptions size={22} />
        </button>
      </div>
    </header>
  )
}

export default ChatHeader
