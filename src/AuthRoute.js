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

const AuthRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/validate-otp" element={<ValidateOtp />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verifyemail" element={<CreateNewPass />} />
    </Routes>
  );
};

export default AuthRoute;
