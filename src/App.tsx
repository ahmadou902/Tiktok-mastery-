import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { StudentLayout } from './layouts/StudentLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { FormationPage } from './pages/public/FormationPage';
import { TarifsPage } from './pages/public/TarifsPage';
import { FaqPage } from './pages/public/FaqPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { ForgotPasswordPage } from './pages/public/ForgotPasswordPage';
import { CheckoutPage } from './pages/public/CheckoutPage';
import {
  MentionsLegalesPage,
  ConfidentialitePage,
  ConditionsPage
} from './pages/public/LegalPages';

// Student Pages
import { DashboardPage } from './pages/student/DashboardPage';
import { CoursesListPage } from './pages/student/CoursesListPage';
import { LessonViewPage } from './pages/student/LessonViewPage';
import { ResourcesPage } from './pages/student/ResourcesPage';
import { QuizPage } from './pages/student/QuizPage';
import { CertificatePage } from './pages/student/CertificatePage';

// Admin Pages
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminStudentsPage } from './pages/admin/AdminStudentsPage';
import { AdminCoursesPage } from './pages/admin/AdminCoursesPage';
import { AdminResourcesPage } from './pages/admin/AdminResourcesPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CourseProvider>
          <Routes>
            {/* Public Pages with PublicLayout */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/formation" element={<FormationPage />} />
              <Route path="/tarifs" element={<TarifsPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/connexion" element={<LoginPage />} />
              <Route path="/inscription" element={<RegisterPage />} />
              <Route path="/mot-de-passe-oublie" element={<ForgotPasswordPage />} />
              <Route path="/commander/:planId" element={<CheckoutPage />} />
              <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
              <Route path="/confidentialite" element={<ConfidentialitePage />} />
              <Route path="/conditions" element={<ConditionsPage />} />
            </Route>

            {/* Student Protected Space with StudentLayout */}
            <Route element={<StudentLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/cours" element={<CoursesListPage />} />
              <Route path="/cours/:moduleId/:lessonId" element={<LessonViewPage />} />
              <Route path="/ressources" element={<ResourcesPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/quiz/:quizId" element={<QuizPage />} />
              <Route path="/certificat" element={<CertificatePage />} />
            </Route>

            {/* Admin Space with AdminLayout */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverviewPage />} />
              <Route path="students" element={<AdminStudentsPage />} />
              <Route path="courses" element={<AdminCoursesPage />} />
              <Route path="resources" element={<AdminResourcesPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CourseProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
