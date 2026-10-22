import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main Application Area */}
      <div className="min-h-screen lg:ml-72">
        {/* Header */}
        <Header onMenuClick={() => setMobileOpen(true)} />

        {/* Page Content */}
        <main className="min-w-0 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;