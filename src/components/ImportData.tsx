import React from "react";
import { useDashboardData } from "./common/DashboardDataContext";
// If you want to parse CSV, use a library like papaparse or a simple manual parser

const ImportData: React.FC = () => {
  const { setDashboardData } = useDashboardData();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        // Example: Expecting JSON for simplicity. If CSV, parse as needed!
        const parsed = JSON.parse(event.target?.result as string);
        setDashboardData(parsed);
        alert("Data imported! Go to Dashboard to see updated data.");
      } catch (err) {
        alert("Invalid file format. Please upload a valid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Import Data</h1>
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="bg-gray-800 p-2 rounded"
      />
      <p className="mt-4 text-gray-400">Upload a <b>JSON</b> file that matches your dashboard data structure to update all charts.</p>
    </div>
  );
};

export default ImportData;












