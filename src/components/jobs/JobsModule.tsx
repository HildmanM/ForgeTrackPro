import React, { useEffect, useState } from "react";
import axios from "axios";

interface Job {
  stationDate: string;
  stationName: string;
  employee: string;
  dateCompleted: string;
  hours: number;
  description: string;
}

export default function JobsModule() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    axios.get("/api/jobs")
      .then(res => setJobs(res.data.jobs))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Jobs</h1>
      <table className="min-w-full bg-gray-800 text-white">
        <thead>…</thead>
        <tbody>
          {jobs.map((j,i) => (
            <tr key={i}>
              <td>{j.stationDate}</td>
              <td>{j.stationName}</td>
              <td>{j.employee}</td>
              <td>{j.dateCompleted}</td>
              <td>{j.hours.toFixed(2)}</td>
              <td>{j.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}






