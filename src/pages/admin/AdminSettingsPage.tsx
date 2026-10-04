import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  CreditCard,
  Database,
  Cloud,
  CheckCircle2,
  Copy,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const netlifyFunctions = [
    {
      name: 'create-order',
      route: '/.netlify/functions/create-order',
      description: 'Initialisation sécurisée d’une transaction côté serveur et communication PayTech'
    },
    {
      name: 'verify-payment',
      route: '/.netlify/functions/verify-payment',
      description: 'Contrôle officiel du statut bancaire de la commande'
    },
    {
      name: 'paytech-webhook',
      route: '/.netlify/functions/paytech-webhook',
      description: 'Réception des notifications IPN et déblocage automatique des accès de l’élève'
    }
  ];

  const envVariables = [
    { key: 'PAYMENT_API_KEY', example: 'paytech_live_key_...', desc: 'Clé API publique ou compte PayTech' },
    { key: 'PAYMENT_SECRET', example: 'paytech_sec_991827...', desc: 'Clé secrète serveur (JAMAIS dans le frontend)' },
    { key: 'PAYMENT_ENVIRONMENT', example: 'test | prod', desc: 'Bascule entre sandbox et paiements réels' },
    { key: 'DATABASE_URL', example: 'postgresql://...', desc: 'Connexion base PostgreSQL (Supabase / Neon)' },
    { key: 'JWT_SECRET', example: 'ultra_secret_random_token', desc: 'Signature cryptographique des sessions' }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="pb-6 border-b border-zinc-800">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Paramètres & Architecture d'Intégration
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Configuration des passerelles de paiement, variables d'environnement Netlify et schémas de base de données.
        </p>
      </div>

      {/* 1. Payment Gateway Configuration Status */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Passerelle de Paiement Sénégal (PayTech / Mobile Money)</h3>
              <p className="text-xs text-zinc-400">Architecture serveur conforme aux exigences de sécurité</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 font-bold text-xs border border-amber-500/20">
            Mode Sandbox Démo Actif
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-850 space-y-2">
            <div className="font-bold text-zinc-200">Statut de la passerelle :</div>
            <p className="text-zinc-400 leading-relaxed">
              Le frontend n'embarque aucune clé secrète. Toutes les créations et confirmations de paiement sont déléguées aux <strong>Netlify Functions</strong>.
            </p>
            <div className="pt-2 flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Endpoints serveur prêts pour production</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-850 space-y-2">
            <div className="font-bold text-zinc-200">Où injecter vos clés réelles ?</div>
            <p className="text-zinc-400 leading-relaxed">
              Dans votre tableau de bord Netlify : <br />
              <code className="text-rose-400">Site Settings &gt; Environment variables</code>.
              Ne commitez jamais de secrets dans Git.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Netlify Serverless Functions Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Netlify Functions (Backend Serverless)</h3>
            <p className="text-xs text-zinc-400">Routes d'API déployées automatiquement via <code>netlify.toml</code></p>
          </div>
        </div>

        <div className="space-y-3">
          {netlifyFunctions.map((fn) => (
            <div
              key={fn.name}
              className="p-4 rounded-2xl bg-zinc-950 border border-zinc-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white font-mono">{fn.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-cyan-400 font-mono border border-zinc-800">
                    {fn.route}
                  </span>
                </div>
                <p className="text-zinc-400">{fn.description}</p>
              </div>

              <button
                onClick={() => copyToClipboard(fn.route, fn.name)}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto border border-zinc-800"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied === fn.name ? 'Copié !' : 'Copier route'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Environment Variables Reference */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-zinc-800">
          <Settings className="w-4 h-4 text-amber-400" />
          <span>Variables d'Environnement Documentées (.env)</span>
        </h3>

        <div className="divide-y divide-zinc-850 text-xs">
          {envVariables.map((v) => (
            <div key={v.key} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-mono font-bold text-rose-300">{v.key}</span>
                <p className="text-zinc-500 text-[11px] mt-0.5">{v.desc}</p>
              </div>
              <code className="text-zinc-400 bg-zinc-950 px-2 py-1 rounded border border-zinc-850 font-mono text-[11px]">
                {v.example}
              </code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
