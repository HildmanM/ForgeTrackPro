import React, { useState } from 'react';

const ImportsModule = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [records, setRecords] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleImport = async () => {
    if (!selectedFile) return alert("No file selected.");

    const formData = new FormData();
    formData.append('file', selectedFile);

    const apiHost = window.location.hostname.includes('localhost')
      ? 'http://localhost:3001'
      : 'https://forgetrack-backend.onrender.com';

    const res = await fetch(`${apiHost}/api/upload/pdf`, {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (!Array.isArray(data)) {
      alert("Error importing: invalid response.");
      return;
    }

    setRecords(data);
    localStorage.setItem('teklaData', JSON.stringify(data));
    alert(`Imported ${data.length} records.`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Import Tekla PDF</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button
        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md shadow-md"
        onClick={handleImport}
      >
        Start Import
      </button>

      {records.length > 0 && (
        <div className="mt-4 text-sm text-gray-300">
          <strong>Imported:</strong>
          <ul className="mt-2 list-disc pl-5">
            {records.map((r, i) => (
              <li key={i}>
                Job {r.job}, Mark {r.mark}, {r.employee}, {r.station}, {r.hours} hrs
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImportsModule;



