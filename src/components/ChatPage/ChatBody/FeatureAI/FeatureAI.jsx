import { RiTranslate } from "react-icons/ri";
import { MdOutlineQuickreply } from "react-icons/md";
import { SlOptions } from 'react-icons/sl'


export default function FeatureAI(){
    return <div>
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
                        <button id='setting' className='hover:bg-blue-400 rounded-md p-1'>
                            <SlOptions size={14} />
                        </button>
                    </li>
                </ul>
            </div>
}