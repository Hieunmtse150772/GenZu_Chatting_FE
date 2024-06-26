import { useRef, useState, useEffect } from 'react'
import FeatureAI from '../FeatureAI/FeatureAI'
import { useSelector } from 'react-redux'
import { MdOutlineEmojiEmotions } from 'react-icons/md'
import FeatureEmoji from '../../../FeatureEmoji/FeatureEmoji'
/* eslint-disable react/prop-types */
export default function DetailMessage(props) {
  const [isOptionBtnClick, setIsOptionBtnClick] = useState(false)

  const [isEmoteBtnClick, setEmoteBtnClick] = useState(false)
  const [isEmoteSelected, setisEmoteSelected] = useState(false)

  const [activeMessageID, setActiveMessageID] = useState(null)

  const handleUserClick = (id) => {
    setActiveMessageID(id)
  }
  const buttonRef = useRef(null)
  const emoteRef = useRef(null)

  const message = useSelector((state) => state.message.message)
  
  const handleMoreClick = (id_message) => {
    setIsOptionBtnClick(true)
    handleUserClick(id_message)
  }

  const handleEmoteClick = (e) => {
    e.preventDefault()
    setEmoteBtnClick(!isEmoteBtnClick)
  }

  // 
  const handleEmoteSelected = () =>{
    console.log('chosenEmoji', )
      setisEmoteSelected(!isEmoteSelected);
  }
  // 
  const handleClickOutside = (e) => {
    if (
      emoteRef.current &&
      !emoteRef.current.contains(e.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target)
    ) {
      setEmoteBtnClick(false)
    }
  }
  useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='mx-2'>
      {message.map((item, index) =>
          item.id_user == 1 ? (
            <div
              key={index}
              className='flex justify-end'
              onMouseEnter={() => handleMoreClick(item.id_message)}
              onMouseLeave={() => setIsOptionBtnClick(false)}
            >
              <div
                className={`${
                  isOptionBtnClick && activeMessageID == item.id_message
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                <FeatureAI />
              </div>
  
              <div className='relative'>
                <div
                className='my-4 max-w-xs rounded-lg bg-blue-200 p-2 text-black'
                style={{
                  fontWeight: item.styles.bold ? 'bold' : 'normal',
                  fontStyle: item.styles.italic ? 'italic' : 'normal',
                  textDecoration: item.styles.underline ? 'underline' : 'none',
                }}
              >
                  {item.message}
                </div>
                {/* Emote */}
                {isEmoteBtnClick && activeMessageID == item.id_message ? (
                <div className='absolute right-px' ref={emoteRef}>
                      <FeatureEmoji isActive={isEmoteBtnClick} item={item} handleCallBack={handleEmoteSelected}/>
                    </div>
              ) : (
                <></>
                )}
  
                <div className= {`absolute right-px bottom-px  hover:bg-blue-400 p-0.5 rounded-md${
                                    isOptionBtnClick && activeMessageID == item.id_message
                                      ? "opacity-100"
                                      : "opacity-0 group-hover:opacity-100"
                                      }`}
                      ref={buttonRef}
                      onClick={handleEmoteClick}
                      >
                        {/* show react emote  */}
                  { item.emoji_user.length != 0 ? 
                      item.emoji_user.map((emoji, index) =>
                            emoji.url_emoji !='' ?
                              emoji.url_emoji
                              :
                              <></>
                          )
                      : 
                      <MdOutlineEmojiEmotions size={14}/>
                  }
                  
                </div>
              </div>
            </div>
          ) : (
            <div
              key={index}
              className='flex'
              onMouseEnter={() => {
                handleMoreClick(item.id_message)
              }}
              onMouseLeave={() => setIsOptionBtnClick(false)}
            >
              <div className='relative'>
                <div className=' my-4 max-w-xs rounded-lg bg-gray-300 p-2 text-black'>
                  {item.message}
                </div>
                {/* emote */}
                <div className= {`absolute right-px bottom-px  hover:bg-blue-400 p-0.5 rounded-md ${
                                    isOptionBtnClick && activeMessageID == item.id_message
                                      ? "opacity-100"
                                      : "opacity-0 group-hover:opacity-100"
                                      }`}
                      ref={buttonRef}
                      onClick={handleEmoteClick}>
                  <MdOutlineEmojiEmotions  size={14}/>
                </div>
                  { isEmoteBtnClick && activeMessageID == item.id_message ?
                      (<div className= "absolute" ref={emoteRef}
                        >
                          <FeatureEmoji isActive={isEmoteBtnClick} />
                        </div>) : <></>
                  }
                
              </div>
              <div
                className={`${
                  isOptionBtnClick && activeMessageID == item.id_message
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                <FeatureAI />
              </div>
            </div>
          ),
              )}
    </div>
  )
}
