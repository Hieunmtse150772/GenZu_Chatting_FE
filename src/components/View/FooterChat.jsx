
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { PiSmileyStickerLight } from "react-icons/pi";
import { IoSendOutline } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";
import { Input } from "postcss";

function Footer() {
    return  <div className="flex flex-end py-4 bg-mainBlue">
                
                <input style={{width: "91%", marginLeft: "36px"}}>
                </input>
                <ul className="hidden md:flex overflow-x-hidden mr-10 font-semibold">
                    <li className="mr-6 p-1">
                        <a className="cursor-default " href="#">
                            <MdOutlineKeyboardVoice size={40}/>
                        </a>
                    </li>
                    <li className="mr-6 p-1">
                        <a className="hover:text-blue-300" href="#">
                            <PiSmileyStickerLight size={40}/>
                        </a>
                    </li>
                    <li className="mr-6 p-1">
                        <a className="hover:text-blue-300" href="#">
                            <IoSendOutline size={40}/>
                        </a>
                    </li>
                </ul>
            </div>;
  }

export default Footer;