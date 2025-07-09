import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'https://forge-backend-1jaq.onrender.com';

export function importFile(file: File) {
  const form = new FormData();
  form.append('file', file);
  return axios.post<{ text: string }>(
    `${API}/api/import`,
    form,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
}

export function listJobs() {
  return axios.get<{ jobs: any[] }>(`${API}/api/jobs`);
}


