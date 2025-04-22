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

import Product from "./screens/Store";
import Customers from "./screens/Customers";
import Marketers from "./screens/Marketer";
import Workers from "./screens/Workers";
import Investors from "./screens/Investors";
import Sales from "./screens/Sales";



const DashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/dashboard" exact={true} element={<Dashboard />} />
        <Route path="/transactions" exact={true} element={<Transactions />} />
        <Route path="/sales" exact={true} element={<Sales />} />
        <Route path="/investor-management" exact={true} element={<Investors />} />

       
        <Route path="/worker-management" exact={true} element={<Workers />} />
        <Route path="/marketer-management" exact={true} element={<Marketers />} />
        <Route path="/customer-management" exact={true} element={<Customers />} />
        <Route path="/product-management" exact={true} element={<Product />} />
     
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
