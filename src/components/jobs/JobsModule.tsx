import React from 'react';

const jobs = [
  { id: 'J-101', client: 'Alpha Steel', status: 'Completed', dueDate: '2025-06-25' },
  { id: 'J-102', client: 'Beta Fabrication', status: 'In Progress', dueDate: '2025-07-02' },
  { id: 'J-103', client: 'Gamma Works', status: 'Pending', dueDate: '2025-07-10' },
];

const JobsModule = () => {
  return (
    <div className="text-white p-6 space-y-4">
      <h1 className="text-2xl font-bold">Jobs</h1>
      <table className="w-full table-auto bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-700 text-gray-300">
            <th className="p-3 text-left">Job ID</th>
            <th className="p-3 text-left">Client</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-t border-gray-700 hover:bg-gray-700">
              <td className="p-3">{job.id}</td>
              <td className="p-3">{job.client}</td>
              <td className="p-3">{job.status}</td>
              <td className="p-3">{job.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobsModule;



