import ChatBody from "../components/View/ChatBody";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Home() {
  return (
    <main className="flex">
      <Sidebar />
      <ChatBody />
    </main>
  );
}
