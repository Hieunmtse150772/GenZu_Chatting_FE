import { getCookie } from "@/services/Cookies"

const RenderNotification = ({ item }) => {
    console.log('RenderNotification:', item)
    const userId = JSON.parse(getCookie('userLogin')).user._id

    switch (item.messageType) {
        case 'notification':
            if (item.message === '3001' || item.message === '3006') {
              if (item.affected_user_id && item.sender._id === userId && item.conversation.isGroupChat) {
                return (
                  <p>
                    {'Bạn vừa thêm ' +
                      item?.affected_user_id?.fullName +
                      ' vào nhóm ' +
                      item.conversation?.chatName}
                  </p>
                )
              } else if (
                item.affected_user_id &&
                item.affected_user_id?._id === userId &&
                item.conversation?.isGroupChat
              ) {
                return (
                  <p>{item.sender?.fullName + ' thêm bạn vào nhóm ' + item.conversation?.chatName}</p>
                )
              } else if (item.affected_user_id && item.conversation?.isGroupChat) {
                return (
                  <p>
                    {item.sender?.fullName +
                      ` thêm ${item.affected_user_id?.fullName} vào nhóm ` +
                      item.conversation?.chatName}
                  </p>
                )
              }
            }
            
            if(item.message === '7008'){
              return (
                <p className='text-gray-600 font-light italic'>{item.sender?.fullName +
                        ` vừa thay đổi background`}
                </p>
              )
            }
            break
        default:
            return null
    }
}
export default RenderNotification