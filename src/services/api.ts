export const API_BASE =
  import.meta.env.VITE_API_URL?.replace(/\/+$/, "") ||
  "http://localhost:5000";

async function getJson(url: string) {
  const res = await fetch(url, { credentials: "omit" });
  if (!res.ok) throw new Error(`GET ${url} failed`);
  return res.json();
}

export function fetchKpis() {
  return getJson(`${API_BASE}/api/kpis`);
}

export function fetchJobs() {
  return getJson(`${API_BASE}/api/jobs`);
}

export function fetchInventory() {
  return getJson(`${API_BASE}/api/inventory`);
}

export function fetchClients() {
  return getJson(`${API_BASE}/api/clients`);
}

export function fetchLabor() {
  return getJson(`${API_BASE}/api/labor`);
}

export async function uploadFiles(files: File[]) {
  const fd = new FormData();
  files.forEach(f => fd.append("files", f, f.name));
  const res = await fetch(`${API_BASE}/api/upload`, {
    method: "POST",
    body: fd
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || "upload failed");
  }
  return res.json();
}



