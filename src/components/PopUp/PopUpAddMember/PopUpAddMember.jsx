import { useDispatch, useSelector } from 'react-redux'
import './PopUpAddMember.scss'
import { useState } from 'react'
import { searchUser } from '../../../redux/Slice/userSlice'
import { MdOutlineSavedSearch } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'
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
    <div className='AddMember flex items-center justify-center'>
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
            <div key={index} className='flex items-center justify-around'>
              <p className=''>{item.name}</p>
              <FaUsers size={24} /
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
