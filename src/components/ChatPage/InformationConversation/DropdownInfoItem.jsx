import React from 'react'

const DropdownInfoItem = ({ icon: Icon, label }) => {
  return (
    <div className='p-4  hover:bg-mainBlue rounded-md'>
      <li>
        <button
          id='setting'
          className='flex items-center cursor-pointer relative '
          style={{ width: '100%' }}
        >
          <Icon size={24} />
          <span className='ml-3 text-gray-900 text-sm font-medium'>{label}</span>
        </button>
      </li>
    </div>
  )
}

export default DropdownInfoItem
