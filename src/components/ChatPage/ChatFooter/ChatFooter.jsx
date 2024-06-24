import React, { useState, useRef } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import 'draft-js/dist/Draft.css'
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
import './ChatFooter.css' // Đảm bảo rằng bạn đã thêm file CSS vào đây

const ChatFooter = () => {
  const [showAttachments, setShowAttachments] = useState(false)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [isTextSelected, setIsTextSelected] = useState(false)
  const [isRecording, setIsRecording] = useState(false) // Trạng thái ghi âm
  const [audioBlob, setAudioBlob] = useState(null) // Blob audio ghi âm
  const dispatch = useDispatch()
  const fileInputRefs = {
    file: useRef(null),
    image: useRef(null),
    video: useRef(null),
    audio: useRef(null),
  }

  const audioContainerRef = useRef(null)

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
        setEditorState(EditorState.createEmpty()) // Xóa nội dung editor sau khi gửi tin nhắn
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
    setIsRecording(true) // Bắt đầu ghi âm khi nhấn nút
  }

  const stopRecording = () => {
    setIsRecording(false) // Dừng ghi âm khi nhấn nút
  }

  const onDataRecorded = (data) => {
    setAudioBlob(data.blob) // Lưu trữ blob audio
  }

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
            className={audioContainerRef === null ? 'hidden' : 'mx-1 block'}
          ></div>
          <button
            className='rounded-md p-1 hover:bg-blue-400 dark:text-white md:block'
            onClick={toggleAttachments}
          >
            <MdAttachFile size={24} />
          </button>
          <button className='mr-2 rounded-md p-1 hover:bg-blue-400 dark:text-white md:block'>
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
          color={'blue'}
          onAttachBtnClick={() => handleFileButtonClick('video')}
        />
        <AttachmentButton
          icon={FaHeadphones}
          color={'blue'}
          onAttachBtnClick={() => handleFileButtonClick('audio')}
        />
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
    </div>
  )
}

export default ChatFooter
