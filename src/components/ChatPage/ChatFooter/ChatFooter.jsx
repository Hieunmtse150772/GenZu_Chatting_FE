import React, { useState, useRef, useEffect } from 'react'
import { Editor, EditorState, RichUtils, ContentState } from 'draft-js'
import 'draft-js/dist/Draft.css'
import 'regenerator-runtime'
import { MdOutlineKeyboardVoice, MdAttachFile, MdInsertEmoticon } from 'react-icons/md'
import { LuSend } from 'react-icons/lu'
import { FaFile, FaImage, FaVideo, FaHeadphones } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { sendMessage } from '../../../redux/Slice/messageSlice'
import AttachmentButton from '../../Button/AttachmentButton'
import { VscBold } from 'react-icons/vsc'
import { GoItalic } from 'react-icons/go'
import { BsTypeUnderline } from 'react-icons/bs'
import { AudioRecorder } from 'react-audio-voice-recorder'
import FeatureEmoji from '../../FeatureEmoji/FeatureEmoji'
import { stateFromHTML } from 'draft-js-import-html'
import { stateToHTML } from 'draft-js-export-html'
import './ChatFooter.css'
import Dictaphone from '../../Dictaphone/Dictaphone'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const ChatFooter = () => {
  const [showAttachments, setShowAttachments] = useState(false)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [isEmoteBtnClick, setEmoteBtnClick] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const buttonRef = useRef(null)
  const emoteRef = useRef(null)
  const [isTextSelected, setIsTextSelected] = useState(false)

  const dispatch = useDispatch()
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
      const contentState = editorState.getCurrentContent()
      const updatedContentState = ContentState.createFromText(
        contentState.getPlainText() + ' ' + transcript,
      )
      setEditorState(EditorState.createWithContent(updatedContentState))
      resetTranscript()
    }
  }, [transcript, listening, editorState, resetTranscript])

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

  const handleEditorChange = (state) => {
    setEditorState(state)
    const selectionState = state.getSelection()
    setIsTextSelected(!selectionState.isCollapsed())
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      const contentState = editorState.getCurrentContent()
      const plainText = contentState.getPlainText()
      if (plainText.trim() !== '') {
        dispatch(sendMessage(plainText))
        setEditorState(EditorState.createEmpty())
        clearAudioElements()
      }
    }
  }

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style))
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

  const handleEmoteClick = (e) => {
    e.preventDefault()
    setEmoteBtnClick(!isEmoteBtnClick)
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

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='relative flex items-center rounded-lg bg-white p-4 dark:bg-[#6c8ea3]'>
      <div className='flex-1'>
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          placeholder='Type your message...'
          handleReturn={(e) => {
            handleKeyPress(e)
            return 'handled'
          }}
          spellCheck={true}
        />
      </div>
      {isTextSelected && (
        <div className='absolute -top-4 mx-auto flex cursor-pointer items-center justify-between rounded-full bg-slate-300 p-2'>
          <button onClick={() => toggleInlineStyle('BOLD')}>
            <VscBold size={22} className='mx-1' />
          </button>
          <button onClick={() => toggleInlineStyle('ITALIC')}>
            <GoItalic size={22} className='mx-1' />
          </button>
          <button onClick={() => toggleInlineStyle('UNDERLINE')}>
            <BsTypeUnderline size={22} className='mx-1' />
          </button>
        </div>
      )}
      <div
        className='absolute bottom-12 right-12 mx-auto flex cursor-pointer items-center justify-between rounded-full p-2'
        ref={emoteRef}
      >
        {isEmoteBtnClick && <FeatureEmoji isActive={false}/>}
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
            onClick={handleEmoteClick}
          >
            <MdInsertEmoticon size={24} />
          </button>
          <button
            className='rounded-full bg-blue-500 p-3 hover:bg-blue-600 focus:outline-none dark:text-white'
            onClick={() => handleKeyPress({ keyCode: 13 })}
          >
            <LuSend size={16} />
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
      {/* <input
        type='file'
        accept='audio/*'
        ref={fileInputRefs.audio}
        className='hidden'
        onChange={(e) => handleFileChange(e, 'audio')}
      /> */}
    </div>
  )
}

export default ChatFooter
