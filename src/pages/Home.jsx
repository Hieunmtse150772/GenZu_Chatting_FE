import ChatBody from '../components/ChatPage/ChatBody/ChatBody'
import Sidebar from '../components/Sidebar/Sidebar'
import { useUser, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import './Home.css'
import { useEffect, useLayoutEffect, useState } from 'react'
import InformationConversation from '../components/ChatPage/InformationConversation/InformationConversation'
import { checkCookie } from '../services/Cookies'
import Login from './Login/Login'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [showInfo, setShowInfo] = useState(false)
  const [isLogin, SetIsLogin] = useState(false)
  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }
  const navigate = useNavigate()
  useEffect(() => {
    checkCookie() ? navigate('/') : navigate('/login')
  }, [navigate])
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
