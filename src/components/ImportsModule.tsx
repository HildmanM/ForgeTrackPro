import React, { useState } from 'react';

const ImportsModule = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleImport = async () => {
    if (!selectedFile) return alert("Please select a file first.");

    const text = await selectedFile.text();
    const lines = text.split('\\n');
    const jobEntries: any[] = [];

    lines.forEach(line => {
      const jobMatch = line.match(/Job #:\\s*(\\d+)/);
      const markMatch = line.match(/Mark\\s*:\\s*(\\S+)/);
      const hoursMatch = line.match(/(\\d+\\.\\d{2})$/);
      const empMatch = line.match(/\\s([a-zA-Z0-9]+)\\d{1,2}\\/\\d{1,2}\\/\\d{4}/);

      if (jobMatch && markMatch && hoursMatch && empMatch) {
        jobEntries.push({
          job: jobMatch[1],
          mark: markMatch[1],
          employee: empMatch[1],
          hours: parseFloat(hoursMatch[1])
        });
      }
    });

    setParsedData(jobEntries);
    localStorage.setItem('importedJobs', JSON.stringify(jobEntries));
    alert(`Imported ${jobEntries.length} records.`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Import Tekla PDF</h1>
      <input type="file" accept=".pdf,.txt" onChange={handleFileChange} />
      <button
        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md shadow-md"
        onClick={handleImport}
      >
        Start Import
      </button>

      {parsedData.length > 0 && (
        <div className="mt-6 text-sm text-gray-300">
          <strong>Imported Records:</strong>
          <ul className="mt-2 list-disc pl-5">
            {parsedData.map((item, idx) => (
              <li key={idx}>
                Job {item.job}, Mark {item.mark}, {item.employee}, {item.hours} hrs
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImportsModule;
