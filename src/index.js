import React, { Suspense } from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ThemedSuspense from "./components/ThemedSuspense";
import { ChakraProvider } from "@chakra-ui/react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={<ThemedSuspense />}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Suspense>
);


