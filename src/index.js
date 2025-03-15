import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
const App = lazy(() => import("./App"));

// import App from "./App";
import ThemedSuspense from "./components/ThemedSuspense";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "react-tooltip/dist/react-tooltip.css";
import { CopilotKitWrapper } from "./utils/CopilotKitWrapper";
// import * as serviceWorkerRegistration from "./serviceWorkerRegistration";


window.addEventListener("load", async () => {
  try {
    // Clear Cache Storage (for previously cached PWA files)
    if ("caches" in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
    }

    // Unregister Service Workers
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));
    }

    // Force a hard refresh (only runs once)
    if (!sessionStorage.getItem("cache-cleared")) {
      sessionStorage.setItem("cache-cleared", "true");
      window.location.reload(true); // Hard refresh
    }
  } catch (error) {
    console.error("Error clearing cache:", error);
  }
});

function handleChunkError() {
  window.location.reload();
}



const overrides = extendTheme({
  fonts: {
    body: '"Jost", sans-serif', // For headings
    // custom: '"Space Mono", monospace',
    custom: '"Share Tech Mono", monospace',
    // For body text
  },
  styles: {
    global: () => ({
      body: {
        fontFamily: "body",
      },
      ".robot": {
        fontFamily: "custom",
      },
    }),
  },
});

const AppTheme = extendTheme(overrides);

export default AppTheme;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Suspense fallback={<ThemedSuspense />}>
    <ChakraProvider theme={AppTheme}>
      <App />
    </ChakraProvider>
  </Suspense>
  //</React.StrictMode> */}
);

// serviceWorkerRegistration.register();
window.addEventListener("error", (e) => {
  if (e.message.includes("Loading chunk")) {
    handleChunkError();
  }
});