import ChatHeader from '../ChatHeader/ChatHeader'
import ChatFooter from '../ChatFooter/ChatFooter'
import DetailMessage from './DetailMessage/DetailMessage'
import { useSelector } from 'react-redux'

function ChatBody({ toggleInfo }) {
  let message = useSelector((state) => state.message.message)
  return (
    <div className='mx-2 flex h-screen w-full flex-col shadow-2xl dark:bg-[#587e91]'>
      <ChatHeader toggleInfo={toggleInfo} />
      <div className='no-scrollbar flex flex-grow flex-col space-y-2 overflow-y-auto'>
        {/* <!-- Messages go here -->
                <!-- Example Message --> */}
        <DetailMessage inforMessage={message} />
      </div>
      <ChatFooter />
    </div>
  )
}

export default ChatBody
