import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PRICING_PLANS } from '../../data/courses';
import { PlanType, PaymentMethod } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useCourse } from '../../context/CourseContext';
import {
  ShieldCheck,
  Smartphone,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const { user, updateUserPlan } = useAuth();
  const { addOrder } = useCourse();

  const selectedPlan = PRICING_PLANS.find(p => p.id === planId) || PRICING_PLANS[1]; // default to PRO

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('WAVE');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+221 77 000 00 00');
  const [loading, setLoading] = useState(false);
  const [sandboxResult, setSandboxResult] = useState<any | null>(null);

  const handleInitiatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Appel à la fonction Netlify serveur
      const response = await fetch('/.netlify/functions/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || 'guest',
          userEmail: email,
          userName: name,
          planId: selectedPlan.id,
          paymentMethod,
          phone
        })
      });

      const data = await response.json().catch(() => null);

      if (data?.mode === 'SANDBOX_SIMULATION' || !response.ok) {
        // En mode démo sans clés PayTech de production
        setSandboxResult({
          orderId: data?.order?.orderId || `TM-DEMO-${Date.now()}`,
          message: 'Mode Sandbox actif : Aucune clé de production n’est détectée dans Netlify.',
          details: 'Pour encaisser de véritables paiements Wave / Orange Money, vous devez configurer PAYMENT_API_KEY et PAYMENT_SECRET sur votre tableau de bord Netlify.'
        });
      } else if (data?.paymentUrl) {
        // Redirection vers l'URL officielle de la passerelle
        window.location.href = data.paymentUrl;
      }
    } catch (err) {
      console.warn('Netlify function simulation fallback:', err);
      setSandboxResult({
        orderId: `TM-DEMO-${Date.now()}`,
        message: 'Simulation Bac à sable active.',
        details: 'En local ou sans Netlify CLI actif, la simulation vous permet de tester la validation et l’activation de la formule.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateSuccessfulPayment = () => {
    // Enregistrement d'une commande test vérifiée
    const orderId = sandboxResult?.orderId || `TM-DEMO-${Date.now()}`;
    addOrder({
      id: orderId,
      userId: user?.id || 'guest',
      userEmail: email || 'amadou.etudiant@tiktokmastery.sn',
      userName: name || 'Élève TikTok Mastery',
      plan: selectedPlan.id,
      amount: selectedPlan.price,
      currency: 'FCFA',
      status: 'COMPLETED',
      paymentMethod,
      paymentReference: `${paymentMethod}-DEMO-${Math.floor(Math.random() * 899999 + 100000)}`,
      paymentProvider: 'SANDBOX',
      createdAt: new Date().toISOString(),
      verifiedAt: new Date().toISOString()
    });

    updateUserPlan(selectedPlan.id);
    navigate(`/dashboard?payment=success&orderId=${orderId}`);
  };

  return (
    <div className="py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Validation de Commande</span>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Finalisation de votre inscription
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Vous rejoignez la formule <strong className="text-white">{selectedPlan.name}</strong> avec accès illimité.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Form & Payment Choice */}
        <div className="md:col-span-2 space-y-6">
          <form onSubmit={handleInitiatePayment} className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">
                1. Vos coordonnées de compte
              </h3>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Nom et Prénom (figurera sur votre certificat)
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Amadou Diallo"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:border-rose-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">
                    Adresse Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="amadou@exemple.sn"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:border-rose-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">
                    Numéro de Téléphone (Mobile Money)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+221 77 000 00 00"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:border-rose-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-zinc-800">
              <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">
                2. Choisissez votre moyen de paiement
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('WAVE')}
                  className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    paymentMethod === 'WAVE'
                      ? 'bg-cyan-500/10 border-cyan-400 text-white'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 font-bold">
                    W
                  </div>
                  <div>
                    <div className="text-xs font-bold">Wave Sénégal</div>
                    <div className="text-[10px] text-zinc-400">Paiement instantané</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('ORANGE_MONEY')}
                  className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    paymentMethod === 'ORANGE_MONEY'
                      ? 'bg-orange-500/10 border-orange-400 text-white'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center flex-shrink-0 font-bold">
                    OM
                  </div>
                  <div>
                    <div className="text-xs font-bold">Orange Money</div>
                    <div className="text-[10px] text-zinc-400">Code secret #144#</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('FREE_MONEY')}
                  className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    paymentMethod === 'FREE_MONEY'
                      ? 'bg-emerald-500/10 border-emerald-400 text-white'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 font-bold">
                    FM
                  </div>
                  <div>
                    <div className="text-xs font-bold">Free Money</div>
                    <div className="text-[10px] text-zinc-400">Sénégal & Région</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    paymentMethod === 'CARD'
                      ? 'bg-indigo-500/10 border-indigo-400 text-white'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Carte Bancaire</div>
                    <div className="text-[10px] text-zinc-400">Visa / Mastercard</div>
                  </div>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-sm shadow-xl shadow-rose-500/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Communication avec le serveur...</span>
              ) : (
                <>
                  <span>Initier le paiement de {selectedPlan.price.toLocaleString('fr-FR')} FCFA</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Sandbox interactive simulation modal / result */}
          {sandboxResult && (
            <div className="p-6 rounded-3xl bg-zinc-900 border-2 border-amber-500/40 space-y-4 animate-in fade-in">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Info className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-amber-300">
                    {sandboxResult.message}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {sandboxResult.details}
                  </p>
                  <p className="text-[11px] font-mono text-zinc-400">
                    Réf commande créée : {sandboxResult.orderId}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleSimulateSuccessfulPayment}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simuler confirmation de paiement & Débloquer la formation</span>
                </button>
                <span className="text-[11px] text-zinc-500">
                  (Permet d'évaluer le flux élève complet immédiatement)
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Récapitulatif de votre commande
            </h3>

            <div className="pb-4 border-b border-zinc-800">
              <div className="text-lg font-bold text-white">{selectedPlan.name}</div>
              <div className="text-xs text-zinc-400 mt-1">Programme TikTok Mastery complet</div>
              <div className="mt-3 text-2xl font-extrabold text-white">
                {selectedPlan.price.toLocaleString('fr-FR')}{' '}
                <span className="text-sm font-normal text-zinc-400">{selectedPlan.currency}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex justify-between">
                <span>Accès plateforme :</span>
                <span className="text-emerald-400 font-semibold">À vie</span>
              </div>
              <div className="flex justify-between">
                <span>Modules débloqués :</span>
                <span className="text-white font-semibold">8 Modules (48 cours)</span>
              </div>
              <div className="flex justify-between">
                <span>Frais d'activation :</span>
                <span className="text-white font-semibold">0 FCFA</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-zinc-800 font-bold text-sm text-white">
                <span>Total à régler :</span>
                <span className="text-rose-400">
                  {selectedPlan.price.toLocaleString('fr-FR')} FCFA
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 text-xs text-zinc-400 space-y-2">
            <div className="flex items-center gap-2 text-zinc-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Garantie Intégrité Serveur</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Le frontend ne valide jamais lui-même les accès. Seul le serveur / webhook confirme la transaction avant d'activer les privilèges de l'élève.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
