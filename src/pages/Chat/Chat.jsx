import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import ChatBody from '../../components/ChatPage/ChatBody/ChatBody'
import InformationConversation from '../../components/ChatPage/InformationConversation/InformationConversation'

export default function Chat() {
  const [showInfo, setShowInfo] = useState(false)
  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }
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
