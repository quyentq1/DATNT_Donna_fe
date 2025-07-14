import React from 'react';
import Header from './Header';
import AppSidebar from './Sidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-white">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-8 bg-[#fafbfc]">
          {children}
        </main>
      </div>
    </div>
  );
} 