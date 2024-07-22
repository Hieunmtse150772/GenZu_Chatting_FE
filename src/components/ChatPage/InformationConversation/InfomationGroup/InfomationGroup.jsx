import React, { useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { IoImageOutline } from 'react-icons/io5'
import { SlOptions } from 'react-icons/sl'
import { LiaUserFriendsSolid } from 'react-icons/lia'
import { MdDeleteOutline } from 'react-icons/md'
import { IoLogInOutline } from 'react-icons/io5'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { FaRegEdit } from 'react-icons/fa'
import { MdOutlineAddLink } from 'react-icons/md'
import ViewProfile from '@/components/PopUp/ViewProfile/ViewProfile'
import DropdownItem from '@/components/Sidebar/DropdownItem/DropdownItem'
import { deleteGroupChat } from '@/redux/Slice/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AddNewMember from './AddNewMember/AddNewMember'
import ViewMember from './ViewMember/ViewMember'
import UpdateGroup from './UpdateGroup/UpdateGroup'

const InfomationGroup = ({ conversation }) => {
  const dispatch = useDispatch()
  // State to manage the visibility of the AddNewMember popup
  const [isAddMemberVisible, setIsAddMemberVisible] = useState(false)
  const [isViewMemberVisible, setIsViewMemberVisible] = useState(false)
  const [isUpdateGroupVisible, setIsUpdateGroupVisible] = useState(false)
  const { idConversation } = useParams()
  const listGroupChats = useSelector((state) => state.user?.lsGroupChats)
  const groupAdminId =
    listGroupChats.find((group) => group._id === idConversation)?.groupAdmin?._id || []
  const totalMembers = listGroupChats.find((group) => group._id === idConversation).users || []
  const countMembers = listGroupChats.find((group) => group._id === idConversation).users.length

  const handleDeleteGroup = (idGroup) => {
    dispatch(deleteGroupChat({ id: idGroup }))
  }

  const handleAddNewMemberClick = () => {
    setIsAddMemberVisible(true) // Show the AddNewMember popup
  }

  const handleViewMemberClick = () => {
    setIsViewMemberVisible(true)
  }

  const handleOpenUpdateGroup = () => {
    setIsUpdateGroupVisible(true)
  }

  const handleViewMemberClose = () => {
    setIsViewMemberVisible(false)
  }

  const handleAddMemberClose = () => {
    setIsAddMemberVisible(false) // Hide the AddNewMember popup
  }

  const handleUpdateGroupClose = () => {
    setIsUpdateGroupVisible(false) // Hide the Update group popup
  }

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

      <div>
        <ul className='mb-2 cursor-pointer flex-col gap-2 overflow-x-hidden rounded-lg bg-white px-4 py-2 shadow-lg dark:bg-[#1E1E1E]'>
          <DropdownItem
            icon={LiaUserFriendsSolid}
            label={`${countMembers} thành viên`}
            dropdownStyle={'p-2'}
            iconStyle={'h-9 w-9 p-2'}
            onClick={handleViewMemberClick}
          />
          <DropdownItem
            icon={MdOutlineAddLink}
            label={'Link tham gia nhóm'}
            dropdownStyle={'p-2'}
            iconStyle={'h-9 w-9 p-2'}
            onClick={() => {}}
          />
        </ul>
      </div>
      <div>
        <ul className='mx-2 hidden flex-col overflow-x-hidden rounded-lg bg-white px-6 py-2 font-semibold shadow-lg dark:bg-[#1E1E1E] md:flex'>
          <DropdownItem
            icon={IoIosSearch}
            label={'Search chat'}
            dropdownStyle={'p-2'}
            iconStyle={'h-9 w-9 p-2'}
            onClick={() => {}}
          />
          <DropdownItem
            icon={IoImageOutline}
            label={'List of images'}
            dropdownStyle={'p-2'}
            iconStyle={'h-9 w-9 p-2'}
            onClick={() => {}}
          />
          <DropdownItem
            icon={FaRegEdit}
            label={'Update group'}
            dropdownStyle={'p-2'}
            iconStyle={'h-9 w-9 p-2'}
            onClick={handleOpenUpdateGroup}
          />
          <DropdownItem
            icon={IoIosAddCircleOutline}
            label={'Add new member'}
            dropdownStyle={'p-2'}
            iconStyle={'h-9 w-9 p-2'}
            onClick={handleAddNewMemberClick} // Show the AddNewMember popup
          />
          <DropdownItem
            icon={MdDeleteOutline}
            label={'Delete group'}
            dropdownStyle={'p-2'}
            iconStyle={'h-9 w-9 p-2'}
            onClick={() => handleDeleteGroup(conversation._id)}
          />
          <DropdownItem
            icon={IoLogInOutline}
            label={'Leave group'}
            dropdownStyle={'p-2'}
            iconStyle={'h-9 w-9 p-2'}
            onClick={() => {}}
          />
        </ul>
      </div>

      {/* AddNewMember Popup */}
      {isAddMemberVisible && (
        <AddNewMember isVisible={isAddMemberVisible} onClose={handleAddMemberClose} />
      )}
      {isViewMemberVisible && (
        <ViewMember
          isVisible={isViewMemberVisible}
          members={totalMembers}
          groupAdminId={groupAdminId}
          onClose={handleViewMemberClose}
        />
      )}
      {/* Update group */}
      {isUpdateGroupVisible && (
        <UpdateGroup
          isVisible={isUpdateGroupVisible}
          onClose={handleUpdateGroupClose}
          group={conversation}
        />
      )}
    </div>
  )
}

export default InfomationGroup
