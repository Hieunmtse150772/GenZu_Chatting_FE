import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { getCookie } from './services/Cookies'
import translationEN from '@/locales/en/translation.json'
import translationVN from '@/locales/vn/translation.json'
import translationJP from '@/locales/jp/translation.json'

const resources = {
  en: {
    translation: translationEN,
  },
  vn: {
    translation: translationVN,
  },
  jp: {
    translation: translationJP,
  },
}

const defaultLanguage = JSON.parse(getCookie('userLogin'))?.user?.language

i18n
  .use(initReactI18next) // Pass i18n instance vào react-i18next
  .init({
    resources,
    lng: defaultLanguage,
    fallbackLng: 'en', // Ngôn ngữ mặc định nếu không tìm thấy ngôn ngữ phù hợp
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
