import userIcon from "../../assets/user_icon.jpg";

const UserCard = ({ user }) => {
  return (
    <div className="flex items-center cursor-pointer  space-x-4 p-2 hover:bg-[#74CDFF] rounded-lg mb-4">
      <img
        src={user?.image || userIcon}
        alt="user avatar"
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex flex-col gap-2 w-full truncate">
        <h3 className="text-sm font-semibold">
          {user?.name}
        </h3>
        <p className=" text-sm text-gray-500">
          {user?.message}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
