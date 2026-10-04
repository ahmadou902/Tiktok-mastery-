import React, { useState } from 'react';
import { COURSES, LESSONS } from '../../data/courses';
import { Link } from 'react-router-dom';
import { ChevronDown, Play, Clock, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

export const FormationPage: React.FC = () => {
  const [expandedModule, setExpandedModule] = useState<string | null>('module-1');

  const toggleModule = (id: string) => {
    setExpandedModule(expandedModule === id ? null : id);
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Curriculum Officiel</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Le Programme Complet des 8 Modules
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          48 leçons vidéos d’application concrète conçues pour vous amener du niveau débutant complet jusqu’à la maîtrise de l’algorithme et la monétisation de votre audience.
        </p>
      </div>

      {/* Modules Accordion & Details */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {COURSES.map((course) => {
          const isOpen = expandedModule === course.id;
          const moduleLessons = LESSONS.filter((l) => l.courseId === course.id);

          return (
            <div
              key={course.id}
              className="rounded-2xl bg-zinc-900/70 border border-zinc-800 overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleModule(course.id)}
                className="w-full p-6 text-left flex items-start sm:items-center justify-between gap-4 hover:bg-zinc-850/60 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-zinc-800 text-rose-400 border border-zinc-700">
                      MODULE {course.order}
                    </span>
                    <span className="text-xs text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {course.duration}
                    </span>
                    <span className="text-xs text-zinc-400">
                      • {moduleLessons.length} leçons
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                    {course.title.replace(`MODULE ${course.order} — `, '')}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 max-w-2xl">
                    {course.description}
                  </p>
                </div>

                <div className="p-2 rounded-xl bg-zinc-800 text-zinc-300 flex-shrink-0 mt-1 sm:mt-0">
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180 text-rose-400' : ''}`}
                  />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 border-t border-zinc-800 space-y-3 bg-zinc-950/40">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                    Contenu des leçons de ce module :
                  </h4>
                  <div className="divide-y divide-zinc-850">
                    {moduleLessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="py-3 flex items-start justify-between gap-4 text-xs sm:text-sm group"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Play className="w-3.5 h-3.5 text-cyan-400 group-hover:text-rose-400 transition-colors flex-shrink-0" />
                            <span className="font-semibold text-zinc-200 group-hover:text-white">
                              {lesson.title}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 pl-5.5 leading-relaxed">
                            {lesson.description}
                          </p>
                        </div>
                        <span className="text-[11px] font-mono text-zinc-400 flex-shrink-0 mt-0.5">
                          {lesson.durationMinutes} min
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Link
                      to={`/cours`}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 hover:text-rose-300"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Ouvrir dans l'espace élève</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="max-w-4xl mx-auto rounded-3xl bg-zinc-900 border border-zinc-800 p-8 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">Rejoignez la formation dès aujourd'hui</h3>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto">
          Accédez immédiatement aux 8 modules avec votre forfait Starter, Pro ou Premium.
        </p>
        <div className="pt-2">
          <Link
            to="/tarifs"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-500/20"
          >
            <span>Voir les offres et tarifs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
