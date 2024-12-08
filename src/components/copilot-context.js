import React, { useEffect, useState } from "react";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { Button } from "@chakra-ui/react";

// Replace TypeScript enums with regular JavaScript objects
const Page = {
  Cards: "cards",
  Team: "team",
};

const CardsPageOperations = {
  ChangePin: "change-pin",
};

const TeamPageOperations = {
  InviteMember: "invite-member",
  RemoveMember: "remove-member",
  EditMember: "edit-member",
};

const AVAILABLE_OPERATIONS_PER_PAGE = {
  [Page.Cards]: Object.values(CardsPageOperations),
  [Page.Team]: Object.values(TeamPageOperations),
};

const CopilotContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Ensure hooks are called unconditionally
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

  useCopilotAction({
    name: "navigateToPageAndPerform",
    description: `
      Navigate to a page to perform an operation. For example, if the user asks to change a pin, 
      they are navigated to the "Cards" page with the necessary operation parameter.
    `,
    parameters: [
      {
        name: "page",
        type: "string",
        description: "The page in which to perform the operation",
        required: true,
        enum: ["/cards", "/team", "/"],
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
              window.location.href = `${page.toLowerCase()}${operationParams}`;
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

  useEffect(() => {
    const userData = localStorage.getItem("authData");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Prevent rendering children if the user is not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default CopilotContext;
