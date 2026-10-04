import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCourse } from '../context/CourseContext';
import { Logo } from '../components/common/Logo';
import { DemoBanner } from '../components/common/DemoBanner';
import {
  LayoutDashboard,
  BookOpen,
  FolderDown,
  HelpCircle,
  Award,
  LogOut,
  Shield,
  Menu,
  X,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const StudentLayout: React.FC = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { getTotalProgress } = useCourse();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/connexion" state={{ from: location }} replace />;
  }

  const { percentage } = getTotalProgress();

  const navigation = [
    { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tous les cours', href: '/cours', icon: BookOpen },
    { name: 'Bonus & Ressources', href: '/ressources', icon: FolderDown },
    { name: 'Quiz de validation', href: '/quiz', icon: HelpCircle },
    { name: 'Mon Certificat', href: '/certificat', icon: Award }
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 pb-16 md:pb-0">
      <DemoBanner />

      {/* Top Header */}
      <header className="sticky top-0 z-30 h-16 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Logo size="sm" />
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
            Espace Élève
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Quick Progress Mini Pill */}
          <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <div className="w-16 bg-zinc-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-rose-500 to-cyan-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-zinc-300">{percentage}%</span>
          </div>

          {/* Admin shortcut if admin */}
          {isAdmin && (
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-all"
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Mode Admin</span>
            </Link>
          )}

          {/* User profile dropdown trigger */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-zinc-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              {user?.name.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="hidden lg:block text-left text-xs">
              <div className="font-semibold text-zinc-200 line-clamp-1">{user?.name}</div>
              <div className="text-[10px] text-rose-400 font-medium tracking-wide">
                FORMULE {user?.plan || 'PRO'}
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-zinc-900 transition-colors"
              title="Déconnexion"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-zinc-950 border-r border-zinc-800/80 p-4 space-y-6">
          <div className="space-y-1">
            <div className="px-3 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
              Apprentissage
            </div>
            {navigation.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 font-semibold shadow-sm'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? 'text-rose-400' : 'text-zinc-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {active && <ChevronRight className="w-3.5 h-3.5 text-rose-400" />}
                </Link>
              );
            })}
          </div>

          {/* Student Status Card */}
          <div className="mt-auto p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-300">Votre statut</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {user?.plan || 'PRO'}
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Progression</span>
                <span className="font-semibold text-zinc-200">{percentage}%</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-rose-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
            <Link
              to="/certificat"
              className="w-full flex items-center justify-center gap-1.5 text-xs py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium transition-colors"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{percentage >= 100 ? 'Voir mon diplôme' : 'Objectif Certificat'}</span>
            </Link>
          </div>
        </aside>

        {/* Mobile Flyout Drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden bg-zinc-950/80 backdrop-blur-sm flex">
            <div className="w-72 bg-zinc-950 border-r border-zinc-800 p-5 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Logo size="sm" />
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1 rounded-lg text-zinc-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1.5">
                  {navigation.map((item) => {
                    const active = isActive(item.href);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium ${
                          active
                            ? 'bg-rose-500 text-white font-semibold shadow-md'
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

              <div className="pt-4 border-t border-zinc-800 space-y-3">
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-900 text-rose-300 text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Se déconnecter</span>
                </button>
              </div>
            </div>
            <div className="flex-1" onClick={() => setSidebarOpen(false)} />
          </div>
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation (Ultra responsive for creators on the go) */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-zinc-950/95 backdrop-blur-lg border-t border-zinc-800/80 md:hidden flex items-center justify-around h-16 px-2">
        {navigation.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-colors ${
                active ? 'text-rose-400 font-semibold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight">{item.name.replace('Tous les ', '').replace('Tableau de bord', 'Dashboard')}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
