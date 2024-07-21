import { IoIosSearch } from 'react-icons/io'
import { FaRegImage } from 'react-icons/fa'
import { MdOutlineGTranslate } from 'react-icons/md'
import { PiSelectionBackground } from 'react-icons/pi'
// import DropdownInfoItem from './DropdownInfoItem'
import DropdownItem from '@/components/Sidebar/DropdownItem/DropdownItem'
import { useEffect, useState } from 'react'
import { getCookie } from '@/services/Cookies'
import { useDispatch, useSelector } from 'react-redux'
import InfomationGroup from './InfomationGroup/InfomationGroup'
import { updateStateSearch } from '@/redux/Slice/messageSlice'
import ChangeBackground from '@/components/PopUp/ChangeBackground/ChangeBackground'
import { fetchLsImage, fetchLsVideo } from '@/services/messageService'
import { useParams } from 'react-router-dom'

function InformationConversation(props) {
  const personalChat = useSelector((state) => state.user.conversation)
  const [customer, setCustomer] = useState(null)
  const [timeOffline, setTimeOffline] = useState('')
  const [offlineTime, setOfflineTime] = useState(null)
  const [isOpenChangeBackground, setIsOpenChangeBackground] = useState(false)

  const [showImage, setShowImage] = useState(false)
  const [lsImage, setLsImage] = useState()
  const [showVideo, setShowVideo] = useState(false)
  const [lsVideo, setLsVideo] = useState()
  const dispatch = useDispatch()

  const togglePopupViewProfile = () => {
    props.togglePopupViewProfile()
  }

  const togglePopupChangeBackground = (e) => {
    setIsOpenChangeBackground(!isOpenChangeBackground)
  }
  const idConversation = useParams()
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
  const hanldeGetLsImage = async () => {
    console.log('check')
    console.log(showImage)
    if (showImage == false) {
      GetLsImage()
    }
    setShowImage(!showImage)
  }
  const GetLsImage = async () => {
    const response = await fetchLsImage(idConversation.idConversation)
    setLsImage(response)
  }
  const hanldeGetLsVideo = async () => {
    console.log('check')
    console.log(showVideo)
    if (showVideo == false) {
      GetLsVideo()
    }
    setShowVideo(!showVideo)
  }
  const GetLsVideo = async () => {
    const response = await fetchLsVideo(idConversation.idConversation)
    setLsVideo(response)
  }
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
            {customer?.is_online ? (
              <span className='text-sm text-green-500 dark:text-green-400'> Online Now</span>
            ) : (
              <span className='text-sm text-gray-500 dark:text-slate-500'>
                Active {timeOffline} ago
              </span>
            )}
            <a
              className='my-4 inline-flex cursor-pointer items-center rounded-lg bg-black px-8 py-4 text-center text-sm font-medium text-white hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
              onClick={togglePopupViewProfile}
            >
              {'view_profile'}
            </a>
            <div className='w-11/12'>
              <ul className='mx-2 hidden flex-col overflow-x-hidden rounded-lg bg-white px-6 py-2 font-semibold dark:bg-[#1E1E1E] md:flex'>
                <DropdownItem
                  icon={IoIosSearch}
                  label={'Search chat'}
                  dropdownStyle={'p-2 text-black dark:text-white dark:hover:bg-gray-600'}
                  iconStyle={'h-9 w-9 p-2 dark:bg-slate-600'}
                  onClick={handleSearchBtn}
                />
                <hr />
                <DropdownItem
                  icon={FaRegImage}
                  label={'List of images'}
                  dropdownStyle={'p-2 text-black dark:text-white dark:hover:bg-gray-600'}
                  iconStyle={'h-9 w-9 p-2 dark:bg-slate-600'}
                  onClick={hanldeGetLsImage}
                />
                {showImage ? (
                  <div className='flex max-h-[calc(3*100px)] flex-wrap gap-[3%] overflow-y-auto'>
                    {lsImage?.map((image, index) => (
                      <div key={index} className='my-2 h-[5.5rem] w-[5.5rem]'>
                        <img
                          src={image.message}
                          className='h-full w-full object-cover'
                          alt='Image not Found '
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
                <hr />
                <DropdownItem
                  icon={FaRegImage}
                  label={'List of Video'}
                  dropdownStyle={'p-2 text-black dark:text-white dark:hover:bg-gray-600'}
                  iconStyle={'h-9 w-9 p-2 dark:bg-slate-600'}
                  onClick={hanldeGetLsVideo}
                />
                {showVideo ? (
                  lsVideo ? (
                    <div className='flex max-h-[calc(3*100px)] flex-wrap gap-[2.45%] overflow-y-auto'>
                      {lsVideo?.map((video, index) => (
                        <div key={index} className='my-2 h-28 w-28'>
                          <video
                            src={video.message}
                            className='h-full w-full object-cover'
                            controls
                            alt='Video not Found '
                          />
                        </div>
                      ))}
                    </div>
                  ) : lsVideo?.length == 0 ? (
                    <></>
                  ) : (
                    <h1>Is loading</h1>
                  )
                ) : (
                  <></>
                )}
                <hr />

                <DropdownItem
                  icon={MdOutlineGTranslate}
                  label={'Auto translate'}
                  dropdownStyle={'p-2 text-black dark:text-white dark:hover:bg-gray-600'}
                  iconStyle={'h-9 w-9 p-2 dark:bg-slate-600'}
                  onClick={() => {}}
                />
                <hr />
                <DropdownItem
                  icon={PiSelectionBackground}
                  label={'Change background'}
                  dropdownStyle={'p-2 text-black dark:text-white dark:hover:bg-gray-600'}
                  iconStyle={'h-9 w-9 p-2 dark:bg-slate-600'}
                  onClick={togglePopupChangeBackground}
                />
              </ul>
            </div>
          </div>
        )}
      </div>
      {isOpenChangeBackground && <ChangeBackground onClose={togglePopupChangeBackground} />}
    </>
  )
}

export default InformationConversation
