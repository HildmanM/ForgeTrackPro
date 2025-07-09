import React, { useState } from 'react';
import { importFile } from '../services/api';

const ImportData: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [message, setMessage] = useState('');
  const [content, setContent] = useState<any>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const onUpload = async () => {
    if (!file) return setMessage('Please choose a file first');
    setMessage('Uploading…');
    try {
      const res = await importFile(file);
      setMessage('File uploaded and parsed successfully.');
      setContent(res.data);
    } catch (err) {
      console.error(err);
      setMessage('Upload failed.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Import Data</h1>
      <input type="file" onChange={onChange} />
      <button className="ml-4 px-4 py-2 bg-blue-600 text-white" onClick={onUpload}>
        Upload
      </button>
      <p className="mt-4" style={{ color: message.includes('failed') ? 'red' : 'gold' }}>
        {message}
      </p>
      {content && (
        <pre className="mt-4 p-4 bg-gray-800 text-white max-h-96 overflow-auto">
          {JSON.stringify(content, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default ImportData;










