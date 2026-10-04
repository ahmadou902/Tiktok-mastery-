import React from 'react';
import { Link } from 'react-router-dom';
import { useCourse } from '../../context/CourseContext';
import { useAuth } from '../../context/AuthContext';
import {
  Clock,
  Play,
  CheckCircle2,
  Lock,
  ChevronRight,
  BookOpen,
  Sparkles
} from 'lucide-react';

export const CoursesListPage: React.FC = () => {
  const { courses, lessons, getModuleProgress } = useCourse();
  const { user } = useAuth();

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Modules de Formation
        </h1>
        <p className="text-sm text-zinc-400">
          Suivez méthodiquement les 8 modules pour construire et monétiser votre présence TikTok.
        </p>
      </div>

      {/* Grid of Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => {
          const moduleLessons = lessons.filter((l) => l.courseId === course.id);
          const prog = getModuleProgress(course.id);
          const isCompleted = prog.total > 0 && prog.completed === prog.total;
          const isInProgress = prog.completed > 0 && !isCompleted;

          // Determine status: Verrouillé | Disponible | En cours | Terminé
          let statusText = 'Disponible';
          let statusColor = 'bg-zinc-800 text-zinc-300 border-zinc-700';

          if (isCompleted) {
            statusText = 'Terminé';
            statusColor = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
          } else if (isInProgress) {
            statusText = 'En cours';
            statusColor = 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
          }

          const firstLesson = moduleLessons[0];
          // Find first uncompleted lesson in this module if available
          const targetLesson =
            moduleLessons.find((l) => !l.videoUrl.includes('dummy')) || firstLesson;

          return (
            <div
              key={course.id}
              className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-zinc-950 text-cyan-400 border border-zinc-800">
                    MODULE 0{course.order}
                  </span>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${statusColor}`}
                  >
                    {statusText}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-rose-400 transition-colors">
                    {course.title.replace(`MODULE ${course.order} — `, '')}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-zinc-400 pt-1">
                  <span className="flex items-center gap-1.5 font-medium">
                    <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
                    {moduleLessons.length} leçons
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    {course.duration}
                  </span>
                </div>
              </div>

              {/* Progress Bar & CTA */}
              <div className="space-y-4 pt-4 border-t border-zinc-850">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400 font-medium">
                      {prog.completed} sur {prog.total} leçons validées
                    </span>
                    <span className="text-white font-bold">{prog.percentage}%</span>
                  </div>
                  <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800/80">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted
                          ? 'bg-emerald-400'
                          : 'bg-gradient-to-r from-rose-500 to-cyan-400'
                      }`}
                      style={{ width: `${prog.percentage}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to={`/cours/${course.id}/${targetLesson?.id || firstLesson?.id}`}
                    className="flex-1 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-zinc-700"
                  >
                    <Play className="w-3.5 h-3.5 fill-white text-white" />
                    <span>
                      {isCompleted
                        ? 'Revoir le module'
                        : isInProgress
                        ? 'Poursuivre ce module'
                        : 'Commencer ce module'}
                    </span>
                  </Link>
                  <Link
                    to={`/quiz`}
                    className="p-3 rounded-xl bg-zinc-950 hover:bg-zinc-850 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
                    title="Quiz du module"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
