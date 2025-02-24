import React, { useEffect, useState } from "react";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // React Router

// Page constants as JavaScript objects
const Page = {
  Transfer: "/wallet/overview",
  Team: "/setting/my-team",
  Transaction: "/transaction",
  Customers: "/customers",
  Store: "/store",
  CreateInvoice: "/createinvoice",
  PaymentLink: "/paymentlink",
};

const TransferPageOperations = {
  TransferToBank: "transfer-to-bank",
};

const TeamPageOperations = {
  InviteMember: "invite-member",
  RemoveMember: "remove-member",
  EditMember: "edit-member",
};

const TransactionPageOperations = {
  TransferToBank: "transfer-to-bank",
};

const CustomersPageOperations = {
  AddCustomer: "add-customer",
  EditCustomer: "edit-customer",
};

const StorePageOperations = {
  AddProduct: "add-product",
  EditProduct: "edit-product",
  RemoveProduct: "remove-product",
};

const CreateInvoicePageOperations = {
  AddInvoice: "add-invoice",
  ViewInvoice: "view-invoice",
};

const PaymentLinkPageOperations = {
  AddPaymentLink: "add-payment-link",
};

const AVAILABLE_OPERATIONS_PER_PAGE = {
  [Page.Transfer]: Object.values(TransferPageOperations),
  [Page.Team]: Object.values(TeamPageOperations),
  [Page.Transaction]: Object.values(TransactionPageOperations),
  [Page.Customers]: Object.values(CustomersPageOperations),
  [Page.Store]: Object.values(StorePageOperations),
  [Page.CreateInvoice]: Object.values(CreateInvoicePageOperations),
  [Page.PaymentLink]: Object.values(PaymentLinkPageOperations),
};

const CopilotContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // React Router navigation

  // CopilotKit Readable Hooks
  useCopilotReadable({
    description: "The current user logged into the system",
    value: currentUser,
  });

  useCopilotReadable({
    description:
      "The available pages and operations, as well as the current page",
    value: {
      pages: Object.values(Page),
      operations: AVAILABLE_OPERATIONS_PER_PAGE,
      currentPage: window.location.pathname.split("/").pop(),
    },
  });

  // CopilotKit Action Hook
  useCopilotAction({
    name: "navigateToPageAndPerform",
    description: `
      This action facilitates navigation to a specified page to perform a given operation. 
      It is particularly useful when an action is requested that is outside the current page context.
      
      For instance, if a user is on the dashboard and requests to modify a team member or perform a transaction, 
      this action will navigate them to the appropriate page with the necessary operation parameters.

      If the requested operation is not available on the current page, inform the user and suggest navigating to the correct page. 
      You can offer to perform the navigation for them, or advise them to re-ask once they are on the correct page.

      Example: "Adding a new card is not available on this page. Would you like to navigate to the 'Cards' page and try again?"

      If the operation is available, proceed with the navigation automatically.
    `,
    parameters: [
      {
        name: "page",
        type: "string",
        description: "The target page for the operation",
        required: true,
        enum: ["/wallet/overview", "/transaction","/customers","/store", "/setting/my-team", "/createinvoice", "/paymentlink", "/saved-invoice","/team", "/"], // Available pages
      },
      {
        name: "operation",
        type: "string",
        description: "The specific operation to perform on the target page",
        required: false,
      },
      {
        name: "operationAvailable",
        type: "boolean",
        description: "Indicates if the operation is available on the target page",
        required: true,
      },
    ],
    followUp: false,
    renderAndWait: ({ args, handler }) => {
      const { page, operation, operationAvailable } = args;

      console.log("Render and Wait called with:", args);

      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
          <div>Navigate to {page}?</div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              console.log("Navigating to:", page);
              const operationParams = operationAvailable ? `?operation=${operation}` : "";
              navigate(`${page.toLowerCase()}${operationParams}`);
              if (handler) {
                handler(page);
              } else {
                console.error("Handler is not defined");
              }
            }}
            aria-label="Confirm Navigation"
            style={{ margin: '0 10px', backgroundColor: '#e0f7fa', color: '#00796b' }}
          >
            Yes
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              console.log("Navigation cancelled");
              if (handler) {
                handler("cancelled");
              } else {
                console.error("Handler is not defined");
              }
            }}
            aria-label="Cancel Navigation"
            style={{ margin: '0 10px', backgroundColor: '#fbe9e7', color: '#d84315' }}
          >
            No
          </Button>
        </div>
      );
    },
  });

  // Check authentication on mount
  useEffect(() => {
    const userData = localStorage.getItem("authData");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return children;
};

export default CopilotContext;
