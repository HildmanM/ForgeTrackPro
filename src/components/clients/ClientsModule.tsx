import React from "react";
import { useApp } from "@/store/appContext";

export default function Clients(){
  const { state } = useApp();
  return (
    <div>
      <h2>Clients</h2>
      <table>
        <thead><tr><th>ID</th><th>Name</th><th>City</th></tr></thead>
        <tbody>
          {state.clients.map(c => (<tr key={c.id}><td>{c.id}</td><td>{c.name}</td><td>{c.city||""}</td></tr>))}
        </tbody>
      </table>
    </div>
  );
}

