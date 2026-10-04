import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';
import { DemoBanner } from '../components/common/DemoBanner';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      <DemoBanner />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
