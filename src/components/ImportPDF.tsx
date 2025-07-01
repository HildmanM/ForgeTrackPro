import React, { useState } from 'react';
import axios from 'axios';

const ImportPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('https://forge-backend-ljqa.onrender.com/upload-pdf', formData);
      setResult(res.data);
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Import PDF</h1>
      <input type="file" accept=".pdf" onChange={handleChange} className="text-white" />
      <button
        onClick={handleUpload}
        className="ml-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Upload PDF
      </button>
      {result && (
        <div className="mt-4 bg-gray-800 p-4 rounded text-white whitespace-pre-wrap">
          {JSON.stringify(result, null, 2)}
        </div>
      )}
    </div>
  );
};

export default ImportPDF;

