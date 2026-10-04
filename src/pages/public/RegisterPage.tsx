import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/common/Logo';
import { PlanType } from '../../types';
import { UserPlus, AlertCircle, Check } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedPlan = (searchParams.get('plan') as PlanType) || 'PRO';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [plan, setPlan] = useState<PlanType>(preselectedPlan);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim()) {
      setError('Veuillez renseigner votre nom complet et votre adresse email.');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password, plan);
      navigate(`/commander/${plan}`);
    } catch (err: any) {
      setError(err?.message || 'Erreur lors de la création du compte.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[calc(100vh-160px)]">
      <div className="max-w-md w-full space-y-8 p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl">
        <div className="text-center space-y-2">
          <Logo size="md" className="justify-center mb-4" />
          <h1 className="text-2xl font-bold text-white tracking-tight">Rejoindre TikTok Mastery</h1>
          <p className="text-xs text-zinc-400">
            Créez votre profil créateur et accédez à votre formation
          </p>
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
              Prénom et Nom
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Moussa Diop"
              required
              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Adresse Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="moussa@exemple.com"
              required
              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Au moins 6 caractères"
              required
              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Formule choisie
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['STARTER', 'PRO', 'PREMIUM'] as PlanType[]).map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPlan(p)}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                    plan === p
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div>{p}</div>
                  <div className="text-[10px] font-normal text-zinc-400">
                    {p === 'STARTER' ? '9 900 F' : p === 'PRO' ? '14 900 F' : '24 900 F'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Création du compte...</span>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Continuer vers le règlement</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-zinc-400">
          Vous avez déjà un compte ?{' '}
          <Link to="/connexion" className="text-rose-400 hover:text-rose-300 font-semibold">
            Me connecter
          </Link>
        </div>
      </div>
    </div>
  );
};
