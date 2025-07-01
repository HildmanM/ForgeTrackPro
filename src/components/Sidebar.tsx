import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HomeIcon, FilePlusIcon, FileTextIcon, PackageIcon } from "lucide-react";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const links = [
    { path: "/", label: "Dashboard", icon: <HomeIcon size={20} /> },
    { path: "/import-excel", label: "Import Excel", icon: <FilePlusIcon size={20} /> },
    { path: "/import-pdf", label: "Import PDF", icon: <FileTextIcon size={20} /> }
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <h1 className="text-xl font-bold mb-6">ForgeTrack</h1>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center px-3 py-2 rounded hover:bg-gray-700 ${
              location.pathname === link.path ? "bg-gray-700" : ""
            }`}
          >
            <span className="mr-3">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;



