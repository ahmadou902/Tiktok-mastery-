import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, ArrowRight, LayoutDashboard, Shield, LogIn } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, isAdmin } = useAuth();

  const navLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Formation', path: '/formation' },
    { label: 'Tarifs', path: '/tarifs' },
    { label: 'FAQ', path: '/faq' }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Logo size="md" showSubtitle />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? 'text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right CTAs */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-all"
                >
                  <Shield className="w-3.5 h-3.5 text-rose-400" />
                  <span>Admin</span>
                </Link>
              )}
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-lg shadow-rose-500/20 transition-all active:scale-95"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Mon Espace Élève</span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/connexion"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all"
              >
                <LogIn className="w-4 h-4 text-zinc-400" />
                <span>Connexion</span>
              </Link>
              <Link
                to="/tarifs"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20 transition-all active:scale-95"
              >
                <span>Commencer</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="p-2 rounded-lg bg-zinc-900 text-rose-400 border border-zinc-800"
              title="Mon espace"
            >
              <LayoutDashboard className="w-5 h-5" />
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-3 pb-6 space-y-4">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-base font-medium ${
                  isActive(item.path)
                    ? 'bg-zinc-900 text-rose-400 font-semibold'
                    : 'text-zinc-300 hover:bg-zinc-900/60'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-zinc-800 space-y-2.5">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-500 text-white font-semibold text-sm shadow-md"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Accéder à mon espace élève</span>
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-900 text-zinc-300 border border-zinc-800 font-medium text-sm"
                  >
                    <Shield className="w-4 h-4 text-rose-400" />
                    <span>Tableau de bord Admin</span>
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/connexion"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 font-medium text-sm"
                >
                  Connexion élève
                </Link>
                <Link
                  to="/tarifs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-500 text-white font-semibold text-sm shadow-lg shadow-rose-500/20"
                >
                  <span>Rejoindre la formation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
