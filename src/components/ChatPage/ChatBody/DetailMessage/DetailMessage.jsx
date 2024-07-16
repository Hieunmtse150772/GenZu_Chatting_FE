import React, { useRef, useState, useEffect, memo, useCallback } from 'react'
import FeatureAI from '../FeatureAI/FeatureAI'
import { useSelector, useDispatch } from 'react-redux'
import { MdOutlineEmojiEmotions } from 'react-icons/md'
import FeatureEmoji from '../../../FeatureEmoji/FeatureEmoji'
import { setMessageSpoiled } from '../../../../redux/Slice/messageSlice'
import './DetailMessage.css'
import { getCookie } from '@/services/Cookies'
import RenderMessage from './RenderFIle/RenderFIle'
import RenderReplyMessage from './RenderFIle/RenderReplyMessage'

const DetailMessage = memo(function DetailMessage(props) {
  const [isEmoteBtnClick, setEmoteBtnClick] = useState(false)
  const [isOptionSelected, setIsOptionSelected] = useState(false)
  const [activeMessageOptionID, setActiveMessageOptionID] = useState(null)
  const [activeMessageEmoteID, setActiveMessageEmoteID] = useState(null)
  const [hoveredMessage, setHoveredMessage] = useState(null)
  const resultMessage = useSelector((state) => state.message.resultMessage)
  const messages = useSelector((state) => state.message.message)
  const dispatch = useDispatch()

  const buttonRef = useRef(null)
  const emoteRef = useRef(null)
  const optionRef = useRef(null)

  const session = Object.values(JSON.parse(getCookie('userLogin')))
  const sessionId = Object.keys(session)?.map((key) => {
    return session[key]._id
  })[2]

  const handleUserEmoteClick = useCallback((id_message) => {
    setActiveMessageEmoteID(id_message)
  }, [])

  const handleUserOptionClick = useCallback((id_message) => {
    setActiveMessageOptionID(id_message)
  }, [])

  const handleMessageHover = useCallback((id_message) => {
    setHoveredMessage(id_message)
  }, [])

  const handleEmoteClick = useCallback(
    (id_message) => {
      setEmoteBtnClick(!isEmoteBtnClick)
      handleUserEmoteClick(id_message)
    },
    [isEmoteBtnClick, handleUserEmoteClick],
  )

  const handleOptionClick = useCallback(
    (id_message) => {
      setIsOptionSelected(!isOptionSelected)
      handleUserOptionClick(id_message)
    },
    [isOptionSelected, handleUserOptionClick],
  )

  const handleClickOutside = useCallback((e) => {
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
  }, [])

  const handleSpoiledClick = useCallback(
    (id_message) => {
      const message = messages.find((msg) => msg.id_message === id_message)
      if (message && !message.isSpoiled) {
        dispatch(setMessageSpoiled({ id_message }))
      }
    },
    [dispatch, messages],
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  useEffect(() => {
    props.handleToBottom()
  }, [messages, props])

  useEffect(() => {
    var index = props.indexMsg
    if (!resultMessage || resultMessage.length === 0) return
    if (props.indexMsg > resultMessage.length - 1) {
      index = 0
    }
    handleSearchMessage(index, props.isSearchMessage)
  }, [props.isSearchMessage, resultMessage, props.indexMsg])

  const handleSearchMessage = useCallback(
    (indexMsg, isSearch) => {
      const idCurrentMsg = resultMessage[indexMsg]._id
      const myElement = document.getElementById(`${idCurrentMsg}`)
      if (!isSearch) {
        myElement.classList.remove('text-purple-700', 'font-bold')
      } else {
        resultMessage.forEach((msg) => {
          const previousElement = document.getElementById(`${msg._id}`)
          if (previousElement.classList.contains('text-purple-700') && idCurrentMsg !== msg._id) {
            previousElement.classList.remove('text-purple-700', 'font-bold')
          }
        })
        myElement.classList.add('text-purple-700', 'font-bold')
        myElement.scrollIntoView()
      }
    },
    [resultMessage],
  )

  return (
    <div
      id='messages'
      className='mx-2 flex flex-col-reverse bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500'
    >
      {messages.map((item, index) => (
        <div
          key={index}
          className={`flex ${item.sender && sessionId === item.sender._id ? 'justify-end' : ''} ${item.status === 'recalled' ? 'pointer-events-none opacity-50' : ''}`}
          onMouseEnter={() => handleMessageHover(item._id)}
          onMouseLeave={() => handleMessageHover(null)}
        >
          {item.sender && sessionId === item.sender._id ? (
            <div className='relative'>
              <div
                id={item._id}
                className={`my-4 max-w-xs break-words rounded-lg bg-blue-200 p-2 ${item.isSpoiled || item.isSpoiled === undefined ? 'show' : 'hide'}`}
                style={{
                  fontWeight: item.styles.bold ? 'bold' : 'normal',
                  fontStyle: item.styles.italic ? 'italic' : 'normal',
                  textDecoration: item.styles.underline ? 'underline' : 'none',
                }}
                onClick={() => handleSpoiledClick(item._id)}
              >
                {item.replyMessage ? (
                  <RenderReplyMessage item={item} />
                ) : (
                  <RenderMessage item={item} />
                )}
              </div>
              {isEmoteBtnClick && activeMessageEmoteID === item._id && (
                <div className='absolute right-px z-10' ref={emoteRef}>
                  <FeatureEmoji
                    isActive={isEmoteBtnClick}
                    item={item}
                    sessionId={sessionId}
                    handleCallBack={handleEmoteClick}
                  />
                </div>
              )}
              <div
                className={`absolute bottom-px right-px rounded-md p-0.5 hover:bg-blue-400 dark:text-white ${hoveredMessage === item._id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                ref={buttonRef}
                onClick={() => handleEmoteClick(item._id)}
              >
                {item.emojiBy.length !== 0 ? (
                  item.emojiBy.map((emote, index) => emote.emoji != null && emote.emoji)
                ) : (
                  <MdOutlineEmojiEmotions size={14} />
                )}
              </div>
            </div>
          ) : (
            <div className='relative'>
              <div
                id={item._id}
                className='my-4 max-w-xs break-words rounded-lg bg-gray-300 p-2 text-black'
              >
                {item.replyMessage ? (
                  <RenderReplyMessage item={item} />
                ) : (
                  <RenderMessage item={item} />
                )}
              </div>
              <div
                className={`absolute bottom-px right-px rounded-md p-0.5 hover:bg-blue-400 dark:text-white ${hoveredMessage === item._id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                ref={buttonRef}
                onClick={() => handleEmoteClick(item._id)}
              >
                {item.emojiBy.length !== 0 ? (
                  item.emojiBy.map((emote, index) => emote.emoji != null && emote.emoji)
                ) : (
                  <MdOutlineEmojiEmotions size={14} />
                )}
              </div>
              {isEmoteBtnClick && activeMessageEmoteID === item._id && (
                <div className='absolute z-10' ref={emoteRef}>
                  <FeatureEmoji
                    isActive={isEmoteBtnClick}
                    item={item}
                    sessionId={sessionId}
                    handleCallBack={handleEmoteClick}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
})

export default DetailMessage
