import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCourse } from '../../context/CourseContext';
import {
  Play,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  FolderDown,
  HelpCircle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Layers
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const {
    getTotalProgress,
    lessons,
    courses,
    lastAccessedLessonId,
    completedLessons,
    getModuleProgress
  } = useCourse();

  const { completed, total, percentage } = getTotalProgress();

  // Find last and next lessons
  const currentLesson = lessons.find((l) => l.id === lastAccessedLessonId) || lessons[0];
  const nextLesson = lessons.find((l) => !completedLessons.includes(l.id)) || currentLesson;

  // Calculate completed modules count
  const completedModulesCount = courses.filter((c) => {
    const prog = getModuleProgress(c.id);
    return prog.total > 0 && prog.completed === prog.total;
  }).length;

  const firstName = user?.name ? user.name.split(' ')[0] : 'Créateur';

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Bonjour, {firstName}</span>
            <span className="text-2xl">👋</span>
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Continuez votre progression.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={`/cours/${nextLesson.courseId}/${nextLesson.id}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-500/20 transition-all active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Continuer la formation</span>
          </Link>
        </div>
      </div>

      {/* 2. Main Progression Overview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-3xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 space-y-6 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Progression Globale
            </span>
            <span className="text-xs font-mono font-bold text-zinc-400">
              {completed} / {total} leçons terminées
            </span>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">
              {percentage} %
            </span>
            <span className="text-xs sm:text-sm text-zinc-400 font-medium">
              de votre parcours TikTok Mastery complété
            </span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-zinc-950 h-3 rounded-full overflow-hidden border border-zinc-800">
              <div
                className="bg-gradient-to-r from-rose-500 via-rose-400 to-cyan-400 h-full rounded-full transition-all duration-700 shadow-md shadow-rose-500/30"
                style={{ width: `${Math.max(percentage, 2)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-zinc-400">
              <span>Départ (0%)</span>
              <span>Mi-parcours (50%)</span>
              <span>Certification (100%)</span>
            </div>
          </div>

          {/* Quick Metrics sub-grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-800/80">
            <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-850">
              <div className="text-[11px] text-zinc-400">Modules validés</div>
              <div className="text-xl font-bold text-white mt-1">
                {completedModulesCount} / {courses.length}
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-850">
              <div className="text-[11px] text-zinc-400">Leçons terminées</div>
              <div className="text-xl font-bold text-emerald-400 mt-1">
                {completed} cours
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-850 col-span-2 sm:col-span-1">
              <div className="text-[11px] text-zinc-400">Temps estimé restant</div>
              <div className="text-xl font-bold text-cyan-400 mt-1">
                ~{Math.round(((total - completed) * 16) / 60)}h
              </div>
            </div>
          </div>
        </div>

        {/* Next Up / Last Accessed Lesson Card */}
        <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Prochaine Étape
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                À SUIVRE
              </span>
            </div>

            <div>
              <div className="text-xs text-zinc-400">
                {courses.find((c) => c.id === nextLesson.courseId)?.title}
              </div>
              <h3 className="text-lg font-bold text-white mt-1 leading-snug line-clamp-2">
                {nextLesson.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                {nextLesson.description}
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                {nextLesson.durationMinutes} minutes
              </span>
              <span>•</span>
              <span className="text-rose-400 font-semibold">Vidéo & Fiche pratique</span>
            </div>
          </div>

          <Link
            to={`/cours/${nextLesson.courseId}/${nextLesson.id}`}
            className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-zinc-700"
          >
            <span>Démarrer cette leçon</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </Link>
        </div>
      </div>

      {/* 3. Modules Fast Overview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-rose-400" />
            <span>Vos 8 Modules de Formation</span>
          </h2>
          <Link to="/cours" className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1">
            <span>Tous les cours</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((course) => {
            const prog = getModuleProgress(course.id);
            const isCompleted = prog.total > 0 && prog.completed === prog.total;
            const inProgress = prog.completed > 0 && !isCompleted;
            const firstLesson = lessons.find((l) => l.courseId === course.id);

            return (
              <div
                key={course.id}
                className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      MOD 0{course.order}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : inProgress
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {isCompleted ? 'Terminé ✓' : inProgress ? 'En cours' : 'Disponible'}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-zinc-100 line-clamp-1">
                    {course.title.replace(`MODULE ${course.order} — `, '')}
                  </h3>

                  <div className="mt-3 space-y-1.5">
                    <div className="flex justify-between text-[11px] text-zinc-400">
                      <span>{prog.completed} / {prog.total} leçons</span>
                      <span className="font-semibold text-zinc-300">{prog.percentage}%</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-rose-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${prog.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                <Link
                  to={firstLesson ? `/cours/${course.id}/${firstLesson.id}` : '/cours'}
                  className="w-full py-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-750 text-zinc-300 hover:text-white text-xs font-semibold text-center transition-colors"
                >
                  Accéder aux leçons
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Quick Action Highlights: Bonus & Quiz & Certificate */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        <Link
          to="/ressources"
          className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex items-start gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <FolderDown className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
              7 Bonus Téléchargeables
            </h3>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              100 Hooks, 50 idées de vidéos, modèles de scripts et guide CapCut.
            </p>
          </div>
        </Link>

        <Link
          to="/quiz"
          className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex items-start gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">
              Quiz de Validation
            </h3>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Évaluez votre compréhension de chaque module et consolidez vos acquis.
            </p>
          </div>
        </Link>

        <Link
          to="/certificat"
          className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex items-start gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
              Certificat Numérique
            </h3>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Votre diplôme officiel vérifiable avec identifiant unique dès 100% de complétion.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
