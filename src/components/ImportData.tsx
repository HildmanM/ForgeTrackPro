import React, { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { useApp } from "@/store/appContext";
import type { Job, Client, InventoryItem, KPI } from "@/store/appContext";

type Mappings = { jobId?: string; client?: string; status?: string; hours?: string; invItem?: string; invQty?: string; };

export default function ImportData(){
  const { state, dispatch } = useApp();
  const [rows, setRows] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [map, setMap] = useState<Mappings>({});
  const [log, setLog] = useState<string>("");

  const append = (m: string) => setLog(p => p + m + "\n");
  const onMapChange = (k: keyof Mappings, v: string) => setMap(m => ({...m, [k]: v || undefined}));
  const preview = useMemo(()=> rows.slice(0,5), [rows]);

  const normalizeStatus = (s: string): Job["status"] => {
    const t = String(s).toLowerCase();
    if (t.includes("ship")) return "Shipped";
    if (t.includes("qa") || t.includes("inspect")) return "QA";
    if (t.includes("plan")) return "Planned";
    return "In Progress";
  };

  async function onFile(e: React.ChangeEvent<HTMLInputElement>){
    const f = e.target.files?.[0]; if(!f) return;
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

  function doImport(){
    if(!rows.length){ append("No rows to import."); return; }

    const jobs: Job[] = [];
    const clients: Client[] = [];
    const inventory: InventoryItem[] = [];

    for(const r of rows){
      const o = r as Record<string, any>;
      const jobId = map.jobId ? o[map.jobId] : undefined;
      const client = map.client ? o[map.client] : undefined;
      const statusRaw = map.status ? o[map.status] : undefined;
      const hoursRaw = map.hours ? o[map.hours] : undefined;
      const item = map.invItem ? o[map.invItem] : undefined;
      const qtyRaw = map.invQty ? o[map.invQty] : undefined;

      if(jobId && client){
        const hours = Number(hoursRaw);
        jobs.push({ id: String(jobId), client: String(client), status: normalizeStatus(statusRaw ?? ""), hours: Number.isFinite(hours)?hours:undefined });
        clients.push({ id: `C-${Math.random().toString(36).slice(2,6)}`, name: String(client) });
      }
      if(item){
        const qty = Number(qtyRaw);
        inventory.push({ id: `${String(item).slice(0,8)}-${Math.random().toString(36).slice(2,6)}`, item: String(item), quantity: Number.isFinite(qty)?qty:0, status: Number.isFinite(qty) && qty < 10 ? "Low" : "OK" });
      }
    }

    const totalJobs = jobs.length || state.jobs.length;
    const lowStock = inventory.filter(i => i.status === "Low").length;
    const scheduleCount = Math.max(12, Math.round(totalJobs/2));

    const kpis: KPI[] = [
      { title: "Active Projects", value: totalJobs, delta: +3.1 },
      { title: "Inventory Items", value: inventory.length || state.inventory.length, delta: -1.1 },
      { title: "Today’s Schedule", value: scheduleCount },
      { title: "Low Stock Alerts", value: lowStock, delta: 0 },
    ];

    if(jobs.length) dispatch({ type: "ADD_JOBS", payload: jobs });
    if(clients.length) dispatch({ type: "ADD_CLIENTS", payload: clients });
    if(inventory.length) dispatch({ type: "ADD_INVENTORY", payload: inventory });
    dispatch({ type: "SET_KPIS", payload: kpis });

    append(`Imported ${jobs.length} jobs, ${clients.length} clients, ${inventory.length} inventory rows. KPIs updated.`);
  }

  function resetAll(){ dispatch({ type: "RESET_ALL" }); append("State reset."); }

  return (
    <div>
      <h2>Import</h2>
      <div style={{ display: "flex", gap: 12, alignItems: "center", margin: "12px 0" }}>
        <input type="file" accept=".xlsx,.xls,.csv" onChange={onFile}/>
        <button onClick={doImport}>Import</button>
        <button onClick={resetAll}>Reset</button>
      </div>

      {headers.length > 0 && (
        <div style={{ border: "1px solid #333", borderRadius: 10, padding: 12, marginTop: 8 }}>
          <h3>Column Mapping</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            <FieldMap label="Job Number" value={map.jobId} onChange={v=>onMapChange("jobId", v)} headers={headers}/>
            <FieldMap label="Client / Customer" value={map.client} onChange={v=>onMapChange("client", v)} headers={headers}/>
            <FieldMap label="Status / Phase" value={map.status} onChange={v=>onMapChange("status", v)} headers={headers}/>
            <FieldMap label="Hours" value={map.hours} onChange={v=>onMapChange("hours", v)} headers={headers}/>
            <FieldMap label="Inventory Item" value={map.invItem} onChange={v=>onMapChange("invItem", v)} headers={headers}/>
            <FieldMap label="Inventory Qty" value={map.invQty} onChange={v=>onMapChange("invQty", v)} headers={headers}/>
          </div>
        </div>
      )}

      {preview.length > 0 && (
        <div style={{ border: "1px solid #333", borderRadius: 10, padding: 12, marginTop: 8 }}>
          <h3>Preview (first 5 rows)</h3>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>{preview.map((r,i) => <tr key={i}>{headers.map(h => <td key={h}>{String(r[h])}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </div>
      )}

      <div style={{ border: "1px solid #333", borderRadius: 10, padding: 12, marginTop: 8 }}>
        <h3>Log</h3>
        <pre style={{ whiteSpace: "pre-wrap" }}>{log || "Waiting for file..."}</pre>
      </div>
    </div>
  );
}

function FieldMap({ label, value, onChange, headers }:{
  label: string; value?: string; onChange:(v:string)=>void; headers: string[];
}){
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ opacity: .8 }}>{label}</span>
      <select value={value ?? ""} onChange={(e)=>onChange(e.target.value)}>
        <option value="">— Not Mapped —</option>
        {headers.map(h => <option key={h} value={h}>{h}</option>)}
      </select>
    </label>
  );
}















