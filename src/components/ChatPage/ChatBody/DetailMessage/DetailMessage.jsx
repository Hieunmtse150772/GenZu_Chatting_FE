import { useRef, useState, useEffect, memo, useCallback } from 'react'
import FeatureAI from '../FeatureAI/FeatureAI'
import { useSelector } from 'react-redux'
import { MdOutlineEmojiEmotions } from 'react-icons/md'
import FeatureEmoji from '../../../FeatureEmoji/FeatureEmoji'
import { useDispatch } from 'react-redux'
import { setMessageSpoiled } from '../../../../redux/Slice/messageSlice'
import './DetailMessage.css'
import { getCookie } from '@/services/Cookies'
import { IoMdArrowRoundDown } from 'react-icons/io'
import RenderMessage from './RenderFIle/RenderFIle'

/* eslint-disable react/prop-types */
const DetailMessage = memo(function DetailMessage(props) {
  // State để kiểm tra xem nút option của tin nhắn có đang được click hay không
  // State để kiểm tra xem nút emoji của tin nhắn có đang được click hay không
  const [isEmoteBtnClick, setEmoteBtnClick] = useState(false)
  // State để kiểm tra xem option của tin nhắn có đang được chọn hay không
  const [isOptionSelected, setIsOptionSelected] = useState(false)
  // State để lưu trữ id của option đang được active
  const [activeMessageOptionID, setActiveMessageOptionID] = useState(null)
  // State để lưu trữ id của emoji đang được active
  const [activeMessageEmoteID, setActiveMessageEmoteID] = useState(null)
  const [hoveredMessage, setHoveredMessage] = useState(null)

  // Sử dụng useDispatch để dispatch action
  const dispatch = useDispatch()
  // Lấy danh sách messages từ store redux
  const messages = useSelector((state) => state.message.message)

  // Hàm xử lý khi click vào user

  // Hàm xử lý khi click vào emote của user
  const handleUserEmoteClick = (id_message) => {
    // Cập nhật state activeMessageEmoteID
    setActiveMessageEmoteID(id_message)
  }

  // Hàm xử lý khi click vào option của user
  const handleUserOptionClick = (id_message) => {
    // Cập nhật state activeMessageOptionID
    setActiveMessageOptionID(id_message)
  }

  // Sử dụng useRef để lấy reference đến các element
  const buttonRef = useRef(null) // Reference đến nút emoji
  const emoteRef = useRef(null) // Reference đến component FeatureEmoji
  const optionRef = useRef(null) // Reference đến component FeatureAI

  // Lấy thông tin session user từ cookie
  const session = Object.values(JSON.parse(getCookie('userLogin')))
  // Lấy id của session user
  const sessionId = Object.keys(session)?.map((key) => {
    return session[key]._id
  })[2]

  // Hàm xử lý khi di chuột qua tin nhắn
  const handleMessageHover = (id_message) => {
    // Hiển thị nút option
    setHoveredMessage(id_message)
  }

  // Hàm xử lý khi click vào nút emoji
  const handleEmoteClick = (id_message) => {
    // Chuyển đổi trạng thái hiển thị/ẩn của component FeatureEmoji
    setEmoteBtnClick(!isEmoteBtnClick)
    // Cập nhật state activeMessageEmoteID
    handleUserEmoteClick(id_message)
  }

  // Hàm xử lý khi click vào option
  const handleOptionClick = useCallback((id_message) => {
    // Chuyển đổi trạng thái hiển thị/ẩn của component FeatureAI
    setIsOptionSelected(!isOptionSelected)
    // Cập nhật state activeMessageOptionID
    handleUserOptionClick(id_message)
  }, [])

  // Hàm xử lý khi click outside
  const handleClickOutside = (e) => {
    // Nếu click outside component FeatureEmoji thì ẩn component này đi
    if (
      emoteRef.current &&
      !emoteRef.current.contains(e.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target)
    ) {
      setEmoteBtnClick(false)
    }

    // Nếu click outside component FeatureAI thì ẩn component này đi
    if (optionRef.current && !optionRef.current.contains(e.target)) {
      setIsOptionSelected(false)
    }
  }

  // Hàm xử lý khi click vào nút spoiled
  const handleSpoiledClick = (id_message) => {
    // Tìm kiếm tin nhắn theo id
    const message = messages.find((msg) => msg.id_message === id_message)

    // Nếu tin nhắn tồn tại và chưa bị spoiled thì dispatch action để cập nhật trạng thái spoiled
    if (message && !message.isSpoiled) {
      dispatch(setMessageSpoiled({ id_message }))
    }
  }

  // Sử dụng useEffect để thêm và xóa event listener
  useEffect(() => {
    // Thêm event listener 'mousedown' để lắng nghe sự kiện click outside
    document.addEventListener('mousedown', handleClickOutside)
    // Xóa event listener khi component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Sử dụng useEffect để scroll xuống cuối danh sách tin nhắn khi có tin nhắn mới
  useEffect(() => {
    props.handleToBottom()
  }, [messages])

  // Render component
  return (
    <div id='messages' className='mx-2'>
      {messages.map((item, index) =>
        // Nếu người gửi tin nhắn là user hiện tại thì hiển thị tin nhắn ở bên phải
        item.sender != null && sessionId == item.sender._id ? (
          <div
            key={index}
            className='flex justify-end'
            onMouseEnter={() => handleMessageHover(item._id)}
            onMouseLeave={() => handleMessageHover(null)}
          >
            {/* Component FeatureAI */}
            <div
              className={`${
                isOptionSelected && activeMessageOptionID == item._id
                  ? 'opacity-100'
                  : hoveredMessage == item._id
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-100'
              }`}
              ref={optionRef}
            >
              <FeatureAI
                message={item.message}
                id={item._id}
                callBackOptionClick={handleOptionClick}
              />
            </div>

            {/* Tin nhắn */}
            <div className='relative'>
              <div
                className={`my-4 max-w-xs break-words rounded-lg bg-blue-200 p-2 ${item.isSpoiled || item.isSpoiled === undefined ? 'show' : 'hide'}`}
                style={{
                  fontWeight: item.styles.bold ? 'bold' : 'normal',
                  fontStyle: item.styles.italic ? 'italic' : 'normal',
                  textDecoration: item.styles.underline ? 'underline' : 'none',
                }}
                onClick={() => handleSpoiledClick(item._id)}
              >
                {/* Hiển thị nội dung tin nhắn dựa vào messageType */}
                <RenderMessage item={item} />
              </div>
              {/* Component FeatureEmoji */}
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

              {/* Nút emoji */}
              <div
                className={`absolute bottom-px right-px p-0.5 hover:bg-blue-400 rounded-md${
                  hoveredMessage == item._id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
                ref={buttonRef}
                onClick={() => handleEmoteClick(item._id)}
              >
                {/* Hiển thị danh sách emoji đã react */}
                {item.emojiBy.length != 0 ? (
                  item.emojiBy.map((emote, index) => emote.emoji != null && emote.emoji)
                ) : (
                  <MdOutlineEmojiEmotions size={14} />
                )}
              </div>
            </div>
          </div>
        ) : (
          // Nếu người gửi tin nhắn không phải là user hiện tại thì hiển thị tin nhắn ở bên trái
          <div
            key={index}
            className='flex'
            onMouseEnter={() => {
              handleMessageHover(item._id)
            }}
            onMouseLeave={() => handleMessageHover(null)}
          >
            {/* Tin nhắn */}
            <div className='relative'>
              <div className='my-4 max-w-xs break-words rounded-lg bg-gray-300 p-2 text-black'>
                {/* Hiển thị nội dung tin nhắn dựa vào messageType */}
                <RenderMessage item={item} />
              </div>
              {/* Nút emoji */}
              <div
                className={`absolute bottom-px right-px p-0.5 hover:bg-blue-400 rounded-md${
                  hoveredMessage == item._id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
                ref={buttonRef}
                onClick={() => handleEmoteClick(item._id)}
              >
                {/* Hiển thị danh sách emoji đã react */}
                {item.emojiBy.length != 0 ? (
                  item.emojiBy.map((emote, index) => emote.emoji != null && emote.emoji)
                ) : (
                  <MdOutlineEmojiEmotions size={14} />
                )}
              </div>
              {/* Component FeatureEmoji */}
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

            {/* Component FeatureAI */}
            <div
              className={`${
                isOptionSelected && activeMessageOptionID == item._id
                  ? 'opacity-100'
                  : hoveredMessage == item._id
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-100'
              }`}
              ref={optionRef}
            >
              <FeatureAI
                message={item.message}
                id={item._id}
                callBackOptionClick={handleOptionClick}
              />
            </div>
          </div>
        ),
      )}
    </div>
  )
})

export default DetailMessage
