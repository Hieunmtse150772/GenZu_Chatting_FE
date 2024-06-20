import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "../pages/Home";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login/*" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default AppRoutes;
