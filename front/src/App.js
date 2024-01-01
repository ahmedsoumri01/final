import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserProfile from "./pages/User/UserProfile";
import AllUsers from "./pages/Admin/AllUsers";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import EditUser from "./pages/Admin/EditUser";
import AdminProfile from "./pages/Admin/AdminProfile";
import UserDashboard from "./pages/User/UserDashboard";
import PointYourDay from "./pages/User/PointYourDay";
import AdminCheckPoint from "./pages/Admin/AdminCheckPoint";
import ForgetPass from "./pages/Auth/ForgetPass";
function App() {
  return (
   
    <Routes>
      {/* admin routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/profile" element={<AdminProfile />} />
      <Route path="/admin/all-users" element={<AllUsers/>} />
      <Route path="/admin/edit-user/:id" element={<EditUser />} />
      <Route path="/admin/check-point" element={<AdminCheckPoint />} />
 
      {/* user routes */}
      <Route path="/user/profile" element={<UserProfile />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/point-your-day" element={<PointYourDay />} />
      
      {/* auth routes */}
      <Route path="/auth/register" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route path="/auth/forget-password" element={<ForgetPass />} />
      
      </Routes>
  );
}

export default App;
