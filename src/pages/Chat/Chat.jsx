import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import ChatBody from '../../components/ChatPage/ChatBody/ChatBody'
import InformationConversation from '../../components/ChatPage/InformationConversation/InformationConversation'
import { useDispatch } from 'react-redux'
import { getMessagesById } from '../../redux/Slice/messageSlice'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import { getCookie } from '../../services/Cookies'
var socket
export default function Chat() {
  const [showInfo, setShowInfo] = useState(false)
  const dispatch = useDispatch()
  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }
  const idConversation = useParams()
  useEffect(() => {
    dispatch(getMessagesById(idConversation))
  })
  useEffect(() => {
    socket = io(import.meta.env.VITE_ENDPOINT)
    socket.emit('setup', JSON.parse(getCookie('userLogin')))
    // socket.on('connected', () => setSocketConnected(true))
    // socket.on('typing', () => setIsTyping(true))
    // socket.on('stop_typing', () => setIsTyping(false))

    // eslint-disable-next-line
  }, [])
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
