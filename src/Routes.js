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
import Councellor from "./screens/councellor/Councellor";
import BookingTracker from "./screens/booking-tracker/BookingTracker";
import Category from "./screens/booking-tracker/Category";
import Comapny from "./screens/company/Comapny";
import User from "./screens/users/user";
import Message from "./screens/message/message";
import Space from "./screens/space/Space";
import UserAssessment from "./screens/user-assesment/userAsssessment";
import Group from "./screens/group/group";
// import AboutUs from "./screens/settings/AboutUs";
// import CommunityGuidline from "./screens/settings/CommunityGuidline";
// import PrivacyPolicy from "./screens/settings/PrivacyPolicy";
// import Notification from "./screens/notification/Notification";
// import SystemUpdate from "./screens/system-update/SystemUpdate";
import UserDetails from "./screens/users/userDetails";
import UserAsssessmentDetails from "./screens/user-assesment/userDetails";
import AsssessmentResponse from "./screens/user-assesment/asssessmentResponse";
import Post from "./screens/feed-management/post";
import Article from "./screens/feed-management/article";
import CreateCompany from "./screens/company/CreateCompany";
import CompanyUsers from "./screens/company/CompanyUsers";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/dashboard" exact={true} element={<Dashboard />} />
        <Route path="/counselor-management" exact={true} element={<Councellor />} />
        <Route path="/booking-tracker" exact={true} element={<BookingTracker />} />
        <Route path="/categories" exact={true} element={<Category />} />
        <Route path="/company-management" exact={true} element={<Comapny />} />
        <Route path="/user" exact={true} element={<User />} />
        <Route path="/messages" exact={true} element={<Message />} />
        <Route path="/space-management" exact={true} element={<Space />} />
        <Route path="/user-assessment" exact={true} element={<UserAssessment />} />
        <Route path="/group-management" exact={true} element={<Group />} />
        {/* <Route path="/about-us" exact={true} element={<AboutUs />} /> */}
        {/* <Route path="/community-guidline" exact={true} element={<CommunityGuidline />} /> */}
        {/* <Route path="/privacy-policy" exact={true} element={<PrivacyPolicy />} /> */}
        {/* <Route path="/send-notification" exact={true} element={<Notification />} /> */}
        {/* <Route path="/system-update" exact={true} element={<SystemUpdate />} /> */}
        <Route path="/user/user-details" exact={true} element={<UserDetails />} />
        <Route path="/user-assessment/assessment-details" exact={true} element={<UserAsssessmentDetails />} />
        <Route path="/user-assessment/assessment-response" exact={true} element={<AsssessmentResponse />} />
        <Route path="/feed-management/post" exact={true} element={<Post />} />
        <Route path="/feed-management/article" exact={true} element={<Article />} />
        <Route path="/company/create-company" exact={true} element={<CreateCompany />} />
        <Route path="/company/users" exact={true} element={<CompanyUsers />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
