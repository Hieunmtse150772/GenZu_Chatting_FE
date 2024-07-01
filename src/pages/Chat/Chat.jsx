import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import ChatBody from '../../components/ChatPage/ChatBody/ChatBody'
import InformationConversation from '../../components/ChatPage/InformationConversation/InformationConversation'
import { useDispatch } from 'react-redux'

import { useParams } from 'react-router-dom'
import { getMessagesById } from '../../redux/Slice/messageSlice'

export default function Chat() {
  const [showInfo, setShowInfo] = useState(false)
  const dispatch = useDispatch()
  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }
  const idConversation = useParams()
  useEffect(() => {
    console.log(idConversation)
    dispatch(getMessagesById(idConversation))
  })

  return (
    <div className='fixed w-full'>
      <div className='Login'>
        <main className='flex'>
          <Sidebar />
          <ChatBody toggleInfo={toggleInfo} />
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
