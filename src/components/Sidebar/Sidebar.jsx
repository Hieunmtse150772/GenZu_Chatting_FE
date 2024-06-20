import { CiSettings } from 'react-icons/ci'
import { IoIosLogOut } from 'react-icons/io'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { LiaUserFriendsSolid } from 'react-icons/lia'
import SearchInput from '../Sidebar/SearchInput/SearchInput'
import UserList from '../Sidebar/UserList/UserList'
import Switcher from '../Sidebar/Switcher/Switcher'

const Sidebar = () => {
  return (
    <div className='no-scrollbar relative hidden h-screen w-80 overflow-x-hidden overflow-y-scroll border-slate-500 bg-lightTheme p-4 shadow-lg dark:bg-darkTheme sm:max-w-[12rem] md:block md:w-80 lg:max-w-[20rem]'>
      <div className='mb-4 flex items-center justify-between'>
        <p className='text-xl font-bold dark:text-white'>App</p>
        <IoIosLogOut className='h-8 w-8 cursor-pointer text-black dark:text-white' />
      </div>
      <div className='flex items-center justify-between'>
        <SearchInput />
        <div className='ml-4 flex cursor-pointer items-center outline-none'>
          <AiOutlineUsergroupAdd className='ml-2 h-6 w-6 dark:text-white' />
          <LiaUserFriendsSolid className='ml-2 h-6 w-6 dark:text-white' />
        </div>
      </div>
      <div className='flex-grow'>
        <UserList />
      </div>
      <div className='absolute bottom-4 left-4 flex w-full items-center justify-between pr-8'>
        <Switcher />
        <CiSettings className='h-6 w-6 cursor-pointer text-black outline-none dark:text-white' />
      </div>
    </div>
  )
}

export default Sidebar
