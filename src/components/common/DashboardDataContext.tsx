import React, { createContext, useContext, useState } from "react";
import { kpiData, recentJobs, inventoryAlerts, monthlyProductionData, jobStatusDistribution } from "../../data/mockData";

const DashboardDataContext = createContext(null);

export function DashboardDataProvider({ children }) {
  const [dashboardData, setDashboardData] = useState({
    kpiData,
    recentJobs,
    inventoryAlerts,
    monthlyProductionData,
    jobStatusDistribution,
  });

  return (
    <DashboardDataContext.Provider value={{ dashboardData, setDashboardData }}>
      {children}
    </DashboardDataContext.Provider>
  );
}

export function useDashboardData() {
  const context = useContext(DashboardDataContext);
  if (!context) throw new Error("useDashboardData must be used inside DashboardDataProvider");
  return context;
}
