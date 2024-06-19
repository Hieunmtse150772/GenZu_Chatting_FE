import userIcon from "../../assets/user_icon.jpg";

const UserCard = ({ user, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center cursor-pointer space-x-4 p-2 ${
        isActive ? "bg-[#74CDFF]" : "hover:bg-[#74CDFF]"
      } rounded-lg mb-4`}
    >
      <img
        src={user?.image || userIcon}
        alt="user avatar"
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex flex-col gap-2 w-full truncate">
        <h3 className="text-sm font-semibold">
          {user?.name}
        </h3>
        <p className="text-sm text-gray-500 truncate">
          {user?.message}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
