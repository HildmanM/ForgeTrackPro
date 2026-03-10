import React from 'react';
import Sidebar from './Sidebar';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  return <div className="flex h-screen w-full overflow-hidden">
    <Sidebar />
    <main className="flex-1 overflow-auto px-8 py-8 relative">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {children}
      </div>
    </main>
  </div>;
};
export default Layout;