import React, { useState } from 'react';
import BarcodeScannerComponent from 'react-barcode-reader';
import axios from 'axios';

const Customer = () => {
  const [barcode, setBarcode] = useState('');
  const [productInfo, setProductInfo] = useState(null);
  const [error, setError] = useState('');

  const handleScan = (data) => {
    if (data) {
      setBarcode(data);
      fetchProductInfo(data);
    }
  };

  const handleError = (err) => {
    setError('Error scanning the barcode');
    console.error(err);
  };

  const fetchProductInfo = async (barcode) => {
    try {
      // Replace this URL with your actual API endpoint
      const response = await axios.get(`https://api.example.com/products/${barcode}`);
      setProductInfo(response.data);
    } catch (err) {
      setError('Error fetching product information');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Drug Barcode Scanner</h2>
      
      <BarcodeScannerComponent
        onError={handleError}
        onScan={handleScan}
      />
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <p>Scanned Barcode: {barcode}</p>
        
        {productInfo ? (
          <div>
            <h3>Product Information</h3>
            <p><strong>Name:</strong> {productInfo.name}</p>
            <p><strong>Dosage:</strong> {productInfo.dosage}</p>
            <p><strong>Expiry Date:</strong> {productInfo.expiryDate}</p>
            <p><strong>Manufacturer:</strong> {productInfo.manufacturer}</p>
          </div>
        ) : (
          <p>No product information available.</p>
        )}
      </div>
    </div>
  );
};

export default Customer;
