import React, { useState, useRef, useEffect } from 'react'
import 'regenerator-runtime'
import 'draft-js/dist/Draft.css'
import { MdOutlineKeyboardVoice, MdAttachFile, MdInsertEmoticon } from 'react-icons/md'
import { LuSend } from 'react-icons/lu'
import { FaFile, FaImage, FaVideo } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { sendMessage, deleteEmoji } from '../../../redux/Slice/messageSlice'
import AttachmentButton from '../../Button/AttachmentButton'
import { VscBold } from 'react-icons/vsc'
import { GoItalic } from 'react-icons/go'
import { BsTypeUnderline } from 'react-icons/bs'
import { AudioRecorder } from 'react-audio-voice-recorder'
import FeatureEmoji from '../../FeatureEmoji/FeatureEmoji'
import { useSelector } from 'react-redux'
import EmojiMessage from '../../FeatureEmoji/EmojiMessage'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import './ChatFooter.css'

const ChatFooter = () => {
  const [showAttachments, setShowAttachments] = useState(false)
  const [isEmoteBtnClick, setEmoteBtnClick] = useState(false)
  const [isEmojiMsgClick, setIsEmojiMsgClick] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const buttonRef = useRef(null)
  const emoteRef = useRef(null)
  const [isTextSelected, setIsTextSelected] = useState(false)
  const [selectedText, setSelectedInput] = useState('')
  const [inputStr, setInputStr] = useState('')
  const [boldActive, setBoldActive] = useState(false)
  const [italicActive, setItalicActive] = useState(false)
  const [underlineActive, setUnderlineActive] = useState(false)
  const dispatch = useDispatch()
  const selectedEmojis = useSelector((state) => state.message.selectedEmojis)
  const inputRef = useRef(null)
  const fileInputRefs = {
    file: useRef(null),
    image: useRef(null),
    video: useRef(null),
    audio: useRef(null),
  }
  const audioContainerRef = useRef(null)

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition()

  useEffect(() => {
    if (transcript && !listening) {
      setInputStr((prevInput) => prevInput.trim() + ' ' + transcript.trim())
      resetTranscript()
    }
  }, [transcript, listening, resetTranscript])

  useEffect(() => {
    if (selectedEmojis) {
      setInputStr(selectedEmojis.join(''))
    }
  }, [selectedEmojis])

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob)
    const audioWrapper = document.createElement('div')
    audioWrapper.className = 'audio-wrapper'

    const audio = document.createElement('audio')
    audio.src = url
    audio.controls = true
    audio.className = 'audio-element'

    const deleteButton = document.createElement('button')
    deleteButton.className = 'delete-button'
    deleteButton.innerHTML = '×'
    deleteButton.onclick = () => {
      audioWrapper.remove()
    }

    audioWrapper.appendChild(audio)
    audioWrapper.appendChild(deleteButton)

    if (audioContainerRef.current) {
      audioContainerRef.current.appendChild(audioWrapper)
    }
  }

  const clearAudioElements = () => {
    if (audioContainerRef.current) {
      audioContainerRef.current.innerHTML = ''
    }
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      const messageData = {
        message: inputStr,
        styles: {
          bold: boldActive,
          italic: italicActive,
          underline: underlineActive,
        },
      }
      dispatch(sendMessage(messageData))
      dispatch(deleteEmoji())
      setInputStr('') // Clear input field after dispatch
      setBoldActive(false)
      setItalicActive(false)
      setUnderlineActive(false)
    }
  }

  const toggleInlineStyle = (style) => {
    switch (style) {
      case 'bold':
        setBoldActive(!boldActive)
        break
      case 'italic':
        setItalicActive(!italicActive)
        break
      case 'underline':
        setUnderlineActive(!underlineActive)
        break
      default:
        break
    }
  }

  const handleFileChange = (event, type) => {
    const files = event.target.files
    // Xử lý khi người dùng chọn file
  }

  const handleFileButtonClick = (type) => {
    fileInputRefs[type].current.click()
  }

  const toggleAttachments = () => {
    setShowAttachments(!showAttachments)
  }

  const startRecording = () => {
    if (!browserSupportsSpeechRecognition) {
      console.error('Browser does not support speech recognition.')
      return
    }
    setIsRecording(true)
    SpeechRecognition.startListening({ continuous: true })
  }

  const stopRecording = () => {
    setIsRecording(false)
    SpeechRecognition.stopListening()
  }

  // const handleEmoteClick = (e) => {
  //   e.preventDefault()
  //   setEmoteBtnClick(!isEmoteBtnClick)
  // }

  const handleEmojiMsgClick = (e) => {
    e.preventDefault()
    setIsEmojiMsgClick(!isEmojiMsgClick)
  }

  const onDataRecorded = (data) => {
    setAudioBlob(data.blob)
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

  const handleFocus = () => {
    document.addEventListener('selectionchange', checkSelection)
  }

  const checkSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString()) {
      setIsTextSelected(true)
      setSelectedInput(selection.toString())
    } else {
      setIsTextSelected(false)
      setSelectedInput('')
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleChangeInput = (e) => {
    setInputStr(e.target.value)
  }

  return (
    <div className='relative flex items-center rounded-lg bg-white p-4 dark:bg-[#6c8ea3]'>
      <input
        placeholder='Type your message...'
        onChange={handleChangeInput}
        onKeyDown={handleKeyPress}
        onFocus={handleFocus}
        ref={inputRef}
        value={inputStr}
        className='flex-1 rounded-full border px-4 py-2 focus:outline-none'
        style={{
          fontWeight: boldActive ? 'bold' : 'normal',
          fontStyle: italicActive ? 'italic' : 'normal',
          textDecoration: underlineActive ? 'underline' : 'none',
        }}
      />
      {isTextSelected && (
        <div className='absolute -top-3 mx-auto flex cursor-pointer items-center justify-around rounded-lg bg-slate-200 p-2 shadow-lg'>
          <button onClick={() => toggleInlineStyle('bold')}>
            <VscBold
              size={22}
              className={`mx-2 cursor-pointer rounded-lg text-lg ${boldActive ? 'bg-blue-500 text-white' : 'hover:bg-neutral-300'}`}
            />
          </button>
          <button onClick={() => toggleInlineStyle('italic')}>
            <GoItalic
              size={22}
              className={`mx-2 cursor-pointer rounded-lg text-lg ${italicActive ? 'bg-blue-500 text-white' : 'hover:bg-neutral-300'}`}
            />
          </button>
          <button onClick={() => toggleInlineStyle('underline')}>
            <BsTypeUnderline
              size={22}
              className={`mx-2 cursor-pointer rounded-lg text-lg ${underlineActive ? 'bg-blue-500 text-white' : 'hover:bg-neutral-300'}`}
            />
          </button>
        </div>
      )}
      <div
        className='absolute bottom-12 right-12 mx-auto flex cursor-pointer items-center justify-between rounded-full p-2'
        ref={emoteRef}
      >
        {isEmoteBtnClick && <FeatureEmoji isActive={false} />}
        {isEmojiMsgClick && <EmojiMessage />}
      </div>
      <div className='mx-auto overflow-x-hidden font-semibold md:flex md:items-center'>
        <div className='flex items-center justify-between'>
          <AudioRecorder
            onRecordingComplete={addAudioElement}
            record={isRecording}
            title={'Record your message'}
            onStop={(data) => onDataRecorded(data)}
            audioURL={(audioBlob && URL.createObjectURL(audioBlob)) || ''}
          />
          <div
            ref={audioContainerRef}
            className={audioContainerRef === null ? 'hidden' : 'mx-1 flex items-center'}
          ></div>
          <button
            className='rounded-md p-1 hover:bg-blue-400 dark:text-white md:block'
            onClick={toggleAttachments}
          >
            <MdAttachFile size={24} />
          </button>
          <button
            className='mr-2 rounded-md p-1 hover:bg-blue-400 dark:text-white md:block'
            ref={buttonRef}
            onClick={handleEmojiMsgClick}
          >
            <MdInsertEmoticon size={24} />
          </button>
          <button className='mx-auto rounded-full bg-slate-200 p-4 text-sky-500 hover:bg-blue-400 hover:text-white focus:outline-none dark:text-white'>
            <LuSend size={18} />
          </button>
        </div>
      </div>
      <div
        className={`absolute bottom-20 right-20 flex flex-col space-y-2 transition-transform duration-300 ease-in-out ${
          showAttachments
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <AttachmentButton
          icon={FaFile}
          color={'blue'}
          onAttachBtnClick={() => handleFileButtonClick('file')}
        />
        <AttachmentButton
          icon={FaImage}
          color={'blue'}
          onAttachBtnClick={() => handleFileButtonClick('image')}
        />
        <AttachmentButton
          icon={FaVideo}
          color={'red'}
          onAttachBtnClick={() => handleFileButtonClick('video')}
        />
        <button
          className={`mx-auto rounded-full p-3 focus:outline-none dark:text-white ${
            listening ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'
          }`}
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
        >
          <MdOutlineKeyboardVoice size={22} />
        </button>
      </div>
      {/* Input fields for file selection */}
      <input
        type='file'
        ref={fileInputRefs.file}
        className='hidden'
        onChange={(e) => handleFileChange(e, 'file')}
      />
      <input
        type='file'
        accept='image/*'
        ref={fileInputRefs.image}
        className='hidden'
        onChange={(e) => handleFileChange(e, 'image')}
      />
      <input
        type='file'
        accept='video/*'
        ref={fileInputRefs.video}
        className='hidden'
        onChange={(e) => handleFileChange(e, 'video')}
      />
    </div>
  )
}

export default ChatFooter
