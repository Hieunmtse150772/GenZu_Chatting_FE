import { getCookie } from '@/services/Cookies'
import React from 'react'

const RenderMessage = ({ item }) => {
  const userId = JSON.parse(getCookie('userLogin')).user._id

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
      return <p>{item.message}</p>
    case 'notification':
      if (item.message === '3001' || item.message === '3006') {
        if (item.affected_user_id && item.sender._id === userId && item.conversation.isGroupChat) {
          return (
            <p>
              {'Bạn vừa thêm ' +
                item?.affected_user_id?.fullName +
                ' vào nhóm ' +
                item.conversation?.chatName}
            </p>
          )
        } else if (
          item.affected_user_id &&
          item.affected_user_id?._id === userId &&
          item.conversation?.isGroupChat
        ) {
          return (
            <p>{item.sender?.fullName + ' thêm bạn vào nhóm ' + item.conversation?.chatName}</p>
          )
        } else if (item.affected_user_id && item.conversation?.isGroupChat) {
          return (
            <p>
              {item.sender?.fullName +
                ` thêm ${item.affected_user_id?.fullName} vào nhóm ` +
                item.conversation?.chatName}
            </p>
          )
        }
      }
      
      if(item.message === '7008'){
        return (
          <p className='text-gray-600 font-light italic'>{item.sender?.fullName +
                  ` vừa thay đổi background`}
          </p>
        )
      }
      break
    default:
      return null
  }
}

export default RenderMessage
