import { CiSettings } from 'react-icons/ci'
import { IoIosLogOut, IoIosMenu } from 'react-icons/io'
import { LiaUserPlusSolid, LiaUserFriendsSolid } from 'react-icons/lia'
import SearchInput from '../Sidebar/SearchInput/SearchInput'
import UserList from '../Sidebar/UserList/UserList'
import Switcher from '../Sidebar/Switcher/Switcher'
import { UserButton } from '@clerk/clerk-react'
import { useRef, useState, useEffect } from 'react'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef(null)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      {/* Hamburger menu */}
      {!isOpen && (
        <div className='fixed top-6 z-50 md:hidden'>
          <button
            onClick={toggleSidebar}
            className='-left-2 rounded-full bg-gray-800 p-1 text-white transition-all hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500'
          >
            <IoIosMenu size={24} />
          </button>
        </div>
      )}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:relative md:block md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='no-scrollbar relative h-full w-80 overflow-x-hidden overflow-y-scroll border-slate-500 bg-lightTheme p-4 shadow-2xl dark:bg-darkTheme sm:max-w-[12rem] md:w-[22rem] lg:max-w-[20rem]'>
          <div className='mb-4 flex items-center justify-between'>
            <p className='text-xl font-bold dark:text-white'>App</p>
            <UserButton afterSignOutUrl='/login' />
          </div>
          <div className='flex items-center justify-between'>
            <SearchInput />
            <div className='ml-4 flex cursor-pointer items-center outline-none'>
              <LiaUserPlusSolid className='ml-2 h-6 w-6 cursor-pointer hover:opacity-60 dark:text-white' />
              <LiaUserFriendsSolid className='ml-2 h-6 w-6 cursor-pointer hover:opacity-60 dark:text-white' />
            </div>
          </div>
          <div className='flex-grow'>
            <UserList />
          </div>
          <div className='absolute bottom-4 left-4 flex w-full items-center justify-between pr-8'>
            <Switcher />
            <CiSettings className='h-7 w-7 cursor-pointer text-black outline-none hover:opacity-60 dark:text-white' />
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className='fixed inset-0 z-30 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 md:hidden'
          onClick={handleClickOutside}
        />
      )}
    </>
  )
}

export default Sidebar
