import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import { useAuth } from '../../context/AuthContext';
import { BonusResource, PlanType } from '../../types';
import {
  Download,
  Eye,
  FileText,
  Lock,
  Sparkles,
  CheckCircle2,
  X,
  Search,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ResourcesPage: React.FC = () => {
  const { resources } = useCourse();
  const { user } = useAuth();
  const [selectedResource, setSelectedResource] = useState<BonusResource | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const userPlan: PlanType = (user?.plan as PlanType) || 'PRO';

  const planHierarchy: Record<PlanType, number> = {
    STARTER: 1,
    PRO: 2,
    PREMIUM: 3
  };

  const isEligible = (resPlan: PlanType) => {
    return planHierarchy[userPlan] >= planHierarchy[resPlan];
  };

  const filteredResources = resources.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(search.toLowerCase()) ||
      res.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || res.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (resource: BonusResource) => {
    if (!isEligible(resource.minPlan)) {
      alert(`Cette ressource est réservée aux formules ${resource.minPlan}.`);
      return;
    }

    const fileContent =
      resource.content ||
      `${resource.title}\n\n${resource.description}\n\n` +
        (resource.items
          ? resource.items
              .map((it: any) =>
                typeof it === 'string'
                  ? `- ${it}`
                  : `### ${it.title}\n${it.detail}\n`
              )
              .join('\n')
          : '');

    const blob = new Blob([fileContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resource.title.toLowerCase().replace(/\s+/g, '-')}-tiktok-mastery.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Bonus & Boîte à Outils Créateur
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Téléchargez les 7 packs bonus inclus pour accélérer vos tournages et vos résultats.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400">Votre formule active :</span>
          <span className="px-3 py-1 rounded-xl bg-rose-500/20 text-rose-400 font-bold text-xs border border-rose-500/30">
            {userPlan}
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une ressource..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none focus:border-rose-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {[
            { id: 'all', label: 'Toutes' },
            { id: 'hooks', label: 'Hooks' },
            { id: 'templates', label: 'Templates' },
            { id: 'guides', label: 'Guides' },
            { id: 'checklists', label: 'Checklists' },
            { id: 'prompts', label: 'Prompts IA' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => {
          const unlocked = isEligible(res.minPlan);

          return (
            <div
              key={res.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-6 ${
                unlocked
                  ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                  : 'bg-zinc-900/40 border-zinc-850 opacity-80'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-950 text-cyan-400 border border-zinc-800 uppercase">
                    {res.fileFormat}
                  </span>
                  {unlocked ? (
                    <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Débloqué
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" /> Requis : {res.minPlan}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white">{res.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{res.description}</p>

                {res.items && (
                  <div className="pt-2 text-xs text-zinc-400">
                    Contient {res.items.length}+ modèles prêts à l'emploi
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-zinc-800 flex items-center gap-2">
                {unlocked ? (
                  <>
                    <button
                      onClick={() => setSelectedResource(res)}
                      className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-zinc-700"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Consulter</span>
                    </button>
                    <button
                      onClick={() => handleDownload(res)}
                      className="p-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold transition-colors shadow-md"
                      title="Télécharger la ressource"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <Link
                    to="/tarifs"
                    className="w-full py-2.5 rounded-xl bg-zinc-800 text-rose-400 hover:bg-zinc-750 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Passer à l'offre {res.minPlan}</span>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Resource Modal Viewer */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[85vh] flex flex-col justify-between shadow-2xl">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-800">
              <div>
                <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider">
                  RESSOURCE BONUS TIKTOK MASTERY
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {selectedResource.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedResource(null)}
                className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Preview Content */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans whitespace-pre-line bg-zinc-950 p-5 rounded-2xl border border-zinc-850">
              {selectedResource.content ? (
                selectedResource.content
              ) : selectedResource.items ? (
                <div className="space-y-3">
                  {selectedResource.items.map((it: any, idx: number) => (
                    <div key={idx} className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                      <div className="font-bold text-white mb-1">
                        {typeof it === 'string' ? it : it.title}
                      </div>
                      {it.detail && <p className="text-xs text-zinc-400">{it.detail}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p>Aperçu indisponible.</p>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <button
                onClick={() => setSelectedResource(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
              >
                Fermer
              </button>
              <button
                onClick={() => handleDownload(selectedResource)}
                className="px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-rose-500/20"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger la ressource complète</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
