import { CgMoreO } from "react-icons/cg";
import userIcon from "../../../assets/user_icon.jpg";
import { useRef, useState, useEffect } from "react";
import {
  MdPhone,
  MdVideocam,
  MdBlock,
  MdOutlineDelete,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import DropdownItem from "../DropdownItem/DropdownItem";

const UserCard = ({ user, isActive, onClick }) => {
  const [isOptionBtnClick, setIsOptionBtnClick] =
    useState(false);

  const dropdownRef = useRef(null);

  const handleMoreClick = (e) => {
    e.preventDefault();
    setIsOptionBtnClick(!isOptionBtnClick);
  };

  const handleClickOutside = (e) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target)
    ) {
      setIsOptionBtnClick(false);
    }
  };

  useEffect(() => {
    document.addEventListener(
      "mousedown",
      handleClickOutside
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div
      onClick={onClick}
      className={`relative flex items-center cursor-pointer space-x-4 p-2 group ${
        isActive ? "bg-[#74CDFF]" : "hover:bg-[#74CDFF]"
      } rounded-lg mb-1`}
    >
      <img
        src={user?.image || userIcon}
        alt="user avatar"
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex flex-col gap-2 w-full truncate dark:text-white">
        <h3 className="text-sm font-semibold truncate">
          {user?.name}
        </h3>
        <p className="text-sm text-gray-500 truncate dark:text-slate-500">
          {user?.message}
        </p>
      </div>
      <div
        className={`absolute right-2 top-1/2 transform -translate-y-1/2 transition-opacity ${
          isOptionBtnClick
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        }`}
        onClick={handleMoreClick}
      >
        <CgMoreO className="text-gray-500 w-5 h-5 hover:text-gray-800 dark:text-white" />
      </div>
      {isOptionBtnClick && (
        <div
          className="absolute top-0 mt-12 right-0 bg-white border rounded-lg shadow-lg z-10 w-52 ring-1 ring-black ring-opacity-5 focus:outline-none"
          ref={dropdownRef}
        >
          {/* <div className="absolute left-48 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" /> */}
          <ul>
            <DropdownItem
              icon={CgProfile}
              label={"Xem trang cá nhân"}
              onClick={() => {}}
              dropdownType={"mt-[7px]"}
            />
            <hr />
            <DropdownItem
              icon={MdPhone}
              label={"Gọi thoại"}
              onClick={() => {}}
            />
            <DropdownItem
              icon={MdVideocam}
              label={"Chat video"}
              onClick={() => {}}
            />
            <hr />
            <DropdownItem
              icon={MdBlock}
              label={"Chặn"}
              onClick={() => {}}
            />
            <DropdownItem
              icon={MdOutlineDelete}
              label={"Delete chat"}
              onClick={() => {}}
            />
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserCard;
