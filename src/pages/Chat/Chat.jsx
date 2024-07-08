import { useEffect, useLayoutEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import ChatBody from '../../components/ChatPage/ChatBody/ChatBody'
import ToastMessage from '../../components/ToastMessage/ToastMessage'
import InformationConversation from '../../components/ChatPage/InformationConversation/InformationConversation'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate, useParams } from 'react-router-dom'
import { getMessagesById } from '../../redux/Slice/messageSlice'
import {
  clearToastMessage,
  getFriends,
  getLsConversation,
  setConversation,
  setIdConversation,
} from '@/redux/Slice/userSlice'
import { connectSocket } from '@/redux/Slice/chatSlice'
import LoadingSpinner from './ChatSkeleton/ChatSkeleton'

export default function Chat() {
  const [showInfo, setShowInfo] = useState(false)
  const dispatch = useDispatch()
  const toastMessage = useSelector((state) => state?.user?.toastMessage)
  const getStatusFriendRequest = useSelector((state) => state?.user?.friendRequestNotification).at(
    -1,
  )
  const navigate = useNavigate()
  const idConversation = useParams()
  const conversation = useSelector((state) => state.user.conversation)
  const lsConversation = useSelector((state) => state.user.lsConversation)
  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }
  useEffect(() => {
    dispatch(connectSocket(idConversation))
  }, [dispatch, idConversation])
  useLayoutEffect(() => {
    dispatch(getLsConversation())
    dispatch(getFriends())
  }, [])
  useLayoutEffect(() => {
    dispatch(getMessagesById(idConversation))
    dispatch(setIdConversation(idConversation.idConversation))
  }, [idConversation])

  useEffect(() => {
    if (lsConversation) {
      dispatch(setConversation(idConversation))
    }
  }, [lsConversation, idConversation])

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        dispatch(clearToastMessage()) // Clear the toast message after 2 seconds
      }, 2000)
      return () => clearTimeout(timer) // Cleanup the timer on unmount
    }
  }, [dispatch, toastMessage])

  return (
    <div className='fixed w-full'>
      <div className='Login relative'>
        <main className='flex'>
          {console.log('get last status', getStatusFriendRequest)}
          <Sidebar />
          {conversation ? <ChatBody toggleInfo={toggleInfo} /> : <LoadingSpinner />}
          {showInfo && (
            <div className='w-1/3'>
              <InformationConversation />
            </div>
          )}
        </main>
        {toastMessage && <ToastMessage message={toastMessage} />}
      </div>
    </div>
  )
}
