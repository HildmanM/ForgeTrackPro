import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Jobs from "@/pages/Jobs";
import Clients from "@/pages/Clients";
import Inventory from "@/pages/Inventory";
import Labor from "@/pages/Labor";
import Reports from "@/pages/Reports";
import ImportData from "@/pages/ImportData"; // IMPORTANT: this exact path
import { AppProvider, useApp } from "@/store/appContext";
import { LayoutDashboard, Briefcase, Users, Boxes, FileText, Upload } from "lucide-react";

function Sidebar() {
  const { state } = useApp();
  const counts = { jobs: state.jobs.length, clients: state.clients.length, inventory: state.inventory.length };
  const Badge = ({ value }: { value: number }) => (
    <span style={{ marginLeft: "auto", fontSize: 11, background:"#1a1a22", border:"1px solid #272733", padding:"2px 6px", borderRadius: 999 }}>
      {value}
    </span>
  );
  return (
    <aside className="aside">
      <div className="brand">ForgeTrack</div>
      <div className="small" style={{marginTop:4}}>Power BI–style dashboard</div>
      <nav className="nav" style={{marginTop:16, display:"grid", gap:8}}>
        <NavLink to="/" end className={({isActive})=> isActive?"active":undefined}><LayoutDashboard size={16}/> Dashboard</NavLink>
        <NavLink to="/jobs" className={({isActive})=> isActive?"active":undefined}><Briefcase size={16}/> Jobs <Badge value={counts.jobs}/></NavLink>
        <NavLink to="/clients" className={({isActive})=> isActive?"active":undefined}><Users size={16}/> Clients <Badge value={counts.clients}/></NavLink>
        <NavLink to="/inventory" className={({isActive})=> isActive?"active":undefined}><Boxes size={16}/> Inventory <Badge value={counts.inventory}/></NavLink>
        <NavLink to="/labor" className={({isActive})=> isActive?"active":undefined}><FileText size={16}/> Labor</NavLink>
        <NavLink to="/reports" className={({isActive})=> isActive?"active":undefined}><FileText size={16}/> Reports</NavLink>
        <NavLink to="/import" className={({isActive})=> isActive?"active":undefined}><Upload size={16}/> Import</NavLink>
      </nav>
    </aside>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div className="fwrap">
        <Sidebar />
        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/labor" element={<Labor />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/import" element={<ImportData />} /> {/* MUST be this */}
          </Routes>
        </main>
      </div>
    </AppProvider>
  );
}












