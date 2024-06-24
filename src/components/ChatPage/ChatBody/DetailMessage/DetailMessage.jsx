import { useRef, useState, useEffect } from 'react'
import FeatureAI from '../FeatureAI/FeatureAI'
import { useSelector } from 'react-redux'
import { MdOutlineEmojiEmotions } from "react-icons/md";
// import FeatureEmoji from '../../../FeatureEmoji/FeatureEmoji';

/* eslint-disable react/prop-types */
export default function DetailMessage(props) {
  const [isOptionBtnClick, setIsOptionBtnClick] = useState(false)
  
  const [isEmoteBtnClick, setEmoteBtnClick] = useState(false)

  const [activeMessageID, setActiveMessageID] = useState(null)


  const handleUserClick = (id) => {
    setActiveMessageID(id)
  }
  const dropdownRef = useRef(null)
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

  const handleEmoteClick = (e) =>{
    e.preventDefault();
    setEmoteBtnClick(!isEmoteBtnClick);

  }

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
            <div className='relative my-1 max-w-xs rounded-lg bg-blue-200 p-3.5 text-black'>
              {item.message}
                 {/* emote */}
                <div className= {`absolute right-px bottom-px  hover:bg-blue-400 rounded-md p-1 ${
                                    isOptionBtnClick && activeMessageID == item.id_message
                                      ? "opacity-100"
                                      : "opacity-0 group-hover:opacity-100"
                                      }`}>
                  <MdOutlineEmojiEmotions  size={14}/>
                </div>
            </div>
          </div>
        ) : (
          <div
            key={index}
            className='flex'
            onMouseEnter={() => {
              setIsOptionBtnClick(true)
              handleUserClick(item.id_message)
            }}
            onMouseLeave={() => setIsOptionBtnClick(false)}
          >
            <div className='relative my-1 max-w-xs rounded-lg bg-gray-300 p-3.5 text-black'>
              {item.message}
                 {/* emote */}
              <div className= {`absolute right-px bottom-px  hover:bg-blue-400 rounded-md p-1 ${
                                  isOptionBtnClick && activeMessageID == item.id_message
                                    ? "opacity-100"
                                    : "opacity-0 group-hover:opacity-100"
                                    }`}
                    onClick={handleEmoteClick}>
                <MdOutlineEmojiEmotions  size={14}/>
              </div>
            </div>
            {/* open dropdown emoji */}
              {/* {isEmoteBtnClick && activeMessageID == item.id_message ? <FeatureEmoji /> : <></>} */}

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
