import React, { createContext, useContext, useReducer, useMemo, useEffect } from "react";

export type KPI = { title: string; value: number; delta?: number };
export type Job = { id: string; client: string; status: "Planned"|"In Progress"|"QA"|"Shipped"; hours?: number };
export type Client = { id: string; name: string; city?: string };
export type InventoryItem = { id: string; item: string; quantity: number; status?: string };

export type AppState = { kpis: KPI[]; jobs: Job[]; clients: Client[]; inventory: InventoryItem[]; };

type Action =
  | { type: "SET_KPIS"; payload: KPI[] }
  | { type: "ADD_JOBS"; payload: Job[] }
  | { type: "ADD_CLIENTS"; payload: Client[] }
  | { type: "ADD_INVENTORY"; payload: InventoryItem[] }
  | { type: "RESET_ALL" };

const STORAGE_KEY = "forgeTrackState_v2";

const initial: AppState = (() => {
  try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) return JSON.parse(raw); } catch {}
  return {
    kpis: [
      { title: "Active Projects", value: 3, delta: +2.1 },
      { title: "Inventory Items", value: 50, delta: -0.5 },
      { title: "Today’s Schedule", value: 8 },
      { title: "Low Stock Alerts", value: 2, delta: 0 },
    ],
    jobs: [
      { id: "630-OR-001", client: "Cannon Mac", status: "In Progress", hours: 52 },
      { id: "631-OR-002", client: "UPMC", status: "QA", hours: 18 },
      { id: "632-ST-003", client: "CMU", status: "Planned", hours: 8 },
    ],
    clients: [
      { id: "CL-001", name: "Cannon Mac", city: "Pittsburgh" },
      { id: "CL-002", name: "UPMC", city: "Pittsburgh" },
      { id: "CL-003", name: "CMU", city: "Pittsburgh" },
    ],
    inventory: [
      { id: "INV-PLATE-1", item: "3/8\" Plate A36", quantity: 25, status: "OK" },
      { id: "INV-ANGLE-1", item: "L3x3x1/4", quantity: 80, status: "OK" },
      { id: "INV-HSS-1", item: "HSS 2x2x1/4", quantity: 9, status: "Low" },
    ],
  };
})();

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_KPIS": return { ...state, kpis: action.payload };
    case "ADD_JOBS": return { ...state, jobs: [...action.payload] };
    case "ADD_CLIENTS": return { ...state, clients: [...action.payload] };
    case "ADD_INVENTORY": return { ...state, inventory: [...action.payload] };
    case "RESET_ALL": return initial;
    default: return state;
  }
}

const Ctx = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);
  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {} }, [state]);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useApp = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
};

