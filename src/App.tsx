import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { AppProvider, useApp } from "@/store/appContext";
import Dashboard from "@/pages/Dashboard";
import Jobs from "@/pages/Jobs";
import Clients from "@/pages/Clients";
import Inventory from "@/pages/Inventory";
import Labor from "@/pages/Labor";
import Reports from "@/pages/Reports";
import ImportData from "@/pages/ImportData";

function Sidebar() {
  const { state } = useApp();
  const Badge = ({ v }: { v: number }) => (
    <span style={{ marginLeft: "auto", fontSize: 11, background: "#1a1a22",
      border: "1px solid #272733", padding: "2px 6px", borderRadius: 999 }}>{v}</span>
  );
  return (
    <aside style={{ width: 240, padding: 16, borderRight: "1px solid #333" }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>ForgeTrack</div>
      <nav style={{ display: "grid", gap: 8 }}>
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/jobs">Jobs <Badge v={state.jobs.length}/></NavLink>
        <NavLink to="/clients">Clients <Badge v={state.clients.length}/></NavLink>
        <NavLink to="/inventory">Inventory <Badge v={state.inventory.length}/></NavLink>
        <NavLink to="/labor">Labor</NavLink>
        <NavLink to="/reports">Reports</NavLink>
        <NavLink to="/import">Import</NavLink>
      </nav>
    </aside>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: 16 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/labor" element={<Labor />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/import" element={<ImportData />} />
          </Routes>
        </main>
      </div>
    </AppProvider>
  );
}













