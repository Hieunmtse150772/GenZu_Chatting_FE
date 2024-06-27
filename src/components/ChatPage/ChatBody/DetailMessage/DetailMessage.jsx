import { useRef, useState, useEffect } from 'react'
import FeatureAI from '../FeatureAI/FeatureAI'
import { useSelector } from 'react-redux'
import { MdOutlineEmojiEmotions } from 'react-icons/md'
import FeatureEmoji from '../../../FeatureEmoji/FeatureEmoji'
import { useDispatch } from 'react-redux'
import { setMessageSpoiled } from '../../../../redux/Slice/messageSlice'
import './DetailMessage.css'

/* eslint-disable react/prop-types */
export default function DetailMessage(props) {
  const [isOptionBtnClick, setIsOptionBtnClick] = useState(false)
  const [isEmoteBtnClick, setEmoteBtnClick] = useState(false)
  const [isEmoteSelected, setisEmoteSelected] = useState(false)
  const [activeMessageID, setActiveMessageID] = useState(null)

  const dispatch = useDispatch()

  const handleUserClick = (id) => {
    setActiveMessageID(id)
  }
  const buttonRef = useRef(null)
  const emoteRef = useRef(null)

  const message = useSelector((state) => state.message.message)

  const handleMoreClick = (id_message) => {
    setIsOptionBtnClick(true)
    setEmoteBtnClick(false)
    handleUserClick(id_message)
  }

  const handleEmoteClick = () => {
    // e.preventDefault()
    setEmoteBtnClick(!isEmoteBtnClick)
  }

  //
  // const handleEmoteSelected = () =>{
  //   console.log('chosenEmoji', )
  //   setEmoteBtnClick(!isEmoteBtnClick);
  // }
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

  const handleSpoiledClick = (id_message) => {
    dispatch(setMessageSpoiled({ id_message }))
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
                className={`my-4 max-w-xs rounded-lg bg-blue-200 p-2 ${item.isSpoiled ? 'show' : 'hide'}`}
                style={{
                  fontWeight: item.styles.bold ? 'bold' : 'normal',
                  fontStyle: item.styles.italic ? 'italic' : 'normal',
                  textDecoration: item.styles.underline ? 'underline' : 'none',
                }}
                onClick={() => handleSpoiledClick(item.id_message)}
              >
                {item.message}
              </div>
              {/* Emote */}
              {isEmoteBtnClick && activeMessageID == item.id_message ? (
                <div className='absolute right-px' ref={emoteRef}>
                  <FeatureEmoji
                    isActive={isEmoteBtnClick}
                    item={item}
                    handleCallBack={handleEmoteClick}
                  />
                </div>
              ) : (
                <></>
              )}

              <div
                className={`absolute bottom-px right-px p-0.5 hover:bg-blue-400 rounded-md${
                  isOptionBtnClick && activeMessageID == item.id_message
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-100'
                }`}
                ref={buttonRef}
                onClick={handleEmoteClick}
              >
                {/* show react emote  */}
                {item.emoji_user.length != 0 ? (
                  item.emoji_user.map((emoji, index) =>
                    emoji.url_emoji != '' ? emoji.url_emoji : <></>,
                  )
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
              handleMoreClick(item.id_message)
            }}
            onMouseLeave={() => setIsOptionBtnClick(false)}
          >
            <div className='relative'>
              <div className='my-4 max-w-xs rounded-lg bg-gray-300 p-2 text-black'>
                {item.message}
              </div>
              {/* emote */}
              <div
                className={`absolute bottom-px right-px p-0.5 hover:bg-blue-400 rounded-md${
                  isOptionBtnClick && activeMessageID == item.id_message
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-100'
                }`}
                ref={buttonRef}
                onClick={handleEmoteClick}
              >
                {/* show react emote  */}
                {item.emoji_user.length != 0 ? (
                  item.emoji_user.map((emoji, index) =>
                    emoji.url_emoji != '' ? emoji.url_emoji : <></>,
                  )
                ) : (
                  <MdOutlineEmojiEmotions size={14} />
                )}
              </div>
              {isEmoteBtnClick && activeMessageID == item.id_message ? (
                <div className='absolute' ref={emoteRef}>
                  <FeatureEmoji
                    isActive={isEmoteBtnClick}
                    item={item}
                    handleCallBack={handleEmoteClick}
                  />
                </div>
              ) : (
                <></>
              )}
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
