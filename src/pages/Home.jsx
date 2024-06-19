
import Header from "../components/View/HeaderChat";
import Footer from "../components/View/FooterChat";
import "../pages/Home.css";

export default function Home() {
  return (
    <div className="border-box flex flex-col h-100">
        <div className="flex-none h-1/3">
            <Header ></Header>
        </div>

        <div className="flex-initial h-2/3"> Không gian chat</div>
        <div className="flex-none h-1/3">
            <Footer  ></Footer>
        </div>
    </div>
  )
}
