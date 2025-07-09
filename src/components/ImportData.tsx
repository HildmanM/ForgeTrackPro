import React, { useState } from 'react';

const ImportData = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://forge-backend-1jaq.onrender.com/api/upload', {  // ✅ Correct URL

        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('File uploaded successfully.');
      } else {
        setMessage('Upload failed.');
      }
    } catch (error) {
      setMessage('Error uploading file.');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Import Data</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" onChange={handleFileChange} className="block text-white" />
        <button type="submit" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">Upload</button>
      </form>
      {message && <p className="text-amber-400">{message}</p>}
    </div>
  );
};

export default ImportData;



