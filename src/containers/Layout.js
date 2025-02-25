import React, { useContext, useState, Suspense, useEffect, lazy } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";

import Main from "../containers/Main";
import ThemedSuspense from "../components/ThemedSuspense";
// import { SidebarContext } from "../context/SidebarContext";
import Topbar from "../components/global/Topbar";
import Sidebar from "../components/global/Sidebar";
import api from "../api";
import { useQuery } from "@tanstack/react-query";
import Warning from "../components/Warning";
import { CopilotKitWrapper } from "../utils/CopilotKitWrapper";
import { CopilotPopup } from "@copilotkit/react-ui";
import { UserProvider } from "../utils/UserProvider";
import CopilotContext from "../components/copilot-context";
import { registerServiceWorker } from "../serviceWorkerRegistration";
import { LoginCurve } from "iconsax-react";
import Modal from "../components/Modal";
import InstallPWA from "../components/InstallPWA";

function Layout() {
  // const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const [isSidebar, setIsSidebar] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  // const [isInstalled, setIsInstalled] = useState(false);

  // useEffect(() => {
  //   registerServiceWorker();

  //   // Check if the app is installed (works for Chrome & Android)
  //   if (window.matchMedia("(display-mode: standalone)").matches) {
  //     setIsInstalled(true);
  //   }

  //   // Listen for beforeinstallprompt
  //   window.addEventListener("beforeinstallprompt", (event) => {
  //     event.preventDefault();
  //     setDeferredPrompt(event);
  //   });

  //   // Listen for appinstalled event
  //   window.addEventListener("appinstalled", () => {
  //     setIsInstalled(true);
  //     setDeferredPrompt(null);
  //   });
  // }, []);

  // const handleInstallClick = () => {
  //   if (deferredPrompt) {
  //     deferredPrompt.prompt();
  //     deferredPrompt.userChoice.then((choiceResult) => {
  //       if (choiceResult.outcome === "accepted") {
  //         console.log("User installed the app");
  //         setIsInstalled(true);
  //       }
  //       setDeferredPrompt(null);
  //     });
  //   }
  // };

  const ProfileQuery = useQuery(["profile"], () => getProfile(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });
  const profileData = ProfileQuery?.data || [];

  let userData = localStorage.getItem("authData");
  //console.log(userData)
  if (!userData) {
    return <Navigate to="/login" />;
  } else {
    //console.log("Valid token");
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

  const closeModal = () => {
    setDeferredPrompt(null);
  };

  return (
    <CopilotKitWrapper>
      <UserProvider>
        {/* Place new routes over this */}
        <CopilotContext>
          <div id="" className="app bg-[#ffffff] flex  ">
            <Sidebar
              isSidebarOpen={isSidebar}
              onClose={handleSideBarClose}
              profileData={profileData}
            />

            <div className="flex flex-col flex-1 w-full overflow-x-hidden">
              <Topbar setIsSidebar={toggleSidebar} />
              {profileData?.default_partner?.is_verified === 0 && <Warning />}
              <Main>
                <Suspense fallback={<ThemedSuspense />}>
                  <Outlet />
                </Suspense>
              </Main>

                    <InstallPWA />

            </div>
          </div>
          {/* <CopilotPopup
            instructions={
              "You are assisting the user as best as you can. Answer in the best way possible given the data you have."
            }
            labels={{
              title: "Vant Assistant",
              initial: "Need any help?",
            }}
          /> */}
        </CopilotContext>
      </UserProvider>
    </CopilotKitWrapper>
  );
}

export default Layout;
