import React from 'react'
import { CiSettings } from 'react-icons/ci'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { GrSecure } from 'react-icons/gr'
import { GoDatabase } from 'react-icons/go'
import { IoLanguageOutline } from 'react-icons/io5'
import { PiStickerLight } from 'react-icons/pi'
import { LuFileQuestion } from 'react-icons/lu'
import { MdOutlineWorkspacePremium } from 'react-icons/md'
import { MdOutlinePolicy } from 'react-icons/md'

import SettingItems from './SettingItems/SettingItems'

export default function SettingGenerate() {
  return (
    <div className='flex w-full flex-col items-center justify-around space-x-2 rounded-lg bg-white p-4 shadow-md'>
      <h3 className='mb-2 text-2xl font-semibold'>Settings</h3>
      <div className='w-full rounded-lg shadow-lg'>
        <SettingItems icon={CiSettings} size={24} label={'General settings'} />
        <SettingItems icon={IoIosNotificationsOutline} size={24} label={'Notification'} />
        <SettingItems icon={GrSecure} size={24} label={'Privacy and security'} />
        <SettingItems icon={GoDatabase} size={24} label={'Data and Storage'} />
        <SettingItems icon={IoLanguageOutline} size={24} label={'Language'} />
        <SettingItems icon={PiStickerLight} size={24} label={'Stickers and Emoji'} />
      </div>
      {/* <div className='top-0 my-auto w-full rounded-md border bg-slate-200 p-1'></div> */}
      <div className='mt-2 w-full rounded-lg shadow-lg'>
        <SettingItems icon={LuFileQuestion} size={24} label={'Ask a question'} />
        <SettingItems icon={MdOutlineWorkspacePremium} size={24} label={'Get Premium'} />
        <SettingItems icon={MdOutlinePolicy} size={24} label={'Privacy policy'} />
      </div>
    </div>
  )
}
