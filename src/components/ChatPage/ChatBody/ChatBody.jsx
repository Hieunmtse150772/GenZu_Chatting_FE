import ChatHeader from '../ChatHeader/ChatHeader' // Import component ChatHeader từ đường dẫn tương đối
import ChatFooter from '../ChatFooter/ChatFooter' // Import component ChatFooter từ đường dẫn tương đối
import DetailMessage from './DetailMessage/DetailMessage' // Import component DetailMessage từ đường dẫn tương đối
import { useDispatch, useSelector } from 'react-redux' // Import hook useSelector từ thư viện react-redux
import { IoMdArrowRoundDown } from 'react-icons/io' // Import icon IoMdArrowRoundDown từ thư viện react-icons/io
import { useEffect, useRef, useState } from 'react' // Import hook useEffect, useState từ thư viện react
import { useParams } from 'react-router-dom'
import { getMessagesMore } from '@/redux/Slice/messageSlice'
import { setLoadMore } from '@/redux/Slice/chatSlice'

function ChatBody({ toggleInfo }) {
  // Component ChatBody nhận props toggleInfo
  const page = useSelector((state) => state.chat.page)
  const loadMore = useSelector((state) => state.chat.loadMore)
  const idConversation = useParams()
  const dispatch = useDispatch()
  const messagesListRef = useRef(null)
  const [scrollHeight, setScrollHeight] = useState(0)
  // Hàm xử lý sự kiện scroll của danh sách tin nhắn
  const showGoToBottomBtn = (e) => {
    const element = document.getElementById('messages-list') // Lấy element có id là "messages-list"
    const elementBottomBtn = document.getElementById('to-bottom-button') // Lấy element có id là "to-bottom-button"

    // Kiểm tra vị trí scroll hiện tại của danh sách tin nhắn
    // Nếu vị trí scroll nằm trong khoảng từ 0 đến (chiều cao của danh sách - 1250)
    // thì hiển thị nút "Go To Bottom", ngược lại thì ẩn nút đi
    if (element.scrollTop >= 0 && element.scrollTop < element.scrollHeight - 1250) {
      elementBottomBtn.classList.remove('hidden')
      elementBottomBtn.classList.add('flex')
    } else {
      elementBottomBtn.classList.remove('flex')
      elementBottomBtn.classList.add('hidden')
    }
  }
  // Hàm xử lý khi scroll tới top
  const handleScrollToTop = (e) => {
    const element = document.getElementById('messages-list')
    if (element.scrollTop === 0) {
      // Gọi API để lấy thêm tin nhắn mới ở đây
      dispatch(getMessagesMore({ idConversation: idConversation.idConversation, page: page }))
      dispatch(setLoadMore(true))
      console.log('in top')
      setScrollHeight(element.scrollHeight)
      // setTimeout(() => {
      //   const scrollHeightAfterUpdate = element.scrollHeight

      //   console.log(scrollHeightAfterUpdate)
      //   // Gán trực tiếp độ lệch cho scrollTop
      //   element.scrollTop = scrollHeightAfterUpdate
      // }, 0)
    }
  }
  // Hàm xử lý sự kiện click vào nút "Go To Bottom"
  const goToBottom = (e) => {
    const element = document.getElementById('messages-list') // Lấy element có id là "messages-list"
    const elementBottomBtn = document.getElementById('to-bottom-button') // Lấy element có id là "to-bottom-button"

    element.scrollTop = element.scrollHeight // Đặt vị trí scroll của danh sách tin nhắn xuống cuối cùng
    elementBottomBtn.classList.remove('flex') // Ẩn nút "Go To Bottom" đi
    elementBottomBtn.classList.add('hidden')
    // element.scrollTo({ bottom: 0, behavior: 'smooth' });
  }

  // useEffect(() =>{
  //   const element = document.getElementById("messages-list");
  //   element.scrollTop = element.scrollHeight;
  // }, [DetailMessage])
  useEffect(() => {
    if (!loadMore) {
      const element = document.getElementById('messages-list')
      element.scrollTop = element.scrollTop - scrollHeight
    }
  }, [loadMore])
  return (
    <div className='mx-0 flex h-screen w-full flex-col shadow-2xl dark:bg-[#587e91] md:mx-2'>
      <ChatHeader toggleInfo={toggleInfo} /> {console.log(page)}
      {/* Hiển thị component ChatHeader với props toggleInfo được truyền vào */}
      <div
        id='messages-list'
        className='no-scrollbar flex flex-grow flex-col space-y-2 overflow-y-auto'
        onScroll={(e) => {
          showGoToBottomBtn(e)
          handleScrollToTop(e)
        }}
        ref={messagesListRef} // Gắn ref cho danh sách tin nhắn
      >
        <DetailMessage handleToBottom={goToBottom} />{' '}
        {/* Hiển thị component DetailMessage với props handleToBottom được truyền vào */}
        {/* Nút "Go To Bottom" */}
        <button
          id='to-bottom-button'
          title='Go To Bottom'
          className='z-90 fixed bottom-20 right-80 hidden items-center space-x-0.5 rounded-full border-0 text-xs font-bold text-blue-600 drop-shadow-md'
          onClick={goToBottom} // Gọi hàm goToBottom khi nút được click
        >
          <IoMdArrowRoundDown size={12} /> {/* Hiển thị icon mũi tên xuống */}
          <p className=''>Has a new message</p> {/* Hiển thị text "Has a new message" */}
        </button>
      </div>
      <ChatFooter /> {/* Hiển thị component ChatFooter */}
    </div>
  )
}

export default ChatBody // Xuất component ChatBody để sử dụng ở nơi khác
