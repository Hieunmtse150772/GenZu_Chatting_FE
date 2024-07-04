import { useRef, useState, useEffect } from 'react'
import FeatureAI from '../FeatureAI/FeatureAI'
import { useSelector } from 'react-redux'
import { MdOutlineEmojiEmotions } from 'react-icons/md'
import FeatureEmoji from '../../../FeatureEmoji/FeatureEmoji'
import { useDispatch } from 'react-redux'
import { setMessageSpoiled } from '../../../../redux/Slice/messageSlice'
import './DetailMessage.css'
import { getCookie } from '@/services/Cookies';
import { IoMdArrowRoundDown } from "react-icons/io";


/* eslint-disable react/prop-types */
export default function DetailMessage(props) {
  const [isOptionBtnClick, setIsOptionBtnClick] = useState(false)
  const [isEmoteBtnClick, setEmoteBtnClick] = useState(false)
  const [isOptionSelected, setIsOptionSelected] = useState(false)

  const [activeMessageID, setActiveMessageID] = useState(null)
  const [activeMessageOptionID, setActiveMessageOptionID] = useState(null)
  const [activeMessageEmoteID, setActiveMessageEmoteID] = useState(null)

  const dispatch = useDispatch()
  const messages = useSelector((state) => state.message.message)
  
  const handleUserClick = (id_message) => {
    setActiveMessageID(id_message)
  }

  const handleUserEmoteClick = (id_message) => {
    setActiveMessageEmoteID(id_message)
  }

  const handleUserOptionClick = (id_message) => {
    setActiveMessageOptionID(id_message)
  }

  const buttonRef = useRef(null)
  const emoteRef = useRef(null)
  const optionRef = useRef(null)

  // const session = sessionStorage.getItem("userLogin")
  const session = Object.values(JSON.parse(getCookie('userLogin')))

  const sessionArray = Object.keys(session).map(key => {
    return session[key]._id;
  });

  const sessionId = sessionArray[2];
  // const message = useSelector((state) => state.message.message)

  const handleMessageHoverd = (id_message) => {
    setIsOptionBtnClick(true)
    handleUserClick(id_message)
  }

  const handleEmoteClick = (id_message) => {
    // e.preventDefault()
    setEmoteBtnClick(!isEmoteBtnClick)
    handleUserEmoteClick(id_message)
  }

  const handleOptionClick = (id_message) => {
    // e.preventDefault()
    setIsOptionSelected(!isOptionSelected)
    handleUserOptionClick(id_message)
  }

  
  const handleClickOutside = (e) => {
    if (
      emoteRef.current &&
      !emoteRef.current.contains(e.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target)
    ) {
      setEmoteBtnClick(false)
    }

    if (optionRef.current && !optionRef.current.contains(e.target)) {
      setIsOptionSelected(false)
    }
  }

  const handleSpoiledClick = (id_message) => {
    const message = messages.find((msg) => msg.id_message === id_message)

    if (message && !message.isSpoiled) {
      dispatch(setMessageSpoiled({ id_message }))
    }
  }
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() =>{
    props.handleToBottom()
  }, [messages])

  return (
    <div id='messages' className='mx-2'>
      {messages.map((item, index) =>
        item.sender != null && sessionId == item.sender._id ? (
            <div
              key={index}
              className='flex justify-end'
              onMouseEnter={() => handleMessageHoverd(item._id)}
            >
              <div
                className={`${
                  isOptionSelected && activeMessageOptionID == item._id
                    ? 'opacity-100'
                    : isOptionBtnClick && activeMessageID == item._id
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-100'
                }`}
                ref={optionRef}
              >
                <FeatureAI
                  message={item.message}
                  id={item._id}
                  callBackOptionClick={() => handleOptionClick(item._id)}
                />
              </div>
  
              <div className='relative'>
                <div
                  className={`my-4 max-w-xs rounded-lg bg-blue-200 p-2 ${item.isSpoiled || item.isSpoiled === undefined ? 'show' : 'hide'}`}
                  style={{
                    fontWeight: item.styles.bold ? 'bold' : 'normal',
                    fontStyle: item.styles.italic ? 'italic' : 'normal',
                    textDecoration: item.styles.underline ? 'underline' : 'none',
                  }}
                  onClick={() => handleSpoiledClick(item._id)}
                >
                  {item.message}
                </div>
                {/* Emote */}
                {isEmoteBtnClick && activeMessageEmoteID == item._id ? (
                  <div className='absolute right-px z-10' ref={emoteRef}>
                    <FeatureEmoji
                      isActive={isEmoteBtnClick}
                      item={item}
                      sessionId={sessionId}
                      handleCallBack={handleEmoteClick}
                    />
                  </div>
                ) : (
                  <></>
                )}
  
                <div
                  className={`absolute bottom-px right-px p-0.5 hover:bg-blue-400 rounded-md${
                    isOptionBtnClick && activeMessageID == item._id
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-100'
                  }`}
                  ref={buttonRef}
                  onClick={() => handleEmoteClick(item._id)}
                >
                  {/* show react emote  */}
                  {item.emojiBy.length != 0 ? (
                  item.emojiBy.map((emote, index) => emote.emoji != null && emote.emoji)
                ) : (
                      <MdOutlineEmojiEmotions size={14} />
                    )}
                </div>
              </div>
            </div>
          ) : (
            <div
              key={index}
              className='flex'
              onMouseEnter={() => {
                handleMessageHoverd(item._id)
              }}
            >
              <div className='relative'>
                <div className='my-4 max-w-xs rounded-lg bg-gray-300 p-2 text-black'>
                  {item.message}
                </div>
                {/* emote */}
                <div
                  className={`absolute bottom-px right-px p-0.5 hover:bg-blue-400 rounded-md${
                    isOptionBtnClick && activeMessageID == item._id
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-100'
                  }`}
                  ref={buttonRef}
                  onClick={() => handleEmoteClick(item._id)}
                >
                  {/* show react emote  */}
                  {item.emojiBy.length != 0 ? (
                  item.emojiBy.map((emote, index) => emote.emoji != null && emote.emoji)
                ) : (
                      <MdOutlineEmojiEmotions size={14} />
                    )}
                </div>
                {isEmoteBtnClick && activeMessageEmoteID == item._id ? (
                  <div className='absolute z-10' ref={emoteRef}>
                    <FeatureEmoji
                     isActive={isEmoteBtnClick}
                     item={item}
                     sessionId={sessionId}
                     handleCallBack={handleEmoteClick}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
  
              <div
                className={`${
                  isOptionSelected && activeMessageOptionID == item._id
                    ? 'opacity-100'
                    : isOptionBtnClick && activeMessageID == item._id
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-100'
                }`}
                ref={optionRef}
              >
                <FeatureAI
                  message={item.message}
                  id={item._id}
                  callBackOptionClick={() => handleOptionClick(item._id)}
                />
              </div>
            </div>
          ),
        )}
      
    </div>
  )
}
