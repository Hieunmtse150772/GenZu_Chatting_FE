import { useState, useRef } from 'react'
import { MdOutlineKeyboardVoice } from 'react-icons/md'
import { LuSend } from 'react-icons/lu'
import { MdAttachFile, MdInsertEmoticon } from 'react-icons/md'
import { FaFile, FaImage, FaVideo, FaHeadphones } from 'react-icons/fa'

function ChatFooter() {
  const [showAttachments, setShowAttachments] = useState(false)
  const fileInputRefs = {
    file: useRef(null),
    image: useRef(null),
    video: useRef(null),
    audio: useRef(null),
  }

  const toggleAttachments = () => {
    setShowAttachments(!showAttachments)
  }

  const handleFileChange = (event, type) => {
    const files = event.target.files
    console.log(type, files)
    // handle the file upload logic here
  }

  const handleFileButtonClick = (type) => {
    fileInputRefs[type].current.click()
  }

  return (
    <div className='relative flex items-center rounded-lg bg-white p-4'>
      <input
        type='text'
        placeholder='Type your message...'
        className='flex-1 border rounded-full px-4 py-2 focus:outline outline-blue-600'
      />
      <div className='mr-4 hidden overflow-x-hidden font-semibold md:flex md:items-center'>
        <div className='flex justify-between'>
          <button className='rounded-md p-1 hover:bg-blue-400'>
            <MdOutlineKeyboardVoice size={24} />
          </button>
          <button className='rounded-md p-1 hover:bg-blue-400' onClick={toggleAttachments}>
            <MdAttachFile size={24} />
          </button>
          <button className='mr-2 rounded-md p-1 hover:bg-blue-400'>
            <MdInsertEmoticon size={24} />
          </button>
          <button className='rounded-full bg-blue-500 p-2 hover:bg-blue-600 focus:outline-none'>
            <LuSend size={16} />
          </button>
        </div>
      </div>
      <div
        className={`absolute bottom-20 right-24 flex flex-col space-y-2 transition-transform duration-300 ease-in-out ${
          showAttachments
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <button
          className='transform rounded-full bg-blue-500 p-4 shadow-xl transition-transform duration-300 hover:scale-110 hover:bg-blue-600'
          onClick={() => handleFileButtonClick('file')}
        >
          <FaFile className='text-white' size={16} />
        </button>
        <button
          className='transform rounded-full bg-green-500 p-4 shadow-xl transition-transform duration-300 hover:scale-110 hover:bg-green-600'
          onClick={() => handleFileButtonClick('image')}
        >
          <FaImage className='text-white' size={16} />
        </button>
        <button
          className='transform rounded-full bg-purple-500 p-4 shadow-xl transition-transform duration-300 hover:scale-110 hover:bg-purple-600'
          onClick={() => handleFileButtonClick('video')}
        >
          <FaVideo className='text-white' size={16} />
        </button>
        <button
          className='transform rounded-full bg-red-500 p-4 shadow-xl transition-transform duration-300 hover:scale-110 hover:bg-red-600'
          onClick={() => handleFileButtonClick('audio')}
        >
          <FaHeadphones className='text-white' size={16} />
        </button>
      </div>
      <input
        type='file'
        ref={fileInputRefs.file}
        className='hidden'
        onChange={(e) => handleFileChange(e, 'file')}
      />
      <input
        type='file'
        accept='image/*'
        ref={fileInputRefs.image}
        className='hidden'
        onChange={(e) => handleFileChange(e, 'image')}
      />
      <input
        type='file'
        accept='video/*'
        ref={fileInputRefs.video}
        className='hidden'
        onChange={(e) => handleFileChange(e, 'video')}
      />
      <input
        type='file'
        accept='audio/*'
        ref={fileInputRefs.audio}
        className='hidden'
        onChange={(e) => handleFileChange(e, 'audio')}
      />
    </div>
  )
}

export default ChatFooter
