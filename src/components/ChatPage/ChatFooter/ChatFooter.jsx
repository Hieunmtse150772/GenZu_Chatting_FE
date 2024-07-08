import React, { useState, useRef, useEffect } from 'react'
import 'regenerator-runtime'
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
import { BiHide } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import EmojiMessage from '../../FeatureEmoji/EmojiMessage'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import './ChatFooter.css'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/utils/firebaseConfig'
import { useParams } from 'react-router-dom'
import { TiDeleteOutline } from 'react-icons/ti'
const ChatFooter = () => {
  const [showAttachments, setShowAttachments] = useState(false)
  const [isEmojiMsgClick, setIsEmojiMsgClick] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const buttonRef = useRef(null)
  const emoteRef = useRef(null)
  const [isTextSelected, setIsTextSelected] = useState(false)
  const [selectedText, setSelectedInput] = useState('')
  const [inputStr, setInputStr] = useState('')
  const [isSpoiled, setIsSpoiled] = useState(true)
  const [boldActive, setBoldActive] = useState(false)
  const [italicActive, setItalicActive] = useState(false)
  const [underlineActive, setUnderlineActive] = useState(false)
  const [isAiSuggestionClick, setIsAiSuggestionClick] = useState(true)
  const [showAnswerSuggestion, setShowAnswerSuggestion] = useState(false)
  const [indexAnswerText, setIndexAnswerText] = useState()

  const [answerArray, setAnswerArray] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [downloadURL, SetDownloadURL] = useState('')
  const dispatch = useDispatch()
  const selectedEmojis = useSelector((state) => state.message.selectedEmojis)
  const answerSuggestionAI = useSelector((state) => state.message.answerAI)
  console.log('answerSuggestionAI', answerSuggestionAI)
  const inputRef = useRef(null)
  const fileInputRefs = {
    file: useRef(null),
    image: useRef(null),
    video: useRef(null),
    audio: useRef(null),
  }

  const answerSuggRefs ={
    '0': useRef(null),
    '1': useRef(null),
    '2': useRef(null),
    '3': useRef(null),
  }

  const audioContainerRef = useRef(null)
  const param = useParams()
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition()

  useEffect(() => {
    if (transcript && !listening) {
      setInputStr((prevInput) => prevInput.trim() + ' ' + transcript.trim())
      resetTranscript()
    }
  }, [transcript, listening, resetTranscript])

  useEffect(() => {
    answerSuggestionAI.map((answer, index) => {
      if (answer.answerSuggestion) {
        let checkMutiAnswer = answer.answerSuggestion.split(/(?<=[.?!])\s+/)
        let answerText = typeof checkMutiAnswer === 'string' ? [checkMutiAnswer] : checkMutiAnswer
        setAnswerArray(answerText)
        // setInputStr(checkMutiAnswer)
        console.log('checkMutiAnswer', answerText)
        checkMutiAnswer != null
          ? setShowAnswerSuggestion(answer.isAnswerAI)
          : setShowAnswerSuggestion(false)
        setIndexAnswerText()
      }
      setIsAiSuggestionClick(answer.isAnswerAI)
    })
  }, [answerSuggestionAI])

  useEffect(() => {
    if (selectedEmojis.length > 0) {
      setInputStr((prev) => prev + selectedEmojis.join(''))
      dispatch(deleteEmoji())
    }
  }, [selectedEmojis, dispatch])

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
      handleSendMsg()
    }
  }

  const handleSendMsg = () => {
    if (selectedFile?.file) {
      handleSendFile()
    }
    if (inputStr != null && inputStr != undefined && inputStr != '') {
      const messageData = {
        message: inputStr,
        styles: {
          fontSize: 10,
          bold: boldActive,
          italic: italicActive,
          underline: underlineActive,
        },
        emojiBy: [],
        isSpoiled: isSpoiled,
        idConversation: param,
      }
      dispatch(sendMessage(messageData))
      dispatch(deleteEmoji())
      setInputStr('') // Clear input field after dispatch
      setBoldActive(false)
      setItalicActive(false)
      setUnderlineActive(false)
      setIsSpoiled(true)
      setShowAnswerSuggestion(!showAnswerSuggestion)
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

  const handleFileChange = async (event, type) => {
    const file = event.target.files[0]
    if (!file) return
    /// GỬi upload lên server và nhận url
    if (file) {
      setSelectedFile({ file: file, type: type })
      console.log(type)
      setPreviewUrl({ url: URL.createObjectURL(file), type: type }) // Tạo URL xem trước
    }
  }
  const handleSendFile = async () => {
    const storageRef = ref(storage, `${selectedFile.type}/${selectedFile.file.name}`)
    uploadBytes(storageRef, selectedFile.file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref)
      })
      .then((downloadURL) => {
        SetDownloadURL(downloadURL)
        const messageData = {
          message: downloadURL,
          styles: {
            fontSize: 10,
            bold: false,
            italic: false,
            underline: false,
          },
          emojiBy: [],
          isSpoiled: isSpoiled,
          idConversation: param,
          messageType: selectedFile.type,
        }
        dispatch(sendMessage(messageData))
        setPreviewUrl(null)
        setSelectedFile(null)
      })
      .catch((error) => {
        console.error('Error uploading file:', error)
      })
  }
  const handleFileButtonClick = (type) => {
    fileInputRefs[type].current.click()
    setShowAttachments(false)
  }

  const toggleAttachments = () => {
    setShowAttachments(!showAttachments)
  }

  const handleSpoiledClick = () => {
    setIsSpoiled(!isSpoiled)
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
      setIsEmojiMsgClick(false)
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

  const handleAnswerTextClick = (answerText,index) => {
    setInputStr(answerText)
    answerSuggRefs[index].current.click()
    setIndexAnswerText(index)
  }
  const onClose = (e) =>{
    setShowAnswerSuggestion(!showAnswerSuggestion)
  }

  return (
    <>
      {showAnswerSuggestion && (
        <div className='relative flex w-full space-x-2 select-none items-center justify-center font-mono'>
          <button
                  className='absolute right-8 top-0 text-gray-500 hover:text-gray-700'
                  onClick={onClose}>
              &times;
          </button>
          {answerArray.map(
              (answerText, index) =>
                index < 4 && (
                  indexAnswerText != index && (
                    <h1
                      key={index}
                      ref={answerSuggRefs[index]}
                      className='cursor-pointer rounded-lg bg-[#93c5fd] px-3 py-1 text-[15px] text-white shadow-lg shadow-gray-500/50 active:scale-[.97]'
                      onClick={() => handleAnswerTextClick(answerText, index)}
                    >
                      {answerText}
                    </h1>
                  )
                ),
            )}
        </div>
      )}
      <div>
        {previewUrl && (
          <div className='bg-white px-6 dark:bg-[#6c8ea3]'>
            <div className='relative inline-block'>
              {previewUrl.type == 'image' && (
                <img
                  src={previewUrl.url}
                  alt='Preview'
                  style={{ width: '100px', height: 'auto' }}
                />
              )}
              {previewUrl.type == 'video' && (
                <video
                  src={previewUrl.url}
                  alt='Preview'
                  style={{ width: '100px', height: 'auto' }}
                />
              )}
              {previewUrl.type == 'file' && (
                <a href={previewUrl.url} download>
                  <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAzHuAroNuDhtPXeGxXfL-Idoctgcv2wPggA&s'
                    alt='image file'
                    style={{ width: '100px', height: 'auto' }}
                  />
                </a>
              )}

              <button
                className='absolute -right-3 -top-3'
                onClick={() => {
                  setPreviewUrl(null)
                  setSelectedFile(null)
                }}
              >
                <TiDeleteOutline />
              </button>
            </div>
          </div>
        )}
        <div className='relative flex items-center rounded-lg bg-white px-4 pb-4 pt-1 dark:bg-[#6c8ea3]'>
          {/*  */}

          {!isAiSuggestionClick ? (
            // <div>Loading</div>
            // <div className="bg-[#cbd5dd] border py-2 px-5 flex items-center flex-col z-50 w-screen justify-center" >
            // </div>
            <div className='loader-dots relative mt-2 h-5 w-10/12'>
              <div className='absolute top-0 mt-1 h-3 w-3 rounded-full bg-[#93c5fd]'></div>
              <div className='absolute top-0 mt-1 h-3 w-3 rounded-full bg-[#93c5fd]'></div>
              <div className='absolute top-0 mt-1 h-3 w-3 rounded-full bg-[#93c5fd]'></div>
              <div className='absolute top-0 mt-1 h-3 w-3 rounded-full bg-[#93c5fd]'></div>
            </div>
          ) : (
            <input
              placeholder='Type your message...'
              onChange={handleChangeInput}
              onKeyDown={handleKeyPress}
              onFocus={handleFocus}
              ref={inputRef}
              value={inputStr}
              className={`flex-1 rounded-full border px-4 py-2 focus:outline-none ${isSpoiled ? 'show' : 'hide'}`}
              style={{
                fontWeight: boldActive ? 'bold' : 'normal',
                fontStyle: italicActive ? 'italic' : 'normal',
                textDecoration: underlineActive ? 'underline' : 'none',
              }}
            />
          )}

          {isTextSelected && (
            <div className='absolute -top-3 mx-auto flex cursor-pointer items-center justify-around rounded-lg bg-slate-200 p-2 shadow-lg'>
              <button
                className={`tool-btn ${isSpoiled ? 'hover:bg-neutral-300' : 'bg-blue-500 text-white'}`}
                onClick={handleSpoiledClick}
              >
                <BiHide size={22} />
              </button>
              <div className='divider'></div>
              <button onClick={() => toggleInlineStyle('bold')}>
                <VscBold
                  size={22}
                  className={`tool-btn ${boldActive ? 'bg-blue-500 text-white' : 'hover:bg-neutral-300'}`}
                />
              </button>
              <button onClick={() => toggleInlineStyle('italic')}>
                <GoItalic
                  size={22}
                  className={`tool-btn ${italicActive ? 'bg-blue-500 text-white' : 'hover:bg-neutral-300'}`}
                />
              </button>
              <button onClick={() => toggleInlineStyle('underline')}>
                <BsTypeUnderline
                  size={22}
                  className={`tool-btn ${underlineActive ? 'bg-blue-500 text-white' : 'hover:bg-neutral-300'}`}
                />
              </button>
            </div>
          )}
          <div
            className='absolute bottom-12 right-12 mx-auto flex cursor-pointer items-center justify-between rounded-full p-2'
            ref={emoteRef}
          >
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
              <button
                className='mx-auto rounded-full bg-slate-200 p-4 text-sky-500 hover:bg-blue-400 hover:text-white focus:outline-none dark:text-white'
                onClick={handleSendMsg}
              >
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
            accept='.zip,.rar,.7z,.tar,.pdf,.doc,.docx,.xls,.xlsx,.txt'
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
      </div>
    </>
  )
}

export default ChatFooter
