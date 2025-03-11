import React from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Layout from "./containers/Layout";
import Home from "./screens/Home";
import OverView from "./screens/OverView";
import PaymentLinks from "./screens/PaymentLink";
import Transactions from "./screens/Transaction";
import Users from "./screens/Users";
import Invoice from "./screens/invoice/Invoice";
import CreateInvoice from "./screens/invoice/CreateInvoice";
import Customer from "./screens/Customer";
import Invoices from "./screens/invoice/Invoice";
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
import Page404 from "./screens/404";
import Pin from "./screens/BusinessSettings/Pin";
import SaveInvoice from "./screens/invoice/SaveInvoice";
import Store from "./screens/Store";
import UsdWallet from "./screens/wallet/usdWallet/wallet";
import DollarCard from "./screens/ExpenseCard/DollarCard";
import NairaCard from "./screens/ExpenseCard/NairaCard";
import Beneficiaries from "./screens/wallet/beneficiaries/Beneficiaries";
import BulkPayment from "./screens/wallet/bulkPayment.js/BulkPayment";
import VantAssistant from "./screens/VantAssistant";
import Config from "./screens/BookKeeping/Config";
import BookKeeping from "./screens/BookKeeping/BookKeeping";
import MigrateTransaction from "./screens/BookKeeping/MigrateTransaction";
import BookKeepingReport from "./screens/BookKeeping/Report";
import ConnectAccount from "./screens/wallet/connectAccount/ConnectAccount";
import Tax from "./screens/compliance/Tax";
import Incorporation from "./screens/compliance/Incorporation";
import Services from "./screens/compliance/Services";


const DashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/overview" exact={true} element={<OverView />} />
        <Route path="/getstarted" exact={true} element={<GetStarted />} />
        {/* <Route path="*" element={<Page404 />} /> */}

        <Route path="/user-wallets" exact={true} element={<UserWallet />} />
        <Route path="/paymentlink" exact={true} element={<PaymentLinks />} />
        <Route path="/transaction" exact={true} element={<Transactions />} />

        <Route path="/usd-card" exact={true} element={<DollarCard />} />
        <Route path="/naira-card" exact={true} element={<NairaCard />} />
        <Route path="/store" exact={true} element={<Store />} />
        <Route path="/users" exact={true} element={<Users />} />
        <Route path="/invoice" exact={true} element={<Invoices />} />
        <Route path="/saved-invoice" exact={true} element={<SaveInvoice />} />
        <Route path="/createinvoice" exact={true} element={<CreateInvoice />} />
        <Route path="/customers" exact={true} element={<Customer />} />
        <Route path="/verification" exact={true} element={<Verification />} />
        <Route path="/usd-wallet" exact={true} element={<UsdWallet />} />
        <Route path="/beneficiaries" exact={true} element={<Beneficiaries />} />
        <Route path="/bulk-payment" exact={true} element={<BulkPayment />} />
        <Route
          path="/vant-assistant"
          exact={true}
          element={<VantAssistant />}
        />
        <Route
          path="/connect-account"
          exact={true}
          element={<ConnectAccount />}
        />

        {/* Book Keeping */}
        <Route path="/bookkeeping" exact={true} element={<BookKeeping />} />
        <Route
          path="/bookkeeping/configuration"
          exact={true}
          element={<Config />}
        />
        <Route
          path="/bookkeeping/migrate-transaction"
          exact={true}
          element={<MigrateTransaction />}
        />
        <Route
          path="/bookkeeping/report"
          exact={true}
          element={<BookKeepingReport />}
        />

        {/* Compliance */}
        <Route path="/tax" exact={true} element={<Tax />} />
        <Route path="/incorporation" exact={true} element={<Incorporation />} />
        <Route
          path="/compliance/services"
          exact={true}
          element={<Services />}
        />

        <Route path="/wallet" exact={true} element={<Wallet />}>
          <Route
            path="/wallet/overview"
            exact={true}
            element={<WalletOverview />}
          />
          <Route path="/wallet/topup" exact={true} element={<WalletTopup />} />
          <Route path="/wallet/debit" exact={true} element={<WalletDebits />} />
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
          <Route path="/setting/api-key" exact={true} element={<ApiKey />} />
          <Route path="/setting/pin-reset" exact={true} element={<Pin />} />
          <Route path="/setting/webhook" exact={true} element={<Webhook />} />
          <Route path="/setting/my-team" exact={true} element={<MyTeam />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
