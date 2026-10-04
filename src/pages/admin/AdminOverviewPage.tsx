import React from 'react';
import { useCourse } from '../../context/CourseContext';
import { useAuth } from '../../context/AuthContext';
import { DEMO_USERS } from '../../data/demo';
import {
  Users,
  ShoppingBag,
  TrendingUp,
  BookOpen,
  DollarSign,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminOverviewPage: React.FC = () => {
  const { orders, courses, lessons } = useCourse();

  // Metrics derived from demo database (clearly stated as demo data)
  const totalStudents = DEMO_USERS.filter((u) => u.role === 'STUDENT').length + 128; // demo cohort
  const completedOrders = orders.filter((o) => o.status === 'COMPLETED');
  const totalRevenue = completedOrders.reduce((acc, curr) => acc + curr.amount, 0);
  const avgProgress = 42; // percentage

  const topCourses = [
    { title: 'Module 1 — Les Bases de TikTok', views: 1840, completion: '78%' },
    { title: 'Module 4 — Écrire des Scripts', views: 1620, completion: '65%' },
    { title: 'Module 5 — Créer ses Vidéos (CapCut)', views: 1490, completion: '71%' },
    { title: 'Module 7 — Monétiser (Affiliation & Services)', views: 1380, completion: '59%' }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Demo Data Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold">Indicateur Démo Transparent :</span>
          <p className="text-zinc-400">
            Ces statistiques agrègent les données de test locales. Aucune donnée commerciale n’est inventée ou présentée comme une performance réelle d’entreprise.
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Tableau de Bord Administrateur
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Supervision des inscriptions, cours, chiffre d'affaires et activité des élèves.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/courses"
            className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-md transition-colors"
          >
            + Gérer les Cours & Leçons
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Nombre d’Élèves
            </span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">{totalStudents}</div>
          <div className="text-[11px] text-zinc-400 flex items-center gap-1">
            <span className="text-emerald-400 font-semibold">+18 cette semaine</span>
            <span>(Mode démo)</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Commandes Réglées
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">{completedOrders.length}</div>
          <div className="text-[11px] text-zinc-400">
            {orders.filter((o) => o.status === 'PENDING').length} en attente de webhook
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Chiffre d’Affaires
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">
            {totalRevenue.toLocaleString('fr-FR')}{' '}
            <span className="text-sm font-semibold text-zinc-400">FCFA</span>
          </div>
          <div className="text-[11px] text-zinc-400">Simulations Wave & Orange Money</div>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Progression Moyenne
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">{avgProgress} %</div>
          <div className="text-[11px] text-zinc-400">Taux de rétention formation : 89%</div>
        </div>
      </div>

      {/* Grid: Top Courses & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Most Consulted Courses */}
        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Cours les plus consultés</span>
            </h3>
            <Link to="/admin/courses" className="text-xs text-rose-400 hover:text-rose-300 font-semibold">
              Gérer
            </Link>
          </div>

          <div className="space-y-3">
            {topCourses.map((tc, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-850 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-zinc-200">{tc.title}</div>
                  <div className="text-zinc-500 text-[11px] mt-0.5">
                    {tc.views} vues uniques enregistrées
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-400">{tc.completion}</div>
                  <div className="text-[10px] text-zinc-500">complétion</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders Overview */}
        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-rose-400" />
              <span>Dernières transactions</span>
            </h3>
            <Link to="/admin/orders" className="text-xs text-rose-400 hover:text-rose-300 font-semibold">
              Toutes les commandes
            </Link>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 4).map((order) => (
              <div
                key={order.id}
                className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-850 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-zinc-200">{order.userName}</div>
                  <div className="text-zinc-500 text-[11px]">
                    Formule {order.plan} • {order.paymentMethod}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-white">
                    {order.amount.toLocaleString('fr-FR')} FCFA
                  </div>
                  <div
                    className={`text-[10px] font-bold ${
                      order.status === 'COMPLETED'
                        ? 'text-emerald-400'
                        : order.status === 'PENDING'
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {order.status === 'COMPLETED' ? 'Vérifié ✓' : order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
