import React, { useState, Suspense, useEffect, lazy } from "react";
import { BrowserRouter as Router, Navigate, Outlet } from "react-router-dom";

import Main from "../containers/Main";
import ThemedSuspense from "../components/ThemedSuspense";
import Topbar from "../components/global/Topbar";
import Sidebar from "../components/global/Sidebar";
import api from "../api";
import { useQuery } from "@tanstack/react-query";

function Layout() {
  // const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const [isSidebar, setIsSidebar] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);



  let userData = localStorage.getItem("authData");
  if (!userData) {
    return <Navigate to="/login" />;
  } else {
  }

  const toggleSidebar = () => {
    setIsSidebar(!isSidebar);
  };

  const handleSideBarClose = () => {
    setIsSidebar(false);
  };


  async function getProfile(page) {
    const response = await api.getProfile({ params: { page } });
    return response;
  }

  const result = useQuery(["profile"], getProfile, {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });
  const profileData = result?.data?.data || [];


  async function getNotification(page) {
    const response = await api.getNotification({ params: { page } });
    return response;
  }

  const results = useQuery(["profile"], getNotification(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });
  const notificationData = result?.data?.data || [];

  const closeModal = () => {
    setDeferredPrompt(null);
  };

  return (
    <div id="" className="app bg-[#ffffff] flex  ">
      <Sidebar
        isSidebarOpen={isSidebar}
        onClose={handleSideBarClose}
      />

      <div className="flex relative flex-col flex-1 w-full overflow-x-hidden">
        <div className="fixed md:relative top-0 left-0 right-0 z-[99999] md:z-0 bg-[#ffffff] border-[#D0D5DD]">
          <Topbar setIsSidebar={toggleSidebar}  data={profileData}/>
        </div>

        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Outlet />
          </Suspense>
        </Main>
      </div>
    </div>
  );
}

export default Layout;
