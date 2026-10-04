import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/common/Logo';
import { LogIn, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Veuillez renseigner votre adresse email.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      if (email.toLowerCase().includes('admin')) {
        navigate('/admin');
      } else {
        navigate(from);
      }
    } catch (err: any) {
      setError(err?.message || 'Erreur lors de la connexion.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo1234');
  };

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[calc(100vh-160px)]">
      <div className="max-w-md w-full space-y-8 p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl">
        <div className="text-center space-y-2">
          <Logo size="md" className="justify-center mb-4" />
          <h1 className="text-2xl font-bold text-white tracking-tight">Connexion Élève</h1>
          <p className="text-xs text-zinc-400">
            Accédez à vos cours, leçons et ressources TikTok Mastery
          </p>
        </div>

        {/* Quick Demo Fill Buttons */}
        <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comptes Démo en 1 clic pour tester :</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('amadou.etudiant@tiktokmastery.sn')}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-[11px] text-zinc-300 border border-zinc-700 text-left transition-colors"
            >
              <div className="font-semibold text-white">Amadou (Élève)</div>
              <div className="text-[10px] text-zinc-400">Offre PRO</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('admin@tiktokmastery.sn')}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-[11px] text-zinc-300 border border-zinc-700 text-left transition-colors"
            >
              <div className="font-semibold text-rose-400">Awa (Admin)</div>
              <div className="text-[10px] text-zinc-400">Panneau complet</div>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Adresse Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre.email@exemple.com"
              required
              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-zinc-300">
                Mot de passe
              </label>
              <Link
                to="/mot-de-passe-oublie"
                className="text-[11px] text-rose-400 hover:text-rose-300"
              >
                Mot de passe oublié ?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Connexion en cours...</span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Me connecter</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-zinc-400">
          Vous n’avez pas encore de compte ?{' '}
          <Link to="/inscription" className="text-rose-400 hover:text-rose-300 font-semibold">
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
};
