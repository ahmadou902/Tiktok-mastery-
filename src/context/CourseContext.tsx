import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, Lesson, QuizResult, Certificate, Order, BonusResource, PlanType } from '../types';
import { COURSES, LESSONS } from '../data/courses';
import { BONUS_RESOURCES } from '../data/resources';
import { DEMO_QUIZ_RESULTS, DEMO_ORDERS, DEMO_CERTIFICATE, INITIAL_DEMO_COMPLETED_LESSONS } from '../data/demo';
import { useAuth } from './AuthContext';

interface CourseContextType {
  courses: Course[];
  lessons: Lesson[];
  resources: BonusResource[];
  orders: Order[];
  completedLessons: string[];
  quizResults: QuizResult[];
  lastAccessedLessonId: string | null;
  toggleLessonCompletion: (lessonId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  getModuleProgress: (moduleId: string) => { completed: number; total: number; percentage: number };
  getTotalProgress: () => { completed: number; total: number; percentage: number };
  getNextLesson: (currentLessonId: string) => Lesson | null;
  getPrevLesson: (currentLessonId: string) => Lesson | null;
  saveQuizResult: (result: Omit<QuizResult, 'id' | 'createdAt'>) => QuizResult;
  getQuizResult: (quizId: string) => QuizResult | undefined;
  getCertificate: () => Certificate | null;
  claimCertificate: () => Certificate;
  setLastAccessedLessonId: (lessonId: string) => void;
  // Admin methods
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (courseId: string) => void;
  addLesson: (lesson: Lesson) => void;
  updateLesson: (lesson: Lesson) => void;
  deleteLesson: (lessonId: string) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

const PROGRESS_STORAGE_KEY = 'tiktok_mastery_progress_';
const QUIZ_STORAGE_KEY = 'tiktok_mastery_quizzes_';
const LAST_LESSON_KEY = 'tiktok_mastery_last_lesson_';

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const userId = user?.id || 'guest';

  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [lessons, setLessons] = useState<Lesson[]>(LESSONS);
  const [resources, setResources] = useState<BonusResource[]>(BONUS_RESOURCES);
  const [orders, setOrders] = useState<Order[]>(DEMO_ORDERS);

  // User-specific progress
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(`${PROGRESS_STORAGE_KEY}${userId}`);
      if (stored) return JSON.parse(stored);
      // Demo initialization
      if (userId === 'demo-student-1') return INITIAL_DEMO_COMPLETED_LESSONS;
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [quizResults, setQuizResults] = useState<QuizResult[]>(() => {
    try {
      const stored = localStorage.getItem(`${QUIZ_STORAGE_KEY}${userId}`);
      if (stored) return JSON.parse(stored);
      if (userId === 'demo-student-1') return DEMO_QUIZ_RESULTS;
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [lastAccessedLessonId, setLastAccessedLessonIdState] = useState<string | null>(() => {
    try {
      return localStorage.getItem(`${LAST_LESSON_KEY}${userId}`) || 'm3-l3';
    } catch {
      return 'm1-l1';
    }
  });

  // Sync state whenever user changes
  useEffect(() => {
    try {
      const storedProgress = localStorage.getItem(`${PROGRESS_STORAGE_KEY}${userId}`);
      if (storedProgress) {
        setCompletedLessons(JSON.parse(storedProgress));
      } else if (userId === 'demo-student-1') {
        setCompletedLessons(INITIAL_DEMO_COMPLETED_LESSONS);
      } else {
        setCompletedLessons([]);
      }

      const storedQuizzes = localStorage.getItem(`${QUIZ_STORAGE_KEY}${userId}`);
      if (storedQuizzes) {
        setQuizResults(JSON.parse(storedQuizzes));
      } else if (userId === 'demo-student-1') {
        setQuizResults(DEMO_QUIZ_RESULTS);
      } else {
        setQuizResults([]);
      }

      const storedLast = localStorage.getItem(`${LAST_LESSON_KEY}${userId}`);
      setLastAccessedLessonIdState(storedLast || 'm3-l3');
    } catch (e) {
      console.error('Error switching user course data:', e);
    }
  }, [userId]);

  // Save progress changes
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`${PROGRESS_STORAGE_KEY}${userId}`, JSON.stringify(completedLessons));
    }
  }, [completedLessons, userId]);

