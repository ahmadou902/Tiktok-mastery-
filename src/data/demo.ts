import { User, Order, QuizResult, Certificate } from '../types';

export const DEMO_USERS: User[] = [
  {
    id: 'demo-student-1',
    name: 'Amadou Diallo',
    email: 'amadou.etudiant@tiktokmastery.sn',
    role: 'STUDENT',
    plan: 'PRO',
    createdAt: '2026-02-15T10:00:00Z',
    phone: '+221 77 123 45 67',
    country: 'Sénégal'
  },
  {
    id: 'demo-admin-1',
    name: 'Awa Ndiaye (Fondatrice & Admin)',
    email: 'admin@tiktokmastery.sn',
    role: 'ADMIN',
    plan: 'PREMIUM',
    createdAt: '2026-01-01T08:00:00Z',
    phone: '+221 78 987 65 43',
    country: 'Sénégal'
  },
  {
    id: 'demo-student-2',
    name: 'Fatou Sow',
    email: 'fatou.sow@exemple.com',
    role: 'STUDENT',
    plan: 'STARTER',
    createdAt: '2026-03-01T14:30:00Z',
    phone: '+221 70 333 22 11',
    country: 'Sénégal'
  }
];

export const INITIAL_DEMO_COMPLETED_LESSONS: string[] = [
  'm1-l1',
  'm1-l2',
  'm1-l3',
  'm1-l4',
  'm1-l5',
  'm2-l1',
  'm2-l2',
  'm2-l3',
  'm2-l4',
  'm2-l5',
  'm3-l1',
  'm3-l2'
]; // 12 leçons sur 48 terminées pour le profil démo Amadou (25% progression)

export const DEMO_QUIZ_RESULTS: QuizResult[] = [
  {
    id: 'qr-1',
    userId: 'demo-student-1',
    quizId: 'quiz-module-1',
    score: 5,
    maxScore: 5,
    percentage: 100,
    passed: true,
    createdAt: '2026-02-18T16:20:00Z',
    userAnswers: { 'q1-1': 1, 'q1-2': 0, 'q1-3': 1, 'q1-4': 1, 'q1-5': 2 }
  },
  {
    id: 'qr-2',
    userId: 'demo-student-1',
    quizId: 'quiz-module-2',
    score: 3,
    maxScore: 3,
    percentage: 100,
    passed: true,
    createdAt: '2026-02-22T11:45:00Z',
    userAnswers: { 'q2-1': 1, 'q2-2': 1, 'q2-3': 1 }
  }
];

export const DEMO_ORDERS: Order[] = [
  {
    id: 'cmd-9841',
    userId: 'demo-student-1',
    userEmail: 'amadou.etudiant@tiktokmastery.sn',
    userName: 'Amadou Diallo',
    plan: 'PRO',
    amount: 14900,
    currency: 'FCFA',
    status: 'COMPLETED',
    paymentMethod: 'WAVE',
    paymentReference: 'WAVE-SN-78492019',
    paymentProvider: 'PAYTECH',
    createdAt: '2026-02-15T09:58:00Z',
    verifiedAt: '2026-02-15T10:00:00Z'
  },
  {
    id: 'cmd-9842',
    userId: 'demo-student-2',
    userEmail: 'fatou.sow@exemple.com',
    userName: 'Fatou Sow',
    plan: 'STARTER',
    amount: 9900,
    currency: 'FCFA',
    status: 'COMPLETED',
    paymentMethod: 'ORANGE_MONEY',
    paymentReference: 'OM-SN-994821',
    paymentProvider: 'PAYTECH',
    createdAt: '2026-03-01T14:25:00Z',
    verifiedAt: '2026-03-01T14:30:00Z'
  },
  {
    id: 'cmd-9843',
    userId: 'guest-user-4',
    userEmail: 'moussa.fall@gmail.com',
    userName: 'Moussa Fall',
    plan: 'PREMIUM',
    amount: 24900,
    currency: 'FCFA',
    status: 'COMPLETED',
    paymentMethod: 'CARD',
    paymentReference: 'CARD-VISA-4412',
    paymentProvider: 'PAYTECH',
    createdAt: '2026-03-10T18:12:00Z',
    verifiedAt: '2026-03-10T18:14:00Z'
  },
  {
    id: 'cmd-9844',
    userId: 'guest-user-5',
    userEmail: 'cheikh.seck@yahoo.fr',
    userName: 'Cheikh Seck',
    plan: 'PRO',
    amount: 14900,
    currency: 'FCFA',
    status: 'PENDING',
    paymentMethod: 'WAVE',
    paymentReference: 'WAVE-PENDING-1092',
    paymentProvider: 'PAYTECH',
    createdAt: '2026-03-14T08:40:00Z'
  }
];

export const DEMO_CERTIFICATE: Certificate = {
  id: 'cert-tm-2026-0042',
  userId: 'demo-student-1',
  studentName: 'Amadou Diallo',
  certificateNumber: 'TM-2026-SN-0042',
  issuedAt: '2026-03-15T14:00:00Z',
  courseName: 'TikTok Mastery — Programme Certifiant Créateur & Monétisation',
  verificationHash: '9a8f4c7e2b1d609a3382f6e5'
};
