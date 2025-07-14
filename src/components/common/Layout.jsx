import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AppSidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

const Layout = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <div className="flex flex-1 w-full mx-auto">
        {user?.role === 'admin' && <AppSidebar />}
        <main className="flex-1 p-8 bg-[#fafbfc] min-h-[calc(100vh-120px)]">
          {children || <Outlet />}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
