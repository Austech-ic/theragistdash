import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import DashboardRoutes from "./Routes";
import AuthRoute from "./AuthRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
    },
  },
});

function App() {
  return (
    <div className="">
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      />
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthRoute />

          <DashboardRoutes />
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
