import React, { useState } from 'react'
import Picker from 'emoji-picker-react'

function FeatureEmoji(props) {
  const [chosenEmoji, setChosenEmoji] = useState(null)

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject)
    // handleEmote('hello')
  }

  // const handleEmote = (Id) =>{
  //   console.log(Id);
  //   props.callBackEmote(Id)
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
