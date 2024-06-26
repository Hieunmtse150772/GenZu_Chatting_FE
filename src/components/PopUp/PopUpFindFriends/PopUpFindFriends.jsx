import axios from 'axios'
import './PopUpFindFriends.scss'
import { useState } from 'react'
import { getCookie } from '../../../services/Cookies'
import { MdPersonSearch } from 'react-icons/md'
import { IoPersonAdd } from 'react-icons/io5'
export default function PopUpFindFriends() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [error, setError] = useState('')

  const handleSearch = async () => {
    try {
      const token = getCookie('userLogin').accessToken // Thay thế bằng access token của bạn
      const response = await axios.get(
        `https://genzu-chatting-be.onrender.com/users/searchUsers?search=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
          },
        },
      )
      setSearchResult(response.data)
    } catch (error) {
      setError(error.message)
    }
  }
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSearch()
    }
  }

  return (
    <div className='mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow-xl'>
      <div className='flex justify-between'>
        <input
          type='text'
          className='w-5/6 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Enter search term'
        />
        <MdPersonSearch onClick={handleSearch} size={40} />
      </div>

      {error && <p className='mt-2 text-red-500'>{error}</p>}

      {searchResult.user && (
        <ul className='mt-4'>
          {searchResult.user.map((user) => (
            <div
              key={user.id}
              className='flex items-center justify-between border-b border-gray-200'
            >
              <div>
                <li>{user.fullName}</li>
                <li className='py-2'>{user.email}</li>
              </div>
              <div>
                <IoPersonAdd size={28} />
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  )
}
