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
import Layout from "./containers/Layout";
import Home from "./screens/Home";
import OverView from "./screens/OverView";
import PaymentLinks from "./screens/PaymentLink";
import Transactions from "./screens/Transaction";
import Users from "./screens/Users";
import Invoice from "./screens/Invoice";
import CreateInvoice from "./screens/CreateInvoice";
import Customer from "./screens/Customer";
import Invoices from "./screens/Invoice";

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
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/forgot-password" component={ForgotPassword} />

            {/* Place new routes over this */}
            <Route element={<Layout />}>
              <Route path="/" exact={true} element={<Home />} />
              <Route path="/overview" exact={true} element={<OverView />} />
              <Route path="/paymentlink" exact={true} element={<PaymentLinks />} />
              <Route path="/transaction" exact={true} element={<Transactions />} />
              <Route path="/users" exact={true} element={<Users />} />
              <Route path="/invoice" exact={true} element={<Invoices />} />
              <Route path="/createinvoice" exact={true} element={<CreateInvoice />} />
              <Route path="/customers" exact={true} element={<Customer />} />

            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
