import { CiSettings } from "react-icons/ci";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { LiaUserFriendsSolid } from "react-icons/lia";
import SearchInput from "./SearchInput";
import UserList from "./UserList";

const Sidebar = () => {
  return (
    <div className=" border-slate-500 p-4 shadow-lg w-80 h-screen  overflow-y-scroll no-scrollbar  sm:max-w-[12rem] md:w-96  lg:max-w-[20rem] hidden md:block ">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xl font-bold">App</p>
        <CiSettings className="w-6 h-6 text-black outline-none  cursor-pointer" />
      </div>
      <div className="flex justify-between items-center">
        <SearchInput />
        <div className="flex  items-center ml-4 cursor-pointer outline-none">
          <AiOutlineUsergroupAdd className="w-6 h-6 ml-2" />
          <LiaUserFriendsSolid className="w-6 h-6 ml-2" />
        </div>
      </div>
      <div className="bg-white">
        <UserList />
      </div>
    </div>
  );
};

export default Sidebar;
