import React, { useState } from 'react'
import InputLanguage from './InputLanguage/InputLanguage'
import { IoMdArrowBack } from 'react-icons/io'
import generalService from '@/services/generalService'

const ChooseLanguage = ({ onBack }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('')

  const handleLanguageChange = async (language) => {
    setSelectedLanguage(language)
    try {
      const response = await generalService.changeLanguage(language)
      console.log(response)
      console.log('Language updated successfully')
    } catch (error) {
      console.error('Failed to update language', error)
    }
  }

  return (
    <div className='z-10 flex w-full translate-x-0 transform flex-col transition-transform'>
      <div className='flex w-auto cursor-pointer items-center justify-start border-b-2 border-gray-200 bg-white p-2'>
        <button onClick={onBack} className='mr-4'>
          <IoMdArrowBack size={22} />
        </button>
        <h3 className='text-xl font-semibold'>Language</h3>
      </div>

      <div className='flex w-full flex-col rounded-lg p-4'>
        <div className='flex-start flex flex-col'>
          <InputLanguage
            languageValue={'en'}
            labelName={'English'}
            onChange={() => handleLanguageChange('en')}
            checked={selectedLanguage === 'en'}
          />
          <InputLanguage
            languageValue={'vi'}
            labelName={'Vietnamese'}
            onChange={() => handleLanguageChange('vi')}
            checked={selectedLanguage === 'vi'}
          />
          <InputLanguage
            languageValue={'jp'}
            labelName={'Japanese'}
            onChange={() => handleLanguageChange('jp')}
            checked={selectedLanguage === 'jp'}
          />
        </div>
      </div>
    </div>
  )
}

export default ChooseLanguage
