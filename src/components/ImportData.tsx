import React, { useState } from 'react';
import { importFile } from '../services/api';

export default function ImportData() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [text, setText] = useState('');

  const onUpload = async () => {
    if (!file) return;
    setStatus('Uploading...');
    try {
      const { data } = await importFile(file);
      setText(data.text);
      setStatus('File uploaded and parsed successfully.');
    } catch {
      setStatus('Upload failed.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Import Data</h1>
      <input type="file" onChange={e => setFile(e.target.files?.[0]||null)} />
      <button onClick={onUpload} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">
        Upload
      </button>
      <div className={status.startsWith('Upload failed') ? 'text-red-500' : 'text-yellow-400'}>
        {status}
      </div>
      {text && (
        <>
          <h2 className="mt-6 mb-2 text-xl">Imported Data</h2>
          <pre className="bg-gray-800 p-4 rounded overflow-auto">{text}</pre>
        </>
      )}
    </div>
  );
}











