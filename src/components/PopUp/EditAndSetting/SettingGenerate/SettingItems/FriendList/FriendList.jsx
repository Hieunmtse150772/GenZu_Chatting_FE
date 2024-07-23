import { IoMdArrowBack } from 'react-icons/io'
import FriendInfo from './FriendInfo/FriendInfo'
import UserCardSkeleton from '@/components/Sidebar/UserCard/UserCardSkeleton/UserCardSkeleton'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { removeFriend } from '@/redux/Slice/userSlice' // Assuming you have this action

const FriendList = ({ onBack }) => {
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  // Fetch friends from Redux store
  const friendLists = useSelector((state) => state.user.lsFriend)

  useEffect(() => {
    // Set loading to false once friends are loaded
    if (friendLists.length > 0) {
      setLoading(false)
    }
  }, [friendLists])

  const handleUnfriend = (friendshipId) => {
    dispatch(removeFriend(friendshipId))
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleDateString()
  }

  return (
    <div className='z-10 flex w-full translate-x-0 transform flex-col transition-transform'>
      <div className='flex w-auto cursor-pointer items-center justify-start border-b-2 border-gray-200 bg-white p-2'>
        <button onClick={onBack} className='mr-4'>
          <IoMdArrowBack size={22} />
        </button>
        <h3 className='text-xl font-semibold'>{t('friend_lists')}</h3>
      </div>

      {loading ? (
        <UserCardSkeleton />
      ) : (
        <div>
          {friendLists.map((item, index) => (
            <FriendInfo
              friendInfo={item?.info}
              createdAt={formatDate(item?.createdAt)}
              friendShipId={item?.friendShip}
              key={index}
              onUnfriend={handleUnfriend}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default FriendList
