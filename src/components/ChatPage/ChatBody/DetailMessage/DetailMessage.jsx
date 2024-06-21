import { useRef, useState, useEffect } from 'react'
import FeatureAI from '../FeatureAI/FeatureAI'
import { useSelector } from 'react-redux'
/* eslint-disable react/prop-types */
export default function DetailMessage(props) {
  const [isOptionBtnClick, setIsOptionBtnClick] = useState(false)

  const dropdownRef = useRef(null)
  const message = useSelector((state) => state.message.message)
  // const handleMoreClick = (e) => {
  //   e.preventDefault();
  //   setIsOptionBtnClick(!isOptionBtnClick);
  // };

  return (
    <div className='mx-2'>
      {message.map((item, index) =>
        item.id == 1 ? (
          <div key={index} className='flex justify-end'>
            <div className='my-4 max-w-xs rounded-lg bg-blue-200 p-2 text-black'>
              {item.message}
            </div>
          </div>
        ) : (
          <div key={index} className='flex'>
            <div
              className='max-w-xs rounded-lg bg-gray-300 p-2 text-black'
              onMouseEnter={() => setIsOptionBtnClick(true)}
              onMouseLeave={() => setIsOptionBtnClick(false)}
            >
              {item.message}
            </div>
            <div
              className={`${
                isOptionBtnClick ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <FeatureAI />
            </div>
          </div>
        ),
      )}
    </div>
  )
}
