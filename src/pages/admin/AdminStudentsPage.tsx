import React, { useState } from 'react';
import { DEMO_USERS } from '../../data/demo';
import { useCourse } from '../../context/CourseContext';
import { Search, Filter, Mail, Award, CheckCircle2 } from 'lucide-react';

export const AdminStudentsPage: React.FC = () => {
  const { completedLessons, lessons } = useCourse();
  const [search, setSearch] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<string>('ALL');

  // Simulated extended student list based on DEMO_USERS
  const students = [
    ...DEMO_USERS.filter((u) => u.role === 'STUDENT'),
    {
      id: 'st-3',
      name: 'Ibrahima Ba',
      email: 'ibrahima.ba@gmail.com',
      role: 'STUDENT' as const,
      plan: 'PREMIUM' as const,
      createdAt: '2026-03-05T09:12:00Z',
      phone: '+221 77 555 44 33',
      country: 'Sénégal'
    },
    {
      id: 'st-4',
      name: 'Mariama Camara',
      email: 'mariama.camara@outlook.com',
      role: 'STUDENT' as const,
      plan: 'PRO' as const,
      createdAt: '2026-03-08T17:40:00Z',
      phone: '+221 76 222 11 00',
      country: 'Sénégal'
    },
    {
      id: 'st-5',
      name: 'Ousmane Traoré',
      email: 'ousmane.traore@yahoo.fr',
      role: 'STUDENT' as const,
      plan: 'STARTER' as const,
      createdAt: '2026-03-12T11:20:00Z',
      phone: '+223 66 12 34 56',
      country: 'Mali'
    }
  ];

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchesPlan = selectedPlan === 'ALL' || s.plan === selectedPlan;
    return matchesSearch && matchesPlan;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Gestion des Élèves
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Consultez les inscrits, leur formule, leur progression et leur statut d'apprentissage.
          </p>
        </div>

        <div className="text-xs text-zinc-400">
          Total : <strong className="text-white">{filteredStudents.length} élèves</strong>
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
            placeholder="Rechercher par nom ou email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none focus:border-rose-500"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          {['ALL', 'STARTER', 'PRO', 'PREMIUM'].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPlan(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedPlan === p
                  ? 'bg-rose-500 text-white'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {p === 'ALL' ? 'Tous' : p}
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
                <th className="py-4 px-6">Élève</th>
                <th className="py-4 px-6">Date Inscription</th>
                <th className="py-4 px-6">Offre</th>
                <th className="py-4 px-6">Progression</th>
                <th className="py-4 px-6">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-850">
              {filteredStudents.map((st, idx) => {
                // Determine simulated progress based on student
                const progressPct =
                  st.id === 'demo-student-1'
                    ? Math.round((completedLessons.length / lessons.length) * 100)
                    : (idx * 27 + 15) % 100;

                const formattedDate = new Date(st.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                });

                return (
                  <tr key={st.id} className="hover:bg-zinc-850/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-white">{st.name}</div>
                      <div className="text-zinc-500 text-xs mt-0.5">{st.email}</div>
                    </td>
                    <td className="py-4 px-6 text-zinc-400">{formattedDate}</td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-zinc-800 text-rose-300 border border-zinc-700">
                        {st.plan}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-20 bg-zinc-800 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-rose-500 to-cyan-400 h-full rounded-full"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                        <span className="font-mono text-zinc-200 font-bold">{progressPct}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Actif
                      </span>
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
