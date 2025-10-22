import React from "react";
import { useApp } from "@/store/appContext";

export default function Inventory(){
  const { state } = useApp();
  return (
    <div>
      <h2>Inventory</h2>
      <table>
        <thead><tr><th>ID</th><th>Item</th><th>Qty</th><th>Status</th></tr></thead>
        <tbody>
          {state.inventory.map(i => (<tr key={i.id}><td>{i.id}</td><td>{i.item}</td><td>{i.quantity}</td><td>{i.status}</td></tr>))}
        </tbody>
      </table>
    </div>
  );
}

