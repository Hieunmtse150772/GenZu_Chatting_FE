import { IoIosSearch } from 'react-icons/io'
import { FaRegImage } from 'react-icons/fa'
import { SlOptions } from 'react-icons/sl'
import { MdOutlineGTranslate } from 'react-icons/md'
import { PiSelectionBackground } from "react-icons/pi";
// import DropdownInfoItem from './DropdownInfoItem'
import DropdownItem from '@/components/Sidebar/DropdownItem/DropdownItem'
import ViewProfile from '@/components/PopUp/ViewProfile/ViewProfile'
import { useEffect, useState } from 'react'
import { getCookie } from '@/services/Cookies'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import InfomationGroup from './InfomationGroup/InfomationGroup'
import { updateStateSearch } from '@/redux/Slice/messageSlice'

function InformationConversation(props) {
  const personalChat = useSelector((state) => state.user.conversation)
  const [customer, setCustomer] = useState(null)
  const [timeOffline, setTimeOffline] = useState('')
  const [offlineTime, setOfflineTime] = useState(null)
  
  const dispatch = useDispatch()
  const cookie = getCookie('userLogin')
  const [token, SetToken] = useState('')

  const togglePopupViewProfile = () => {
    props.togglePopupViewProfile()
  }

  const handleSearchBtn = (e) => {
    dispatch(updateStateSearch(true))
  }
  useEffect(() => {
    if (personalChat) {
      setCustomer(
        personalChat.users[0]?._id == JSON.parse(getCookie('userLogin')).user._id
          ? personalChat?.users[1]
          : personalChat?.users[0],
      )
      setOfflineTime(
        personalChat.users[0]?._id == JSON.parse(getCookie('userLogin')).user._id
          ? personalChat.users[1]?.offline_at
          : personalChat.users[0]?.offline_at,
      )
    }
  }, [personalChat])

  useEffect(() => {
    const calculateOfflineTime = () => {
      const offlineDate = new Date(offlineTime)
      const now = new Date()
      const diffInMilliseconds = now - offlineDate

      const minutes = Math.floor(diffInMilliseconds / (1000 * 60))
      const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60))
      const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24))

      if (minutes < 60) {
        setTimeOffline(`${minutes} minutes`)
      } else if (hours < 24) {
        const remainingMinutes = minutes % 60
        setTimeOffline(`${hours} hour ${remainingMinutes} minutes`)
      } else {
        // const remainingHours = hours % 24
        // const remainingMinutes = minutes % 60
        setTimeOffline(`${days} days`)
        // setTimeOffline(`${days} ngày ${remainingHours} giờ ${remainingMinutes} phút`)
      }
    }

    // Tính toán khi component mount
    calculateOfflineTime()

    // Tính toán lại mỗi phút
    const intervalId = setInterval(calculateOfflineTime, 60000)

    // Clear interval khi component unmount
    return () => clearInterval(intervalId)
  }, [offlineTime])

  return (
    <>
      <div className='dark:bg mx-auto h-screen max-w-2xl bg-mainBlue dark:bg-[#333333] dark:opacity-95'>
        {personalChat?.isGroupChat ? (
          <InfomationGroup conversation={personalChat} />
        ) : (
          <div className='flex flex-col items-center pb-10'>
            <img
              className='mb-3 h-24 w-24 rounded-full shadow-lg'
              src={customer?.picture}
              alt={customer?.fullName}
            />
            <h3 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
              {' '}
              {customer?.fullName}{' '}
            </h3>
            { customer?.is_online ? (<span className='text-sm text-green-500 dark:text-green-400'> Online Now</span>)
                                  : (<span className='text-sm text-gray-500 dark:text-slate-500'>Active {timeOffline} ago</span>)
            }
            <a
              className='my-4 inline-flex cursor-pointer items-center rounded-lg bg-black px-8 py-4 text-center text-sm font-medium text-white hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
              onClick={togglePopupViewProfile}
            >
              {('view_profile')}
            </a>
            <div>
              <ul className='mx-2 hidden flex-col overflow-x-hidden rounded-lg bg-white px-6 py-2 font-semibold dark:bg-[#1E1E1E] md:flex'>
                <DropdownItem icon={IoIosSearch} label={'Search chat'}
                              dropdownStyle={'p-2'}
                              iconStyle={'h-9 w-9 p-2'} 
                              onClick={handleSearchBtn}/>
                <hr />
                <DropdownItem icon={FaRegImage} label={'List of images'}
                              dropdownStyle={'p-2'}
                              iconStyle={'h-9 w-9 p-2'} 
                              onClick={() =>{}} />
                <hr />
                <DropdownItem icon={MdOutlineGTranslate} label={'Auto translate'}
                              dropdownStyle={'p-2'}
                              iconStyle={'h-9 w-9 p-2'} 
                              onClick={() =>{}} />
                <hr />
                <DropdownItem icon={PiSelectionBackground} label={'Change background'}
                              dropdownStyle={'p-2'}
                              iconStyle={'h-9 w-9 p-2'} 
                              onClick={() =>{}} />
              </ul>
            </div>
          </div>
        )}
      </div>
      {/* {isViewProfileClick && <ViewProfile user={user} onClose={togglePopupViewProfile} />} */}
    </>
  )
}

export default InformationConversation
