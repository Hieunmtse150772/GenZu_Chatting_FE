import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home";
import AppRoutes from "./routes";

function App() {
  return (
    <div className="flex">
      {/* <AppRoutes /> */}
      <Sidebar />
      <div className="flex-1">
          <Home />
      </div>
    </div>
  );
}

export default App;
