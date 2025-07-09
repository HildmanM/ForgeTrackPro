import React, { useState } from 'react';
import { uploadFile } from '../services/api';

const ImportData: React.FC = () => {
  const [file,   setFile]   = useState<File|null>(null);
  const [status, setStatus] = useState<string>('');
  const [rows,   setRows]   = useState<any[]|null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFile(e.target.files?.[0] || null);

  const onUpload = async () => {
    if (!file) {
      setStatus('Please choose a file.');
      return;
    }
    setStatus('Uploading…');
    try {
      const { data } = await uploadFile(file);
      setRows(data.rows);
      setStatus('File uploaded and parsed successfully.');
    } catch {
      setStatus('Upload failed.');
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Import Data</h1>
      <input type="file" onChange={onChange} />
      <button
        onClick={onUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upload
      </button>
      {status && <p className="text-yellow-400">{status}</p>}
      {rows && (
        <pre className="bg-gray-800 text-gray-100 p-4 overflow-auto">
          {JSON.stringify(rows, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default ImportData;









