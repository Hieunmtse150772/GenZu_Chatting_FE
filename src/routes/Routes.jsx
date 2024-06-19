import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUpComponent from "./pages/Login/SignUpPage/SignUpPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUpComponent />} />
    </Routes>
  );
}

export default AppRoutes;
