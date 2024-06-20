/* eslint-disable react/prop-types */
export default function DetailMessage(props) {
  return (
    <div className='mx-2'>
      {props.inforMessage.map((item, index) =>
        item.id == 1 ? (
          <div key={index} className='flex justify-end'>
            <div className='max-w-xs rounded-lg bg-blue-200 p-2 text-black'>{item.message}</div>
          </div>
        ) : (
          <div key={index} className='flex'>
            <div className='max-w-xs rounded-lg bg-gray-300 p-2 text-black'>{item.message}</div>
          </div>
        ),
      )}
    </div>
  )
}
