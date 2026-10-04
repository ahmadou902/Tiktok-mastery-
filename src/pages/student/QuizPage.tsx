import React, { useState } from 'react';
import { MODULE_QUIZZES } from '../../data/quizzes';
import { useCourse } from '../../context/CourseContext';
import { Quiz, QuizQuestion } from '../../types';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Award,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const QuizPage: React.FC = () => {
  const { quizResults, saveQuizResult } = useCourse();
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentResult, setCurrentResult] = useState<any | null>(null);

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setSelectedAnswers({});
    setSubmitted(false);
    setCurrentResult(null);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmitQuiz = () => {
    if (!activeQuiz) return;

    let score = 0;
    activeQuiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });

    const maxScore = activeQuiz.questions.length;
    const percentage = Math.round((score / maxScore) * 100);
    const passed = percentage >= activeQuiz.passingScore;

    const saved = saveQuizResult({
      userId: 'current',
      quizId: activeQuiz.id,
      score,
      maxScore,
      percentage,
      passed,
      userAnswers: selectedAnswers
    });

    setCurrentResult(saved);
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2 pb-6 border-b border-zinc-800">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Quiz de Validation des Connaissances
        </h1>
        <p className="text-sm text-zinc-400">
          Validez les notions essentielles de chaque module avec un score minimum de 70% pour débloquer votre certificat officiel.
        </p>
      </div>

      {!activeQuiz ? (
        /* Quizzes List */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MODULE_QUIZZES.map((quiz) => {
            const savedResult = quizResults.find((r) => r.quizId === quiz.id);

            return (
              <div
                key={quiz.id}
                className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-zinc-950 text-cyan-400 border border-zinc-800">
                      QUIZ OFFICIEL
                    </span>
                    {savedResult && (
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          savedResult.passed
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {savedResult.passed ? 'Validé ✓' : 'À perfectionner'}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white">{quiz.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{quiz.description}</p>

                  <div className="text-xs text-zinc-400 flex items-center gap-3 pt-1">
                    <span>{quiz.questions.length} questions QCM</span>
                    <span>•</span>
                    <span>Score de réussite : {quiz.passingScore}%</span>
                  </div>

                  {savedResult && (
                    <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-850 text-xs flex items-center justify-between">
                      <span className="text-zinc-400">Dernier résultat enregistré :</span>
                      <span className="font-bold text-white">
                        {savedResult.score} / {savedResult.maxScore} ({savedResult.percentage}%)
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleStartQuiz(quiz)}
                  className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-zinc-700"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{savedResult ? 'Recommencer le quiz' : 'Démarrer ce quiz'}</span>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* Active Quiz Runner */
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase">ÉVALUATION ACTIVE</span>
              <h2 className="text-xl font-bold text-white">{activeQuiz.title}</h2>
            </div>
            <button
              onClick={() => setActiveQuiz(null)}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-400 hover:text-white border border-zinc-800"
            >
              Retour à la liste
            </button>
          </div>

          {/* Results Summary Box if submitted */}
          {submitted && currentResult && (
            <div
              className={`p-6 sm:p-8 rounded-3xl border space-y-4 animate-in fade-in ${
                currentResult.passed
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100'
                  : 'bg-rose-950/30 border-rose-500/40 text-rose-100'
              }`}
            >
              <div className="flex items-center gap-3">
                {currentResult.passed ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                ) : (
                  <XCircle className="w-8 h-8 text-rose-400 flex-shrink-0" />
                )}
                <div>
                  <h3 className="text-xl font-bold">
                    {currentResult.passed
                      ? 'Félicitations ! Module Validé avec Succès'
                      : 'Presque ! Entraînez-vous encore un peu'}
                  </h3>
                  <p className="text-xs opacity-80 mt-0.5">
                    {currentResult.passed
                      ? 'Vos compétences sont confirmées. Cette note compte pour l’obtention de votre certificat.'
                      : 'Relisez les fiches de cours du module et retentez votre chance sans limitation.'}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold">
                  Votre score : {currentResult.score} / {currentResult.maxScore}
                </span>
                <span className="text-xl font-bold">— {currentResult.percentage} %</span>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => handleStartQuiz(activeQuiz)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-zinc-700"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Recommencer</span>
                </button>
                <button
                  onClick={() => setActiveQuiz(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors"
                >
                  Passer au quiz suivant
                </button>
              </div>
            </div>
          )}

          {/* Questions List */}
          <div className="space-y-6">
            {activeQuiz.questions.map((q, qIndex) => {
              const selectedOpt = selectedAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;

              return (
                <div
                  key={q.id}
                  className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-zinc-800 text-cyan-400 font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {qIndex + 1}
                    </span>
                    <h3 className="text-base font-bold text-white pt-0.5">{q.question}</h3>
                  </div>

                  <div className="space-y-2 pl-10">
                    {q.options.map((opt, optIndex) => {
                      const isSelected = selectedOpt === optIndex;
                      let btnStyle = 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700';

                      if (submitted) {
                        if (optIndex === q.correctAnswer) {
                          btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                        } else {
                          btnStyle = 'bg-zinc-950 border-zinc-850 text-zinc-500 opacity-60';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-500/20 border-rose-500 text-white font-semibold';
                      }

                      return (
                        <button
                          key={optIndex}
                          type="button"
                          disabled={submitted}
                          onClick={() => handleSelectOption(q.id, optIndex)}
                          className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                        >
                          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center flex-shrink-0 text-[11px] font-mono mt-0.5">
                            {String.fromCharCode(65 + optIndex)}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div className="pl-10 pt-2">
                      <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 space-y-1">
                        <div className="font-bold text-zinc-200">Explication pédagogique :</div>
                        <p>{q.explanation}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!submitted && (
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length < activeQuiz.questions.length}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-sm shadow-xl shadow-rose-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Valider et voir mes résultats
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
