import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboardIcon,
  BriefcaseIcon,
  PackageIcon,
  UsersIcon,
  ClockIcon,
  BarChart3Icon,
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
    { path: '/import', label: 'Import Data', icon: <BarChart3Icon size={20} /> }
  ];

  return (
    <aside className={`bg-gray-800 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
        {!collapsed && <div className="text-xl font-bold text-blue-400">ForgeTrack</div>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-700"
        >
          <MenuIcon size={20} />
        </button>
      </div>
      <nav className="py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `
              flex items-center px-4 py-3 mb-1 transition-colors
              ${isActive ? 'bg-blue-700 text-white' : 'text-gray-400 hover:bg-gray-700'}
            `
            }
          >
            <span className="mr-3">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