  // Save quiz changes
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`${QUIZ_STORAGE_KEY}${userId}`, JSON.stringify(quizResults));
    }
  }, [quizResults, userId]);

  const setLastAccessedLessonId = (lessonId: string) => {
    setLastAccessedLessonIdState(lessonId);
    if (userId) {
      localStorage.setItem(`${LAST_LESSON_KEY}${userId}`, lessonId);
    }
  };

  const toggleLessonCompletion = (lessonId: string) => {
    setCompletedLessons(prev => {
      const exists = prev.includes(lessonId);
      if (exists) {
        return prev.filter(id => id !== lessonId);
      } else {
        return [...prev, lessonId];
      }
    });
  };

  const isLessonCompleted = (lessonId: string) => {
    return completedLessons.includes(lessonId);
  };

  const getModuleProgress = (moduleId: string) => {
    const moduleLessons = lessons.filter(l => l.courseId === moduleId);
    const total = moduleLessons.length;
    if (total === 0) return { completed: 0, total: 0, percentage: 0 };
    const completed = moduleLessons.filter(l => completedLessons.includes(l.id)).length;
    const percentage = Math.round((completed / total) * 100);
    return { completed, total, percentage };
  };

  const getTotalProgress = () => {
    const total = lessons.length;
    if (total === 0) return { completed: 0, total: 0, percentage: 0 };
    const completed = completedLessons.length;
    const percentage = Math.round((completed / total) * 100);
    return { completed, total, percentage };
  };

  const getNextLesson = (currentLessonId: string): Lesson | null => {
    const currentIndex = lessons.findIndex(l => l.id === currentLessonId);
    if (currentIndex >= 0 && currentIndex < lessons.length - 1) {
      return lessons[currentIndex + 1];
    }
    return null;
  };

  const getPrevLesson = (currentLessonId: string): Lesson | null => {
    const currentIndex = lessons.findIndex(l => l.id === currentLessonId);
    if (currentIndex > 0) {
      return lessons[currentIndex - 1];
    }
    return null;
  };

  const saveQuizResult = (data: Omit<QuizResult, 'id' | 'createdAt'>) => {
    const newResult: QuizResult = {
      ...data,
      id: `qr-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setQuizResults(prev => {
      const filtered = prev.filter(q => q.quizId !== data.quizId);
      return [...filtered, newResult];
    });
    return newResult;
  };

  const getQuizResult = (quizId: string) => {
    return quizResults.find(q => q.quizId === quizId);
  };

  const getCertificate = (): Certificate | null => {
    const stored = localStorage.getItem(`tiktok_mastery_cert_${userId}`);
    if (stored) return JSON.parse(stored);
    if (userId === 'demo-student-1') return DEMO_CERTIFICATE;
    return null;
  };

  const claimCertificate = (): Certificate => {
    const existing = getCertificate();
    if (existing) return existing;

    const newCert: Certificate = {
      id: `cert-tm-${Date.now()}`,
      userId,
      studentName: user?.name || 'Élève TikTok Mastery',
      certificateNumber: `TM-${new Date().getFullYear()}-SN-${Math.floor(1000 + Math.random() * 9000)}`,
      issuedAt: new Date().toISOString(),
      courseName: 'TikTok Mastery — Programme Certifiant Créateur & Monétisation',
      verificationHash: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    };

    localStorage.setItem(`tiktok_mastery_cert_${userId}`, JSON.stringify(newCert));
    return newCert;
  };

  // Admin handlers
  const addCourse = (course: Course) => setCourses(prev => [...prev, course]);
  const updateCourse = (course: Course) => setCourses(prev => prev.map(c => c.id === course.id ? course : c));
  const deleteCourse = (courseId: string) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
    setLessons(prev => prev.filter(l => l.courseId !== courseId));
  };

  const addLesson = (lesson: Lesson) => setLessons(prev => [...prev, lesson]);
  const updateLesson = (lesson: Lesson) => setLessons(prev => prev.map(l => l.id === lesson.id ? lesson : l));
  const deleteLesson = (lessonId: string) => setLessons(prev => prev.filter(l => l.id !== lessonId));

  const addOrder = (order: Order) => setOrders(prev => [order, ...prev]);
  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status, verifiedAt: new Date().toISOString() } : o));
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        lessons,
        resources,
        orders,
        completedLessons,
        quizResults,
        lastAccessedLessonId,
        toggleLessonCompletion,
        isLessonCompleted,
        getModuleProgress,
        getTotalProgress,
        getNextLesson,
        getPrevLesson,
        saveQuizResult,
        getQuizResult,
        getCertificate,
        claimCertificate,
        setLastAccessedLessonId,
        addCourse,
        updateCourse,
        deleteCourse,
        addLesson,
        updateLesson,
        deleteLesson,
        addOrder,
        updateOrderStatus
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};
