import React, { createContext, useContext, useReducer, useMemo, useEffect } from "react";
import type { Client, InventoryItem, Job, KPI } from "@/types";
import { initialClients, initialInventory, initialJobs } from "@/data/mockData";

export type AppState = {
  kpis: KPI[];
  jobs: Job[];
  clients: Client[];
  inventory: InventoryItem[];
};

type Action =
  | { type: "SET_KPIS"; payload: KPI[] }
  | { type: "ADD_JOBS"; payload: Job[] }
  | { type: "ADD_CLIENTS"; payload: Client[] }
  | { type: "ADD_INVENTORY"; payload: InventoryItem[] }
  | { type: "RESET_ALL" };

const STORAGE_KEY = "forgeTrackState_v2";

const initial: AppState = (() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AppState;
  } catch {}
  return {
    kpis: [
      { title: "Active Projects", value: 7, delta: +4.2 },
      { title: "Inventory Items", value: 1243, delta: -1.8 },
      { title: "Today’s Schedule", value: 12 },
      { title: "Low Stock Alerts", value: 5, delta: 0 },
    ],
    jobs: initialJobs,
    clients: initialClients,
    inventory: initialInventory,
  };
})();

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_KPIS":
      return { ...state, kpis: action.payload };
    case "ADD_JOBS":
      return { ...state, jobs: [...action.payload] };
    case "ADD_CLIENTS":
      return { ...state, clients: [...action.payload] };
    case "ADD_INVENTORY":
      return { ...state, inventory: [...action.payload] };
    case "RESET_ALL":
      return { ...initial };
    default:
      return state;
  }
}

const Ctx = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useApp = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
};
