import ChatBody from '../components/ChatPage/ChatBody/ChatBody'
import Sidebar from '../components/Sidebar/Sidebar'
import { useUser, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import './Home.css'
import SignInPage from './Login/SignInPage/SignInPage'
import { useLayoutEffect, useState } from 'react'
import InformationConversation from '../components/ChatPage/InformationConversation/InformationConversation'
import { checkCookie } from '../services/Cookies'
import Login from './Login/Login'

export default function Home() {
  const [showInfo, setShowInfo] = useState(false)
  const [isLogin, SetIsLogin] = useState(false)
  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }
  useLayoutEffect(() => {
    checkCookie() ? SetIsLogin(true) : SetIsLogin(false)
  }, [])
  return (
    <div className='fixed w-full'>
      <div className='Login'>
        {isLogin ? (
          <main className='flex'>
            <Sidebar />
            <ChatBody toggleInfo={toggleInfo} />
            {showInfo && (
              <div className='w-1/3'>
                <InformationConversation />
              </div>
            )}
          </main>
        ) : (
          <Login />
        )}
        {/* <SignedOut>
          <SignInPage />
        </SignedOut>
        <SignedIn>
          <main className='flex'>
            <Sidebar />
            <ChatBody toggleInfo={toggleInfo} />
            {showInfo && (
              <div className='w-1/3'>
                <InformationConversation />
              </div>
            )}
          </main>
          <UserButton afterSignOutUrl='/sign-in' />
        </SignedIn> */}
      </div>
    </div>
  )
}
