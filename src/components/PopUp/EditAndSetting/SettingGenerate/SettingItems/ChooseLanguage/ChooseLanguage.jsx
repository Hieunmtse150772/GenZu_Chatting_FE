import { useState } from 'react'
import InputLanguage from './InputLanguage/InputLanguage'
import { IoMdArrowBack } from 'react-icons/io'
import generalService from '@/services/generalService'
import { getCookie, setCookie } from '@/services/Cookies'
import i18n from 'i18next'
import { useTranslation } from 'react-i18next'

const ChooseLanguage = ({ onBack }) => {
  const defaultLanguage = JSON.parse(getCookie('userLogin'))?.user?.language
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage)
  const [isProcessing, setIsProcessing] = useState(false) // Thêm state để xử lý khi đang xử lý API

  const { t } = useTranslation()

  const handleLanguageChange = async (language) => {
    if (isProcessing) return // Nếu đang xử lý API thì không cho phép nhấn nút nữa
    setIsProcessing(true) // Đánh dấu đang xử lý API

    if (!['vn', 'en', 'jp'].includes(language)) {
      console.error('Invalid language:', language)
      setIsProcessing(false) // Đánh dấu kết thúc xử lý API
      return // Thực hiện xử lý lỗi tùy theo yêu cầu
    }

    setSelectedLanguage(language)
    try {
      // Gọi API để cập nhật ngôn ngữ
      const response = await generalService.changeLanguage(language)
      console.log('Language updated successfully', response)

      // Cập nhật cookie với ngôn ngữ mới
      setCookie(
        'userLogin',
        JSON.stringify({
          ...JSON.parse(getCookie('userLogin')),
          user: { ...JSON.parse(getCookie('userLogin')).user, language },
        }),
      )
      i18n.changeLanguage(language)
      console.log(JSON.parse(getCookie('userLogin'))?.user?.language)
    } catch (error) {
      console.error('Failed to update language', error)
      setSelectedLanguage(defaultLanguage) // Đặt lại ngôn ngữ được chọn trở lại ngôn ngữ mặc định từ cookie
    } finally {
      setIsProcessing(false) // Kết thúc xử lý API sau khi hoàn thành
    }
  }

  return (
    <div className='z-10 flex w-full translate-x-0 transform flex-col transition-transform'>
      <div className='flex w-auto cursor-pointer items-center justify-start border-b-2 border-gray-200 bg-white p-2'>
        <button onClick={onBack} className='mr-4'>
          <IoMdArrowBack size={22} />
        </button>
        <h3 className='text-xl font-semibold'>{t('language')}</h3>
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
            languageValue={'vn'}
            labelName={'Vietnamese'}
            onChange={() => handleLanguageChange('vn')}
            checked={selectedLanguage === 'vn'}
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
