import { CiSettings } from 'react-icons/ci'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { GrSecure } from 'react-icons/gr'
import { GoDatabase } from 'react-icons/go'
import { IoLanguageOutline } from 'react-icons/io5'
import { PiStickerLight } from 'react-icons/pi'
import { LuFileQuestion } from 'react-icons/lu'
import { MdOutlineWorkspacePremium } from 'react-icons/md'
import GeneralSettings from './SettingItems/GeneralSettings/GeneralSettings'
import FriendList from './SettingItems/FriendList/FriendList'
import { RiUser5Line } from 'react-icons/ri'
import SettingItems from './SettingItems/SettingItems'
import ChooseLanguage from './SettingItems/ChooseLanguage/ChooseLanguage'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export default function SettingGenerate() {
  const { t } = useTranslation()
  const [view, setView] = useState('list')

  const labels = {
    general: t('general_settings'),
    friends: t('friend_lists'),
    language: t('language'),
  }

  const handleItemClick = (label) => {
    if (label === labels.general) {
      setView('general')
    } else if (label === labels.friends) {
      setView('friends')
    } else if (label === labels.language) {
      setView('language')
    }
  }

  const handleBack = () => {
    setView('list')
  }

  return (
    <div
      className={`${view === 'list' ? 'flex' : ''} w-full flex-col items-center justify-around space-x-2 rounded-lg bg-white p-2 dark:bg-[#1E1E1E]`}
    >
      <div className={`w-full rounded-lg ${view === 'list' ? '' : 'relative'}`}>
        {view === 'list' && (
          <>
            <h3 className='mb-2 ml-2 text-2xl font-semibold dark:text-white'>{t('setting')}</h3>
            <SettingItems
              icon={CiSettings}
              size={24}
              label={t('general_settings')}
              onSettingItemClick={handleItemClick}
            />
            <SettingItems icon={IoIosNotificationsOutline} size={24} label={t('notification')} />
            <SettingItems icon={GrSecure} size={24} label={t('privacy_security')} />
            <SettingItems icon={GoDatabase} size={24} label={t('data_storage')} />
            <SettingItems
              icon={IoLanguageOutline}
              size={24}
              label={t('language')}
              onSettingItemClick={handleItemClick}
            />
            <SettingItems icon={PiStickerLight} size={24} label={t('stickers_emoji')} />
            <SettingItems icon={LuFileQuestion} size={24} label={t('ask_question')} />
            <SettingItems icon={MdOutlineWorkspacePremium} size={24} label={t('get_premium')} />
            <SettingItems
              icon={RiUser5Line}
              size={24}
              label={t('friend_lists')}
              onSettingItemClick={handleItemClick}
            />
          </>
        )}
        {view === 'general' && (
          <div className='translate-x-01 absolute inset-0 left-0 top-0 z-10 h-full w-full transform bg-white transition-transform duration-300 ease-in-out'>
            <GeneralSettings onBack={handleBack} />
          </div>
        )}
        {view === 'friends' && (
          <div className='translate-x-01 absolute inset-0 left-0 top-0 z-10 h-full w-full transform bg-white transition-transform duration-300 ease-in-out'>
            <FriendList onBack={handleBack} />
          </div>
        )}
        {view === 'language' && (
          <div className='translate-x-01 absolute inset-0 left-0 top-0 z-10 h-full w-full transform bg-white transition-transform duration-300 ease-in-out'>
            <ChooseLanguage onBack={handleBack} />
          </div>
        )}
      </div>
    </div>
  )
}
