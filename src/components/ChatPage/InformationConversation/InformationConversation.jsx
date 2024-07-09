import { IoIosSearch } from 'react-icons/io'
import { FaRegImage } from 'react-icons/fa'
import { SlOptions } from 'react-icons/sl'
import { MdOutlineGTranslate } from 'react-icons/md'
import DropdownInfoItem from './DropdownInfoItem'
import ViewProfile from '@/components/PopUp/ViewProfile/ViewProfile'
import { useState } from 'react'
import { getCookie } from '@/services/Cookies'
import { useSelector } from 'react-redux'
import InfomationGroup from './InfomationGroup/InfomationGroup'

function InformationConversation() {
  const [isViewProfileClick, setIsViewProfileClick] = useState(false)

  // const [user, setUser] = useState({
  //   name: { value: 'Hoang Ba Thien', isDisable: true },
  //   email: { value: 'thienhoang241299@gmail.com', isDisable: true },
  //   password: { value: '********', isDisable: true },
  //   phoneNumber: { value: '0345678912', isDisable: true },
  //   dob: { value: '24/12/1999', isDisable: true },
  // })
  const cookie = getCookie('userLogin')
  const [token, SetToken] = useState('')

  const togglePopupViewProfile = () => {
    setIsViewProfileClick(!isViewProfileClick)
  }

  const personalChat = useSelector((state) => state.user.conversation)
  const [user, setUser] = useState(
    !personalChat?.isGroupChat
      ? personalChat.users[0]?._id === JSON.parse(getCookie('userLogin'))?.user?._id
        ? personalChat?.users[1]
        : personalChat?.users[0]
      : personalChat?.avatar != null
        ? personalChat?.avatar
        : '',
  )

  return (
    <>
      <div className='dark:bg mx-auto h-screen max-w-2xl dark:bg-[#121212] dark:opacity-95'>
        {personalChat?.isGroupChat ? (
          <InfomationGroup conversation={personalChat} />
        ) : (
          <div className='flex flex-col items-center pb-10'>
            <img
              className='mb-3 h-24 w-24 rounded-full shadow-lg'
              src={user?.picture}
              alt={user?.fullName}
            />
            <h3 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
              {' '}
              {user?.fullName}{' '}
            </h3>
            <span className='text-sm text-gray-500 dark:text-gray-400'>Active 20m ago</span>
            <a
              className='my-4 inline-flex cursor-pointer items-center rounded-lg bg-black px-8 py-4 text-center text-sm font-medium text-white hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
              onClick={togglePopupViewProfile}
            >
              View profile
            </a>
            <div>
              <ul className='mx-2 hidden flex-col overflow-x-hidden rounded-lg bg-white px-6 py-2 font-semibold dark:bg-[#1E1E1E] md:flex'>
                <DropdownInfoItem icon={IoIosSearch} label={'Search chat'} />
                <DropdownInfoItem icon={FaRegImage} label={'List of images'} />
                <DropdownInfoItem icon={MdOutlineGTranslate} label={'Auto translate'} />
                <DropdownInfoItem icon={SlOptions} label={'More Option'} />
              </ul>
            </div>
          </div>
        )}
      </div>
      {isViewProfileClick && <ViewProfile user={user} onClose={togglePopupViewProfile} />}
    </>
  )
}

export default InformationConversation
