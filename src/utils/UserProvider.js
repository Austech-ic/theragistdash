import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useCopilotReadable } from "@copilotkit/react-core";
import { useCopilotChatSuggestions } from "@copilotkit/react-ui";

// Create Context
export const UserContext = createContext();

// Create Provider
export const UserProvider = ({ children }) => {
  const [walletBalance, setWalletBalance] = useState(null);
  const [totalTeamMembers, setTotalTeamMembers] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [currency, setCurrency] = useState("Naira ₦");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  // Fetch user data on mount
  useEffect(() => {
    const userData = localStorage.getItem("authData");
    if (!userData) {
      navigate("/login");
    } else {
      const fetchUserSummary = async () => {
        try {
          const response = await api.getOverview({});
          setWalletBalance(response?.data?.wallet_balance);
          setTotalTeamMembers(response?.data?.total_users);

          const transactionsResponse = await api.getTransactionFullLength({});
          setTransactions(transactionsResponse?.data || []);

          const kycResponse = await api.getKyc({});
          setPersonalInfo(kycResponse?.data || null);

          const profileResponse = await api.getProfile()
          setProfile(profileResponse?.default_partner || null);

          const customersResponse = await api.getCustomers({});
          setCustomers(customersResponse?.data || []);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserSummary();
    }
  }, []);

  // Format wallet balance with currency
  const formattedWalletBalance = walletBalance
    ? `${currency}${walletBalance.toLocaleString()}`
    : `${currency}0`;

  // Initialize Copilot data directly
  useCopilotReadable({
    description:
      "The user current balance, total number of team members, currency, and all the transaction history.",
    value: {
      formattedWalletBalance,
      totalTeamMembers,
      currency,
      transactions,
    },
  });

  useCopilotReadable({
    description: "My Customer list and full information.",
    value: { customers },
  });

  useCopilotReadable({
    description: "Current logged-in user information.",
    value: { personalInfo },
  });

  useCopilotChatSuggestions({
    instructions: `
    Suggest actions/information in this page related to wallet balance, transactions, or policies.
    Use specific items or "all items," for example:
    "Show all transactions of utilities" or "Tell me how much I spent on bills."`,
    minSuggestions: 3,
    maxSuggestions: 3,
  });

  return (
    <UserContext.Provider
      value={{
        walletBalance,
        totalTeamMembers,
        loading,
        personalInfo,
        customers,
        transactions,
        profile
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook to use UserContext
export const useUserContext = () => useContext(UserContext);
