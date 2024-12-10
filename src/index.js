import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ThemedSuspense from "./components/ThemedSuspense";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import 'react-tooltip/dist/react-tooltip.css'
import { CopilotKitWrapper } from "./utils/CopilotKitWrapper";

const overrides = extendTheme({
  styles: {
    global: () => ({
      body: {
        fontFamily: '"Jost", sans-serif',
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
      <CopilotKitWrapper>
        <App />
      </CopilotKitWrapper>
    </ChakraProvider>
  </Suspense>
  //</React.StrictMode> */}
);
