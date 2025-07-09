// src/components/ImportData.tsx
import React, { useState, useEffect } from 'react';

export default function ImportData() {
  const [file, setFile] = useState<File|null>(null);
  const [message, setMessage] = useState<string>('');
  const [excelRows, setExcelRows] = useState<any[]>([]);
  const [pdfText, setPdfText] = useState<string>('');

  // On mount, load any previously-uploaded data
  useEffect(() => {
    fetch('https://forge-backend-1jaq.onrender.com/api/data/excel')
      .then(res => res.json())
      .then(setExcelRows)
      .catch(console.error);

    fetch('https://forge-backend-1jaq.onrender.com/api/data/pdf')
      .then(res => res.json())
      .then(json => setPdfText(json.text))
      .catch(console.error);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return setMessage('Please choose a file first');
    setMessage('Uploading...');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('https://forge-backend-1jaq.onrender.com/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      const json = await res.json();
      setMessage(json.message);

      // After a successful upload, re-fetch stored data:
      if (file.name.match(/\.(xlsx|xls)$/i)) {
        const data = await fetch('https://forge-backend-1jaq.onrender.com/api/data/excel').then(r => r.json());
        setExcelRows(data);
      } else if (file.name.match(/\.pdf$/i)) {
        const data = await fetch('https://forge-backend-1jaq.onrender.com/api/data/pdf').then(r => r.json());
        setPdfText(data.text);
      }
    } catch (err) {
      console.error(err);
      setMessage('Error uploading file');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Import Data</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} className="px-4 py-2 bg-blue-600 text-white rounded">Upload</button>
      {message && <p className="text-yellow-400">{message}</p>}

      {/* Show Excel Table */}
      {excelRows.length > 0 && (
        <div>
          <h2 className="mt-4 font-medium">Excel Data</h2>
          <div className="overflow-auto max-h-64">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  {Object.keys(excelRows[0]).map(col => (
                    <th key={col} className="px-2 py-1 text-left text-sm text-gray-400">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {excelRows.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-700">
                    {Object.values(row).map((val, j) => (
                      <td key={j} className="px-2 py-1 text-sm">{String(val)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Show PDF Text */}
      {pdfText && (
        <div>
          <h2 className="mt-4 font-medium">PDF Text</h2>
          <pre className="bg-gray-800 p-3 rounded max-h-64 overflow-auto text-sm">{pdfText}</pre>
        </div>
      )}
    </div>
  );
}




