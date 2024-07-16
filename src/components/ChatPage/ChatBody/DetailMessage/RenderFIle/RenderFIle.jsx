import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import React from 'react'

const RenderMessage = ({ item }) => {
  const messageGroup = useSelector((state) => state.message?.message)
  if (item.messageType === 'text' && messageGroup) {
    return messageGroup.map((user, index) => (
      <div key={index} className='message-container'>
        <p>{'Bạn vừa thêm ' + user?.affected_user_id?.fullName + ' vào nhóm'}</p>
      </div>
    ))
  }

  switch (item.messageType) {
    case 'image':
      return (
        <img
          className='h-auto w-full'
          src={item.message}
          alt='Uploaded content'
          style={{ width: 'auto', height: '200px' }}
        />
      )
    case 'audio':
      return <audio className='w-full' controls src={item.message} />
    case 'video':
      return (
        <video
          className='w-full'
          controls
          src={item.message}
          style={{ width: 'auto', height: '400px' }}
        />
      )
    case 'file':
      return (
        <a href={item.message} download>
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAzHuAroNuDhtPXeGxXfL-Idoctgcv2wPggA&s'
            alt='image file'
            style={{ width: '100px', height: 'auto' }}
          />
        </a>
      )
    case 'text':
      return item.message
    default:
      return null
  }
}

export default RenderMessage
