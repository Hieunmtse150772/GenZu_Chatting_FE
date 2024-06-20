import React from "react";

const DropdownItem = ({
  icon: Icon,
  label,
  onClick,
  dropdownType,
}) => {
  return (
    <div
      className={`flex items-center rounded-lg hover:bg-gray-100 p-2 cursor-pointer ${dropdownType}`}
      onClick={onClick}
    >
      <Icon className="rounded-full p-2 w-9 h-9 bg-slate-200 -mr-1 hover:bg-slate-300" />
      <span className="ml-4">{label}</span>
    </div>
  );
};

export default DropdownItem;
