import React, { useState } from 'react';
import axios from 'axios';

const ImportData: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(
        'https://forge-backend-ljqa.onrender.com/upload-excel',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data && Array.isArray(response.data.data)) {
        setParsedData(response.data.data);
      } else {
        setError('Unexpected response from server.');
      }
    } catch (err) {
      setError('Failed to upload or parse file.');
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-white mb-4">Import Excel File</h2>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-2"
      >
        Upload File
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {parsedData.length > 0 && (
        <div className="mt-6">
          <h3 className="text-white text-lg font-semibold mb-2">Parsed Data Preview</h3>
          <div className="overflow-auto max-h-[400px]">
            <table className="min-w-full bg-gray-800 text-white text-sm border border-gray-600">
              <thead>
                <tr>
                  {Object.keys(parsedData[0]).map((key) => (
                    <th key={key} className="border border-gray-600 px-2 py-1">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {parsedData.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((val, j) => (
                      <td key={j} className="border border-gray-700 px-2 py-1">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportData;

