import React, { useState } from 'react';
import axios from 'axios';

const ImportData: React.FC = () => {
  const [file, setFile] = useState<File|null>(null);
  const [status, setStatus] = useState<string>('');
  const [result, setResult] = useState<any>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
    setStatus('');
    setResult(null);
  };

  const onUpload = async () => {
    if (!file) {
      setStatus('Please choose a file first.');
      return;
    }
    const form = new FormData();
    form.append('file', file);

    setStatus('Uploading…');
    try {
      const res = await axios.post(
        'https://forge-backend-1jaq.onrender.com/api/upload',
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setStatus('File uploaded and parsed successfully.');
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setStatus('Upload failed.');
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Import Data</h1>
      <input type="file" onChange={onFileChange} />
      <button
        onClick={onUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upload
      </button>
      {status && <p className="text-yellow-400">{status}</p>}
      {result && (
        <pre className="bg-gray-800 text-gray-100 p-4 overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default ImportData;








