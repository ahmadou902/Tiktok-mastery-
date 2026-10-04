import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/common/Logo';
import { DemoBanner } from '../components/common/DemoBanner';
import {
  ShieldAlert,
  BarChart3,
  Users,
  BookOpen,
  FolderDown,
  ShoppingBag,
  Settings,
  ArrowLeft,
  Menu,
  X,
  Lock
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/connexion" state={{ from: location }} replace />;
  }

  // Strict role protection: only ADMIN allowed
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
        <DemoBanner />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-center space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-zinc-100">Accès Administrateur Restreint</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Votre compte actuel (<strong className="text-zinc-200">{user?.email}</strong>) possède le rôle <span className="font-semibold text-rose-400">ÉLÈVE</span> et ne peut pas accéder au panneau d'administration.
            </p>
            <div className="pt-2 space-y-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-semibold transition-all"
              >
                Retourner à mon Espace Élève
              </button>
              <p className="text-xs text-zinc-500">
                Astuce : Vous pouvez utiliser le bandeau démo en haut pour basculer sur le compte "Admin : Awa Ndiaye" en 1 clic.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const adminNav = [
    { name: 'Vue d’ensemble', href: '/admin', icon: BarChart3 },
    { name: 'Gestion des Élèves', href: '/admin/students', icon: Users },
    { name: 'Modules & Leçons', href: '/admin/courses', icon: BookOpen },
    { name: 'Bonus & Ressources', href: '/admin/resources', icon: FolderDown },
    { name: 'Commandes & Ventes', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Paramètres & API', href: '/admin/settings', icon: Settings }
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      <DemoBanner />

      {/* Admin Topbar */}
      <header className="sticky top-0 z-30 h-16 bg-zinc-950/95 backdrop-blur-md border-b border-rose-900/30 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Logo size="sm" />
          <div className="hidden sm:flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[11px] font-bold tracking-wider uppercase">
              Panneau Administrateur
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold border border-zinc-800 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Retour Vue Élève</span>
          </Link>
          <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
            <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
              AD
            </div>
            <div className="hidden md:block text-xs text-left">
              <div className="font-semibold text-zinc-200">Awa Ndiaye</div>
              <div className="text-[10px] text-zinc-400">Super Admin</div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Desktop Admin Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-zinc-950 border-r border-zinc-900 p-4 space-y-6">
          <div className="space-y-1">
            <div className="px-3 text-[11px] font-bold tracking-wider text-zinc-500 uppercase">
              Gestion de l’Académie
            </div>
            {adminNav.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-rose-500/15 text-rose-300 font-semibold border border-rose-500/20'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-rose-400' : 'text-zinc-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-auto p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/60 text-xs space-y-2 text-zinc-400">
            <div className="flex items-center gap-1.5 text-zinc-200 font-semibold">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>Netlify Functions Ready</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-normal">
              Les routes d'API serveur `/netlify/functions` sont configurées pour le traitement sécurisé.
            </p>
          </div>
        </aside>

        {/* Mobile flyout */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden bg-zinc-950/80 backdrop-blur-sm flex">
            <div className="w-72 bg-zinc-950 border-r border-zinc-800 p-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-rose-400 uppercase tracking-wider">Menu Admin</span>
                  <button onClick={() => setSidebarOpen(false)} className="p-1 text-zinc-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="space-y-1.5">
                  {adminNav.map((item) => {
                    const active = isActive(item.href);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium ${
                          active
                            ? 'bg-rose-500 text-white font-semibold'
                            : 'text-zinc-300 hover:bg-zinc-900'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
            <div className="flex-1" onClick={() => setSidebarOpen(false)} />
          </div>
        )}

        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
