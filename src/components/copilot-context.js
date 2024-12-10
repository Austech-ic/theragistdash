import React, { useEffect, useState } from "react";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // React Router

// Page constants as JavaScript objects
const Page = {
  Transfer: "/wallet/overview",
  Team: "/setting/my-team",
};

const TransferPageOperations = {
  ChangePin: "transfer-to-bank",
};

const TeamPageOperations = {
  InviteMember: "invite-member",
  RemoveMember: "remove-member",
  EditMember: "edit-member",
};

const AVAILABLE_OPERATIONS_PER_PAGE = {
  [Page.Transfer]: Object.values(TransferPageOperations),
  [Page.Team]: Object.values(TeamPageOperations),
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
      Navigate to a page to perform an operation. For example, if the user asks to transfer funds or money, 
      they are navigated to the "Transfer" page with the necessary operation parameter.
    `,
    parameters: [
      {
        name: "page",
        type: "string",
        description: "The page in which to perform the operation",
        required: true,
        enum: ["/wallet/overview", "/team", "/"], // Available pages
      },
      {
        name: "operation",
        type: "string",
        description:
          "The operation to perform. Use operation code from available operations per page.",
        required: false,
      },
      {
        name: "operationAvailable",
        type: "boolean",
        description: "Flag if the operation is available",
        required: true,
      },
    ],
    followUp: false,
    renderAndWait: ({ args, handler }) => {
      const { page, operation, operationAvailable } = args;

      return (
        <div className="flex items-center justify-center space-x-4 rounded-lg bg-white p-4">
          <div>Navigate to {page}?</div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const operationParams = operationAvailable
                ? `?operation=${operation}`
                : "";
              navigate(`${page.toLowerCase()}${operationParams}`);
              handler?.(page);
            }}
            aria-label="Confirm Navigation"
            className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
          >
            Yes
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handler?.("cancelled")}
            aria-label="Cancel Navigation"
            className="h-12 w-12 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-900/20 dark:text-gray-400 dark:hover:bg-gray-900/30 dark:hover:text-gray-300"
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

  // Render children only if authenticated
  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default CopilotContext;
