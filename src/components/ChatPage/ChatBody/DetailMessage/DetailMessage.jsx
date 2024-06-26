import { useRef, useState, useEffect } from 'react'
import FeatureAI from '../FeatureAI/FeatureAI'
import { useSelector } from 'react-redux'
import { MdOutlineEmojiEmotions } from 'react-icons/md'
import FeatureEmoji from '../../../FeatureEmoji/FeatureEmoji'
/* eslint-disable react/prop-types */
export default function DetailMessage(props) {
  const [isOptionBtnClick, setIsOptionBtnClick] = useState(false)

  const [isEmoteBtnClick, setEmoteBtnClick] = useState(false)

  const [activeMessageID, setActiveMessageID] = useState(null)

  const handleUserClick = (id) => {
    setActiveMessageID(id)
  }
  const buttonRef = useRef(null)
  const emoteRef = useRef(null)

  const message = useSelector((state) => state.message.message)
  // const handleMoreClick = (id) => {
  //   e.preventDefault();
  //   setIsOptionBtnClick(!isOptionBtnClick);
  //   if(setIsOptionBtnClick){
  //     handleUserClick(id)
  //   }
  // };
  const handleMoreClick = (id_message) => {
    setIsOptionBtnClick(true)
    handleUserClick(id_message)
  }

  const handleEmoteClick = (e) => {
    e.preventDefault()
    setEmoteBtnClick(!isEmoteBtnClick)
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
              <div className='my-4 max-w-xs rounded-lg bg-blue-200 p-2 text-black'>
                {item.message}
              </div>
              {/* Emote */}
              {isEmoteBtnClick && activeMessageID == item.id_message ? (
                <div className='absolute right-px' ref={emoteRef}>
                  <FeatureEmoji isActive={isEmoteBtnClick} />
                </div>
              ) : (
                <></>
              )}

              <div
                className={`absolute bottom-px right-px rounded-md p-0.5 hover:bg-blue-400 ${
                  isOptionBtnClick && activeMessageID == item.id_message
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-100'
                }`}
                ref={buttonRef}
                onClick={handleEmoteClick}
              >
                <MdOutlineEmojiEmotions size={14} />
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
                className={`absolute bottom-px right-px rounded-md p-0.5 hover:bg-blue-400 ${
                  isOptionBtnClick && activeMessageID == item.id_message
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-100'
                }`}
                ref={buttonRef}
                onClick={handleEmoteClick}
              >
                <MdOutlineEmojiEmotions size={14} />
              </div>
              {isEmoteBtnClick && activeMessageID == item.id_message ? (
                <div className='absolute' ref={emoteRef}>
                  <FeatureEmoji isActive={isEmoteBtnClick} />
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
