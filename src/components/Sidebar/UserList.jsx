import UserCard from "./UserCard";
import userIcon from "../../assets/user_icon.jpg";
import { useState } from "react";

const UserList = () => {
  const [activeTab, setActiveTab] = useState("personal");

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

  return (
    <section>
      <div className="flex px-4 border-b mt-4">
        <button
          onClick={() => setActiveTab("personal")}
          className={`flex-1 text-center p-2 ${
            activeTab === "personal"
              ? "border-b-2 border-[#74CDFF]"
              : ""
          }`}
        >
          Cá Nhân
        </button>
        <button
          onClick={() => setActiveTab("group")}
          className={`flex-1 text-center p-2 ${
            activeTab === "group"
              ? "border-b-2 border-[#74CDFF]"
              : ""
          }`}
        >
          Nhóm
        </button>
      </div>
      <div className="mt-4 h-full">
        {activeTab === "personal" &&
          personalChats.map((item) => (
            <UserCard user={item} key={item.id} />
          ))}
        {activeTab === "group" &&
          groupChats.map((item) => (
            <UserCard user={item} key={item.id} />
          ))}
      </div>
    </section>
  );
};

export default UserList;
