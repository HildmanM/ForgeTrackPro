import React from "react";
import { useApp } from "@/store/appContext";

export default function Jobs(){
  const { state } = useApp();
  return (
    <div>
      <h2>Jobs</h2>
      <table>
        <thead><tr><th>Job</th><th>Client</th><th>Status</th><th>Hours</th></tr></thead>
        <tbody>
          {state.jobs.map(j => (
            <tr key={j.id}><td>{j.id}</td><td>{j.client}</td><td>{j.status}</td><td>{j.hours ?? "-"}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}







