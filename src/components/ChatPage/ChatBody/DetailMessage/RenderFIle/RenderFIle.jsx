import { getCookie } from '@/services/Cookies'
import React from 'react'

const RenderMessage = ({ item }) => {
  const userId = JSON.parse(getCookie('userLogin')).user._id
  if (item.sender._id === userId && item.conversation.isGroupChat) {
    return (
      <p>
        {'Bạn vừa thêm ' +
          item?.affected_user_id?.fullName +
          ' vào nhóm ' +
          item.conversation?.chatName}
      </p>
    )
  } else if (item.affected_user_id?._id === userId && item.conversation?.isGroupChat) {
    return <p>{item.sender?.fullName + ' thêm bạn vào nhóm ' + item.conversation?.chatName}</p>
  } else if (item.conversation?.isGroupChat) {
    return (
      <p>
        {item.sender?.fullName +
          ` thêm ${item.affected_user_id?.fullName}  vào nhóm ` +
          item.conversation?.chatName}
      </p>
    )
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
