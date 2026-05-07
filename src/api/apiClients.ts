const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload file: ${response.statusText}`);
  }

  return response.json();
};

export const fetchJobs = async () => {
  const response = await fetch(`${API_BASE_URL}/jobs`);
  return response.json();
};

export const fetchInventory = async () => {
  const response = await fetch(`${API_BASE_URL}/inventory`);
  return response.json();
};

export const fetchLabor = async () => {
  const response = await fetch(`${API_BASE_URL}/labor`);
  return response.json();
};

