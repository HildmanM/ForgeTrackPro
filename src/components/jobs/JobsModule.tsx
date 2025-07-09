import React, { useEffect, useState } from 'react';
import { fetchJobs } from '../../services/api';

const JobsModule: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs()
      .then(res => setRows(res.data.rows))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading jobs…</div>;
  if (!rows.length) return <div>No jobs imported yet.</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Jobs</h1>
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            {Object.keys(rows[0]).map(key => (
              <th key={key} className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((val, j) => (
                <td key={j} className="px-4 py-2 text-sm text-gray-800">
                  {String(val)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobsModule;




