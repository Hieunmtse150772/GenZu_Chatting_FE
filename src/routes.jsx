import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Home from './pages/Home'
import PopUpFindFriends from './components/PopUp/PopUpFindFriends/PopUpFindFriends'

function AppRoutes() {
  // const navigate = useNavigate()

  // useLayoutEffect(() => {
  //   checkCookie ? navigate('/') : navigate('/login')
  // })
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login/*' element={<Login />} />
      {/* <Route path='/test' element={<EditProfile />} /> */}
      <Route path='/test' element={<PopUpFindFriends />} />

      {/* <Route path="/register" element={<SignUpComponent />} /> */}
    </Routes>
  )
}

export default AppRoutes
