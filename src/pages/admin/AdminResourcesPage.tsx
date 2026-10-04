import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import { BonusResource } from '../../types';
import { FolderDown, Plus, Edit2, Download, Trash2, CheckCircle2 } from 'lucide-react';

export const AdminResourcesPage: React.FC = () => {
  const { resources } = useCourse();

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Gestion des Bonus & Ressources
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Gérez les 7 bonus inclus, ajustez les formules requises et suivez les téléchargements.
          </p>
        </div>

        <div className="text-xs text-zinc-400">
          Total : <strong className="text-white">{resources.length} ressources actives</strong>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res) => (
          <div
            key={res.id}
            className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-950 text-cyan-400 border border-zinc-850">
                  {res.fileFormat}
                </span>
                <span className="text-xs font-bold text-rose-400">Min. {res.minPlan}</span>
              </div>
              <h3 className="text-base font-bold text-white">{res.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                {res.description}
              </p>
              <div className="pt-2 text-[11px] text-zinc-400 flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" />
                <span>{res.downloadCount.toLocaleString('fr-FR')} téléchargements cumulés</span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-850 flex items-center justify-between text-xs">
              <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Actif
              </span>
              <button
                type="button"
                onClick={() => alert(`Édition de ${res.title}`)}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold"
              >
                Paramètres
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
