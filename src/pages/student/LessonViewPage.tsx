import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCourse } from '../../context/CourseContext';
import {
  Play,
  CheckCircle2,
  Circle,
  ArrowLeft,
  ArrowRight,
  Clock,
  Download,
  FileText,
  Settings,
  Sparkles,
  Share2,
  ChevronRight,
  ListOrdered
} from 'lucide-react';

export const LessonViewPage: React.FC = () => {
  const { moduleId, lessonId } = useParams<{ moduleId: string; lessonId: string }>();
  const navigate = useNavigate();

  const {
    courses,
    lessons,
    toggleLessonCompletion,
    isLessonCompleted,
    setLastAccessedLessonId,
    getNextLesson,
    getPrevLesson,
    updateLesson
  } = useCourse();

  // Find course & lesson
  const currentCourse = courses.find((c) => c.id === moduleId) || courses[0];
  const moduleLessons = lessons.filter((l) => l.courseId === currentCourse.id);
  const currentLesson = lessons.find((l) => l.id === lessonId) || moduleLessons[0];

  const [activeTab, setActiveTab] = useState<'content' | 'summary' | 'resources'>('content');
  const [customVideoUrl, setCustomVideoUrl] = useState(currentLesson?.videoUrl || '');
  const [showVideoConfig, setShowVideoConfig] = useState(false);

  useEffect(() => {
    if (currentLesson) {
      setLastAccessedLessonId(currentLesson.id);
      setCustomVideoUrl(currentLesson.videoUrl);
    }
  }, [currentLesson?.id]);

  if (!currentLesson) {
    return (
      <div className="p-8 text-center text-zinc-400">
        Leçon introuvable.{' '}
        <Link to="/cours" className="text-rose-400 underline">
          Retour aux cours
        </Link>
      </div>
    );
  }

  const completed = isLessonCompleted(currentLesson.id);
  const nextLesson = getNextLesson(currentLesson.id);
  const prevLesson = getPrevLesson(currentLesson.id);

  const handleToggleComplete = () => {
    toggleLessonCompletion(currentLesson.id);
  };

  const handleSaveVideoUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentLesson) {
      updateLesson({
        ...currentLesson,
        videoUrl: customVideoUrl
      });
      setShowVideoConfig(false);
    }
  };

  // Helper to render video player or iframe safely
  const renderVideoPlayer = (url: string) => {
    // If it's a standard embed URL (e.g. YouTube, Vimeo, Bunny Stream, Cloudflare Stream)
    if (url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com') || url.includes('bunny') || url.includes('cloudflarestream')) {
      return (
        <iframe
          src={url}
          title={currentLesson.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full object-cover"
        />
      );
    }

    // Direct MP4 or video file
    return (
      <video
        src={url}
        controls
        controlsList="nodownload"
        className="w-full h-full object-cover bg-black"
        poster="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&auto=format&fit=crop&q=80"
      >
        Votre navigateur ne supporte pas ce format de vidéo.
      </video>
    );
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Breadcrumb & Navigation Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Link to="/cours" className="hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Tous les modules</span>
          </Link>
          <span>/</span>
          <span className="text-zinc-300 font-semibold">{currentCourse.title}</span>
          <span>/</span>
          <span className="text-rose-400 font-medium line-clamp-1">{currentLesson.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowVideoConfig(!showVideoConfig)}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs flex items-center gap-1.5 transition-colors"
            title="Configurer l'URL vidéo (Bunny Stream / Cloudflare / Hébergeur)"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Source Vidéo</span>
          </button>

          <button
            onClick={handleToggleComplete}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              completed
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20'
            }`}
          >
            {completed ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Leçon terminée ✓</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4" />
                <span>Marquer comme terminée</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Video URL Config Popover if opened */}
      {showVideoConfig && (
        <form onSubmit={handleSaveVideoUrl} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-700 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-200 font-semibold">
            <span>Architecture Vidéo Configurable (Cloudflare Stream / Bunny Stream / CDN) :</span>
            <button type="button" onClick={() => setShowVideoConfig(false)} className="text-zinc-400 hover:text-white">✕</button>
          </div>
          <p className="text-[11px] text-zinc-400">
            Collez une URL d'intégration iframe ou fichier MP4 direct. Compatible avec tous les CDN modernes.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={customVideoUrl}
              onChange={(e) => setCustomVideoUrl(e.target.value)}
              placeholder="https://iframe.videodelivery.net/... ou https://..."
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-zinc-950 border border-zinc-800 text-white outline-none focus:border-rose-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold"
            >
              Enregistrer l'URL
            </button>
          </div>
        </form>
      )}

      {/* Main Grid: Video + Content Left, Lesson Sidebar Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Video & Rich Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Video Player Container */}
          <div className="relative aspect-video rounded-3xl bg-black overflow-hidden border border-zinc-800 shadow-2xl">
            {renderVideoPlayer(currentLesson.videoUrl)}
          </div>

          {/* Lesson Title & Quick Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="font-mono text-cyan-400">
                MODULE {currentCourse.order} • LEÇON 0{currentLesson.order}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {currentLesson.durationMinutes} min
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {currentLesson.title}
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {currentLesson.description}
            </p>
          </div>

          {/* Action Callout if available */}
          {currentLesson.actionItem && (
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                ★
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                  Action Immédiate à Réaliser :
                </div>
                <div className="text-xs sm:text-sm text-zinc-200">
                  {currentLesson.actionItem}
                </div>
              </div>
            </div>
          )}

          {/* Key Points */}
          {currentLesson.keyPoints && currentLesson.keyPoints.length > 0 && (
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-850 space-y-3">
              <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Points Clés Retenus</span>
              </div>
              <div className="space-y-2">
                {currentLesson.keyPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Pedagogical Content */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
            <h3 className="text-base font-bold text-white border-b border-zinc-800 pb-3">
              Fiche de Cours & Approfondissement
            </h3>
            <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line space-y-3 font-sans">
              {currentLesson.content}
            </div>
          </div>

          {/* Previous / Next Navigation Buttons */}
          <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevLesson ? (
              <Link
                to={`/cours/${prevLesson.courseId}/${prevLesson.id}`}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Leçon précédente : {prevLesson.title.split('.')[1] || prevLesson.title}</span>
              </Link>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <Link
                to={`/cours/${nextLesson.courseId}/${nextLesson.id}`}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-rose-500/20 transition-all"
              >
                <span>Leçon suivante : {nextLesson.title.split('.')[1] || nextLesson.title}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                to="/quiz"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md"
              >
                <span>Valider le module par un quiz</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Right Column: Module Lessons Playlist */}
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4 sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  SOMMAIRE DU MODULE
                </span>
                <h3 className="text-sm font-bold text-white line-clamp-1">
                  {currentCourse.title.replace(`MODULE ${currentCourse.order} — `, '')}
                </h3>
              </div>
              <span className="text-xs text-zinc-400 font-mono">
                {moduleLessons.length} leçons
              </span>
            </div>

            <div className="space-y-1.5 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
              {moduleLessons.map((l) => {
                const isCurrent = l.id === currentLesson.id;
                const isDone = isLessonCompleted(l.id);

                return (
                  <Link
                    key={l.id}
                    to={`/cours/${currentCourse.id}/${l.id}`}
                    className={`p-3 rounded-xl flex items-center justify-between text-xs transition-all ${
                      isCurrent
                        ? 'bg-rose-500/15 text-rose-300 font-bold border border-rose-500/30'
                        : 'text-zinc-300 hover:bg-zinc-800/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                      )}
                      <span className="line-clamp-1">{l.title}</span>
                    </div>

                    <span className="text-[10px] font-mono text-zinc-400 flex-shrink-0 ml-2">
                      {l.durationMinutes}m
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Quick link to module quiz */}
            <div className="pt-3 border-t border-zinc-800">
              <Link
                to={`/quiz`}
                className="w-full py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2 border border-zinc-800 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Passer le quiz de validation</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
