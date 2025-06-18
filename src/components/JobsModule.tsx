import React from 'react';

const JobsModule = () => {
  const data = JSON.parse(localStorage.getItem('teklaData') || '[]');
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Jobs Module</h1>
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-5 shadow-lg">
        <table className="w-full text-sm text-gray-300">
          <thead>
            <tr className="text-left border-b border-gray-600">
              <th className="py-2">Job #</th>
              <th className="py-2">Mark</th>
              <th className="py-2">Station</th>
              <th className="py-2">Employee</th>
              <th className="py-2">Hours</th>
            </tr>
          </thead>
          <tbody>
            {data.map((job: any, idx) => (
              <tr key={idx} className="border-b border-gray-700">
                <td className="py-2">{job.job}</td>
                <td className="py-2">{job.mark}</td>
                <td className="py-2">{job.station}</td>
                <td className="py-2">{job.employee}</td>
                <td className="py-2">{job.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobsModule;


