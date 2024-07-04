import ChatHeader from '../ChatHeader/ChatHeader'
import ChatFooter from '../ChatFooter/ChatFooter'
import DetailMessage from './DetailMessage/DetailMessage'

function ChatBody({ toggleInfo }) {
  return (
    <div className='mx-0 flex h-screen w-full flex-col shadow-2xl dark:bg-[#587e91] md:mx-2'>
      <ChatHeader toggleInfo={toggleInfo} />
      <div className='no-scrollbar flex flex-grow flex-col space-y-2 overflow-y-auto'>
        {/* <!-- Messages go here -->
                <!-- Example Message --> */}
        <DetailMessage />
      </div>
      <ChatFooter />
    </div>
  )
}

export default ChatBody
