import React, { useState } from 'react'
import Picker from 'emoji-picker-react'
import { useDispatch } from 'react-redux'
import { selectedEmjiOnMessage } from '../../redux/Slice/messageSlice'

function FeatureEmoji(props) {
  
  const dispatch = useDispatch();

  const onEmojiClick = (event) => {
    const itemMessage = {
      id_user: props.id_user,
      id_message: props.id_message,
      emoji: event.emoji,
    }
    dispatch(selectedEmjiOnMessage(itemMessage))
    props.handleCallBack()
  }

  return (
    <div>
      <Picker reactionsDefaultOpen={props.isActive} onEmojiClick={onEmojiClick} />
    </div>
  )
}

export default FeatureEmoji
