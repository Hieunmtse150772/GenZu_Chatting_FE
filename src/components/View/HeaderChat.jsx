
import { RxAvatar } from "react-icons/rx";
import { IoCallOutline } from "react-icons/io5";
import { IoVideocamOutline } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";

function Header() {
    return <div className="flex justify-between items-center py-4 bg-mainBlue">
                <div className="flex ml-10 cursor-pointer">
                    <i className="fas fa-drafting-compass fa-2x text-orange-500">
                        <RxAvatar size={70}/>
                    </i>
                    <div className="flex flex-col">
                        <span className="ml-1 text-3xl text-black font-semibold">Username</span>
                        <span className="ml-1 text-3xl text-gray-500 font-semibold">Active 2h ago</span>
                    </div>
                </div>
                <i className="fas fa-bars fa-2x visible md:invisible mr-10 md:mr-0 text-blue-200 cursor-pointer"></i>
                <ul className="hidden md:flex overflow-x-hidden mr-10 font-semibold">
                    <li className="mr-6 p-1">
                        <button id="setting" class="hover:bg-blue-400 rounded-md p-1">
                            <IoCallOutline size={40}/>
                        </button>
                    </li>
                    <li className="mr-6 p-1">
                        <button id="setting" class="hover:bg-blue-400 rounded-md p-1">
                            <IoVideocamOutline size={40}/>
                        </button>
                    </li>
                    <li className="mr-6 p-1">
                        <button id="setting" class="hover:bg-blue-400 rounded-md p-1">
                            <SlOptions size={40}/>
                        </button>
                    </li>
                </ul>
            </div>;
  }

export default Header;