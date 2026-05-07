import React, { useEffect, useState } from "react";
import { fetchClients } from "../../services/api";
import {
  Users,
  Phone,
  Mail,
  MapPin,
  MoreVertical,
  Star,
  Activity,
  Calendar
} from "lucide-react";

// Mock Enhanced Client Data (merging with API data)
const enhanceClientData = (apiClients: any[]) => {
  return apiClients.map(c => ({
    ...c,
    status: "Active",
    lastContact: "2 days ago",
    totalProjects: Math.floor(Math.random() * 15) + 2,
    value: Math.floor(Math.random() * 2000000) + 500000,
    rating: Math.floor(Math.random() * 3) + 3
  }));
};

const ClientsModule: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    fetchClients()
      .then(data => setRows(enhanceClientData(data)))
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="text-blue-500" />
            Client Relationship Management
          </h1>
          <p className="text-gray-400 text-sm mt-1">Manage partner details, contracts, and communication</p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search clients..."
            className="bg-gray-800 border-gray-700 text-sm text-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 w-64"
          />
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Add Client
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client List */}
        <div className="lg:col-span-2 space-y-4">
          {rows.map((client, i) => (
            <div key={i} className="bg-gray-800 rounded-xl border border-gray-700 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-gray-700/50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {client.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    {client.name}
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${client.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                      {client.status}
                    </span>
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-1">
                    <span className="flex items-center gap-1"><Mail size={14} /> {client.email}</span>
                    <span className="flex items-center gap-1"><Phone size={14} /> {client.phone}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 mt-4 sm:mt-0">
                <div className="text-right">
                  <div className="text-xs text-gray-400">Total Value</div>
                  <div className="font-semibold text-white">${client.value?.toLocaleString()}</div>
                </div>
                <button className="p-2 hover:bg-gray-600 rounded-lg text-gray-400 transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          ))}
          {!rows.length && (
            <div className="text-center py-10 text-gray-500">
              No clients found.
            </div>
          )}
        </div>

        {/* CRM Stats / Details Sidebar */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="font-semibold text-white mb-4">Pipeline Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Active Contracts</span>
                <span className="text-white font-medium">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Pending Bids</span>
                <span className="text-white font-medium">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Total Revenue YTD</span>
                <span className="text-emerald-400 font-medium">$12.5M</span>
              </div>
              <div className="pt-4 border-t border-gray-700">
                <div className="flex items-center gap-2 text-sm text-blue-400 cursor-pointer hover:underline">
                  <Activity size={14} /> View detailed reports
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="font-semibold text-white mb-4">Recent Interactions</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">Call with <span className="text-white font-medium">MegaCorp Builders</span> regarding expansion.</p>
                    <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Calendar size={10} /> 2 days ago
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm text-center border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors text-gray-300">
              View All Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsModule;

