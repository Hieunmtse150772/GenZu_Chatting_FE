
import { IoIosSearch } from "react-icons/io";
import { FaRegImage } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";

function InformationConversation(){
    return <div className="max-w-2xl mx-auto bg-mainBlue">
                <div className="flex flex-col items-center pb-10">
                       <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="Bonnie image" />
                       <h3 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h3>
                       <span className="text-sm text-gray-500 dark:text-gray-400">Active 20m ago</span>
                       <a href="#" className="inline-flex items-center my-4 py-4 px-8 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        View profile
                       </a>
                        <div>
                            <ul className="flex flex-col hidden md:flex overflow-x-hidden mx-2 rounded-lg font-semibold bg-white">
                                <li className="p-1">
                                    <button
                                        id="setting"
                                        className="flex items-center cursor-pointer relative mb-4 hover:bg-mainBlue rounded-md p-1"
                                        style={{width:"100%"}}
                                    >
                                        <IoIosSearch size={24} />
                                        <span className="ml-3 text-gray-900 text-sm font-medium"> Search chat</span>
                                    </button>
                                </li>
                                <li className="p-1">
                                    <button
                                        id="setting"
                                        className="flex items-center cursor-pointer relative mb-4 hover:bg-mainBlue rounded-md p-1"
                                        style={{width:"100%"}}

                                    >
                                        <FaRegImage size={24} />
                                        <span className="ml-3 text-gray-900 text-sm font-medium"> Sent images</span>

                                    </button>
                                </li>
                                <li className="p-1">
                                    <label for="toggle-example" className="flex items-center cursor-pointer relative mb-4">
                                        <input type="checkbox" className="sr-only"  />
                                        <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full" style={{width:"30px"}}></div>
                                        <span className="ml-3 text-gray-900 text-sm font-medium">Auto translation</span>
                                    </label>
                                </li>
                                <li className="p-1">
                                    <button id="setting"
                                        style={{width:"100%"}}
                                        className="flex items-center cursor-pointer relative mb-4 hover:bg-mainBlue rounded-md p-1" >
                                        <SlOptions size={20} />
                                        <span className="ml-3 text-gray-900 text-sm font-medium"> More Option</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                </div>
            </div>

    
}

export default InformationConversation;