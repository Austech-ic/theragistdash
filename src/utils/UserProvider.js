import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useCopilotReadable } from "@copilotkit/react-core";
import { useCopilotChatSuggestions } from "@copilotkit/react-ui";

// Create Context
const UserContext = createContext();

// Create Provider
export const UserProvider = ({ children }) => {
  const [walletBalance, setWalletBalance] = useState(null);
  const [totalTeamMembers, setTotalTeamMembers] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state
  const navigate = useNavigate();

  useEffect(() => {
    let userData = localStorage.getItem("authData");

    if (!userData) {
      // If no user data in localStorage, redirect to login
      navigate("/login");
    } else {
      // If user data exists, fetch the user summary
      const fetchUserSummary = async () => {
        try {
          const response = await api.getOverview({});
          setWalletBalance(response?.data?.wallet_balance);
          setTotalTeamMembers(response?.data?.total_users);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserSummary();
    }
  }, [navigate]);

  useCopilotChatSuggestions({
    instructions: `
    suggest actions/information in this page related to credit cards, transactions or policies.
    Use specific items or "all items", for example:
    "Show all transactions of Marketing department" or "Tell me how much I spent on my Mastercard"
    If the user has permission to e.g. add credit card, then you can suggest to add a new card.
    Do the same for other actions.
  `,
    minSuggestions: 3,
    maxSuggestions: 3,
  });

  // Initialize copilotData with nulls or default values to avoid conditional hook calls
  useCopilotReadable({
    description: "User current balance",
    value: walletBalance,
  });
  useCopilotReadable({
    description: "Total number of team members",
    value: totalTeamMembers,
  });

  if (loading) {
    // Optionally show a loading indicator
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider
      value={{ walletBalance, totalTeamMembers }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook to use UserContext
export const useUserContext = () => useContext(UserContext);
