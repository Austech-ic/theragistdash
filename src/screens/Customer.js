/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import BarcodeScannerComponent from 'react-barcode-reader';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { useZxing } from 'react-zxing';


const Customer = () => {
  const [barcode, setBarcode] = useState('');
  const [productInfo, setProductInfo] = useState(null);
  const [error, setError] = useState('');
  const [devices, setDevices]= useState(null);

  const handleScan = (data) => {
    if (data) {
      setBarcode(data);
      fetchProductInfo(data);
    }
  };

  useEffect(()=> {
    (async () => {
      try {
        const availableDevices = await navigator.mediaDevices.enumerateDevices();
        const availableVideoDevices = availableDevices.filter(device => device.kind === 'videoinput');
        if (availableVideoDevices.length === 0) {
          enqueueSnackbar('No cameras found');
          
        }
        else {
          setDevices(availableVideoDevices);
        }
      }catch {
        enqueueSnackbar('Error accessing the camera');
      }
    })
  
  })


//...
const [scan, setScan] = React.useState(null);

const { ref } = useZxing({
  onResult(newScan) {
    setScan(newScan);
  },
  devices
});

//...

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
    <>
//...
          <video width="300" ref={ref} />
//...
    </>);
};

export default Customer;
