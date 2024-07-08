import React from 'react'
import { IoIosSearch } from 'react-icons/io'
import { IoImageOutline } from 'react-icons/io5'
import { SlOptions } from 'react-icons/sl'
import { LiaUserFriendsSolid } from 'react-icons/lia'
import { MdDeleteOutline } from 'react-icons/md'
import { IoLogInOutline } from 'react-icons/io5'
import { MdOutlineAddLink } from 'react-icons/md'
import ViewProfile from '@/components/PopUp/ViewProfile/ViewProfile'
import DropdownInfoItem from '../DropdownInfoItem'

const InfomationGroup = ({ conversation }) => {
  return (
    <div className='flex flex-col items-center pb-10'>
      <h3 className='my-2 text-xl font-medium text-gray-900 dark:text-white'>Thông tin nhóm</h3>
      <img
        className='mb-3 h-24 w-24 rounded-full shadow-lg'
        src={conversation?.avatar}
        alt={conversation?.chatName}
      />
      <h3 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
        {conversation?.chatName}
      </h3>
      {/* <a
            className='my-4 inline-flex items-center rounded-lg bg-black px-8 py-4 text-center text-sm font-medium text-white hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
            onClick={onGroupClick}
          >
            View profile
          </a> */}

      <div>
        <ul className='mb-2 cursor-pointer flex-col gap-2 overflow-x-hidden rounded-lg bg-white px-4 py-2 shadow-lg dark:bg-[#1E1E1E]'>
          <DropdownInfoItem icon={LiaUserFriendsSolid} label={'5 thành viên'} />
          <DropdownInfoItem icon={MdOutlineAddLink} label={'Link tham gia nhóm'} />
        </ul>
      </div>
      <div>
        <ul className='mx-2 hidden flex-col overflow-x-hidden rounded-lg bg-white px-6 py-2 font-semibold shadow-lg dark:bg-[#1E1E1E] md:flex'>
          <DropdownInfoItem icon={IoIosSearch} label={'Search chat'} />
          <DropdownInfoItem icon={IoImageOutline} label={'List of images'} />
          <DropdownInfoItem icon={MdDeleteOutline} label={"Delete chat's history"} />
          <DropdownInfoItem icon={IoLogInOutline} label={'Leave group'} />
        </ul>
      </div>
    </div>
  )
}

export default InfomationGroup
