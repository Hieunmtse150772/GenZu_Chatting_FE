import { IoIosSearch } from 'react-icons/io'
import { FaRegImage } from 'react-icons/fa'
import { SlOptions } from 'react-icons/sl'
import { MdOutlineGTranslate } from 'react-icons/md'
import DropdownInfoItem from './DropdownInfoItem'

function InformationConversation() {
  return (
    <div className='max-w-2xl mx-auto bg-mainBlue h-screen'>
      <div className='flex flex-col items-center pb-10'>
        <img
          className='mb-3 w-24 h-24 rounded-full shadow-lg'
          src='https://flowbite.com/docs/images/people/profile-picture-3.jpg'
          alt='Bonnie image'
        />
        <h3 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>Bonnie Green</h3>
        <span className='text-sm text-gray-500 dark:text-gray-400'>Active 20m ago</span>
        <a
          href='#'
          className='inline-flex items-center my-4 py-4 px-8 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
        >
          View profile
        </a>
        <div>
          <ul className=' flex-col hidden md:flex overflow-x-hidden mx-2 px-6 py-2 rounded-lg font-semibold bg-white'>
            <DropdownInfoItem icon={IoIosSearch} label={'Search chat'} />
            <DropdownInfoItem icon={FaRegImage} label={'List of images'} />
            <DropdownInfoItem icon={MdOutlineGTranslate} label={'Auto translate'} />
            <DropdownInfoItem icon={SlOptions} label={'More Option'} />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default InformationConversation
