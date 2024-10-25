import React, { useRef, useEffect, useState } from "react";
import JsBarcode from "jsbarcode";
import ReactToPrint from "react-to-print";
import Barcode from "react-barcode";

const Customer = () => {
  const [text, setText] = useState('');
  const barcodeRef = useRef(null);

  const handlePrint = () => {
    if (barcodeRef.current) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Barcode</title>
            <style>
              body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
              }
              img {
                width: 300px;
              }
            </style>
          </head>
          <body>
            ${barcodeRef.current.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h1>Barcode Generator</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to convert to barcode"
      />
      <div ref={barcodeRef} style={{ margin: '20px' }}>
        {text && (
          <Barcode
            value={text}
            width={1} // Barcode width
            height={100} // Barcode height
            displayValue={false} // Set to true if you want to display the text below the barcode
          />
        )}
      </div>
      <button onClick={handlePrint} disabled={!text}>
        Print Barcode
      </button>
    </div>
  );
};

export default Customer;
