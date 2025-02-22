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

              {/* <Modal
                isOpen={!isInstalled && deferredPrompt}
                onClose={closeModal}
              >
                <div className="inline-block relative border border-[#D6DDEB] p-[18px] md:p-[24px] xl:p-[32px] overflow-hidden text-left align-bottom transition-all transform bg-[white]   shadow-xl sm:my-8 sm:align-middle w-full min-w-[360px] md:min-w-[450px] md:max-w-[550px] ">
                  <LoginCurve size={20} />

                  <LoginCurve
                    onClick={closeModal}
                    color="gray"
                    size={16}
                    className="absolute top-2 right-2 cursor-pointer text-[14px] "
                  />

                  <p className=" text-[16px] md:text-lg text-center  text-[#000] leading-[24px] font-medium  ">
                    Add to Home Screen
                  </p>

                  <div
                    className="flex items-center justify-between mt-4"
                    gap={"16px"}
                  >
                    <button
                      onClick={closeModal}
                      className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[8px] text-[14px] font-medium text-black"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleInstallClick}
                      className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#AF8544]  flex items-center justify-center text-center rounded-[8px] py-[8px] text-[14px] font-medium text-white"
                    >
                      <> Install </>
                    </button>
                  </div>
                </div>
              </Modal> */}
                    <InstallPWA />

            </div>
          </div>
          <CopilotPopup
            instructions={
              "You are assisting the user as best as you can. Answer in the best way possible given the data you have."
            }
            labels={{
              title: "Vant Assistant",
              initial: "Need any help?",
            }}
          />
        </CopilotContext>
      </UserProvider>
    </CopilotKitWrapper>
  );
}

export default Layout;
