import React from 'react';
import { PRICING_PLANS } from '../../data/courses';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export const TarifsPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Tarification Claire & Transparente</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Investissez dans vos compétences créateur
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Paiement unique sans abonnement récurrent. Accès permanent à vos cours et aux mises à jour.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
        {PRICING_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-3xl p-8 flex flex-col justify-between transition-all relative ${
              plan.isPopular
                ? 'bg-zinc-900 border-2 border-rose-500 shadow-2xl shadow-rose-500/10 scale-105 z-10'
                : 'bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700'
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-md">
                LE PLUS POPULAIRE
              </div>
            )}

            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
                {plan.badge && !plan.isPopular && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                    {plan.badge}
                  </span>
                )}
              </div>

              <p className="text-xs text-zinc-400 mt-2 min-h-[36px]">{plan.description}</p>

              <div className="mt-6 mb-8 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-white">
                  {plan.price.toLocaleString('fr-FR')}
                </span>
                <span className="text-zinc-400 font-semibold text-base">{plan.currency}</span>
                <span className="text-xs text-zinc-400 ml-1">/ accès à vie</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-zinc-800">
                <p className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Ce qui est inclus :</p>
                {plan.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
                {plan.notIncluded && plan.notIncluded.length > 0 && (
                  <div className="pt-2 space-y-2">
                    {plan.notIncluded.map((notFeat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-400 line-through">
                        <X className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0 mt-0.5" />
                        <span>{notFeat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800 space-y-2">
              <Link
                to={`/commander/${plan.id}`}
                className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  plan.isPopular
                    ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                }`}
              >
                <span>{plan.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-[11px] text-center text-zinc-400">
                Paiement Wave, Orange Money ou Carte
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security & Guarantee Banner */}
      <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white">Validation serveur sécurisée</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Aucun paiement n’est validé sans confirmation officielle de la passerelle de paiement. Vos accès sont activés automatiquement dès la réception du reçu transactionnel.
          </p>
        </div>
      </div>
    </div>
  );
};
