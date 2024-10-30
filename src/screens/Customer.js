import React, { useState, useRef, useEffect } from 'react';
import { Camera, XCircle } from 'lucide-react';

const Customer = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startScanning = async () => {
    try {
      setError('');
      setResult('');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setScanning(true);
        
        // Set up barcode detection
        if ('BarcodeDetector' in window) {
          const barcodeDetector = new window.BarcodeDetector({
            formats: ['qr_code', 'ean_13', 'ean_8', 'upc_a', 'upc_e']
          });
          
          const checkForBarcode = async () => {
            if (videoRef.current && scanning) {
              try {
                const barcodes = await barcodeDetector.detect(videoRef.current);
                if (barcodes.length > 0) {
                  setResult(barcodes[0].rawValue);
                  stopScanning();
                } else {
                  requestAnimationFrame(checkForBarcode);
                }
              } catch (err) {
                requestAnimationFrame(checkForBarcode);
              }
            }
          };
          
          checkForBarcode();
        } else {
          setError('Barcode detection is not supported in your browser');
          stopScanning();
        }
      }
    } catch (err) {
      setError('Unable to access camera. Please ensure you have granted camera permissions.');
      setScanning(false);
    }
  };

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setScanning(false);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      <div className="relative">
        {scanning ? (
          <>
            <video 
              ref={videoRef}
              className="w-full h-64 bg-gray-900 rounded-lg"
              autoPlay
              playsInline
            />
            <button
              onClick={stopScanning}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg"
            >
              <XCircle className="h-6 w-6 text-red-500" />
            </button>
          </>
        ) : (
          <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <button
              onClick={startScanning}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Camera className="h-5 w-5" />
              <span>Start Scanning</span>
            </button>
          </div>
        )}
      </div>

      {result && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-medium text-green-900">Scanned Barcode:</h3>
          <p className="text-green-800">{result}</p>
        </div>
      )}
    </div>
  );
};

export default Customer;