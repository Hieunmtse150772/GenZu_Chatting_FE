import React, { useEffect, useLayoutEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import ChatBody from '../../components/ChatPage/ChatBody/ChatBody'
import InformationConversation from '../../components/ChatPage/InformationConversation/InformationConversation'
import { useDispatch, useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'
import { getMessagesById } from '../../redux/Slice/messageSlice'
import { getLsConversation, setConversation, setIdConversation } from '@/redux/Slice/userSlice'
import { connectSocket } from '@/redux/Slice/chatSlice'

export default function Chat() {
  const [showInfo, setShowInfo] = useState(false)
  const dispatch = useDispatch()
  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }
  const idConversation = useParams()
  useEffect(() => {
    dispatch(connectSocket(idConversation))
  }, [dispatch, idConversation])
  const conversation = useSelector((state) => state.user.conversation)
  const lsConversation = useSelector((state) => state.user.lsConversation)
  useLayoutEffect(() => {
    dispatch(getLsConversation())
  }, [])
  useLayoutEffect(() => {
    dispatch(getMessagesById(idConversation))
    dispatch(setIdConversation(idConversation.idConversation))
  }, [idConversation])
  useLayoutEffect(() => {
    if (lsConversation) {
      dispatch(setConversation(idConversation))
    }
  }, [lsConversation])
  return (
    <div className='fixed w-full'>
      <div className='Login'>
        <main className='flex'>
          <Sidebar />
          {conversation && <ChatBody toggleInfo={toggleInfo} />}
          {showInfo && (
            <div className='w-1/3'>
              <InformationConversation />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
