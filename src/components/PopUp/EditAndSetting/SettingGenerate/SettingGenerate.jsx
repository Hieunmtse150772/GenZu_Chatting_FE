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
import { useState } from 'react'

export default function SettingGenerate() {
  const [view, setView] = useState('list')

  const handleItemClick = (label) => {
    if (label === 'General settings') {
      setView('general')
    } else if (label === 'Friend lists') {
      setView('friends')
    } else if (label === 'Language') {
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
            <h3 className='mb-2 ml-2 text-2xl font-semibold dark:text-white'>Settings</h3>
            <SettingItems
              icon={CiSettings}
              size={24}
              label={'General settings'}
              onSettingItemClick={handleItemClick}
            />
            <SettingItems icon={IoIosNotificationsOutline} size={24} label={'Notification'} />
            <SettingItems icon={GrSecure} size={24} label={'Privacy and security'} />
            <SettingItems icon={GoDatabase} size={24} label={'Data and Storage'} />
            <SettingItems
              icon={IoLanguageOutline}
              size={24}
              label={'Language'}
              onSettingItemClick={handleItemClick}
            />
            <SettingItems icon={PiStickerLight} size={24} label={'Stickers and Emoji'} />
            <SettingItems icon={LuFileQuestion} size={24} label={'Ask a question'} />
            <SettingItems icon={MdOutlineWorkspacePremium} size={24} label={'Get Premium'} />
            <SettingItems
              icon={RiUser5Line}
              size={24}
              label={'Friend lists'}
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
