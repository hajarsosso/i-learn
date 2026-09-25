import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import CoursesPage from "../pages/courses/CoursesPage";
import CourseDetailsPage from "../pages/courses/CourseDetailsPage";
import MyCoursesPage from "../pages/courses/MyCoursesPage";

import StudentDashboard from "../pages/dashboard/StudentDashboard";
import TeacherDashboard from "../pages/dashboard/TeacherDashboard";

import QuizPage from "../pages/quizzes/QuizPage";
import QuizResultPage from "../pages/quizzes/QuizResultPage";
import QuizReviewPage from "../pages/quizzes/QuizReviewPage";
import QuizAttemptsPage from "../pages/quizzes/QuizAttemptsPage";

import CertificatesPage from "../pages/certificates/CertificatesPage";

import CreateCoursePage from "../pages/teacher/CreateCoursePage";
import ManageLessonsPage from "../pages/teacher/ManageLessonsPage";
import ManageQuizPage from "../pages/teacher/ManageQuizPage";

import ProtectedRoute from "../components/ProtectedRoute";


import AdminLayout from "../layouts/AdminLayout";

import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AdminCoursesPage from "../pages/admin/AdminCoursesPage";
import AdminAllCoursesPage from "../pages/admin/AdminAllCoursesPage";
import AdminCourseDetailsPage from "../pages/admin/AdminCourseDetailsPage";
import AdminCategoriesPage from "../pages/admin/AdminCategoriesPage";
import AdminReportsPage from "../pages/admin/AdminReportsPage";
import AdminSettingsPage from "../pages/admin/AdminSettingPage";
import ProfilePage from "../pages/student/ProfilePage";
import HelpPage from "../pages/student/HelpPage";
import StudentLayout from "../layouts/StudentLayout";
import RoleRoute from "./RoleRoute";


import TeacherLayout from "../layouts/TeacherLayout";

import TeacherCoursesPage from "../pages/teacher/TeacherCoursesPage";
import TeacherStudentsPage from "../pages/teacher/TeacherStudentsPage";
import TeacherQuizzesPage from "../pages/teacher/TeacherQuizzesPage";
import TeacherReportsPage from "../pages/teacher/TeacherReportsPage";
import TeacherSettingsPage from "../pages/teacher/TeacherSettingsPage";
import TeacherHelpPage from "../pages/teacher/TeacherHelpPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/student"
          element={
            <RoleRoute role="student">
              <StudentLayout />
            </RoleRoute>
          }
        >
          <Route path="dashboard" element={<StudentDashboard />} />

          <Route path="courses" element={<CoursesPage />} />

          <Route path="my-courses" element={<MyCoursesPage />} />

          <Route path="courses/:id" element={<CourseDetailsPage />} />

          <Route path="profile" element={<ProfilePage />} />

          <Route path="help" element={<HelpPage />} />

          <Route path="quizzes/:id" element={<QuizPage />} />

          <Route path="quiz-attempts" element={<QuizAttemptsPage />} />

          <Route path="quiz-result" element={<QuizResultPage />} />

          <Route path="quiz-review" element={<QuizReviewPage />} />

          <Route path="certificates" element={<CertificatesPage />} />
        </Route>
        <Route
  path="/teacher"
  element={
    <ProtectedRoute allowedRoles={["teacher"]}>
      <TeacherLayout />
    </ProtectedRoute>
  }
>
  <Route
    path="dashboard"
    element={<TeacherDashboard />}
  />

  <Route
    path="courses"
    element={<TeacherCoursesPage />}
  />

  <Route
    path="students"
    element={<TeacherStudentsPage />}
  />

  <Route
    path="quizzes"
    element={<TeacherQuizzesPage />}
  />

  <Route
    path="reports"
    element={<TeacherReportsPage />}
  />

  <Route
    path="settings"
    element={<TeacherSettingsPage />}
  />

  <Route
    path="help"
    element={<TeacherHelpPage />}
  />
</Route>

        <Route
          path="/teacher/courses/create"
          element={
            <ProtectedRoute>
              <CreateCoursePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/courses/:id/lessons"
          element={
            <ProtectedRoute>
              <ManageLessonsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/lessons/:id/quiz"
          element={
            <ProtectedRoute>
              <ManageQuizPage />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}

        <Route
          path="/admin"
          element={
            <RoleRoute role="admin">
              <AdminLayout />
            </RoleRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />

          <Route path="dashboard" element={<AdminDashboardPage />} />

          <Route path="users" element={<AdminUsersPage />} />

          <Route path="pending-courses" element={<AdminCoursesPage />} />

          <Route path="courses" element={<AdminAllCoursesPage />} />

          <Route path="courses/:id" element={<AdminCourseDetailsPage />} />

          <Route path="categories" element={<AdminCategoriesPage />} />

          <Route path="/admin/reports" element={<AdminReportsPage />} />

          <Route path="/admin/settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
