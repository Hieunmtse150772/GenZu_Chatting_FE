const UserInfoFriendRequest = ({ userInfo, onAccept, onCancel }) => {
  return (
    <li
      key={userInfo?._id}
      className='flex items-center justify-between rounded-lg bg-white p-4 shadow-md dark:bg-gray-800'
    >
      <img
        src={userInfo?.picture}
        alt='user avatar'
        className='h-12 w-12 rounded-full object-cover'
      />
      <div className='ml-4 flex-1'>
        <span className='block font-medium text-gray-800 dark:text-gray-200'>
          {userInfo?.fullName}
        </span>
        <div className='mt-2 flex space-x-2'>
          <button
            className='rounded border-b-2 border-b-blue-500 px-3 py-1 text-blue-500 hover:bg-red-600 hover:text-white'
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className='rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
            onClick={onAccept}
          >
            Accept
          </button>
        </div>
      </div>
    </li>
  )
}

export default UserInfoFriendRequest
