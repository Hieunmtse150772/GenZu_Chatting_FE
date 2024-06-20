import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUpComponent from "./pages/Login/SignUpPage/SignUpPage";
import Home from "../pages/Home";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<SignUpComponent />} /> */}
      {/* <Route path="/" element={<Home />} /> */}

    </Routes>
  );
}

export default AppRoutes;
