import React from 'react';

const JobsModule = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Jobs Module</h1>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md shadow-md">
          Add Job
        </button>
      </div>
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-5 shadow-lg">
        <h2 className="text-lg font-medium mb-4">Job Listing</h2>
        <div className="text-center py-16 text-gray-400">
          Imported jobs from Tekla, Excel, or Access will appear here.
        </div>
      </div>
    </div>
  );
};

export default JobsModule;
