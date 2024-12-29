import "./App.css";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./authScreen/Login";
import SignUp from "./authScreen/SignUp";
import ForgotPassword from "./authScreen/ForgotPassword";
import CheckMail from "./authScreen/CheckMail";
import CreateNewPass from "./authScreen/CreateNewPass";
import ChangePassSuccess from "./authScreen/ChangepassSuccess";
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
          vertical: "top",
          horizontal: "right",
        }}
      />
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthRoute />

          <DashboardRoutes />
            {/* <Routes>
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes> */}
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
