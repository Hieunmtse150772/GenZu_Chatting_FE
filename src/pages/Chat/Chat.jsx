import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
  setToastMessage,
} from '@/redux/Slice/userSlice'
import { connectSocket } from '@/redux/Slice/chatSlice'
import { getCookie } from '@/services/Cookies'
import LoadingSpinner from './ChatSkeleton/ChatSkeleton'

export default function Chat() {
  const [showInfo, setShowInfo] = useState(false)
  const dispatch = useDispatch()
  const toastMessage = useSelector((state) => state?.user?.toastMessage)
  const friendRequestNotification =
    useSelector((state) => state?.user?.friendRequestNotification) || []
  const getStatusFriendRequest = friendRequestNotification.length
    ? friendRequestNotification.at(-1)
    : null
  const session = Object.values(JSON.parse(getCookie('userLogin')))
  // Lấy id của session user
  const sessionId = Object.keys(session).map((key) => {
    return session[key]._id
  })[2]
  const navigate = useNavigate()
  const idConversation = useParams()
  const conversation = useSelector((state) => state.user.conversation)
  const lsConversation = useSelector((state) => state.user.lsConversation)
  const toastRef = useRef(null)

  useEffect(() => {
    if (getStatusFriendRequest?.sender?._id === sessionId) {
      if (getStatusFriendRequest?.status === 'accepted' && toastRef.current !== 'accepted') {
        dispatch(setToastMessage('Your friend request was accepted'))
        toastRef.current = 'accepted'
      } else if (getStatusFriendRequest?.status === 'declined' && toastRef.current !== 'declined') {
        dispatch(setToastMessage('Your friend request was declined'))
        toastRef.current = 'declined'
      }
    }
  }, [getStatusFriendRequest, dispatch, sessionId])

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
        toastRef.current = null // Reset the toastRef after clearing the message
      }, 2000)
      return () => clearTimeout(timer) // Cleanup the timer on unmount
    }
  }, [dispatch, toastMessage])

  return (
    <div className='fixed w-full'>
      <div className='Login relative'>
        <main className='flex'>
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
