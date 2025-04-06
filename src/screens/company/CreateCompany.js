import {
  ArrowSquareLeft,
  DocumentSketch,
  DocumentUpload,
  ProfileAdd,
  Trash,
} from "iconsax-react";
import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import api from "../../api";
import InputField from "../../components/InputField";
import { enqueueSnackbar } from "notistack";
import { ClipLoader } from "react-spinners";

const CreateCompany = () => {
  const location = useLocation();
  const userData = location.state;
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [formValue, setFormValue] = useState({
    name: "",
    company_mail: "",
    allocated_session: "",
    company_address: "",
    csv_file: "",
  });

  const processCSV = (csvText) => {
    const lines = csvText.split("\n");

    // Extract headers from the first line
    const headerLine = lines[0].trim();
    const extractedHeaders = headerLine
      .split(",")
      .map((header) => header.trim());
    setHeaders(extractedHeaders);

    // Process data rows (skip header row)
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        // Skip empty lines
        const values = line.split(",").map((value) => value.trim());
        if (values.length === extractedHeaders.length) {
          // Create a row object with id for deletion tracking
          const rowObj = {
            id: i - 1, // Use row index as id
          };

          // Add each cell value with its corresponding header as key
          extractedHeaders.forEach((header, index) => {
            rowObj[header] = values[index];
          });

          rows.push(rowObj);
        }
      }
    }

    setData(rows);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = (event) => {
        const csvText = event.target.result;
        processCSV(csvText);
      };

      reader.readAsText(file);
    }
  };

  const handleDeleteRow = (id) => {
    setData(data.filter((row) => row.id !== id));
  };

  const handleClearData = () => {
    setData([]);
    setHeaders([]);
    setFileName("");
    setApiResponse(null);
  };

  // Convert current data back to CSV format
  const convertToCSV = () => {
    // Create header row
    let csvContent = headers.join(",") + "\n";

    // Add data rows
    data.forEach((row) => {
      const rowValues = headers.map((header) => {
        // Handle values with commas by wrapping in quotes
        const value = row[header] || "";
        return value.includes(",") ? `"${value}"` : value;
      });
      csvContent += rowValues.join(",") + "\n";
    });

    return csvContent;
  };

  // Send to API
  const sendToAPI = async () => {
    setIsLoading(true);
    setApiResponse(null);

    try {
      const csvContent = convertToCSV();

      // Create FormData to send the file
      const formData = new FormData();
      const csvBlob = new Blob([csvContent], { type: "text/csv" });
      formData.append("csvFile", csvBlob, fileName || "data.csv");

      const responseData = await response.json();
    } catch (error) {
      console.error("Error sending data to API:", error);
      setApiResponse({
        success: false,
        message: "Error sending data to API",
        details: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fileInputRef = useRef(null);

  const handleAddMore = () => {
    fileInputRef?.current?.click();
  };

  const handleInputChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const createCompany = async () => {
    setIsLoading(true);

    const csvContent = convertToCSV();

    // Create FormData to send the file
    const formData = new FormData();
    const csvBlob = new Blob([csvContent], { type: "text/csv" });
    formData.append("csv_file", csvBlob, fileName || "data.csv");

    formData.append("name", formValue?.name);
    formData.append("company_mail", formValue?.company_mail);
    formData.append("allocated_session", formValue?.allocated_session);
    formData.append("company_address", formValue?.company_address);
    formData.append("company_address", formValue?.company_address);

    try {
      const response = await api.createCompany(formData);
      enqueueSnackbar("Comapny Created Successfully", { variant: "success" });
      setIsLoading(false);
      ClearForm();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  };

  function ClearForm() {
    setFormValue({
      name: "",
      company_mail: "",
      allocated_session: "",
      company_address: "",
      csv_file: "",
    });
  }

  return (
    <div className="p-[18px] md:p-[28px] xl:p-[32px] 2xl:p-[38px]">
      <div>
        <div className="flex justify-end mb-[20px] md:mb-[25px] xl:mb-[30px]">
          <button
            onClick={createCompany}
            className="rounded-[8px] py-[12px] px-4 flex items-center gap-1 text-white  primary-bg"
          >
            <div className="flex items-center gap-1">
              <ProfileAdd
                variant="Bold"
                color="#fff"
                className="h-[14px] md:h-[16px]"
              />

              <p>Add Company</p>
            </div>
            {isLoading && <ClipLoader color={"white"} size={20} />}
          </button>
        </div>
        <Link to="/company-management">
          <div className="flex items-center gap-1 mb-4 md:mb-5">
            <ArrowSquareLeft color="#292D32" size={16} />
            <p className="text-[18px] md:text-[20px] lg:text-[24px] 2xl:text-[26px] text-primary">
              Company details
            </p>
          </div>
        </Link>

        <div className="border border-[#E1E1E1] rounded-[6px] p-2 sm:p-4 md:p-5 lg:p-7 xl:p-9">
          <p>User Details</p>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <div>
              <p classsName="text-sm mb-1 text-[#2e2e2e]">
                Name <sup className="">*</sup>
              </p>
              <InputField
                placeholder="Enter name"
                value={formValue.name}
                name="name"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div>
              <p classsName="text-sm mb-1 text-[#2e2e2e]">
                Email <sup className="">*</sup>
              </p>
              <InputField
                placeholder="Enter email"
                type="email"
                value={formValue.company_mail}
                name="company_mail"
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div>
              <p classsName="text-sm mb-1 text-[#2e2e2e]">
                Number of session <sup className="">*</sup>
              </p>
              <div className="">
                <InputField
                  type="text"
                  placeholder="0"
                  value={formValue.allocated_session}
                  name="allocated_session"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div>
              <p classsName="text-sm mb-1 text-[#2e2e2e]">
                Address <sup className="">*</sup>
              </p>
              <InputField
                type="text"
                placeholder="Enter Address"
                value={formValue.company_address}
                name="company_address"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
        </div>

        <div className="p-6 max-w-6xl mx-auto">
          {data.length > 0 && (
            <div className="mt-4 mb-6 flex flex-wrap gap-3">
              <button
                onClick={handleClearData}
                className="px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-500 transition-colors"
              >
                Clear Data
              </button>

             
            </div>
          )}

          {data.length > 0 ? (
            <div className="mt-6 overflow-x-auto shadow-md rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#E6F7F9]">
                  <tr>
                    {headers.map((header, index) => (
                      <th
                        key={index}
                        className="p-3 border-b border-gray-300 font-medium"
                      >
                        {header}
                      </th>
                    ))}
                    <th className="p-3 border-b border-gray-300 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      {headers.map((header, index) => (
                        <td
                          key={index}
                          className="p-3 border-b border-gray-300"
                        >
                          {row[header]}
                        </td>
                      ))}
                      <td className="p-3 border-b border-gray-300">
                        <button onClick={() => handleDeleteRow(row.id)}>
                          <Trash color="red" variant="Bold" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-sm text-gray-600">
                Showing {data.length} {data.length === 1 ? "row" : "rows"}
              </p>
            </div>
          ) : fileName ? (
            <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
              No data found in the CSV file.
            </div>
          ) : (
            <div className="w-full flex items-center ">
              <div className=" rounded-lg my-6 w-[90%] md:w-[70%] lg:w-[60%] h-[220px] md:h-[260px] xl:h-[310px] mx-auto border border-stroke flex flex-col items-center justify-center gap-4 md:gap-5 ">
                <div className="rounded-full  mx-auto bg-[#E8E8E8] h-[50px] md:h-[60px] lg:h-[70px] xl:h-[100px] w-[50px] md:w-[60px] lg:w-[70px] xl:w-[100px] flex items-center justify-center ">
                  <DocumentSketch
                    color="#fff"
                    variant="Bold"
                    className="h-[20px] md:h-[30px] xl:h-[[40px]"
                  />
                </div>
                <p className="text-center">Select CSV file to upload </p>
                <button
                  onClick={handleAddMore}
                  className="rounded-[8px] py-[12px] px-4 flex items-center gap-1 text-white  primary-bg"
                >
                  <DocumentUpload
                    variant="Bold"
                    color="#fff"
                    className="h-[14px] md:h-[16px]"
                  />
                  <p>Upload CSV</p>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="fileInput"
                    ref={fileInputRef}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
