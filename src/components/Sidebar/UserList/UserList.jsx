import { useState } from "react";
import UserCard from "../UserCard/UserCard";
import userIcon from "../../../assets/user_icon.jpg";

const UserList = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [activeUserID, setActiveUserID] = useState(null);

  const personalChats = [
    {
      id: "1",
      name: "Huy Nguyen",
      image: userIcon,
      message: "Let's go",
    },
    {
      id: "2",
      name: "Ba Thien",
      image: userIcon,
      message:
        "Elephants have the largest brains among land animals and demonstrate remarkable intelligence.",
    },
    {
      id: "3",
      name: "Helena Hills",
      image: userIcon,
      message: "Will head to the Help Center...",
    },
    {
      id: "4",
      name: "Oscar Davis",
      image: userIcon,
      message: "Trueeeeee",
    },
    {
      id: "5",
      name: "Daniel Jay Park",
      image: userIcon,
      message: "lol yeah, are you coming to the lunc...",
    },
    {
      id: "6",
      name: "Daniel Jay Park",
      image: userIcon,
      message: "lol yeah, are you coming to the lunc...",
    },
  ];

  const groupChats = [
    {
      id: "3",
      name: "Ngan Tran",
      image: userIcon,
      message:
        "Cheetahs are the fastest land animals, capable of reaching speeds up",
    },
    {
      id: "4",
      name: "Minh Hieu",
      image: userIcon,
      message:
        "Koalas sleep around 20 hours a day and are known for their eucalyptus diet.",
    },
  ];

  const handleUserClick = (id) => {
    setActiveUserID(id);
  };

  return (
    <section className="w-full h-full">
      <div className="flex mt-4">
        <button
          onClick={() => setActiveTab("personal")}
          className={`flex-1 text-center p-2 rounded-tl-xl rounded-bl-xl border  ${
            activeTab === "personal"
              ? "bg-blue-300 text-black border-blue-300 shadow-lg dark:text-white"
              : "bg-white text-black border-gray-300"
          }`}
        >
          Cá Nhân
        </button>
        <button
          onClick={() => setActiveTab("group")}
          className={`flex-1 text-center p-2 rounded-tr-xl rounded-br-xl border ${
            activeTab === "group"
              ? "bg-blue-300 text-black border-blue-300 shadow-lg dark:text-white"
              : "bg-white text-black border-gray-300"
          }`}
        >
          Nhóm
        </button>
      </div>
      <div className="mt-4 h-full overflow-y-auto">
        {activeTab === "personal" &&
          personalChats.map((item) => (
            <UserCard
              user={item}
              key={item.id}
              isActive={activeUserID === item.id}
              onClick={() => handleUserClick(item.id)}
            />
          ))}
        {activeTab === "group" &&
          groupChats.map((item) => (
            <UserCard
              user={item}
              key={item.id}
              isActive={activeUserID === item.id}
              onClick={() => handleUserClick(item.id)}
            />
          ))}
      </div>
    </section>
  );
};

export default UserList;
