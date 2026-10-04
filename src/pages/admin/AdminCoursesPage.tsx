import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import { Course, Lesson } from '../../types';
import {
  Plus,
  Edit2,
  Trash2,
  Play,
  Clock,
  BookOpen,
  Check,
  X,
  Sparkles,
  Layers
} from 'lucide-react';

export const AdminCoursesPage: React.FC = () => {
  const { courses, lessons, addLesson, updateLesson, deleteLesson, addCourse } = useCourse();
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || 'module-1');

  // Modal states for creating/editing a lesson
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  // Form states
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');
  const [lessonVideoUrl, setLessonVideoUrl] = useState('');
  const [lessonDuration, setLessonDuration] = useState(15);
  const [lessonContent, setLessonContent] = useState('');

  const currentCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const currentLessons = lessons.filter((l) => l.courseId === currentCourse?.id);

  const openNewLessonModal = () => {
    setEditingLesson(null);
    setLessonTitle('');
    setLessonDescription('');
    setLessonVideoUrl('https://www.youtube.com/embed/dQw4w9WgXcQ');
    setLessonDuration(15);
    setLessonContent('### Contenu pédagogique de la leçon\n\nDécrivez ici les instructions étape par étape.');
    setIsLessonModalOpen(true);
  };

  const openEditLessonModal = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setLessonTitle(lesson.title);
    setLessonDescription(lesson.description);
    setLessonVideoUrl(lesson.videoUrl);
    setLessonDuration(lesson.durationMinutes);
    setLessonContent(lesson.content);
    setIsLessonModalOpen(true);
  };

  const handleSaveLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle.trim()) return;

    if (editingLesson) {
      updateLesson({
        ...editingLesson,
        title: lessonTitle,
        description: lessonDescription,
        videoUrl: lessonVideoUrl,
        durationMinutes: Number(lessonDuration),
        content: lessonContent
      });
    } else {
      const newLesson: Lesson = {
        id: `custom-lesson-${Date.now()}`,
        courseId: currentCourse.id,
        title: lessonTitle,
        description: lessonDescription,
        videoUrl: lessonVideoUrl,
        durationMinutes: Number(lessonDuration),
        order: currentLessons.length + 1,
        content: lessonContent
      };
      addLesson(newLesson);
    }

    setIsLessonModalOpen(false);
  };

  const handleDeleteLesson = (lessonId: string) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette leçon ?')) {
      deleteLesson(lessonId);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Gestion des Modules & Leçons
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Modifiez le contenu pédagogique, remplacez les vidéos ou ajoutez de nouveaux cours.
          </p>
        </div>

        <button
          onClick={openNewLessonModal}
          className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter une leçon</span>
        </button>
      </div>

      {/* Module Selector Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {courses.map((c) => {
          const isSelected = c.id === selectedCourseId;
          const count = lessons.filter((l) => l.courseId === c.id).length;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCourseId(c.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <span>MODULE 0{c.order}</span>
              <span className="text-[10px] opacity-80 font-mono">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Current Module Summary Card */}
      <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
            MODULE ACTIF : {currentCourse.title}
          </span>
          <span className="text-xs text-zinc-400">{currentLessons.length} leçons enregistrées</span>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed max-w-3xl">
          {currentCourse.description}
        </p>
      </div>

      {/* Lessons List in Table or Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Leçons de ce module ({currentLessons.length}) :
        </h3>

        <div className="space-y-3">
          {currentLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-zinc-750 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{lesson.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-850">
                    {lesson.durationMinutes} min
                  </span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-1">{lesson.description}</p>
                <div className="text-[11px] font-mono text-zinc-500 truncate max-w-md">
                  URL : {lesson.videoUrl}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => openEditLessonModal(lesson)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-zinc-700"
                >
                  <Edit2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Modifier</span>
                </button>
                <button
                  onClick={() => handleDeleteLesson(lesson.id)}
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-rose-950/40 text-rose-400 border border-zinc-800 transition-colors"
                  title="Supprimer la leçon"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit / Create Lesson Modal */}
      {isLessonModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-lg font-bold text-white">
                {editingLesson ? 'Modifier la leçon' : 'Ajouter une nouvelle leçon'}
              </h3>
              <button
                onClick={() => setIsLessonModalOpen(false)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLesson} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Titre de la leçon
                </label>
                <input
                  type="text"
                  required
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  placeholder="Ex: 8. Comment exploser son watch time"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:border-rose-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">
                    Durée estimée (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={lessonDuration}
                    onChange={(e) => setLessonDuration(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:border-rose-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">
                    URL Vidéo (Embed ou MP4)
                  </label>
                  <input
                    type="text"
                    required
                    value={lessonVideoUrl}
                    onChange={(e) => setLessonVideoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:border-rose-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Brève description
                </label>
                <textarea
                  rows={2}
                  value={lessonDescription}
                  onChange={(e) => setLessonDescription(e.target.value)}
                  placeholder="Ce que l'élève va retenir de cette leçon..."
                  className="w-full px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-rose-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Fiche de cours détaillée (Markdown)
                </label>
                <textarea
                  rows={6}
                  value={lessonContent}
                  onChange={(e) => setLessonContent(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs font-mono focus:border-rose-500 outline-none"
                />
              </div>

              <div className="pt-3 border-t border-zinc-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsLessonModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-md"
                >
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
