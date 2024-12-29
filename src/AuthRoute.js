import React from "react";
import Login from "./authScreen/Login";
import SignUp from "./authScreen/SignUp";
import ValidateOtp from "./authScreen/OTP";
import ForgotPassword from "./authScreen/ForgotPassword";
import CreateNewPass from "./authScreen/CreateNewPass";
import {
    Routes,
    Route,
    BrowserRouter as Router,
    Navigate,
  } from "react-router-dom";
import ChangePassSuccess from "./authScreen/ChangepassSuccess";
import Page404 from "./screens/404";

const AuthRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/validate-otp" element={<ValidateOtp />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verifyemail" element={<CreateNewPass />} />
      <Route path="/passwordchangesuccess" element={<ChangePassSuccess />} />
      <Route path="" element={<Page404 />} />

    </Routes>
  );
};

export default AuthRoute;
