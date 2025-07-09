import axios from 'axios';

// pull in our new env var, defaulting to empty so local dev (vite proxy) still works:
const API = import.meta.env.VITE_API_URL || '';

export function importFile(file: File) {
  const form = new FormData();
  form.append('file', file);
  return axios.post(`${API}/api/import`, form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}

export function listJobs() {
  return axios.get<{ jobs: any[] }>(`${API}/api/jobs`);
}

