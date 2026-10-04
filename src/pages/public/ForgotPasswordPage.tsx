import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/common/Logo';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    const res = await forgotPassword(email);
    setInfoMessage(res.message);
    setSubmitted(true);
  };

  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[calc(100vh-160px)]">
      <div className="max-w-md w-full space-y-6 p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl">
        <Logo size="md" className="justify-center mb-2" />
        <h1 className="text-2xl font-bold text-white text-center">Récupération de mot de passe</h1>

        {submitted ? (
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">{infoMessage}</p>
            <div className="pt-2">
              <Link
                to="/connexion"
                className="inline-flex items-center gap-2 text-sm text-rose-400 hover:text-rose-300 font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour à la page de connexion</span>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-zinc-400 leading-relaxed text-center">
              Entrez l'adresse email associée à votre compte élève. Nous vous enverrons les instructions de réinitialisation.
            </p>
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
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-rose-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Envoyer le lien de récupération</span>
            </button>
            <div className="text-center pt-2">
              <Link
                to="/connexion"
                className="text-xs text-zinc-400 hover:text-zinc-200 inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Retour à la connexion</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
