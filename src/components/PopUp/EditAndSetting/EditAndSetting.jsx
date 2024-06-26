import { useEffect, useRef, useState } from 'react'
import './EditAndSetting.scss'
import { FiEdit } from 'react-icons/fi'
import { MdSaveAlt } from 'react-icons/md'

export default function EditAndSetting({ isVisible, onClose }) {
  const [user, setUser] = useState({
    name: { value: 'Hoang Ba Thien', isDisable: true },
    email: { value: 'thienhoang241299@gmail.com', isDisable: true },
    password: { value: '********', isDisable: true },
    phoneNumber: { value: '0345678912', isDisable: true },
    dob: { value: '24/12/1999', isDisable: true },
  })
  /// create popup
  const popupRef = useRef()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isVisible, onClose])
  if (!isVisible) {
    return null
  }
  const handelEdit = (value) => {
    setUser({
      ...user,
      [value]: {
        ...user[value],
        isDisable: !user[value].isDisable,
      },
    })
  }
  return (
    <div className='EditAndSetting fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative flex justify-around rounded-lg bg-white p-6 shadow-lg'>
        <button
          className='absolute right-2 top-2 text-gray-500 hover:text-gray-700'
          onClick={onClose}
        >
          &times;
        </button>
        <div className='EditInfor'>
          <h1>Edit user</h1>
          <img
            src='https://img-cdn.pixlr.com/image-generator/history/66785ce3e45ea92fdd9b83f1/e8fdab45-8787-4f42-94bd-a15807dba09d/medium.webp'
            alt='avatar'
          />
          {Object.keys(user).map((field) => (
            <div key={field} className='input-infor-group'>
              <h3>{field.charAt(0).toUpperCase() + field.slice(1)}</h3>
              <div>
                <div
                  onClick={() => {
                    user[field].isDisable ? alert('Please enter edit button') : ' '
                  }}
                >
                  <input
                    type='text'
                    value={user[field].value}
                    disabled={user[field].isDisable}
                    style={{ pointerEvents: user[field].isDisable ? 'none' : 'auto' }}
                  />
                </div>
                <button onClick={() => handelEdit(field)}>
                  {user[field].isDisable ? <FiEdit /> : <MdSaveAlt />}
                </button>
              </div>
            </div>
          ))}
          <div className='buttonSave'>
            <button className='flex justify-around'>
              Save <MdSaveAlt />
            </button>
          </div>
        </div>
        <div>Setting</div>
      </div>
    </div>
  )
}
