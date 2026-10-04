import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { ShieldCheck, Heart, CreditCard, Smartphone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" showSubtitle />
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              La plateforme de référence pour apprendre à maîtriser l’algorithme TikTok, captiver une audience engagée et transformer vos vues en opportunités de monétisation pérennes.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-zinc-500">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Plateforme certifiante
              </span>
              <span>•</span>
              <span>Déployable sur Netlify</span>
            </div>
          </div>

          {/* Formations */}
          <div>
            <h4 className="text-zinc-100 font-semibold mb-4 text-sm tracking-wider uppercase text-xs">Formation</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/formation" className="hover:text-zinc-200 transition-colors">Programme 8 modules</Link>
              </li>
              <li>
                <Link to="/tarifs" className="hover:text-zinc-200 transition-colors">Tarifs & Offres</Link>
              </li>
              <li>
                <Link to="/ressources" className="hover:text-zinc-200 transition-colors">Bonus & Outils</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-zinc-200 transition-colors">Questions fréquentes</Link>
              </li>
            </ul>
          </div>

          {/* Espace & Liens */}
          <div>
            <h4 className="text-zinc-100 font-semibold mb-4 text-sm tracking-wider uppercase text-xs">Espace Membres</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/connexion" className="hover:text-zinc-200 transition-colors">Connexion élève</Link>
              </li>
              <li>
                <Link to="/inscription" className="hover:text-zinc-200 transition-colors">Créer un compte</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-zinc-200 transition-colors">Tableau de bord</Link>
              </li>
              <li>
                <Link to="/certificat" className="hover:text-zinc-200 transition-colors">Vérification certificat</Link>
              </li>
            </ul>
          </div>

          {/* Moyens de Paiement Sénégal & Légal */}
          <div>
            <h4 className="text-zinc-100 font-semibold mb-4 text-sm tracking-wider uppercase text-xs">Paiement Sécurisé</h4>
            <p className="text-xs text-zinc-400 mb-3">
              Moyens de paiement compatibles Afrique de l’Ouest & International :
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 font-medium">
                <Smartphone className="w-3 h-3 text-cyan-400" /> Wave
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 font-medium">
                <Smartphone className="w-3 h-3 text-orange-400" /> Orange Money
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 font-medium">
                <Smartphone className="w-3 h-3 text-emerald-400" /> Free Money
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 font-medium">
                <CreditCard className="w-3 h-3 text-indigo-400" /> Visa / Mastercard
              </span>
            </div>

            <h4 className="text-zinc-100 font-semibold mb-2 text-xs uppercase tracking-wider">Légal</h4>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
              <Link to="/mentions-legales" className="hover:text-zinc-200">Mentions Légales</Link>
              <Link to="/confidentialite" className="hover:text-zinc-200">Confidentialité</Link>
              <Link to="/conditions" className="hover:text-zinc-200">CGV / Conditions</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} TikTok Mastery. Tous droits réservés. Plateforme indépendante de formation.</p>
          <p className="flex items-center gap-1">
            Conçu pour les créateurs ambitieux d’Afrique et du monde francophone.
          </p>
        </div>
      </div>
    </footer>
  );
};
