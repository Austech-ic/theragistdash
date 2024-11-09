import React, { useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDragEnter = () => setIsDragging(true);
  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    setUploading(true);

    try {
      await axios.post("YOUR_API_ENDPOINT", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md ">
      <div
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center ${
          isDragging ? 'border-blue-500' : 'border-gray-300'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {preview && (
          <img src={preview} alt="Preview" className="w-48 h-48 object-cover rounded mb-4" />
        ) }

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
              setImage(file);
              setPreview(URL.createObjectURL(file));
            }
          }}
          className="hidden"
          id="fileInput"
        />


          <p className="text-gray-500">Drag & Drop an image here</p>
        
        <label htmlFor="fileInput" className="mt-1 text-[#26ae5f] cursor-pointer hover:underline">
          Or select an image
        </label>
      </div>

      {preview && (
        <button
          onClick={handleImageUpload}
          disabled={uploading}
          className="w-full mt-4 bg-[#26ae5f] hover:bg-[#57ca87] text-white  py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {uploading ? ( <ClipLoader color={"white"} size={18} />) : 'Upload Image'}
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
