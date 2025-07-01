import React, { useState } from 'react';
import axios from 'axios';

const ImportData = () => {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('https://forge-backend-ljqa.onrender.com/upload-excel', formData);
      setParsedData(res.data.rows || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Import Data</h1>
      <div className="mb-4">
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="text-white" />
        <button
          onClick={handleUpload}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Upload Excel
        </button>
      </div>
      {parsedData.length > 0 && (
        <table className="min-w-full bg-gray-800 text-white border border-gray-700">
          <thead>
            <tr>
              {Object.keys(parsedData[0]).map((key) => (
                <th key={key} className="border border-gray-600 px-4 py-2">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parsedData.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((value, j) => (
                  <td key={j} className="border border-gray-700 px-4 py-2">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ImportData;

