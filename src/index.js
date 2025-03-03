import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ThemedSuspense from "./components/ThemedSuspense";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import 'react-tooltip/dist/react-tooltip.css'
import { CopilotKitWrapper } from "./utils/CopilotKitWrapper";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


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
        fontFamily: 'body',
      },
      ".robot": {
        fontFamily: 'custom'
      }
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


serviceWorkerRegistration.register();


