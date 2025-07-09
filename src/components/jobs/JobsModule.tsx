import React, { useEffect, useState } from 'react';
import { listJobs } from '../../services/api';

const JobsModule: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    listJobs()
      .then(res => setJobs(res.data.jobs))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Jobs</h1>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Field 1</th>
              <th className="px-4 py-2">Field 2</th>
              <th className="px-4 py-2">Field 3</th>
              <th className="px-4 py-2">Field 4</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, i) => (
              <tr key={i} className="hover:bg-gray-700">
                <td className="px-4 py-2">{job.text ?? job[Object.keys(job)[0]]}</td>
                <td className="px-4 py-2">{job[Object.keys(job)[1]]}</td>
                <td className="px-4 py-2">{job[Object.keys(job)[2]]}</td>
                <td className="px-4 py-2">{job[Object.keys(job)[3]]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JobsModule;





