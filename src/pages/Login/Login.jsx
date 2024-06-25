import { useUser, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import SignInPage from './SignInPage/SignInPage'
import { Routes, Route, useNavigate } from 'react-router-dom'
import SignUpComponent from './SignUpPage/SignUpPage'
import './Login.scss'
import { useLayoutEffect } from 'react'
import { checkCookie } from '../../services/Cookies'

export default function Login() {
  const { user } = useUser()
  const navigate = useNavigate()
  useLayoutEffect(() => {
    checkCookie() ? navigate('/') : console.log('chua dang nhap')
  })
  return (
    <div className='LoginPage mx-auto my-auto flex h-screen w-screen items-center justify-center'>
      <div>
        <Routes>
          <Route path='/' element={<SignInPage />} />
          <Route path='/signup' element={<SignUpComponent />} />
        </Routes>
      </div>
    </div>
  )
}
