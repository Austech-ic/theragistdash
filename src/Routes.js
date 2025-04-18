import React from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Layout from "./containers/Layout";
import Home from "./screens/Home";
import Dashboard from "./screens/dashboard/Dashboard";
import Transactions from "./screens/transaction/Transactions";
import Users from "./screens/Users";
import Notification from "./screens/notification/Notification";
import PrivacyPolicy from "./screens/settings/PrivacyPolicy";
import CommunityGuidline from "./screens/settings/CommunityGuidline";
import Product from "./screens/Store";

// import AboutUs from "./screens/settings/AboutUs";
// import CommunityGuidline from "./screens/settings/CommunityGuidline";
// import PrivacyPolicy from "./screens/settings/PrivacyPolicy";
// import Notification from "./screens/notification/Notification";
// import SystemUpdate from "./screens/system-update/SystemUpdate";


const DashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/dashboard" exact={true} element={<Dashboard />} />
        <Route path="/transactions" exact={true} element={<Transactions />} />
        <Route path="/users" exact={true} element={<Users />} />
        <Route path="/product" exact={true} element={<Product />} />

       
        {/* <Route path="/about-us" exact={true} element={<AboutUs />} /> */}
        <Route path="/community-guidline" exact={true} element={<CommunityGuidline />} />
        <Route path="/privacy-policy" exact={true} element={<PrivacyPolicy />} />
        <Route path="/send-notification" exact={true} element={<Notification />} />
        <Route path="/product-management" exact={true} element={<Product />} />
     
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
