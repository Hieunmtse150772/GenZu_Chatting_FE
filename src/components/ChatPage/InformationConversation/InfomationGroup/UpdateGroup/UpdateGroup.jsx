import { useEffect, useRef } from 'react'
import { MdOutlineClose } from 'react-icons/md'

const UpdateGroup = ({ isVisible, onClose }) => {
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
  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg' ref={popupRef}>
          <button
            className='absolute right-2 top-2 text-gray-500 hover:text-gray-700'
            onClick={onClose}
          >
            <MdOutlineClose size={24} />
          </button>
          <h2 className='mb-4 text-2xl font-bold'>Update group</h2>
        </div>
      </div>
    </>
  )
}

export default UpdateGroup
