import { useSelector } from 'react-redux'

export default function PopUpFindFriends() {
  let lsFriends = useSelector((state) => state.user.lsFriends)
  return (
    <div>
      PopUpFindFriends
      {console.log(lsFriends)}
    </div>
  )
}
