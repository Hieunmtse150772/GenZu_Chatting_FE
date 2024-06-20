import { MdOutlineKeyboardVoice } from 'react-icons/md'
import { PiSmileyStickerLight } from 'react-icons/pi'
import { IoSendOutline } from 'react-icons/io5'

function ChatFooter() {
  return (
    <div className='bg-white p-4 flex items-center rounded-lg'>
      <input
        type='text'
        placeholder='Type your message...'
        className='flex-1 border rounded-full px-4 py-2 focus:outline-none'
      />
      <ul className='hidden md:flex md:items-center overflow-x-hidden mr-4 font-semibold'>
        <li className='mr-6 p-1'>
          <button id='setting' className='hover:bg-blue-400 rounded-md p-1'>
            <MdOutlineKeyboardVoice size={24} />
          </button>
        </li>
        <div className='flex justify-between ml-6'>
          <li className='mr-4 '>
            <button id='setting' className='hover:bg-blue-400 rounded-md p-1'>
              <PiSmileyStickerLight size={24} />
            </button>
          </li>
          <li className='ml-auto'>
            <button className='bg-blue-500 text-white flex items-center rounded-full p-2 hover:bg-blue-600 focus:outline-none'>
              <IoSendOutline size={16} />
            </button>
          </li>
        </div>
      </ul>
    </div>
  )
}

export default ChatFooter
