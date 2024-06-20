import ChatBody from "../components/View/ChatBody";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Home() {
  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <Sidebar />

      {/* ChatBody */}
      <div className="flex flex-grow">
        <ChatBody />
      </div>
    </div>
  );
}
