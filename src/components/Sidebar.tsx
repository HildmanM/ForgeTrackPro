import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard as DashboardIcon,
  Briefcase as BriefcaseIcon,
  Package as PackageIcon,
  Users as UsersIcon,
  Clock as ClockIcon,
  BarChart3 as BarChart3Icon,
  Upload as UploadIcon,
  DollarSign as DollarSignIcon,
  Calendar as CalendarIcon
} from "lucide-react";

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { to: "/", label: "Dashboard", icon: <DashboardIcon size={18} /> },
    { to: "/bids", label: "Estimating", icon: <DollarSignIcon size={18} /> },
    { to: "/schedule", label: "Schedule", icon: <CalendarIcon size={18} /> },
    { to: "/jobs", label: "Jobs", icon: <BriefcaseIcon size={18} /> },
    { to: "/inventory", label: "Inventory", icon: <PackageIcon size={18} /> },
    { to: "/clients", label: "Clients", icon: <UsersIcon size={18} /> },
    { to: "/labor", label: "Labor", icon: <ClockIcon size={18} /> },
    { to: "/reports", label: "Reports", icon: <BarChart3Icon size={18} /> },
    { to: "/import", label: "Import Data", icon: <UploadIcon size={18} /> }
  ];

  return (
    <aside
      className={`bg-black text-white h-screen flex flex-col border-r border-gray-800 ${collapsed ? "w-16" : "w-60"
        } transition-all duration-200`}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
        {!collapsed && (
          <span className="text-lg font-bold text-white tracking-wide">
            ForgeTrack
          </span>
        )}
        <button
          className="text-gray-400 hover:text-white"
          onClick={() => setCollapsed(!collapsed)}
        >
          ☰
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1 text-sm">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex items-center rounded-md px-3 py-2 hover:bg-gray-800 ${isActive ? "bg-gray-900 text-white font-semibold" : "text-gray-300"
              }`
            }
          >
            <span className="mr-3">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;






