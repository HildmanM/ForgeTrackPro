import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Dashboard from "@/components/Dashboard";

// simple placeholders so routes don’t crash if the files don’t exist yet
const Page = (name: string) => () => <div className="text-zinc-300">{name}</div>;
const Jobs = Page("Jobs");
const Clients = Page("Clients");
const Inventory = Page("Inventory");
const Labor = Page("Labor");
const Reports = Page("Reports");
const ImportData = Page("Import Data");

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/labor" element={<Labor />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/import" element={<ImportData />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}











