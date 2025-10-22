import React from "react";
import { useApp } from "@/store/appContext";

export default function Dashboard() {
  const { state } = useApp();
  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(4, 1fr)" }}>
        {state.kpis.map((k, i) => (
          <div key={i} style={{ border: "1px solid #333", borderRadius: 10, padding: 12 }}>
            <div style={{ color: "#a8a8b3", fontSize: 13 }}>{k.title}</div>
            <div style={{ fontSize: 26, fontWeight: 700 }}>{k.value.toLocaleString()}</div>
            {typeof k.delta === "number" && (
              <div style={{ fontSize: 12, color: k.delta >= 0 ? "#23c55e" : "#ef4444" }}>
                {k.delta >= 0 ? "▲ " : "▼ "}
                {Math.abs(k.delta).toFixed(1)}%
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}








