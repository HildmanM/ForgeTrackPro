import React, { useState } from "react";
import axios from "axios";

const ImportPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("https://forge-backend-1jqa.onrender.com/upload-pdf", formData);
      setMessage("✅ PDF uploaded. Parsed lines: " + res.data.count);
    } catch (err) {
      console.error(err);
      setMessage("❌ PDF upload failed.");
    }
  };

  return (
    <div className="p-8 text-white">
      <h2 className="text-2xl font-bold mb-4">Import PDF</h2>
      <input type="file" accept=".pdf" onChange={handleChange} />
      <button onClick={handleUpload} className="bg-blue-600 px-4 py-2 rounded text-white mt-4">
        Upload PDF
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default ImportPDF;
