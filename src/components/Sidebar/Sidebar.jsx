import { CiSettings } from 'react-icons/ci'
import { IoIosLogOut } from 'react-icons/io'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { LiaUserFriendsSolid } from 'react-icons/lia'
import SearchInput from '../Sidebar/SearchInput/SearchInput'
import UserList from '../Sidebar/UserList/UserList'
import Switcher from '../Sidebar/Switcher/Switcher'

const Sidebar = () => {
  return (
    <div className='relative border-slate-500 bg-lightTheme p-4 shadow-lg w-80 h-screen  overflow-y-scroll no-scrollbar  sm:max-w-[12rem] md:w-96  lg:max-w-[20rem] hidden md:block dark:bg-darkTheme'>
      <div className='flex items-center justify-between mb-4'>
        <p className='text-xl font-bold dark:text-white'>App</p>
        <IoIosLogOut className='w-8 h-8 text-black  cursor-pointer dark:text-white' />
      </div>
      <div className='flex justify-between items-center'>
        <SearchInput />
        <div className='flex  items-center ml-4 cursor-pointer outline-none'>
          <AiOutlineUsergroupAdd className='w-6 h-6 ml-2 dark:text-white' />
          <LiaUserFriendsSolid className='w-6 h-6 ml-2 dark:text-white' />
        </div>
      </div>
      <div className='flex-grow'>
        <UserList />
      </div>
      <div className='absolute bottom-4 left-4 w-full flex items-center justify-between pr-8'>
        <Switcher />
        <CiSettings className='w-6 h-6 text-black outline-none  cursor-pointer dark:text-white' />
      </div>
    </div>
  )
}

export default Sidebar
