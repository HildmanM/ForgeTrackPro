import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import JobsModule from './components/JobsModule';
import InventoryModule from './components/InventoryModule';
import ClientsModule from './components/ClientsModule';
import LaborModule from './components/LaborModule';
import ReportsModule from './components/ReportsModule';
import ImportsModule from './components/ImportsModule';

export function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jobs" element={<JobsModule />} />
          <Route path="/inventory" element={<InventoryModule />} />
          <Route path="/clients" element={<ClientsModule />} />
          <Route path="/labor" element={<LaborModule />} />
          <Route path="/reports" element={<ReportsModule />} />
          <Route path="/imports" element={<ImportsModule />} />
        </Routes>
      </Layout>
    </Router>
  );
}
