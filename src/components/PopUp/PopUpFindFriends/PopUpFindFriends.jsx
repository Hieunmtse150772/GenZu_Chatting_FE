import { useDispatch, useSelector } from 'react-redux'
import './PopUpFindFriends.scss'
import { useState } from 'react'
import { searchUser } from '../../../redux/Slice/userSlice'
export default function PopUpFindFriends() {
  let lsSearchUser = useSelector((state) => state.user.lsSearchUser)
  const [input, setInput] = useState('')
  const dispatch = useDispatch()
  const handleChangeInput = (e) => {
    setInput(e.target.value)
  }
  const handleKeyPress = (e) => {
    if (e.keyCode == 13) {
      dispatch(searchUser(input))
      console.log(input)
      setInput('') // Clear input field after dispatch
    }
  }
  return (
    <div className='FindFriend flex items-center justify-center'>
      <div>
        <h1>Find Your Friend</h1>
        <div className='flex justify-between'>
          <input
            onChange={handleChangeInput}
            onKeyDown={handleKeyPress}
            type='text'
            placeholder='Enter email or number phone'
          />
          <button>Search</button>
        </div>
        <div>
          {lsSearchUser.map((item, index) => (
            <p key={index}>{item.name}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
