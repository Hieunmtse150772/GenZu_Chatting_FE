import { useState } from 'react'
import UserCard from '../UserCard/UserCard'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserCardSkeleton from '../UserCard/UserCardSkeleton/UserCardSkeleton'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setConversation } from '@/redux/Slice/userSlice'
import SearchFriends from '../SearchFriends/SearchFriends'

const UserList = () => {
  const [activeTab, setActiveTab] = useState('personal')
  const { t } = useTranslation()
  const [activeUserID, setActiveUserID] = useState(null)
  const navigate = useNavigate()
  const groupChats = useSelector((state) => state.user.lsGroupChats)
  const lsChats = useSelector((state) => state.user.lsPersonalChats)
  const lsConversation = useSelector((state) => state.user.lsConversation)
  const lsFriends = useSelector((state) => state.user.lsFriends)
  const dispatch = useDispatch()
  const handleUserClick = (id) => {
    navigate(`/chat/${id}`)
    setActiveUserID(id)
    dispatch(setConversation(id))
  }

  return (
    <section className='h-full w-full'>
      <div className='mt-4 flex'>
        <button
          onClick={() => setActiveTab('personal')}
          className={`flex-1 rounded-bl-xl rounded-tl-xl border p-2 text-center ${
            activeTab === 'personal'
              ? 'border-blue-300 bg-blue-300 text-black shadow-lg dark:text-white'
              : 'border-gray-300 bg-white text-black'
          }`}
        >
          {t('personal_chat')}
        </button>
        <button
          onClick={() => setActiveTab('group')}
          className={`flex-1 rounded-br-xl rounded-tr-xl border p-2 text-center ${
            activeTab === 'group'
              ? 'border-blue-300 bg-blue-300 text-black shadow-lg dark:text-white'
              : 'border-gray-300 bg-white text-black'
          }`}
        >
          {t('group_chat')}
        </button>
      </div>
      <div className='mt-4 h-full overflow-y-auto'>
        {lsChats.length == 0 && groupChats.length == 0 ? (
          lsConversation != null ? (
            lsFriends.length > 0 ? (
              lsFriends?.map((item, index) => {
                return <SearchFriends key={index} user={item} />
              })
            ) : (
              <h1>Khong co ban be</h1>
            )
          ) : (
            <UserCardSkeleton />
          )
        ) : (
          <>
            {activeTab === 'personal' &&
              lsChats.map((item) => (
                <UserCard
                  user={item}
                  key={item._id}
                  isActive={activeUserID === item._id}
                  onUserCardClick={() => handleUserClick(item._id)}
                />
              ))}
            {activeTab === 'group' &&
              groupChats.map((item) => (
                <UserCard
                  user={item}
                  key={item._id}
                  isActive={activeUserID === item._id}
                  onUserCardClick={() => handleUserClick(item._id)}
                />
              ))}
          </>
        )}
      </div>
    </section>
  )
}

export default UserList
