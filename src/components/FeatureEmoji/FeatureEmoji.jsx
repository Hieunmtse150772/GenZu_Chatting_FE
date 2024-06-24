import React, { useState } from 'react';
import Picker from 'emoji-picker-react';

function FeatureEmoji(){
    const [chosenEmoji, setChosenEmoji] = useState(null);
    console.log(chosenEmoji);
  
    const onEmojiClick = (event, emojiObject) => {
      setChosenEmoji(emojiObject);
      // handleEmote('hello')
    };
        
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
        <Picker onEmojiClick={onEmojiClick} />
      </div>
    );
}

export default FeatureEmoji;