import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Boxes, Users, FileText, Upload } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Jobs", path: "/jobs", icon: <Briefcase className="h-4 w-4" /> },
  { label: "Clients", path: "/clients", icon: <Users className="h-4 w-4" /> },
  { label: "Inventory", path: "/inventory", icon: <Boxes className="h-4 w-4" /> },
  { label: "Labor", path: "/labor", icon: <FileText className="h-4 w-4" /> },
  { label: "Reports", path: "/reports", icon: <FileText className="h-4 w-4" /> },
  { label: "Import", path: "/import", icon: <Upload className="h-4 w-4" /> },
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <aside className="hidden w-60 shrink-0 border-r border-zinc-800 bg-zinc-900/40 p-4 md:block">
      <div className="mb-6 text-lg font-semibold">ForgeTrack</div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-zinc-800/60 ${
                active ? "bg-zinc-800/70 text-white" : "text-zinc-300"
              }`}
              to={item.path}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

function Briefcase(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7h16a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2z"/><path d="M14 7V5a2 2 0 00-2-2v0a2 2 0 00-2 2v2"/></svg>;
}






