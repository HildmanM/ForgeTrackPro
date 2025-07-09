import React, { useEffect, useState } from 'react';
import { listJobs } from '../../services/api';

export default function JobsModule() {
  const [jobs, setJobs] = useState<any[]>([]);
  useEffect(() => {
    listJobs().then(r => setJobs(r.data.jobs));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Jobs</h1>
      <table className="min-w-full bg-gray-800 text-white">
        <thead>
          <tr>
            {['ID','Client','Status','Completion','Due Date'].map(h => (
              <th key={h} className="px-4 py-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {jobs.map(j => (
            <tr key={j.id} className="border-b border-gray-700">
              <td className="px-4 py-2">{j.id}</td>
              <td className="px-4 py-2">{j.client}</td>
              <td className="px-4 py-2">{j.status}</td>
              <td className="px-4 py-2">{j.completion}%</td>
              <td className="px-4 py-2">{j.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}






