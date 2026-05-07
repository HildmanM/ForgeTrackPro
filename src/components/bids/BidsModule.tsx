import React from "react";
import {
    FileText,
    DollarSign,
    TrendingUp,
    AlertCircle,
    Plus,
    MoreVertical
} from "lucide-react";

// Mock data for bids
const bids = [
    { id: 1, project: "City Center Complex", client: "MegaCorp Builders", amount: 1250000, status: "Pending", probability: "60%" },
    { id: 2, project: "Riverside Bridge", client: "City Infrastructure", amount: 3500000, status: "Submitted", probability: "40%" },
    { id: 3, project: "Warehouse Expansion", client: "Global Logistics", amount: 450000, status: "Won", probability: "100%" },
    { id: 4, project: "School Gymnasium", client: "Education Dept", amount: 850000, status: "Lost", probability: "0%" },
];

const BidsModule: React.FC = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-800 pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <FileText className="text-blue-500" />
                        Estimating & Bids
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Manage project estimates and track bid status</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    <Plus size={16} /> New Bid
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                            <FileText size={20} />
                        </div>
                        <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">+2 this week</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">12</div>
                    <p className="text-gray-400 text-sm">Active Bids</p>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                            <DollarSign size={20} />
                        </div>
                        <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">+15%</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">$4.2M</div>
                    <p className="text-gray-400 text-sm">Pipeline Value</p>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                            <TrendingUp size={20} />
                        </div>
                        <span className="text-xs font-medium text-gray-400">Last 30 days</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">35%</div>
                    <p className="text-gray-400 text-sm">Win Rate</p>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                            <AlertCircle size={20} />
                        </div>
                        <span className="text-xs font-medium text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full">3 Due Soon</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">Pending</div>
                    <p className="text-gray-400 text-sm">Action Required</p>
                </div>
            </div>

            {/* Bids List */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
                <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="font-semibold text-white">Recent Bids</h3>

                </div>
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-gray-900/50 text-xs uppercase font-semibold text-gray-500">
                        <tr>
                            <th className="px-6 py-4">Project Name</th>
                            <th className="px-6 py-4">Client</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Value</th>
                            <th className="px-6 py-4">Probability</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {bids.map((bid) => (
                            <tr key={bid.id} className="hover:bg-gray-700/30 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">{bid.project}</td>
                                <td className="px-6 py-4">{bid.client}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                    ${bid.status === 'Won' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                            bid.status === 'Lost' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                bid.status === 'Submitted' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                    'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                                        {bid.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-white">${bid.amount.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 rounded-full" style={{ width: bid.probability }}></div>
                                        </div>
                                        <span className="text-xs">{bid.probability}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 transition-colors">
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BidsModule;
