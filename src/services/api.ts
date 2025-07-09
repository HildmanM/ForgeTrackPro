import axios from 'axios';

const API = axios.create({
  baseURL: 'https://forge-backend-1jaq.onrender.com/api'
});

export const uploadFile = (file: File) => {
  const form = new FormData();
  form.append('file', file);
  return API.post<{ rows: any[] }>('/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const fetchJobs = () => API.get<{ rows: any[] }>('/jobs');
