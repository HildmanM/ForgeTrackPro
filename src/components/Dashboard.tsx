import React, { useEffect, useState } from "react";
import axios from "axios";
// … your KPICard imports …

export default function Dashboard() {
  const [jobsCompleted, setJobsCompleted] = useState(0);
  const [totalLabor, setTotalLabor]     = useState(0);

  useEffect(() => {
    axios.get("/api/jobs").then(r => setJobsCompleted(r.data.jobs.length));
    axios.get("/api/labor").then(r => {
      const sum = r.data.labor.reduce((acc, e) => acc + e.hours, 0);
      setTotalLabor(sum);
    });
  }, []);

  const kpis = [
    { title: "Jobs Completed", value: jobsCompleted, /*…*/ },
    { title: "Labor Hours",   value: totalLabor.toFixed(2), /*…*/ },
    // material usage, efficiency… you can add more endpoints
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid …">
        {kpis.map((k,i) => (
          <KPICard key={i} title={k.title} value={k.value} /*…*/ />
        ))}
      </div>
      {/* rest of your charts… */}
    </div>
  );
}


