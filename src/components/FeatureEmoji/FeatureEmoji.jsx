import React, { useState } from 'react'
import Picker from 'emoji-picker-react'
import { useDispatch } from 'react-redux'
import { selectedEmjiOnMessage } from '../../redux/Slice/messageSlice'

function FeatureEmoji(props) {
  
  const dispatch = useDispatch();

  const onEmojiClick = (event) => {
    // setChosenEmoji(emojiObject)
    console.log('emoji:', event.emoji)
    const itemMessage = {
      id_user: props.item.id_user,
      id_message: props.item.id_message,
      emoji: event.emoji,
    }
    dispatch(selectedEmjiOnMessage(itemMessage))
    props.handleCallBack()
  }

  // const handleEmote = (Id) =>{
  //   console.log(Id);
    
  // }
  return (
    <div>
      {/* {chosenEmoji ? (
          
          // <>
            // <img src={`${chosenEmoji.srcElement.currentSrc}`} 
            //     alt="smiley" 
            //     className={`${chosenEmoji.srcElement.className}`}
            //     loading="eager" />
          // </>
        ) : (
          // <span>No emoji Chosen</span>
          <></>
        )} */}
      <Picker reactionsDefaultOpen={props.isActive} onEmojiClick={onEmojiClick} />
    </div>
  )
}

export default FeatureEmoji
