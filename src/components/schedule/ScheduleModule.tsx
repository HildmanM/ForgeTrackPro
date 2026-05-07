import React from "react";
import {
    Calendar,
    Clock,
    Layers,
    MoreHorizontal,
    Plus,
    ArrowRight
} from "lucide-react";

// Mock Project Data
const scheduleItems = [
    { id: 1, name: "City Center Complex", phase: "Fabrication", progress: 65, startDate: "Dec 01", endDate: "Dec 20" },
    { id: 2, name: "Riverside Bridge", phase: "Detailing", progress: 30, startDate: "Dec 05", endDate: "Jan 15" },
    { id: 3, name: "Warehouse Expansion", phase: "Erection", progress: 90, startDate: "Nov 15", endDate: "Dec 12" },
    { id: 4, name: "School Gymnasium", phase: "Shipping", progress: 10, startDate: "Dec 10", endDate: "Dec 25" },
    { id: 5, name: "Tech Park Phase 2", phase: "Detailing", progress: 5, startDate: "Dec 15", endDate: "Jan 30" },
];

const phases = ["Detailing", "Fabrication", "Shipping", "Erection"];
const phaseColors: Record<string, string> = {
    "Detailing": "bg-purple-500",
    "Fabrication": "bg-blue-500",
    "Shipping": "bg-amber-500",
    "Erection": "bg-emerald-500",
};

const ScheduleModule: React.FC = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-800 pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Calendar className="text-purple-500" />
                        Production Schedule
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Timeline and resource allocation</p>
                </div>
                <div className="flex gap-2">
                    <select className="bg-gray-800 border-gray-700 text-sm text-gray-300 rounded-lg px-3 py-2 outline-none">
                        <option>Month View</option>
                        <option>Week View</option>
                    </select>
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        <Plus size={16} /> Add Job
                    </button>
                </div>
            </div>

            {/* Main Gantt Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Project List */}
                <div className="col-span-1 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
                    <div className="p-4 border-b border-gray-700 font-semibold text-white">
                        Active Projects
                    </div>
                    <div className="divide-y divide-gray-700">
                        {scheduleItems.map((item) => (
                            <div key={item.id} className="p-4 hover:bg-gray-700/50 transition-colors group cursor-pointer">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-medium text-gray-200">{item.name}</h3>
                                    <MoreHorizontal size={16} className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                                    <Clock size={12} />
                                    {item.startDate} - {item.endDate}
                                </div>
                                {/* Progress Bar */}
                                <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${phaseColors[item.phase]} rounded-full`}
                                        style={{ width: `${item.progress}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className={`text-xs px-2 py-0.5 rounded-full bg-opacity-10 text-opacity-90 border border-opacity-20
                        ${item.phase === 'Detailing' ? 'bg-purple-500 text-purple-400 border-purple-500' :
                                            item.phase === 'Fabrication' ? 'bg-blue-500 text-blue-400 border-blue-500' :
                                                item.phase === 'Shipping' ? 'bg-amber-500 text-amber-400 border-amber-500' :
                                                    'bg-emerald-500 text-emerald-400 border-emerald-500'}`}>
                                        {item.phase}
                                    </span>
                                    <span className="text-xs text-gray-400">{item.progress}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timeline Visualization */}
                <div className="col-span-1 lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-semibold text-white">December Timeline</h3>
                        <div className="flex gap-2">
                            {phases.map(phase => (
                                <div key={phase} className="flex items-center gap-1.5">
                                    <div className={`w-2 h-2 rounded-full ${phaseColors[phase]}`}></div>
                                    <span className="text-xs text-gray-400">{phase}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pseudo-Gantt Visualization (Layout Only) */}
                    <div className="flex-1 relative border-l border-gray-700 ml-4 space-y-8 pl-4 py-2">
                        {/* Day Markers */}
                        <div className="absolute top-0 bottom-0 left-0 flex justify-between w-full pointer-events-none opacity-10">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="w-px h-full bg-gray-400"></div>
                            ))}
                        </div>

                        {scheduleItems.map((item, index) => (
                            <div key={item.id} className="relative">
                                {/* Connector to sidebar */}
                                <div className="absolute -left-6 top-1/2 w-4 h-px bg-gray-600"></div>

                                <div className="flex items-center gap-4">
                                    {/* Phase Tracks */}
                                    <div className="flex-1 h-12 bg-gray-900 rounded-lg relative overflow-hidden flex items-center px-4 border border-gray-700/50">
                                        <div
                                            className={`absolute top-2 bottom-2 rounded-md opacity-30 ${phaseColors[item.phase]}`}
                                            style={{
                                                left: `${(index * 10) + 5}%`,
                                                width: `${60 - (index * 5)}%`
                                            }}
                                        ></div>
                                        <div
                                            className={`absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full ${phaseColors[item.phase]}`}
                                            style={{
                                                left: `${(index * 10) + 5}%`,
                                                width: `${(60 - (index * 5)) * (item.progress / 100)}%`
                                            }}
                                        ></div>

                                        <span className="relative z-10 text-xs text-gray-300 font-medium">
                                            {item.name}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-center text-sm text-gray-500 italic">
                        <ArrowRight size={14} className="mr-2" /> Scroll to view future phases
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleModule;
