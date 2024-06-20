import Header from "../components/View/HeaderChat";
import Footer from "../components/View/FooterChat";
import ViewChat from "../components/View/ViewChat";
import Sidebar from "../components/Sidebar/Sidebar";
// import "../pages/Home.css";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-4">
        <ViewChat></ViewChat>
        <Footer></Footer>
      </div>
    </div>
  );
}
