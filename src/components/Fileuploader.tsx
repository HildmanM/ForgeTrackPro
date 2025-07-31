import React, { useState } from "react";
import { uploadFile } from "../api/apiClient";

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;

    try {
      const response = await uploadFile(file);
      setUploadStatus(`Upload successful! Jobs parsed: ${response.jobsCount}`);
    } catch (error) {
      setUploadStatus(`Upload failed: ${(error as Error).message}`);
    }
  };

  return (
    <div className="mb-6">
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleFileUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Upload File
      </button>
      {uploadStatus && <p className="mt-2">{uploadStatus}</p>}
    </div>
  );
};

export default FileUploader;
