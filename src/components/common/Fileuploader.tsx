import React, { useState } from 'react';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      onFileUpload(file);
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-600 p-4 rounded-md text-center">
      <input
        type="file"
        id="file"
        onChange={handleChange}
        className="hidden"
      />
      <label htmlFor="file" className="cursor-pointer text-blue-400">
        {fileName ? `Selected: ${fileName}` : 'Click to upload file'}
      </label>
    </div>
  );
};

export default FileUploader;

