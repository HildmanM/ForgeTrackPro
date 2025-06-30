import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ImportPage = () => {
  const [data, setData] = useState<any[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const bstr = e.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const jsonData = XLSX.utils.sheet_to_json(ws, { defval: '' });
      setData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="text-white p-6 space-y-4">
      <h1 className="text-2xl font-bold">Import Data</h1>

      <input
        type="file"
        accept=".xlsx, .xls, .csv"
        onChange={handleFileUpload}
        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
      />

      {data.length > 0 && (
        <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 overflow-x-auto">
          <h2 className="text-lg font-medium mb-2">Parsed Data Preview</h2>
          <table className="min-w-full divide-y divide-gray-700 text-sm">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} className="px-4 py-2 text-left text-gray-400 uppercase tracking-wider">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="hover:bg-gray-700">
                  {Object.values(row).map((val, j) => (
                    <td key={j} className="px-4 py-2 whitespace-nowrap">
                      {val?.toString()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ImportPage;
