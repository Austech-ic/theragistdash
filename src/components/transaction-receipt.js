import React, { forwardRef, useImperativeHandle } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { DocumentDownload } from "iconsax-react";
import logo from "../assets/VantLogo.png"
import moment from "moment";

const TransactionReceipt = forwardRef(
  ({ transaction, showDownloadbutton = true, isLoading, setIsLoading }, ref) => {
    // Default transaction data
 

    const data = transaction 

    const generatePDF = () => {
      // Initialize jsPDF
      const doc = new jsPDF();

      // Set font
      doc.setFont("helvetica");

      // Add bank logo (placeholder rectangle)
      doc.addImage(logo, 'PNG', 20, 70, 20, 10);

      // Add title
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Transaction Receipt", 15, 30);

     

      const allRows = [
        data?.beneficiary?.bank && ["Bank Name", data?.beneficiary?.bank],
        data?.beneficiary?.account_number && ["Account Number", data?.beneficiary?.account_number],
        data.accountNumber && ["Account number", data.accountNumber],
        data.accountType && ["Account Type", data.accountType],
        data.currency && ["Currency", "Naira"],
        data.amount && ["Transaction Amount", `NGN ${data.amount}`],
        data.reference && ["Transaction Number", data.reference],
        data.remark && ["Transaction Description", data.remark],
        data.date && ["Transaction Date",      moment(data.date).format("MMM DD, HH:mm:ss") ],
        data.type && ["Transaction Type", data.type],
        data.status && ["Transaction Status", data.status]
      ];
    
      // Filter out null, undefined and empty arrays
      const filteredRows = allRows.filter(row => row && row[1]);

      //Custom style for the table
      doc.autoTable({
        startY: 40,
        head: [["", ""]],
        body: filteredRows,
        theme: "grid",
        headStyles: {
          fillColor: [66, 66, 66],
          textColor: [255, 255, 255],
          fontSize: 12,
        },
        styles: {
          fontSize: 10,
          cellPadding: 5,
        },
        columnStyles: {
          0: { fontStyle: "bold", width: 80 },
          1: { width: 110 },
        },
      });
     

     // Add Transaction Description separately due to its potential length
     const descriptionY = doc.lastAutoTable.finalY + 10;
     doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setFont("helvetica", "normal");

      //Word wrap for long description
      const splitDescription = doc.splitTextToSize(data.description, 180);
      // doc.text(splitDescription, 15, descriptionY + 7);

      // Add disclaimer
      const disclaimerText =
        "DISCLAIMER: This is a computer generated document requiring no signature and it represents our records of your transactions with us. Any exceptions must be advised to the bank immediately. If we do not hear from you within 2 weeks, we will assume that you are in agreement with the details stated. All products are subject to the bank's terms and conditions.";
      const contactText =
          "For any enquiries, please contact our business concierge team on";
        // "For any enquiries, please contact our business concierge team on 0700PROVIDUS (070077684387) or send an email to businessconcierge@providusbank.com";

        const disclaimerY = descriptionY + 30;
        doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.text("DISCLAIMER", 15, disclaimerY);
      doc.setFont("helvetica", "normal");

      const splitDisclaimer = doc.splitTextToSize(disclaimerText, 180);
      doc.text(splitDisclaimer, 15, disclaimerY + 5);

      const splitContact = doc.splitTextToSize(contactText, 180);
      doc.text(splitContact, 15, disclaimerY + 20);

      // Save the PDF
      doc.save(`Transaction_Receipt_${data.reference}.pdf`);
      setIsLoading(false)
    };

    // Expose the generatePDF function to parent components
    useImperativeHandle(ref, () => ({
      generatePDF,
    }));

    const ReceiptRow = ({ label, value }) => (
      <div className="flex border-b border-gray-200 py-2">
        <span className="w-1/3 font-medium text-gray-600">{label}</span>
        <span className="w-2/3 text-gray-800">{value}</span>
      </div>
    );

    return (
      <div className="w-full max-w-2xl p-6 space-y-4">
        <div className="flex justify-between items-center mb-6">
          <img
            className=" h-[40px] w-[70px] mb-4 "
            src="/assets/VantLogo.png"
            alt="logo"
          />
          <h2 className="text-2xl font-bold text-gray-800">
            Transaction Advice
          </h2>
          {showDownloadbutton && (
            <button onClick={generatePDF} className="flex items-center gap-2">
              <DocumentDownload className="w-4 h-4" />
              Download Receipt
            </button>
          )}
        </div>
        

        <div className="space-y-2">
          <ReceiptRow label="Bank Name" value={data.bankName} />
          <ReceiptRow label="Customer Number" value={data.customerNumber} />
          <ReceiptRow label="Branch" value={data.branch} />
          <ReceiptRow
            label="Account number / IBAN"
            value={
              <div>
                <div>{data.accountNumber}</div>
                <div>{data.ibanNumber}</div>
              </div>
            }
          />
          <ReceiptRow label="Account Type" value={data.accountType} />
          <ReceiptRow label="Currency" value={data.currency} />
          <ReceiptRow
            label="Transaction Amount"
            value={`${data.amount} ${data.currency}`}
          />
          <ReceiptRow
            label="Transaction Number"
            value={data.transactionNumber}
          />
          <ReceiptRow label="Transaction Date" value={data.transactionDate} />
          <ReceiptRow label="Transaction Value Date" value={data.valueDate} />
          <ReceiptRow
            label="Transaction Description"
            value={data.description}
          />
          <ReceiptRow label="Transaction Type" value={data.type} />
        </div>

        <div className="mt-6 text-sm text-gray-600 border-t pt-4">
          <p className="font-bold mb-2">DISCLAIMER</p>
          <p>
            This is a computer generated document requiring no signature and it
            represents our records of your transactions with us. Any exceptions
            must be advised to the bank immediately. If we do not hear from you
            within 2 weeks. We will assume that you are in agreement with the
            details stated. All products are subject to the bank's terms and
            conditions. For any enquiries, please contact our business concierge
            team on 0700PROVIDUS (070077684387) or send an email to
            businessconcierge@providusbank.com
          </p>
        </div>
      </div>
    );
  }
);

TransactionReceipt.displayName = "TransactionReceipt";

export default TransactionReceipt;
