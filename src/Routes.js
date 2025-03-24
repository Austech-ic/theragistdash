import React from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Layout from "./containers/Layout";
import Home from "./screens/Home";
// import OverView from "./screens/OverView";
// import Transactions from "./screens/Transaction";
// import Users from "./screens/Users";
// import Store from "./screens/Store";
import Dashboard from "./screens/dashboard/Dashboard";
import Councellor from "./screens/councellor/Councellor";
import BookingTracker from "./screens/booking-tracker/BookingTracker";
import Category from "./screens/booking-tracker/Category";
import Comapny from "./screens/company/Comapny";
import User from "./screens/users/user";
import Message from "./screens/message/message";

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

        {/* <Route path="/transaction" exact={true} element={<Transactions />} />

        <Route path="/store" exact={true} element={<Store />} />
        <Route path="/users" exact={true} element={<Users />} /> */}
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
