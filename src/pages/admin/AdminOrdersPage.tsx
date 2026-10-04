import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import { Order, OrderStatus } from '../../types';
import { ShoppingBag, Search, CheckCircle2, Clock, XCircle, RefreshCw } from 'lucide-react';

export const AdminOrdersPage: React.FC = () => {
  const { orders, updateOrderStatus } = useCourse();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      o.userName.toLowerCase().includes(search.toLowerCase()) ||
      o.paymentReference.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Gestion des Commandes & Ventes
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Suivi des transactions Wave, Orange Money et Cartes Bancaires.
          </p>
        </div>

        <div className="text-xs text-zinc-400">
          Total : <strong className="text-white">{filteredOrders.length} commandes</strong>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par référence, email ou client..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none focus:border-rose-500"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          {['ALL', 'COMPLETED', 'PENDING', 'FAILED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                statusFilter === st
                  ? 'bg-rose-500 text-white'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {st === 'ALL' ? 'Toutes' : st === 'COMPLETED' ? 'Vérifiées' : st === 'PENDING' ? 'En attente' : 'Échouées'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-zinc-300">
            <thead className="bg-zinc-950/80 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-4 px-6">Réf & Client</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Formule</th>
                <th className="py-4 px-6">Montant</th>
                <th className="py-4 px-6">Moyen</th>
                <th className="py-4 px-6">Statut</th>
                <th className="py-4 px-6 text-right">Action Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-850">
              {filteredOrders.map((order) => {
                const formattedDate = new Date(order.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <tr key={order.id} className="hover:bg-zinc-850/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-white">{order.userName}</div>
                      <div className="text-zinc-500 text-xs">{order.userEmail}</div>
                      <div className="font-mono text-[10px] text-cyan-400/80 mt-0.5">{order.id}</div>
                    </td>
                    <td className="py-4 px-6 text-zinc-400">{formattedDate}</td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-zinc-800 text-rose-300 border border-zinc-700">
                        {order.plan}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold text-white">
                      {order.amount.toLocaleString('fr-FR')} FCFA
                    </td>
                    <td className="py-4 px-6 text-xs text-zinc-300">
                      {order.paymentMethod || 'WAVE'}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          order.status === 'COMPLETED'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : order.status === 'PENDING'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}
                      >
                        {order.status === 'COMPLETED' && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {order.status === 'PENDING' && <Clock className="w-3.5 h-3.5" />}
                        {order.status === 'FAILED' && <XCircle className="w-3.5 h-3.5" />}
                        <span>
                          {order.status === 'COMPLETED'
                            ? 'Vérifié'
                            : order.status === 'PENDING'
                            ? 'En attente'
                            : 'Échoué'}
                        </span>
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {order.status === 'PENDING' ? (
                        <button
                          onClick={() => handleStatusChange(order.id, 'COMPLETED')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs transition-colors"
                        >
                          Valider manuellement
                        </button>
                      ) : (
                        <span className="text-[11px] text-zinc-400 font-mono">
                          {order.paymentReference}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
