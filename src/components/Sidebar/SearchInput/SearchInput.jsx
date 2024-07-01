import { CiSearch } from 'react-icons/ci'
import { MdClear } from 'react-icons/md'
import userService from '@/services/userService'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

const SearchInput = ({ setSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500)

  useEffect(() => {
    const fetchSearchUsers = async () => {
      try {
        if (debouncedSearchQuery[0]) {
          const response = await userService.searchUser(debouncedSearchQuery)
          setSearchResults(response)
        } else {
          setSearchResults([])
        }
      } catch (error) {
        console.error('Failed to search users', error)
      }
    }

    fetchSearchUsers()
  }, [debouncedSearchQuery, setSearchResults])

  const clearInput = () => {
    setSearchQuery('')
    setSearchResults([])
  }

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div>
      <form className='flex items-center gap-2' onSubmit={(e) => e.preventDefault()}>
        <label
          htmlFor='default-search'
          className='sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Search
        </label>
        <div className='relative focus:border-blue-500'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <CiSearch className='h-6 w-6 text-gray-500 outline-none dark:text-white' />
          </div>
          <input
            type='text'
            id='default-search'
            value={searchQuery}
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-6 py-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-slate-500 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='Search chats...'
            onChange={handleSearchInput}
          />
          {searchQuery && (
            <button
              type='button'
              onClick={clearInput}
              className='absolute inset-y-0 right-0 flex items-center pr-3 font-bold text-red-500 focus:outline-none'
            >
              <MdClear className='h-5 w-5' />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default SearchInput
