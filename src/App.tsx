import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ContentMenu from "./pages/learner-projectSubmiter/ContentMenu";
import ContentVideo from "./pages/learner-projectSubmiter/ContentVideo";
import Login from "./pages/Login";
import SubmitProject from "./pages/learner-projectSubmiter/SubmitProject";
import ApproveProjectMenu from "./pages/approver/ApproveProjectMenu";
import ApproveProjectDetails from "./pages/approver/ApproveProjectDetails";
import AdminDashboardProject from "./pages/approver/ApproverDashboardProject";
import AdminDashboardElearning from "./pages/admin/AdminDashboardElearing";
import AdminReport from "./pages/admin/AdminReport";

// เพิ่มการ import หน้าจัดการคอร์ส
import SubmitSuccess from "./components/learner-projectSubmiter/projectSubmit/SubmitSuccess";

import AdminCourseManagement from "./pages/admin/AdminCourseManagement";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminPM from "./pages/admin/AdminPM";
import AdminNewCourses from "./pages/admin/AdminNewCourse";
import { useEffect } from "react";
import ApproverDashboardProject from "./pages/approver/ApproverDashboardProject";

// ใช้ค่าจาก .env
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Centralized route definitions for better maintainability
const ROUTES = {
  // Public Routes
  LOGIN: "/login",

  // Learner Routes
  CONTENT_MENU: "/contents",
  CONTENT_VIDEO: "/video",
  SUBMIT_PROJECT: "/submit-project",

  // Approver Routes
  APPROVER_DASHBOARD_PROJECT: "/approver/dashboard",
  APPROVER_PROJECT_MENU: "/approver/project-menu",
  APPROVER_PROJECT_DETAILS: "/approver/project-details",

  // Admin Routes
  ADMIN_DASHBOARD_ELEARNING: "/admin/dashboard",
  ADMIN_REPORT: "/admin/report",
  ADMIN_COURSE_MANAGEMENT: "/admin/course-management",
  ADMIN_PROJECT_MANAGEMENT: "admin/projectmanagement",
  ADMIN_COURSES: "/admin/courses",
};

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />

            {/* Protected Routes for Learner/Project Submiter */}
            <Route
              path={ROUTES.CONTENT_MENU}
              element={
                <ProtectedRoute>
                  <ContentMenu />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.CONTENT_VIDEO}
              element={
                <ProtectedRoute>
                  <ContentVideo />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.SUBMIT_PROJECT}
              element={
                <ProtectedRoute>
                  <SubmitProject />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes for Approver */}
            <Route
              path={ROUTES.APPROVER_DASHBOARD_PROJECT}
              element={
                <ProtectedRoute allowedRoles={["project-approver"]}>
                  <ApproverDashboardProject />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.APPROVER_PROJECT_MENU}
              element={
                <ProtectedRoute allowedRoles={["project-approver"]}>
                  <ApproveProjectMenu />
                </ProtectedRoute>
              }
            />
            <Route
              path={`${ROUTES.APPROVER_PROJECT_DETAILS}/:projectId`}
              element={
                <ProtectedRoute allowedRoles={["project-approver"]}>
                  <ApproveProjectDetails />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes for Admin */}
            <Route
              path={ROUTES.ADMIN_DASHBOARD_ELEARNING}
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboardElearning />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.ADMIN_REPORT}
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminReport />
                </ProtectedRoute>
              }
            />
            {/* เพิ่มเส้นทางสำหรับหน้าจัดการคอร์ส */}
            <Route
              path={ROUTES.ADMIN_COURSE_MANAGEMENT}
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminCourseManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.ADMIN_COURSES}
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.ADMIN_PROJECT_MANAGEMENT}
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminPM />
                </ProtectedRoute>
              }
            />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}
