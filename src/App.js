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
import GetStarted from "./screens/GetStarted";
import Wallet from "./screens/wallet/Wallet";
import ValidateOtp from "./authScreen/OTP";
import UserWallet from "./screens/UserWallet";
import WalletOverview from "./screens/wallet/WalletOverview";
import WalletTopup from "./screens/wallet/WalletTopup";
import WalletDebits from "./screens/wallet/WalletDebits";
import Verification from "./screens/Verification";
import Settings from "./screens/BusinessSettings/Settings";
import PersonalInfo from "./screens/BusinessSettings/PersonalInfo";
import BusinessInfo from "./screens/BusinessSettings/BusinessInfo";
import ApiKey from "./screens/BusinessSettings/ApiKey";
import Webhook from "./screens/BusinessSettings/Webhook";
import MyTeam from "./screens/BusinessSettings/MyTeam";
import { UserProvider } from "./utils/UserProvider";
import CopilotContext from "./components/copilot-context";

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
          <UserProvider>
            <CopilotContext>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/validate-otp" element={<ValidateOtp />} />

                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verifyemail" element={<CreateNewPass />} />

                {/* Place new routes over this */}
                <Route element={<Layout />}>
                  <Route path="/" exact={true} element={<Home />} />
                  <Route path="/overview" exact={true} element={<OverView />} />
                  <Route
                    path="/getstarted"
                    exact={true}
                    element={<GetStarted />}
                  />
                  <Route
                    path="/user-wallets"
                    exact={true}
                    element={<UserWallet />}
                  />
                  <Route
                    path="/paymentlink"
                    exact={true}
                    element={<PaymentLinks />}
                  />
                  <Route
                    path="/transaction"
                    exact={true}
                    element={<Transactions />}
                  />
                  <Route path="/users" exact={true} element={<Users />} />
                  <Route path="/invoice" exact={true} element={<Invoices />} />
                  <Route
                    path="/createinvoice"
                    exact={true}
                    element={<CreateInvoice />}
                  />
                  <Route
                    path="/customers"
                    exact={true}
                    element={<Customer />}
                  />
                  <Route
                    path="/verification"
                    exact={true}
                    element={<Verification />}
                  />
                  <Route path="/wallet" exact={true} element={<Wallet />}>
                    <Route
                      path="/wallet/overview"
                      exact={true}
                      element={<WalletOverview />}
                    />
                    <Route
                      path="/wallet/topup"
                      exact={true}
                      element={<WalletTopup />}
                    />
                    <Route
                      path="/wallet/debit"
                      exact={true}
                      element={<WalletDebits />}
                    />
                  </Route>
                  <Route path="/setting" exact={true} element={<Settings />}>
                    <Route
                      path="/setting/personal-info"
                      exact={true}
                      element={<PersonalInfo />}
                    />
                    <Route
                      path="/setting/business-info"
                      exact={true}
                      element={<BusinessInfo />}
                    />
                    <Route
                      path="/setting/api-key"
                      exact={true}
                      element={<ApiKey />}
                    />
                    <Route
                      path="/setting/webhook"
                      exact={true}
                      element={<Webhook />}
                    />
                    <Route
                      path="/setting/my-team"
                      exact={true}
                      element={<MyTeam />}
                    />
                  </Route>
                </Route>
              </Routes>
            </CopilotContext>
          </UserProvider>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
