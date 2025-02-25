import React, { useState } from "react";
import { CopilotChat } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { StatementOfAccountPDF } from "../components/StatementOfAccount";
import { pdf } from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "../utils/UserProvider";
import { getTransaction, getexportTransaction, getCustomers, createCustomer, updateCustomer } from "../api/actions";
import { enqueueSnackbar } from "notistack";

const VantAssistant = () => {
  const [startdate, setStartdate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [reference, setReference] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [currency, setCurrency] = useState("");
  const [reason, setReason] = useState("");
  const { profile } = useUserContext();

  const Transactions = useQuery(
    [
      "transactions",
      page,
      reference,
      startdate,
      enddate,
      type,
      status,
      currency,
      reason,
    ],
    () => getTransaction({ page, reference, startdate, enddate, type, status, currency, reason }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  const customers = useQuery(
    ["customers" ],
    () => getCustomers(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  useCopilotReadable({
    description: "The available transactions and their details.",
    value: Transactions?.data?.data,
  });

  useCopilotAction({
    name: "exportTransaction",
    description: "Export the transactions to a csv file",
    handler: () => exportToExcel(),
  });

  useCopilotAction({
    name: "generateStatement",
    description: "Generate a statement of account for the given start and end date in pdf format",
    parameters: [
      {
        name: "startDate",
        type: "string",
        description: "The start date of the statement",
        required: true,
      },
      {
        name: "endDate",
        type: "string",
        description: "The end date of the statement",
        required: true,
      },
    ],
    handler: ({ startDate, endDate }) =>
      generateAndDownloadPDF(startDate, endDate),
  });

  const exportToExcel = () => {
    const data = Transactions?.data?.data;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, "Transaction-Report.xlsx");
  };

  const exportdata = useQuery(
    ["exportdata", page, startdate, enddate],
    () => getexportTransaction({ startdate, enddate }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  const statementData = exportdata?.data?.data?.filter(
    (item) => item.status === "successful"
  );

  const generateAndDownloadPDF = async (startDate, endDate) => {
    const blob = await pdf(
      <StatementOfAccountPDF
        profile={profile}
        data={statementData}
        startDate={startDate}
        endDate={endDate}
      />
    ).toBlob();
    saveAs(blob, "Transaction_Statement.pdf");
  };

  useCopilotReadable({
    description: "The available customers and their details.",
    value: customers?.data?.data,
  });

  useCopilotAction({
    name: "createCustomer",
    description: "Create a new customer",
    parameters: [
      {
        name: "name",
        type: "string",
        description: "The name of the customer",
        required: true,
      },
      {
        name: "email",
        type: "string",
        description: "The email of the customer",
        required: true,
      },
      {
        name: "phone",
        type: "string",
        description: "The phone number of the customer",
        required: true,
      },
    ],
    handler: ({ name, email, phone }) => handleCreateCustomer({ name, email, phone }),
  });

  useCopilotAction({
    name: "updateCustomer",
    description: "Update the details of a customer",
    parameters: [
      {
        name: "customerId",
        type: "string",
        description: "The id of the customer",
        required: true,
      },
      {
        name: "email",
        type: "string",
        description: "The email of the customer",
        required: true,
      },
      {
        name: "status",
        type: "string",
        description: "The status of the customer",
      },
      {
        name: "name",
        type: "string",
        description: "The name of the customer",
        required: true,
      },
      {
        name: "phone",
        type: "string",
        description: "The phone number of the customer",
        required: true,
      },
    ],
    handler: ({ customerId, email, status, name, phone }) => handleUpdateCustomer({ customerId, email, status, name, phone }),
  });

  const handleCreateCustomer = async ({ name, email, phone }) => {
    try {
      const response = await createCustomer({
        email,
        isActive: true,
        name,
        phone,
      });
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      enqueueSnackbar("Customer Created Successfully", { variant: "success" });
      customers.refetch();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const handleUpdateCustomer = async ({ customerId, email, status, name, phone }) => {
    try {
      const response = await updateCustomer(customerId, {
        email,
        isActive: status === "true" ? true : false,
        name,
        phone,
      });
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      enqueueSnackbar(decryptRes?.message, { variant: "success" });
      customers.refetch();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div className="p-4 border">
      <CopilotChat
        instructions={
          "You are assisting the user as best as you can. Answer in the best way possible given the data you have."
        }
        labels={{
          title: "Vant Assistant",
          initial: "Hi! 👋 How can I assist you today?",
        }}
      />
    </div>
  );
};

export default VantAssistant;
