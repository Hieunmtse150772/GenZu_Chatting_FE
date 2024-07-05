import { CgMoreO } from 'react-icons/cg'
import userIcon from '../../../assets/user_icon.jpg'
import { useRef, useState, useEffect } from 'react'
import { MdPhone, MdVideocam, MdBlock, MdOutlineDelete } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import DropdownItem from '../DropdownItem/DropdownItem'
import { getCookie } from '@/services/Cookies'

const UserCard = ({ user, isActive, onUserCardClick }) => {
  const [isOptionBtnClick, setIsOptionBtnClick] = useState(false)
  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)

  const handleMoreClick = (e) => {
    e.preventDefault()
    setIsOptionBtnClick(!isOptionBtnClick)
  }

  const handleClickOutside = (e) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target)
    ) {
      setIsOptionBtnClick(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      onClick={onUserCardClick}
      className={`group relative flex cursor-pointer items-center space-x-4 p-2 ${
        isActive ? 'bg-[#74CDFF]' : 'hover:bg-[#74CDFF]'
      } mb-1 rounded-lg`}
    >
      <img
        src={
          !user.isGroupChat
            ? user.users[0]?._id == JSON.parse(getCookie('userLogin')).user._id
              ? user.users[1]?.picture
              : user.users[0]?.picture
            : user.avatar != null
              ? user.avatar
              : `https://i.pinimg.com/736x/e8/13/74/e8137457cebc9f60266ffab0ca4e83a6.jpg`
        }
        alt='user avatar'
        className='h-12 w-12 rounded-full object-cover'
      />

      <div className='flex w-full flex-col gap-2 truncate dark:text-white'>
        <h3 className='truncate text-sm font-semibold'>
          {!user.isGroupChat
            ? user.users[0]._id == JSON.parse(getCookie('userLogin')).user._id
              ? user.users[1]?.fullName
              : user.users[0]?.fullName
            : user.chatName}
        </h3>
        <p className='truncate text-sm text-gray-500 dark:text-slate-500'>
          {user?.latestMessage?.message}
        </p>
      </div>
      <div
        className={`absolute right-2 top-1/2 -translate-y-1/2 transform transition-opacity ${
          isOptionBtnClick ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
        ref={buttonRef}
        onClick={handleMoreClick}
      >
        <CgMoreO className='h-5 w-5 text-gray-500 hover:text-gray-800 dark:text-white' />
      </div>
      {isOptionBtnClick && (
        <div
          className='absolute right-0 top-0 z-10 mt-12 w-52 rounded-lg border bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
          ref={dropdownRef}
        >
          {/* <div className="absolute left-48 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" /> */}
          <ul>
            <DropdownItem
              icon={CgProfile}
              label={'Xem trang cá nhân'}
              onClick={() => {}}
              dropdownStyle={'mt-[7px] p-2'}
              iconStyle={'h-9 w-9 p-2'}
            />
            <hr />
            <DropdownItem
              icon={MdPhone}
              label={'Gọi thoại'}
              dropdownStyle={'p-2'}
              iconStyle={'h-9 w-9 p-2'}
              onClick={() => {}}
            />
            <DropdownItem
              icon={MdVideocam}
              label={'Chat video'}
              dropdownStyle={'p-2'}
              iconStyle={'h-9 w-9 p-2'}
              onClick={() => {}}
            />
            <hr />
            <DropdownItem
              icon={MdBlock}
              label={'Chặn'}
              dropdownStyle={'p-2'}
              iconStyle={'h-9 w-9 p-2'}
              onClick={() => {}}
            />
            <DropdownItem
              icon={MdOutlineDelete}
              label={'Delete chat'}
              dropdownStyle={'p-2'}
              iconStyle={'h-9 w-9 p-2'}
              onClick={() => {}}
            />
          </ul>
        </div>
      )}
    </div>
  )
}

export default UserCard
