import React from 'react'

export default function SearchFriends(searchResults) {
  return (
    <ul className='mt-2 h-screen overflow-y-auto'>
      {searchResults.user.map((result) => (
        <li key={result._id} className='group relative cursor-pointer border-b border-gray-300 p-2'>
          <img
            src={result?.image || userIcon}
            alt='user avatar'
            className='h-12 w-12 rounded-full object-cover'
          />
          <div className='flex w-full flex-col gap-2 truncate dark:text-white'>
            <h3 className='truncate text-sm font-semibold'>{result?.fullName}</h3>
            <p className='truncate text-sm text-gray-500 dark:text-slate-500'></p>
          </div>
        </li>
      ))}
    </ul>
  )
}
