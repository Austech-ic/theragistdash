// App.js

import React, { useState } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

const Customer = () => {
  const [barcodeData, setBarcodeData] = useState('');
  const [error, setError] = useState(null);

  const handleScan = (err, result) => {
    if (result) {
      setBarcodeData(result.text); // result.text contains the barcode data
      setError(null); // Clear any previous errors
    } else if (err) {
      setError("Unable to scan the barcode.");
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Barcode Scanner</h1>
      <p>Point your camera at a barcode to scan it.</p>

      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={handleScan}
      />

      {barcodeData && <p>Scanned Barcode: <strong>{barcodeData}</strong></p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Customer;
