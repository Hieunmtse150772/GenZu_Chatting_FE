import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCookie } from '@/services/Cookies'

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuthentication = () => {
      const userLogin = JSON.parse(getCookie('userLogin'))
      console.log(userLogin?.user?._id)
      if (!userLogin) {
        navigate('/')
      } else {
        navigate(`/chat/${userLogin?.user?._id}`)
      }
    }
    checkAuthentication()
  }, [navigate])
  return element
}

export default ProtectedRoute
