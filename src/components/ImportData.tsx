import React, { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { useApp } from "@/store/appContext";
import type { Client, InventoryItem, Job, KPI } from "@/types";

type Mappings = { jobId?: string; client?: string; status?: string; hours?: string; invItem?: string; invQty?: string; };

export default function ImportData() {
  const { state, dispatch } = useApp();
  const [rows, setRows] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [map, setMap] = useState<Mappings>({});
  const [log, setLog] = useState<string>("");

  function append(msg: string) { setLog((p) => p + msg + "\n"); }
  function onMapChange(key: keyof Mappings, value: string) { setMap((m) => ({ ...m, [key]: value || undefined })); }
  const preview = useMemo(() => rows.slice(0, 5), [rows]);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    append(`Reading ${f.name}...`);
    const data = await f.arrayBuffer();
    const wb = XLSX.read(data, { type: "array" });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const parsed = XLSX.utils.sheet_to_json(ws, { defval: "" });
    setRows(parsed as any[]);
    const hdrs = Object.keys(parsed[0] || {}).map(String);
    setHeaders(hdrs);
    append(`Parsed ${parsed.length} rows. Map columns, then Import.`);
  }

  function normalizeStatus(s: string): Job["status"] {
    const t = String(s).toLowerCase();
    if (t.includes("ship")) return "Shipped";
    if (t.includes("qa") || t.includes("inspect")) return "QA";
    if (t.includes("plan")) return "Planned";
    return "In Progress";
  }

  function doImport() {
    if (!rows.length) { append("No rows to import."); return; }

    const jobs: Job[] = [];
    const clients: Client[] = [];
    const inventory: InventoryItem[] = [];

    for (const r of rows) {
      const o = r as Record<string, any>;
      const jobId = map.jobId ? o[map.jobId] : undefined;
      const client = map.client ? o[map.client] : undefined;
      const statusRaw = map.status ? o[map.status] : undefined;
      const hoursRaw = map.hours ? o[map.hours] : undefined;
      const item = map.invItem ? o[map.invItem] : undefined;
      const qtyRaw = map.invQty ? o[map.invQty] : undefined;

      if (jobId && client) {
        const hours = Number(hoursRaw);
        jobs.push({ id: String(jobId), client: String(client), status: normalizeStatus(statusRaw ?? ""), hours: Number.isFinite(hours) ? hours : undefined });
        clients.push({ id: `C-${Math.random().toString(36).slice(2,6)}`, name: String(client) });
      }
      if (item) {
        const qty = Number(qtyRaw);
        inventory.push({ id: `${String(item).slice(0,8)}-${Math.random().toString(36).slice(2,6)}`, item: String(item), quantity: Number.isFinite(qty) ? qty : 0, status: Number.isFinite(qty) && qty < 10 ? "Low" : "OK" });
      }
    }

    const totalJobs = jobs.length || state.jobs.length;
    const lowStock = inventory.filter(i => i.status === "Low").length;
    const scheduleCount = Math.max(12, Math.round(totalJobs / 2));

    const kpis: KPI[] = [
      { title: "Active Projects", value: totalJobs, delta: +3.1 },
      { title: "Inventory Items", value: inventory.length || state.inventory.length, delta: -1.1 },
      { title: "Today’s Schedule", value: scheduleCount },
      { title: "Low Stock Alerts", value: lowStock, delta: 0 },
    ];

    if (jobs.length) dispatch({ type: "ADD_JOBS", payload: jobs });
    if (clients.length) dispatch({ type: "ADD_CLIENTS", payload: clients });
    if (inventory.length) dispatch({ type: "ADD_INVENTORY", payload: inventory });
    dispatch({ type: "SET_KPIS", payload: kpis });

    append(`Imported ${jobs.length} jobs, ${clients.length} clients, ${inventory.length} inventory rows. KPIs updated.`);
  }

  function resetAll() { dispatch({ type: "RESET_ALL" }); append("State reset."); }

  return (
    <div className="card">
      <h3>Import Data (Excel/CSV)</h3>
      <p className="small">Select a file, then map columns to the fields below. Click Import to update KPIs, Jobs, Clients, and Inventory.</p>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <input type="file" accept=".xlsx,.xls,.csv" className="input" onChange={onFile} />
        <button className="button" onClick={doImport}>Import</button>
        <button className="button" onClick={resetAll}>Reset</button>
      </div>

      {headers.length > 0 && (
        <div className="card" style={{ marginTop: 12 }}>
          <h3>Column Mapping</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            <FieldMap label="Job Number" value={map.jobId} onChange={(v) => onMapChange("jobId", v)} headers={headers} />
            <FieldMap label="Client / Customer" value={map.client} onChange={(v) => onMapChange("client", v)} headers={headers} />
            <FieldMap label="Status / Phase" value={map.status} onChange={(v) => onMapChange("status", v)} headers={headers} />
            <FieldMap label="Hours" value={map.hours} onChange={(v) => onMapChange("hours", v)} headers={headers} />
            <FieldMap label="Inventory Item" value={map.invItem} onChange={(v) => onMapChange("invItem", v)} headers={headers} />
            <FieldMap label="Inventory Qty" value={map.invQty} onChange={(v) => onMapChange("invQty", v)} headers={headers} />
          </div>
        </div>
      )}

      {rows.length > 0 && (
        <div className="card" style={{ marginTop: 12 }}>
          <h3>Preview (first 5 rows)</h3>
          <div style={{ overflowX: "auto" }}>
            <table className="table">
              <thead><tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {rows.slice(0, 5).map((r, i) => (
                  <tr key={i}>{headers.map((h) => <td key={h}>{String(r[h])}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="card" style={{ marginTop: 12 }}>
        <h3>Log</h3>
        <pre className="small" style={{ whiteSpace: "pre-wrap" }}>{log || "Waiting for file..."}</pre>
      </div>
    </div>
  );
}

function FieldMap({
  label, value, onChange, headers,
}: { label: string; value?: string; onChange: (v: string) => void; headers: string[] }) {
  return (
    <label className="small" style={{ display: "grid", gap: 6 }}>
      {label}
      <select className="input" value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
        <option value="">— Not Mapped —</option>
        {headers.map((h) => <option key={h} value={h}>{h}</option>)}
      </select>
    </label>
  );
}














