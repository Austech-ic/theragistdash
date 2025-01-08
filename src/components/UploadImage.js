import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import api from "../api";
import { enqueueSnackbar } from "notistack";
import { decryptaValue } from "../utils/helperFunctions";

const ImageUpload = ({ handleCloseModal, refetch }) => {
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDragEnter = () => setIsDragging(true);
  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("logo/")) {
      setLogo(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlelogoUpload = async () => {
    if (!logo) return;

    const formData = new FormData();
    formData.append("logo", logo);

    setUploading(true);

    try {
      const response = await api.updateImage(formData);
      const decryptRes = JSON.parse(decryptaValue(response?.data));

      enqueueSnackbar(decryptRes.message, { variant: "success" });

      setUploading(false);
      handleCloseModal();

       refetch();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });

      setUploading(false);
    } finally {
      setUploading(false);
      handleCloseModal();
    }
  };

  return (
    <div className="max-w-md ">
      <div
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center ${
          isDragging ? "border-blue-500" : "border-gray-300"
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-20 h-20 object-cover rounded mb-4"
          />
        )}

        <input
          type="file"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setLogo(file);
              setPreview(URL.createObjectURL(file));
            }
          }}
          className="hidden"
          id="fileInput"
        />

        <p className="text-gray-500 text-[14px]">Drag & Drop an image here</p>

        <label
          htmlFor="fileInput"
          className="mt-1 text-[#26ae5f] cursor-pointer hover:underline text-[14px]"
        >
          Or select an image
        </label>
      </div>

      {preview && (
        <button
          onClick={handlelogoUpload}
          disabled={uploading}
          className="w-full mt-4 bg-[#26ae5f] hover:bg-[#020202] text-white  py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <ClipLoader color={"white"} size={18} />
          ) : (
            "Upload Image"
          )}
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
