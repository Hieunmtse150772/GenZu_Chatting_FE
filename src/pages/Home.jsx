import { useEffect, useLayoutEffect, useState } from 'react'
import { checkCookie } from '../services/Cookies'
import { useNavigate, useParams } from 'react-router-dom'
import Login from './Login/Login'

export default function Home() {
  const navigate = useNavigate()
  useEffect(() => {
    !checkCookie() ? navigate('/') : navigate('/chat/123456')
  }, [navigate])
  return (
    <div>
      <Login />
    </div>
  )
}
