import { RiTranslate } from "react-icons/ri";
import { MdOutlineQuickreply } from "react-icons/md";
import { SlOptions } from 'react-icons/sl'
import DropdownOption from "./DropdownOption/DropdownOption";
import { useRef, useState, useEffect} from "react";


export default function FeatureAI(props){

    const buttonRef = useRef(null)
    const dropdownRef = useRef(null)


    const [isOptionBtnClick, setIsOptionBtnClick] =
            useState(false);

    const handleMoreClick = (e) => {
        e.preventDefault();
        setIsOptionBtnClick(!isOptionBtnClick);
        // props.isActiveOption(!isOptionBtnClick);
    };

    const handleClickOutside = (e) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target) &&
          buttonRef.current &&
          !buttonRef.current.contains(e.target)
        ) {
            setIsOptionBtnClick(false)
        }
      }
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
          document.removeEventListener('mousedown', handleClickOutside)
        }
      }, [])

    return <div className="relative">
                <ul className='hidden md:flex md:items-center overflow-x-hidden mr-4 font-semibold'>
                    <li className='mr-1 p-1'>
                        <button id='setting' className='hover:bg-blue-400 rounded-md p-1'>
                            <RiTranslate size={14} />
                        </button>
                    </li>
                    <li className='mr-1 p-1'>
                        <button id='setting' className='hover:bg-blue-400 rounded-md p-1'>
                            <MdOutlineQuickreply size={14} />
                        </button>
                    </li>
                    <li className='mr-1 p-1'>
                        <button id='setting' className='hover:bg-blue-400 rounded-md p-1'
                            ref={buttonRef}

                            onClick={handleMoreClick}>
                            <SlOptions size={14} />
                        </button>
                    </li>
                    
                </ul>
                <div className="" ref={dropdownRef}>
                        {isOptionBtnClick && <DropdownOption /> }

                </div>
            </div>
}