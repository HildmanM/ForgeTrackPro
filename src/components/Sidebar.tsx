import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Boxes, Users, FileText, Upload, FileChart, Briefcase } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
  { label: 'Jobs', path: '/jobs', icon: <Briefcase size={20} /> },
  { label: 'Clients', path: '/clients', icon: <Users size={20} /> },
  { label: 'Inventory', path: '/inventory', icon: <Boxes size={20} /> },
  { label: 'Labor', path: '/labor', icon: <FileText size={20} /> },
  { label: 'Reports', path: '/reports', icon: <FileChart size={20} /> },
  { label: 'Import', path: '/import', icon: <Upload size={20} /> }
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-full bg-zinc-900 text-white flex flex-col shadow-xl">
      <div className="text-2xl font-bold text-center py-6 border-b border-zinc-700">
        ForgeTrack
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-2 rounded transition-colors ${
              location.pathname === item.path
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}





