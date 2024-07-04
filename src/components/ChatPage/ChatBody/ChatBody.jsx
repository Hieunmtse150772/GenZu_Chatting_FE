import ChatHeader from '../ChatHeader/ChatHeader'
import ChatFooter from '../ChatFooter/ChatFooter'
import DetailMessage from './DetailMessage/DetailMessage'
import { useSelector } from 'react-redux'
import { IoMdArrowRoundDown } from "react-icons/io";
import { useEffect, useState } from 'react';


function ChatBody({ toggleInfo }) {

  const[scrollTop, setScrollTop] = useState(0)
  
  const showGoToBottomBtn = (e) =>{
    const element = document.getElementById("messages-list");
    const elementBottomBtn = document.getElementById("to-bottom-button");
    // console.log('scrollTOp:', element.scrollTop)
    if (element.scrollTop >= 0 && element.scrollTop < (element.scrollHeight - 1250)) {
        elementBottomBtn.classList.remove("hidden");
        elementBottomBtn.classList.add("flex");

      } else {
        elementBottomBtn.classList.remove("flex");
        elementBottomBtn.classList.add("hidden");
      }
  }
  const goToBottom = (e) =>{
    const element = document.getElementById("messages-list");
    const elementBottomBtn = document.getElementById("to-bottom-button");

    element.scrollTop = element.scrollHeight;
    elementBottomBtn.classList.remove("flex");
    elementBottomBtn.classList.add("hidden");
    // element.scrollTo({ bottom: 0, behavior: 'smooth' });

  }

  // useEffect(() =>{
  //   const element = document.getElementById("messages-list");
  //   element.scrollTop = element.scrollHeight;
  // }, [DetailMessage])

  return (
    <div className='mx-0 flex h-screen w-full flex-col shadow-2xl dark:bg-[#587e91] md:mx-2'>
      <ChatHeader toggleInfo={toggleInfo} />
      <div id='messages-list' className='no-scrollbar flex flex-grow flex-col space-y-2 overflow-y-auto' onScroll={showGoToBottomBtn}>
        {/* <!-- Messages go here -->
                <!-- Example Message --> */}
        <DetailMessage handleToBottom={goToBottom}/>
        <button id='to-bottom-button' title="Go To Top"
                  className='fixed z-90 bottom-20 right-80 items-center space-x-0.5 
                              border-0 rounded-full drop-shadow-md
                            text-blue-600 text-xs font-bold hidden'
                  onClick={goToBottom}>
              <IoMdArrowRoundDown size={12}/>
              <p className=''>Has a new message</p>
        </button>
      </div>
      <ChatFooter />
    </div>
  )
}

export default ChatBody
