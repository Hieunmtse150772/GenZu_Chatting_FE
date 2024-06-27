import { useEffect, useLayoutEffect, useState } from 'react'
import { checkCookie } from '../services/Cookies'
import { useNavigate } from 'react-router-dom'
import Login from './Login/Login'
import { useDispatch, useSelector } from 'react-redux'

import { getIdConversation } from '../redux/Slice/userSlice'

export default function Home() {
  const navigate = useNavigate()
  const idConversation = useSelector((state) => state.user.idConversation)
  const dispatch = useDispatch()
  useLayoutEffect(() => {
    if (checkCookie()) {
      dispatch(getIdConversation())
    }
    // !checkCookie() ?: navigate('/chat/123456')
  }, [dispatch, navigate])
  useEffect(() => {
    if (idConversation !== null) {
      navigate(`/chat/${idConversation}`)
    }
  }, [idConversation, navigate])
  return (
    <div>
      <Login />
    </div>
  )
}
