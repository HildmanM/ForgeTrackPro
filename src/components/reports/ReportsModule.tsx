import React from "react";

const ReportsModule: React.FC = () => {
  return (
    <div className="space-y-4 max-w-xl">
      <h1 className="text-2xl font-bold">Reports</h1>
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-5 shadow-lg text-sm text-gray-300">
        <p>
          Future: charts, trends, shipped vs remaining, load summaries,
          on-time %, etc. Data will come from the same store the importer
          writes to.
        </p>
      </div>
    </div>
  );
};

export default ReportsModule;

