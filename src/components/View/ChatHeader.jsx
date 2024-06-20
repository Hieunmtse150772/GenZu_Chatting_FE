import { RxAvatar } from "react-icons/rx";
import {
  IoCallOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { SlOptions } from "react-icons/sl";

function ChatHeader() {
  return (
    <div className="flex justify-between items-center py-4 bg-mainBlue px-8 rounded-lg">
      <div className="flex items-center space-x-4 cursor-pointer">
        <RxAvatar size={40} className="text-orange-500" />
        <div className="flex flex-col">
          <span className="text-2xl text-black font-semibold">
            Username
          </span>
          <span className="text-base text-gray-500 font-semibold">
            Active 2h ago
          </span>
        </div>
      </div>
      <div className="flex space-x-6">
        <button className="hover:bg-blue-400 rounded-md p-1">
          <IoCallOutline size={25} />
        </button>
        <button className="hover:bg-blue-400 rounded-md p-1">
          <IoVideocamOutline size={25} />
        </button>
        <button className="hover:bg-blue-400 rounded-md p-1">
          <SlOptions size={25} />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
