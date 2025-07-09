import React, { useState } from 'react';
import axios from 'axios';

const ImportData: React.FC = () => {
  const [file, setFile] = useState<File|null>(null);
  const [message, setMessage] = useState<string>('');
  const [payload, setPayload] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) {
      setMessage('No file chosen');
      return;
    }
    setMessage('Uploading…');

    const form = new FormData();
    form.append('file', file);

    try {
      // <-- point directly at your Render backend
      const res = await axios.post(
        'https://forge-backend-1jaq.onrender.com/api/upload',
        form,
        { headers: { 'Content-Type': 'multipart/form-data' }}
      );
      setPayload(res.data.data);
      setMessage('File uploaded and parsed successfully');
    } catch (err) {
      console.error(err);
      setMessage('Error uploading file');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Import Data</h1>
      <input
        type="file"
        onChange={e => setFile(e.target.files?.[0]||null)}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
      {message && <p className="mt-4 text-yellow-400">{message}</p>}
      {payload && (
        <div className="mt-6 bg-gray-800 p-4 rounded h-64 overflow-auto text-gray-200">
          <pre>{JSON.stringify(payload, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ImportData;






