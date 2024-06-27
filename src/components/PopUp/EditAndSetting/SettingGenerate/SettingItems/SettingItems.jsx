const SettingItems = ({ icon: Icon, label, size }) => {
  return (
    <div className='flex w-full items-center space-x-4 rounded-lg p-4 hover:bg-slate-100'>
      <button>
        <Icon size={size} />
      </button>
      <p className='text-lg text-black dark:text-white'>{label}</p>
    </div>
  )
}

export default SettingItems
