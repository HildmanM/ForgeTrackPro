import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./components/Dashboard";
import ImportData from "./components/ImportData";
import ImportPDF from "./components/ImportPDF";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/import-excel" element={<ImportData />} />
          <Route path="/import-pdf" element={<ImportPDF />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;


