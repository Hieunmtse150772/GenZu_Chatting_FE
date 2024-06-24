import { useDispatch, useSelector } from 'react-redux'
import './PopUpFindFriends.scss'
import { useState } from 'react'
import { searchUser } from '../../../redux/Slice/userSlice'
import { MdOutlineSavedSearch } from 'react-icons/md'
import { FaUserPlus } from 'react-icons/fa'
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
      <div className='bg-mainBlue p-4'>
        <h1>Find Your Friend</h1>
        <div className='flex justify-around'>
          <input
            onChange={handleChangeInput}
            onKeyDown={handleKeyPress}
            type='text'
            placeholder='Enter email or number phone'
          />
          <button>
            <MdOutlineSavedSearch size={35} />
          </button>
        </div>
        <div>
          {lsSearchUser.map((item, index) => (
            <div key={index} className='flex items-center justify-between'>
              <div className='inforUserFindFriends'>
                <h3 className=''>{item.name}</h3>
                <h5>{item.email}</h5>
                <h5>{item.phoneNumber}</h5>
              </div>
              <FaUserPlus size={24} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
