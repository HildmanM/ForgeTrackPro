import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import JobsModule from './components/jobs/JobsModule';
import ImportData from './components/ImportData';
// … other imports

export function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jobs" element={<JobsModule />} />
          <Route path="/import" element={<ImportData />} />
          {/* … any other routes */}
        </Routes>
      </Layout>
    </Router>
  );
}







