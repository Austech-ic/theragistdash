// App.js

import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const Customer = () => {
  const [barcodeData, setBarcodeData] = useState('');
  const [error, setError] = useState(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!scannerRef.current) {
      const html5QrcodeScanner = new Html5Qrcode("reader");

      // Start the scanner
      html5QrcodeScanner.start(
        { facingMode: "environment" }, // Rear camera
        {
          fps: 10, // Frames per second
          qrbox: { width: 250, height: 250 } // Scan box size
        },
        (decodedText) => {
          setBarcodeData(decodedText);
          setError(null); // Clear any previous errors
          html5QrcodeScanner.stop(); // Stop scanning after successful scan
        },
        (err) => {
          setError("Scanning error or barcode not detected. Please try again.");
          console.log(err);
        }
      ).catch((err) => {
        setError("Failed to initialize scanner.");
        console.error(err);
      });

      scannerRef.current = html5QrcodeScanner; // Store the scanner instance
    }

    // Cleanup on unmount
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch((err) => console.error("Failed to stop scanner", err));
      }
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Barcode Scanner</h1>
      <p>Point your camera at a barcode to scan it.</p>

      <div id="reader" style={{ width: "300px", margin: "auto" }}></div>

      {barcodeData && <p>Scanned Barcode: <strong>{barcodeData}</strong></p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Customer;
