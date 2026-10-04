export type UserRole = 'STUDENT' | 'ADMIN';

export type PlanType = 'STARTER' | 'PRO' | 'PREMIUM';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  plan: PlanType | 'NONE';
  createdAt: string;
  avatarUrl?: string;
  phone?: string;
  country?: string;
}

export interface LessonResource {
  id: string;
  title: string;
  type: 'pdf' | 'checklist' | 'template' | 'link' | 'video';
  url: string;
  size?: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl: string;
  content: string;
  order: number;
  durationMinutes: number;
  resources?: LessonResource[];
  keyPoints?: string[];
  actionItem?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  order: number;
  lessonsCount?: number;
  duration?: string;
  badge?: string;
  iconName?: string;
}

export interface Progress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  completedAt: string;
}

export type OrderStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
export type PaymentMethod = 'WAVE' | 'ORANGE_MONEY' | 'FREE_MONEY' | 'CARD';

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  plan: PlanType;
  amount: number; // in FCFA
  currency: 'XOF' | 'FCFA';
  status: OrderStatus;
  paymentMethod?: PaymentMethod;
  paymentReference: string;
  createdAt: string;
  verifiedAt?: string;
  paymentProvider?: 'PAYTECH' | 'MANUAL' | 'SANDBOX';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index 0-based
  explanation: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description: string;
  passingScore: number; // percentage, e.g. 70
  questions: QuizQuestion[];
}

export interface QuizResult {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  createdAt: string;
  userAnswers: Record<string, number>;
}

export interface Certificate {
  id: string;
  userId: string;
  studentName: string;
  certificateNumber: string;
  issuedAt: string;
  courseName: string;
  verificationHash: string;
}

export interface BonusResource {
  id: string;
  title: string;
  description: string;
  category: 'templates' | 'guides' | 'prompts' | 'checklists' | 'hooks';
  fileFormat: string;
  downloadCount: number;
  minPlan: PlanType;
  content?: string;
  items?: string[] | { title: string; detail: string }[];
}

export interface PricingPlan {
  id: PlanType;
  name: string;
  price: number;
  currency: string;
  badge?: string;
  isPopular?: boolean;
  description: string;
  features: string[];
  notIncluded?: string[];
  ctaText: string;
}
