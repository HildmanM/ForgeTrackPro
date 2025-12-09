import React from "react";

const ReportsModule: React.FC = () => {
  return (
    <div className="text-white p-6 space-y-6">
      <h1 className="text-2xl font-bold">Production Reports</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-lg font-semibold mb-4">Labor Hours Per Week</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="week" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563', color: '#E5E7EB' }} />
              <Line type="monotone" dataKey="hours" stroke="#3B82F6" strokeWidth={2} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ReportsModule;

