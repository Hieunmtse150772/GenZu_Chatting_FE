import React from 'react'

const DropdownItem = ({ icon: Icon, label, onClick, dropdownStyle, iconStyle }) => {
  return (
    <div
      className={`flex cursor-pointer items-center rounded-lg hover:bg-gray-100 ${dropdownStyle}`}
      onClick={onClick}
    >
      <Icon className={`-mr-1 rounded-full bg-slate-200 hover:bg-slate-300 ${iconStyle}`} />
      <span className='ml-4'>{label}</span>
    </div>
  )
}

export default DropdownItem
