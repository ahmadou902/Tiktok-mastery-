import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, UserCheck, LogOut, ChevronDown, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DemoBanner: React.FC = () => {
  const { user, switchDemoUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800/80 text-xs py-1.5 px-4 text-zinc-300">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 font-semibold border border-rose-500/20 text-[10px] uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-rose-400" /> Mode Démo Interactif
          </span>
          <span className="hidden sm:inline text-zinc-400">
            Session active : <strong className="text-zinc-200">{user ? user.name : 'Visiteur'}</strong> ({user?.role || 'Non connecté'})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors border border-zinc-700 text-xs font-medium"
            >
              <span>Changer de rôle test</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-1 w-56 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-50 py-1 divide-y divide-zinc-800">
                <button
                  onClick={() => {
                    switchDemoUser('STUDENT');
                    setIsOpen(false);
                    navigate('/dashboard');
                  }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-zinc-800 text-zinc-200"
                >
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-semibold">Élève : Amadou Diallo</div>
                    <div className="text-[10px] text-zinc-400">Offre PRO (progression en cours)</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    switchDemoUser('ADMIN');
                    setIsOpen(false);
                    navigate('/admin');
                  }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-zinc-800 text-zinc-200"
                >
                  <ShieldCheck className="w-4 h-4 text-rose-400" />
                  <div>
                    <div className="font-semibold">Admin : Awa Ndiaye</div>
                    <div className="text-[10px] text-zinc-400">Gestion élèves, cours & ventes</div>
                  </div>
                </button>

                {user && (
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                      navigate('/');
                    }}
                    className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-rose-950/30 text-rose-300"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Se déconnecter (Mode public)</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
