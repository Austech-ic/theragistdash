import React from 'react';
import { Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import logo from "../../assets/VantLogo.png"


const NairaCard = () => {
  
  const transactions = [
    {
      date: "2025-01-14",
      valueDate: "2025-01-14",
      description: "OPay Card Payment",
      amount: -5000.00,
      balance: 7164.58,
      channel: "POS",
      reference: "250114330100799126227922"
    },
    {
      date: "2025-01-14",
      valueDate: "2025-01-14",
      description: "Transfer from Raphael Oluwajuedalo Abayomi",
      amount: 30000.00,
      balance: 37164.58,
      channel: "E-Channel",
      reference: "100033250114194920020007783932"
    },
    {
      date: "2025-01-14",
      valueDate: "2025-01-14",
      description: "Electronic Money Transfer Levy",
      amount: -50.00,
      balance: 37114.58,
      channel: "E-Channel",
      reference: "250114140200809599411642"
    }
  ];

  const accountInfo = {
    accountName: "Raphael Oluwajuedalo Abayomi",
    accountNumber: "8068325446",
    startDate: "2025-01-14",
    endDate: "2025-01-15",
    openingBalance: 12164.58,
    closingBalance: 3114.58,
    currentBalance: 26.78,
    debitCount: 5,
    creditCount: 1,
    totalDebit: 39050.00,
    totalCredit: 30000.00,
    address: "74, ago iwoye extension, owutu, ikorodu, Lagos state, Agric, Other, Ikorodu, Lagos"
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Add logo
    const logoWidth = 30;
    const logoHeight = 15;
    const logoX = (pageWidth - logoWidth) / 2;

    doc.addImage(logo, "PNG", logoX, 15, logoWidth, logoHeight);

    // Add title
    doc.setFontSize(14);
    doc.text("Account Statement", 105, 34, { align: "center" });

      // Set up container dimensions and styling
      const containerPadding = 4;
      const containerX = 10;
      const containerY = 40;
      const containerWidth = pageWidth - (containerX * 2);
      const lineHeight = 7; // Height per line of text
      const numLines = 4; // Number of lines of text
      const containerHeight = (numLines * lineHeight) + (containerPadding * 2);
      const textStartY = containerY + containerPadding + 5;
      const cornerRadius = 2;
  
      // Draw rounded rectangle container with gray background
      doc.setFillColor(240, 240, 240); // Light gray background
      doc.setDrawColor(200, 200, 200); // Light gray border
      
      // Draw rounded rectangle
      doc.roundedRect(
        containerX,
        containerY,
        containerWidth,
        containerHeight,
        cornerRadius,
        cornerRadius,
        'FD' // Fill and Draw - both fill and border
      );
  
      // Add text content
      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60); // Dark gray text
      
      const accountInfoLines = [
        `Account Name: ${accountInfo.accountName}`,
        `Account Number: ${accountInfo.accountNumber}`,
        `Statement Period: ${formatDate(accountInfo.startDate)} - ${formatDate(accountInfo.endDate)}`,
        `Address: ${accountInfo.address}`,
      ];
  
      // Calculate text position and add each line
      accountInfoLines.forEach((line, index) => {
        doc.text(
          line,
          containerX + containerPadding,
          textStartY + (index * lineHeight)
        );
      });
  
      // Add summary information container
      const summaryContainerY = containerY + containerHeight + 15;
      const summaryContainerHeight = (5 * lineHeight) + (containerPadding * 2);
  
      // Draw summary container
      doc.setFillColor(240, 240, 240);
      doc.roundedRect(
        containerX,
        summaryContainerY,
        containerWidth,
        summaryContainerHeight,
        cornerRadius,
        cornerRadius,
        'FD'
      );
  
      // Add summary text
      const summaryLines = [
        `Opening Balance: ${accountInfo.openingBalance}`,
        `Closing Balance: ${accountInfo.closingBalance}`,
        `Total Debit: ${accountInfo.totalDebit}`,
        `Total Credit: ${accountInfo.totalCredit}`,
        `Current Balance: ${accountInfo.currentBalance}`,
      ];
  
      summaryLines.forEach((line, index) => {
        doc.text(
          line,
          containerX + containerPadding,
          summaryContainerY + containerPadding + 5 + (index * lineHeight)
        );
      });
  
      // Adjust starting Y position for the table
      const tableStartY = summaryContainerY + summaryContainerHeight + 15;
  
      // Add transactions table
      const tableData = transactions.map(t => [
        formatDate(t.date),
        formatDate(t.valueDate),
        t.description,
        t.amount < 0 ? formatCurrency(Math.abs(t.amount)) : '',
        t.amount > 0 ? formatCurrency(t.amount) : '',
        formatCurrency(t.balance),
        t.channel,
        t.reference
      ]);
  
      autoTable(doc, {
        head: [['Trans. Date', 'Value Date', 'Description', 'Debit(₦)', 'Credit(₦)', 'Balance(₦)', 'Channel', 'Reference']],
        body: tableData,
        startY: tableStartY,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [66, 139, 202] },
        columnStyles: {
          0: { cellWidth: 20 },
          1: { cellWidth: 20 },
          2: { cellWidth: 40 },
          3: { cellWidth: 20, halign: 'right' },
          4: { cellWidth: 20, halign: 'right' },
          5: { cellWidth: 20, halign: 'right' },
          6: { cellWidth: 20 },
          7: { cellWidth: 30 }
        },
      });
  
      // Add footer note
      const pageHeight = doc.internal.pageSize.height;
      doc.setFontSize(8);
      doc.text(
        "Note: Current Balance includes OWealth Balance which is powered by Blue Ridge Microfinance Bank, and OPay Wallet Balance.",
        15,
        pageHeight - 20
      );
  
      // Save the PDF
      doc.save(`Statement_${accountInfo.accountNumber}_${formatDate(accountInfo.endDate)}.pdf`);
    };


  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Account Statement</h1>
        <button 
          onClick={generatePDF}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <Download size={16} />
          Download PDF
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <p><span className="font-semibold">Account Name:</span> {accountInfo.accountName}</p>
          <p><span className="font-semibold">Account Number:</span> {accountInfo.accountNumber}</p>
          <p><span className="font-semibold">Address:</span> {accountInfo.address}</p>
        </div>
        <div className="space-y-2">
          <p><span className="font-semibold">Statement Period:</span> {formatDate(accountInfo.startDate)} - {formatDate(accountInfo.endDate)}</p>
          <p><span className="font-semibold">Opening Balance:</span> {formatCurrency(accountInfo.openingBalance)}</p>
          <p><span className="font-semibold">Closing Balance:</span> {formatCurrency(accountInfo.closingBalance)}</p>
        </div>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded grid grid-cols-3 gap-4">
        <div>
          <p className="font-semibold">Total Debit</p>
          <p className="text-red-600">{formatCurrency(accountInfo.totalDebit)}</p>
        </div>
        <div>
          <p className="font-semibold">Total Credit</p>
          <p className="text-green-600">{formatCurrency(accountInfo.totalCredit)}</p>
        </div>
        <div>
          <p className="font-semibold">Current Balance</p>
          <p>{formatCurrency(accountInfo.currentBalance)}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left border">Trans. Date</th>
              <th className="p-3 text-left border">Value Date</th>
              <th className="p-3 text-left border">Description</th>
              <th className="p-3 text-right border">Debit(₦)</th>
              <th className="p-3 text-right border">Credit(₦)</th>
              <th className="p-3 text-right border">Balance(₦)</th>
              <th className="p-3 text-left border">Channel</th>
              <th className="p-3 text-left border">Reference</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-3 border">{formatDate(transaction.date)}</td>
                <td className="p-3 border">{formatDate(transaction.valueDate)}</td>
                <td className="p-3 border">{transaction.description}</td>
                <td className="p-3 border text-right text-red-600">
                  {transaction.amount < 0 ? formatCurrency(Math.abs(transaction.amount)).replace('NGN', '') : ''}
                </td>
                <td className="p-3 border text-right text-green-600">
                  {transaction.amount > 0 ? formatCurrency(transaction.amount).replace('NGN', '') : ''}
                </td>
                <td className="p-3 border text-right">
                  {formatCurrency(transaction.balance).replace('NGN', '')}
                </td>
                <td className="p-3 border">{transaction.channel}</td>
                <td className="p-3 border">{transaction.reference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p>Note: Current Balance includes OWealth Balance which is powered by Blue Ridge Microfinance Bank, and OPay Wallet Balance.</p>
      </div>
    </div>
  );
};

export default NairaCard;
