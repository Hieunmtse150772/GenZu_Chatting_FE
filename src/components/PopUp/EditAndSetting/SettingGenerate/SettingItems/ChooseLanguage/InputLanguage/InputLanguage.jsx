import React from 'react'

const InputLanguage = ({ languageValue, labelName, onChange, checked }) => {
  return (
    <div className='flex-start my-2 flex cursor-pointer items-center'>
      <input
        type='radio'
        id={languageValue}
        name='language'
        value={languageValue}
        className='mr-2 h-5 w-5 cursor-pointer'
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={languageValue} className='ml-8'>
        {labelName}
      </label>
    </div>
  )
}

export default InputLanguage
