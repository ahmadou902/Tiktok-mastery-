import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { COURSES, PRICING_PLANS } from '../../data/courses';
import { BONUS_RESOURCES } from '../../data/resources';
import {
  ArrowRight,
  Play,
  CheckCircle2,
  Sparkles,
  Zap,
  TrendingUp,
  Award,
  Video,
  ChevronDown,
  ShieldCheck,
  Check,
  X,
  Target,
  Users,
  Compass,
  Laptop
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const problems = [
    {
      title: 'Bloqué au palier fatal des 200 vues',
      desc: 'Vous passez des heures à tourner et monter, mais l’algorithme plafonne vos vidéos sans explication.'
    },
    {
      title: 'Le syndrome de la page blanche',
      desc: 'Vous ne savez jamais quoi poster, vous perdez du temps à chercher des idées à la dernière minute.'
    },
    {
      title: 'Gêne devant la caméra & son médiocre',
      desc: 'Peur du regard des autres, hésitations, montage trop lent qui fait fuir le spectateur dès la 2e seconde.'
    },
    {
      title: '0 franc généré malgré les efforts',
      desc: 'Avoir des vues ne suffit pas : sans stratégie de conversion et d’offre, vous travaillez gratuitement.'
    }
  ];

  const solutions = [
    {
      icon: Target,
      title: 'Algorithme & Métriques Clés',
      desc: 'Comprenez exactement comment le flux FYP classe vos vidéos et comment maximiser le watch time.'
    },
    {
      icon: Zap,
      title: 'Hooks & Scripts Hypnotiques',
      desc: 'Des structures prêtes à l’emploi pour accrocher le cerveau en 2 secondes et scotcher jusqu’au bout.'
    },
    {
      icon: Video,
      title: 'Production Rapide & CapCut Pro',
      desc: 'Filmez avec votre téléphone, montez en 20 minutes et intégrez des sous-titres et sound effects dynamiques.'
    },
    {
      icon: TrendingUp,
      title: 'Business & Monétisation Réelle',
      desc: 'Monétisez via affiliation, vente de services et produits digitaux dès vos 1 000 premiers abonnés.'
    }
  ];

  const faqs = [
    {
      q: 'Ai-je besoin de matériel professionnel coûteux ?',
      a: 'Absolument pas ! 95% des créateurs viraux débutent avec leur simple smartphone. Nous vous montrons comment optimiser la lumière naturelle, nettoyer votre lentille et régler un son limpide pour moins de 15 000 FCFA.'
    },
    {
      q: 'Dois-je obligatoirement montrer mon visage ?',
      a: 'Non. Le Module 5 contient une leçon entière dédiée aux chaînes "Faceless" (sans visage) : banques de vidéos B-roll, voix off et animations captivantes qui génèrent des millions de vues.'
    },
    {
      q: 'Comment s’effectue le paiement en Afrique de l’Ouest ?',
      a: 'La plateforme est conçue pour supporter les moyens de paiement les plus populaires : Wave, Orange Money, Free Money et Carte Bancaire. Dès la validation serveur de votre paiement, vos accès sont immédiatement débloqués.'
    },
    {
      q: 'Combien de temps ai-je accès à la formation ?',
      a: 'L’accès est garanti à vie avec toutes les mises à jour futures des modules incluses, sans aucun abonnement récurrent.'
    },
    {
      q: 'Y a-t-il un certificat délivré à la fin ?',
      a: 'Oui ! Pour les offres PRO et PREMIUM, une fois tous les modules et quiz validés avec succès, un certificat numérique officiel avec numéro d’authentification unique est généré dans votre espace.'
    }
  ];

  return (
    <div className="space-y-24 sm:space-y-32 py-10 sm:py-16 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6 pb-12">
        {/* Glow ambient background effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-rose-500/20 via-cyan-500/15 to-transparent blur-[120px] pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 mb-8 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="font-semibold text-white">Programme 2026</span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-400">8 Modules & 48 Leçons Vidéo</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
          Passez de spectateur à{' '}
          <span className="bg-gradient-to-r from-rose-500 via-rose-400 to-cyan-400 bg-clip-text text-transparent">
            créateur TikTok.
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
          Apprenez à trouver des idées, créer des vidéos captivantes, comprendre TikTok et construire une audience que vous pouvez monétiser.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/tarifs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-base shadow-xl shadow-rose-500/25 transition-all hover:scale-[1.02] active:scale-95"
          >
            <span>Commencer la formation</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/formation"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-zinc-900/90 hover:bg-zinc-850 text-zinc-200 font-semibold text-base border border-zinc-800 transition-all hover:border-zinc-700"
          >
            <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            <span>Découvrir le programme</span>
          </Link>
        </div>

        {/* Key proof indicators */}
        <div className="mt-14 pt-8 border-t border-zinc-900/90 flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-xs sm:text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>8 Modules ultra-pratiques</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>7 Packs bonus inclus</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Certificat officiel vérifiable</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Accès illimité à vie</span>
          </div>
        </div>
      </section>

      {/* 2. PROBLÈME */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Le Constat</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Pourquoi 90% des créateurs abandonnent après 3 semaines ?
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base">
            Publier au hasard en espérant un coup de chance n'est pas une stratégie. Voici ce qui bloque les débutants :
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((prob, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-rose-900/40 transition-colors relative overflow-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4 font-bold text-sm">
                0{idx + 1}
              </div>
              <h3 className="text-base font-semibold text-zinc-100 mb-2">{prob.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{prob.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SOLUTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 p-8 sm:p-12 lg:p-16">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">La Solution TikTok Mastery</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
              Un système étape par étape pour bâtir une audience rentable
            </h2>
            <p className="mt-3 text-zinc-400 text-sm sm:text-base">
              Fini l’improvisation. Apprenez le framework exact utilisé par les meilleurs créateurs pour produire vite, plaire à l’algorithme et monétiser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((sol, idx) => {
              const Icon = sol.icon;
              return (
                <div key={idx} className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-cyan-400 shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100">{sol.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{sol.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CE QUE L'ÉLÈVE VA APPRENDRE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Compétences Clés</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
              Ce que vous saurez faire dès la fin de votre formation
            </h2>
            <div className="space-y-4">
              {[
                'Comprendre l’algorithme TikTok et déclencher la distribution par cohortes',
                'Créer une banque inépuisable de 30 idées de vidéos en moins de 45 minutes',
                'Écrire des accroches (hooks) qui stoppent le scroll en moins de 2 secondes',
                'Monter des vidéos ultra-dynamiques avec CapCut sans compétences techniques préalables',
                'Exploiter l’intelligence artificielle (Gemini, ChatGPT) pour multiplier votre vitesse de création par 5',
                'Mettre en place 5 sources de monétisation : affiliation, services, coaching et produits digitaux'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm sm:text-base text-zinc-300 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                to="/formation"
                className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 font-semibold text-sm group"
              >
                <span>Consulter la liste complète des 48 leçons</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="relative p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs text-zinc-500 font-mono">tiktok_mastery_os.sh</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 font-mono text-xs space-y-2 text-zinc-400">
                <p className="text-cyan-400">▶ ANALYSE DU PROTOCOLE DE PUBLICATION...</p>
                <p>✓ Hook visuel testé : Retargeting attention &lt; 1.8s</p>
                <p>✓ Rétention estimée : +68% complétion</p>
                <p>✓ Indexation SEO TikTok : 3 mots-clés de niche intégrés</p>
                <p className="text-emerald-400">✓ Statut : Prêt pour distribution algorithmique maximale</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-850/60 border border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-zinc-400">Taux de rétention cible</div>
                  <div className="text-2xl font-extrabold text-white mt-0.5">84.2 %</div>
                </div>
                <div className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                  Performance Virale
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROGRAMME DE FORMATION (8 Modules) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Programme Pédagogique</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            8 Modules complets pour transformer votre présence TikTok
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base">
            Une progression méthodique sans jargon inutile. Chaque module contient des actions concrètes à exécuter immédiatement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSES.map((course) => (
            <div
              key={course.id}
              className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-zinc-800 text-cyan-400 border border-zinc-700">
                    MODULE 0{course.order}
                  </span>
                  <span className="text-[11px] text-zinc-400">{course.duration}</span>
                </div>
                <h3 className="text-base font-bold text-zinc-100 group-hover:text-rose-400 transition-colors">
                  {course.title.replace(`MODULE ${course.order} — `, '')}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                <span className="text-zinc-500 font-medium">Inclus dans toutes les offres</span>
                <Link to="/formation" className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1">
                  <span>Détail</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. APERÇU DE L'ESPACE ÉLÈVE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Expérience Apprentissage</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Un espace privé conçu pour votre productivité
              </h2>
              <p className="text-zinc-400 text-sm mt-2 max-w-xl">
                Suivi précis de votre progression en temps réel, lecteurs vidéo haute définition, quiz interactifs et accès instantané à vos fiches résumées.
              </p>
            </div>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-all border border-zinc-700 self-start md:self-auto"
            >
              <Laptop className="w-4 h-4 text-cyan-400" />
              <span>Tester l'interface élève en direct</span>
            </Link>
          </div>

          {/* Interactive preview mock card */}
          <div className="rounded-2xl bg-zinc-950 border border-zinc-800/90 p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-800">
              <div>
                <div className="text-xs text-zinc-400">Dernière leçon consultée</div>
                <div className="text-base font-bold text-white mt-0.5">3. Transformer une tendance à son avantage</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-400">Progression globale :</span>
                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 font-bold text-xs border border-rose-500/30">
                  37 % — 18/48 terminées
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="text-xs text-zinc-400">Temps de formation</div>
                <div className="text-xl font-bold text-zinc-100 mt-1">11h 45m</div>
                <div className="text-[11px] text-zinc-400 mt-1">Rythme recommandé : 30min / jour</div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="text-xs text-zinc-400">Quiz réussis</div>
                <div className="text-xl font-bold text-emerald-400 mt-1">4 / 4 validés</div>
                <div className="text-[11px] text-zinc-400 mt-1">Score moyen : 92%</div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="text-xs text-zinc-400">Statut du Certificat</div>
                <div className="text-xl font-bold text-amber-400 mt-1">En cours d'acquisition</div>
                <div className="text-[11px] text-zinc-400 mt-1">Débloqué à 100% de complétion</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BONUS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Boîte à Outils Créateur</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Les 7 Bonus exclusifs inclus
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base">
            Téléchargeables immédiatement dans votre espace élève pour accélérer vos tournages et vos résultats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BONUS_RESOURCES.map((res) => (
            <div
              key={res.id}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-rose-400 border border-zinc-700 uppercase">
                    {res.fileFormat}
                  </span>
                  <span className="text-[11px] text-zinc-400">Dispo : {res.minPlan}</span>
                </div>
                <h3 className="text-base font-bold text-zinc-100">{res.title}</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{res.description}</p>
              </div>

              <div className="mt-6 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-medium">✓ Téléchargeable</span>
                <Link to="/ressources" className="text-xs text-zinc-300 hover:text-white font-semibold">
                  Aperçu
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. POUR QUI EST LA FORMATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Public Cible</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            À qui s’adresse TikTok Mastery ?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Débutants Complets',
              desc: 'Vous partez de zéro, vous n’avez jamais posté ou vous ne comprenez pas comment fonctionne l’algorithme.'
            },
            {
              title: 'Créateurs Bloqués',
              desc: 'Vous postez déjà mais stagnez à 200 vues et ne parvenez pas à convertir vos abonnés en acheteurs.'
            },
            {
              title: 'Entrepreneurs & E-commerçants',
              desc: 'Vous souhaitez acquérir des clients qualifiés gratuitement sans dépenser des fortunes en publicité.'
            },
            {
              title: 'Freelances & Coachs',
              desc: 'Vous voulez asseoir votre autorité professionnelle et recevoir des demandes de devis qualifiées chaque semaine.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 text-rose-400 flex items-center justify-center font-bold text-sm">
                ✓
              </div>
              <h3 className="text-base font-bold text-white pt-2">{item.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. RÉSULTATS ATTENDUS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Objectif 30 Jours</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ce que vous pouvez concrètement attendre en appliquant la méthode
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            En suivant la formation et en publiant avec le plan 30 jours, vous aurez un compte optimisé, vos premières vidéos virales, une habitude de création sans stress et vos premiers tunnels de monétisation prêts à encaisser.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-8 text-sm font-semibold text-zinc-200">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Clarté totale sur votre niche
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Fin de la peur de la caméra
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Première monétisation mise en place
            </span>
          </div>
        </div>
      </section>

      {/* 10. TARIFS */}
      <section id="tarifs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Investissement</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Choisissez l’offre adaptée à vos ambitions
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base">
            Tarifs transparents en FCFA. Paiement unique sans frais cachés avec accès permanent.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
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
                  Le Plus Populaire
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  {plan.badge && !plan.isPopular && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
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
                  <p className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Inclus dans la formule :</p>
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

              <div className="mt-8 pt-6 border-t border-zinc-800">
                <Link
                  to={`/commander/${plan.id}`}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    plan.isPopular
                      ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20 active:scale-95'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-[11px] text-center text-zinc-400 mt-2">
                  Moyens acceptés : Wave, Orange Money, Free Money, Carte
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Questions Fréquentes</span>
          <h2 className="text-3xl font-bold text-white mt-2">Tout ce que vous devez savoir</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="rounded-2xl bg-zinc-900/70 border border-zinc-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-zinc-100 hover:text-white"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform ${
                      isOpen ? 'rotate-180 text-rose-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed border-t border-zinc-850 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 12. FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-rose-950/60 via-zinc-900 to-cyan-950/40 border border-zinc-800 p-8 sm:p-14 text-center overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Prêt à faire décoller votre compte TikTok ?
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Rejoignez les créateurs qui appliquent une méthode scientifique et commencez votre apprentissage dès maintenant.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/tarifs"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-base shadow-xl shadow-rose-500/25 transition-all active:scale-95"
              >
                Commencer en offre PRO (14 900 FCFA)
              </Link>
              <Link
                to="/connexion"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-sm font-semibold border border-zinc-800"
              >
                Déjà inscrit ? Me connecter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
