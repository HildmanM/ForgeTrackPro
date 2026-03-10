import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboardIcon,
  BriefcaseIcon,
  PackageIcon,
  UsersIcon,
  ClockIcon,
  BarChart3Icon,
  FileTextIcon,
  FilePlus2Icon,
  MenuIcon
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboardIcon size={20} /> },
    { path: '/jobs', label: 'Jobs', icon: <BriefcaseIcon size={20} /> },
    { path: '/inventory', label: 'Inventory', icon: <PackageIcon size={20} /> },
    { path: '/clients', label: 'Clients', icon: <UsersIcon size={20} /> },
    { path: '/labor', label: 'Labor Hours', icon: <ClockIcon size={20} /> },
    { path: '/reports', label: 'Reports', icon: <BarChart3Icon size={20} /> },
    { path: '/import', label: 'Import Data', icon: <FilePlus2Icon size={20} /> },
    { path: '/import-pdf', label: 'Import PDF', icon: <FileTextIcon size={20} /> }
  ];

  return (
    <aside className={`transition-all duration-500 ease-in-out border-r border-slate-700/50 bg-slate-900/50 backdrop-blur-xl ${collapsed ? 'w-20' : 'w-72'}`}>
      <div className="flex items-center justify-between h-20 px-6 border-b border-slate-700/50">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center shadow-lg shadow-sky-500/20">
              <PackageIcon size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              ForgeTrack
            </span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-xl hover:bg-slate-800/80 text-slate-400 hover:text-white transition-all duration-200"
        >
          <MenuIcon size={20} />
        </button>
      </div>
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''} ${collapsed ? 'justify-center !px-0' : ''}`
            }
          >
            <span className={`${collapsed ? '' : 'flex-shrink-0'}`}>{item.icon}</span>
            {!collapsed && <span className="font-medium tracking-wide">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;



