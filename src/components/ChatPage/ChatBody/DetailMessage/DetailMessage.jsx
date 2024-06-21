import { useRef, useState, useEffect } from "react";
import FeatureAI from '../FeatureAI/FeatureAI'
import { useSelector } from 'react-redux'
/* eslint-disable react/prop-types */
export default function DetailMessage(props) {
  const [isOptionBtnClick, setIsOptionBtnClick] =
    useState(false);
  
  const [activeMessageID, setActiveMessageID] = useState(null);

  const handleUserClick = (id) => {
    setActiveMessageID(id);
  };
  const dropdownRef = useRef(null);
  const message = useSelector((state) => state.message.message)
  // const handleMoreClick = (id) => {
  //   e.preventDefault();
  //   setIsOptionBtnClick(!isOptionBtnClick);
  //   if(setIsOptionBtnClick){
  //     handleUserClick(id)
  //   }
  // };

  return (
    <div className='mx-2'>
      {message.map((item, index) =>
        item.id_user == 1 ? (
          <div key={index} className='flex justify-end'>
            <div className='my-4 max-w-xs rounded-lg bg-blue-200 p-2 text-black'>
              {item.message}
            </div>
          </div>
        ) : (
          <div key={index} className='flex' 
                onMouseEnter={() => {setIsOptionBtnClick(true)
                  handleUserClick(item.id_message)
                }}
                onMouseLeave={() => setIsOptionBtnClick(false)}>
            <div className='max-w-xs rounded-lg bg-gray-300 p-2 text-black' 
                >
                    {item.message}
            </div>
            <div
                className={`${
                  isOptionBtnClick && activeMessageID == item.id_message
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
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
