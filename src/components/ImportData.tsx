import React, { useState } from 'react';
import axios from 'axios';

const ImportData: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [pdfText, setPdfText] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a PDF.');
      return;
    }
    setMessage('Uploading…');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPdfText(res.data.text);
      setMessage('File uploaded and parsed successfully');
    } catch (err) {
      console.error(err);
      setMessage('Upload failed. Check console.');
    }
  };

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold">Import Data</h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="border p-2"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
      {message && <div className="text-yellow-300">{message}</div>}
      {pdfText && (
        <pre className="bg-gray-800 text-white p-4 rounded max-h-96 overflow-auto">
          {pdfText}
        </pre>
      )}
    </div>
  );
};

export default ImportData;





