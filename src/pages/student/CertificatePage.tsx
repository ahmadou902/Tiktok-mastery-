import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/common/Logo';
import {
  Award,
  Download,
  Printer,
  CheckCircle2,
  Sparkles,
  Lock,
  Share2,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const CertificatePage: React.FC = () => {
  const { getTotalProgress, getCertificate, claimCertificate } = useCourse();
  const { user } = useAuth();
  const { percentage, completed, total } = getTotalProgress();

  const [forceUnlocked, setForceUnlocked] = useState(false);
  const certificate = getCertificate();

  const isEligible = percentage >= 100 || forceUnlocked;

  const handlePrint = () => {
    window.print();
  };

  const handleClaim = () => {
    claimCertificate();
  };

  const formattedDate = certificate
    ? new Date(certificate.issuedAt).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

  return (
    <div className="space-y-8 pb-16">
      {/* Non-print Header & Controls */}
      <div className="print:hidden space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Certificat Officiel de Réussite
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Validation officielle de vos compétences en création et monétisation TikTok.
            </p>
          </div>

          {isEligible && (
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold flex items-center gap-2 border border-zinc-700 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimer / Exporter PDF</span>
              </button>
            </div>
          )}
        </div>

        {/* Progress condition card */}
        {!isEligible && (
          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-3 text-amber-400 font-bold text-sm">
              <Lock className="w-5 h-5" />
              <span>Certificat Verrouillé (Progression actuelle : {percentage}%)</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">
              Pour débloquer votre diplôme officiel, vous devez terminer les 8 modules de formation ({completed}/{total} leçons complétées).
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/cours"
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold"
              >
                Poursuivre mes cours
              </Link>
              <button
                type="button"
                onClick={() => {
                  setForceUnlocked(true);
                  claimCertificate();
                }}
                className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-cyan-400 text-xs font-semibold border border-zinc-700"
              >
                ⚡ Débloquer en Mode Test (Démo) pour prévisualiser
              </button>
            </div>
          </div>
        )}

        {isEligible && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
            <span>
              <strong>Félicitations !</strong> Votre certificat est officiellement émis et vérifiable dans le registre TikTok Mastery.
            </span>
          </div>
        )}
      </div>

      {/* Printable Certificate Canvas */}
      <div className="max-w-4xl mx-auto">
        <div
          id="certificate-print-area"
          className="relative bg-zinc-900 border-8 border-double border-zinc-700 rounded-3xl p-8 sm:p-14 text-center space-y-8 shadow-2xl overflow-hidden print:bg-white print:text-black print:border-black print:shadow-none print:m-0 print:p-8"
        >
          {/* Subtle watermark & glow */}
          <div className="absolute inset-0 bg-radial from-rose-500/5 via-cyan-500/5 to-transparent pointer-events-none print:hidden" />

          {/* Top Brand & Crest */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-zinc-950 border border-zinc-700 flex items-center justify-center font-bold text-rose-500 shadow-inner">
                TM
              </div>
              <span className="text-xl font-black tracking-tight text-white print:text-black">
                TikTok Mastery
              </span>
            </div>
            <div className="text-[11px] uppercase tracking-widest text-zinc-400 font-semibold print:text-zinc-600">
              ACADÉMIE PROFESSIONNELLE DES MÉDIAS DIGITAUX
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2 pt-4">
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-rose-500 to-transparent mx-auto print:bg-black" />
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 print:text-black font-serif">
              Certificat de Réussite
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-rose-500 to-transparent mx-auto print:bg-black" />
          </div>

          {/* Presentation copy */}
          <div className="space-y-3 max-w-xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-zinc-400 print:text-zinc-600">
              Le présent certificat atteste avec distinction que :
            </p>
            <div className="text-2xl sm:text-4xl font-extrabold text-white print:text-black font-serif border-b border-zinc-700 print:border-black pb-2 mx-auto inline-block px-8">
              {certificate?.studentName || user?.name || 'Amadou Diallo'}
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 print:text-zinc-700 leading-relaxed pt-2">
              a suivi avec succès l’intégralité des 8 modules et validé les évaluations du programme certifiant de l’Académie :
            </p>
            <div className="text-lg font-bold text-rose-400 print:text-black">
              Formation TikTok Mastery — Création de Contenu, Algorithme & Monétisation
            </div>
          </div>

          {/* Signatures & Seal Grid */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end border-t border-zinc-800 print:border-black text-xs">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Date de délivrance</div>
              <div className="font-semibold text-zinc-200 print:text-black">{formattedDate}</div>
              <div className="text-[10px] text-zinc-500">Dakar, Sénégal</div>
            </div>

            {/* Gold Seal Graphic */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-amber-400/80 bg-amber-500/10 flex items-center justify-center shadow-lg shadow-amber-500/10">
                <Award className="w-8 h-8 text-amber-400 print:text-black" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-amber-400/80 print:text-black mt-1">
                SCEAU D’AUTHENTICITÉ
              </span>
            </div>

            <div className="space-y-1 text-center sm:text-right">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Identifiant Unique</div>
              <div className="font-mono text-zinc-300 print:text-black font-bold text-[11px]">
                {certificate?.certificateNumber || 'TM-2026-SN-0042'}
              </div>
              <div className="text-[9px] font-mono text-zinc-500 print:text-zinc-600 truncate max-w-[180px] mx-auto sm:ml-auto">
                Hash: {certificate?.verificationHash || '9a8f4c7e2b1d609a'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
