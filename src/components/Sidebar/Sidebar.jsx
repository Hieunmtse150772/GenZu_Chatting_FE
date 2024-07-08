import { CiSettings } from 'react-icons/ci'
import { IoIosLogOut, IoIosMenu } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosNotificationsOutline } from 'react-icons/io'
import userIcon from '@/assets/user_icon.jpg'
import { LiaUserPlusSolid, LiaUserFriendsSolid } from 'react-icons/lia'
import SearchInput from '../Sidebar/SearchInput/SearchInput'
import UserList from '../Sidebar/UserList/UserList'
import Switcher from '../Sidebar/Switcher/Switcher'
import { useRef, useState, useEffect, useCallback } from 'react'
import { PiSignOutBold } from 'react-icons/pi'
import { removeCookie } from '../../services/Cookies'
import { useNavigate } from 'react-router-dom'
import EditAndSetting from '../PopUp/EditAndSetting/EditAndSetting'
import PopUpFindFriends from '../PopUp/PopUpFindFriends/PopUpFindFriends'
import PopUpAddMenber from '../PopUp/PopUpAddMember/PopUpAddMember'
import userService from '../../services/userService'
import UserInfoFriendRequest from './UserInfoFriendRequest/UserInfoFriendRequest'
import { clearUserSlice } from '@/redux/Slice/userSlice'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef(null)
  const [searchResults, setSearchResults] = useState([])
  const navigate = useNavigate()
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const [isPopupVisibleFindFriends, setIsPopupVisibleFindFriends] = useState(false)
  const [isPopupVisibleAddMember, setIsPopupVisibleAddMember] = useState(false)
  const [friendRequests, setFriendRequests] = useState([])
  const [dropdownNotifyVisible, setDropdownNotifyVisible] = useState(false)
  // Friend request notification
  const friendRequestNotfication = useSelector((state) => state?.user.friendRequestNotification)
  const friendRequestArray = Object.entries(friendRequestNotfication)
  const dispatch = useDispatch()
  let pendingRequestsCount = useRef(
    friendRequestArray.filter((item) => item[0] === 'status' && item[1] === 'pending').length || 0,
  )
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible)
  }
  const togglePopupFindFriend = () => {
    setIsPopupVisibleFindFriends(!isPopupVisibleFindFriends)
  }
  const togglePopupAddMember = () => {
    setIsPopupVisibleAddMember(!isPopupVisibleAddMember)
  }
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  const handleNotificationClick = () => {
    setDropdownNotifyVisible(!dropdownNotifyVisible)
  }

  const handleRequestHandled = useCallback((requestId) => {
    setFriendRequests((prevRequests) => {
      const updatedRequests = prevRequests.filter((request) => request.id !== requestId)
      return updatedRequests
    })
    pendingRequestsCount.current -= 1
  }, [])

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await userService.getAddFriendRequestNotification()
        if (response) {
          const newFriendsRequest = response.data.filter((request) => request.status === 'pending')
          pendingRequestsCount.current = newFriendsRequest.length
          console.log(pendingRequestsCount)
          setFriendRequests(newFriendsRequest)
        }
      } catch (error) {
        console.error('Failed to fetch friend requests', error)
      }
    }
    fetchFriendRequests()
  }, [friendRequestNotfication])

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
        className={`fixed inset-y-0 left-0 z-40 h-screen transform transition-transform duration-300 ease-in-out md:relative md:block md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='no-scrollbar relative h-full w-80 overflow-x-hidden overflow-y-scroll border-slate-500 bg-lightTheme p-4 shadow-2xl dark:bg-darkTheme sm:max-w-[12rem] md:w-[22rem] lg:max-w-[20rem]'>
          <div className='mb-4 flex items-center justify-between'>
            <p className='text-xl font-bold dark:text-white'>App</p>
            <div className='flex justify-between'>
              <div onClick={handleNotificationClick} className='relative'>
                <IoIosNotificationsOutline className='h-7 w-7 cursor-pointer text-black outline-none hover:opacity-60 dark:text-white' />
                {pendingRequestsCount.current > 0 && (
                  <span className='absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-white'>
                    {pendingRequestsCount.current}
                  </span>
                )}
                {dropdownNotifyVisible && (
                  <div className='absolute right-0 z-10 mt-2 w-64 transition-all ease-in'>
                    {/* Tooltip arrow */}
                    <div className='absolute right-2 top-0.5 h-2 w-2 -translate-y-full transform border-b-8 border-l-8 border-r-8 border-b-white border-l-transparent border-r-transparent dark:border-b-gray-800'></div>
                    <div className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800'>
                      {friendRequests.length > 0 ? (
                        <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
                          {friendRequests
                            .filter((request) => request.status === 'pending')
                            .map((request) => (
                              <UserInfoFriendRequest
                                key={request.id}
                                userInfo={request.sender}
                                requestId={request.id}
                                onRequestHandled={() => handleRequestHandled(request.id)}
                              />
                            ))}
                        </ul>
                      ) : (
                        <p className='p-4 text-gray-800 dark:text-gray-200'>No friend requests</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <CiSettings
                onClick={togglePopup}
                className='h-7 w-7 cursor-pointer text-black outline-none hover:opacity-60 dark:text-white'
              />
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <SearchInput setSearchResults={setSearchResults} />
            <div className='ml-4 flex cursor-pointer items-center outline-none'>
              <LiaUserPlusSolid
                onClick={togglePopupFindFriend}
                className='ml-2 h-6 w-6 cursor-pointer hover:opacity-60 dark:text-white'
              />
              <LiaUserFriendsSolid
                onClick={togglePopupAddMember}
                className='ml-2 h-6 w-6 cursor-pointer hover:opacity-60 dark:text-white'
              />
            </div>
          </div>
          <div className='flex-grow'>
            {searchResults.user ? (
              <ul className='mt-2 h-screen overflow-y-auto'>
                {searchResults.user.map((result) => (
                  <li
                    key={result._id}
                    className='group relative cursor-pointer border-b border-gray-300 p-2'
                  >
                    <img
                      src={result?.image || userIcon}
                      alt='user avatar'
                      className='h-12 w-12 rounded-full object-cover'
                    />
                    <div className='flex w-full flex-col gap-2 truncate dark:text-white'>
                      <h3 className='truncate text-sm font-semibold'>{result?.fullName}</h3>
                      <p className='truncate text-sm text-gray-500 dark:text-slate-500'></p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <UserList />
            )}
          </div>
          <div className='absolute bottom-4 left-4 flex w-full items-center justify-between pr-8'>
            <Switcher />
            <PiSignOutBold
              onClick={() => {
                removeCookie('userLogin')
                sessionStorage.removeItem('userLogin')
                dispatch(clearUserSlice())
                navigate('/')
              }}
              className='h-7 w-7 cursor-pointer text-black outline-none hover:opacity-60 dark:text-white'
            />
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
      <EditAndSetting isVisible={isPopupVisible} onClose={togglePopup} />
      <PopUpFindFriends isVisible={isPopupVisibleFindFriends} onClose={togglePopupFindFriend} />
      <PopUpAddMenber isVisible={isPopupVisibleAddMember} onClose={togglePopupAddMember} />
    </>
  )
}

export default Sidebar
