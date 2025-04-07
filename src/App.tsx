import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Pages
import ContentMenu from "./pages/learner-projectSubmiter/ContentMenu";
import ContentVideo from "./pages/learner-projectSubmiter/ContentVideo";
import Login from "./pages/Login";
import SubmitProject from "./pages/learner-projectSubmiter/SubmitProject";
import ApproveProjectMenu from "./pages/approver/ApproveProjectMenu";
import ApproveProjectDetails from "./pages/approver/ApproveProjectDetails";
import AdminDashboardProject from "./pages/admin/AdminDashboardProject";
import AdminDashboardElearning from "./pages/admin/AdminDashboardElearing";
import AdminReport from "./pages/admin/AdminReport";

// ใช้ค่าจาก .env 
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Centralized route definitions for better maintainability 
const ROUTES = {
  // Public Routes
  LOGIN: '/login',
  
  // Learner Routes
  CONTENT_MENU: '/contents',
  CONTENT_VIDEO: '/video',
  SUBMIT_PROJECT: '/submit-project',
  
  // Approver Routes
  APPROVER_PROJECT_MENU: '/approver/project-menu',
  APPROVER_PROJECT_DETAILS: '/approver/project-details',
  
  // Admin Routes
  ADMIN_DASHBOARD_PROJECT: '/admin/dashboard/project',
  ADMIN_DASHBOARD_ELEARNING: '/admin/dashboard/e-learning',
  ADMIN_REPORT: '/admin/report',
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
              path={ROUTES.APPROVER_PROJECT_MENU}
              element={
                <ProtectedRoute allowedRoles={['approver', 'admin']}>
                  <ApproveProjectMenu />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={ROUTES.APPROVER_PROJECT_DETAILS}
              element={
                <ProtectedRoute allowedRoles={['approver', 'admin']}>
                  <ApproveProjectDetails />
                </ProtectedRoute>
              } 
            />

            {/* Protected Routes for Admin */}
            <Route 
              path={ROUTES.ADMIN_DASHBOARD_PROJECT}
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboardProject />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={ROUTES.ADMIN_DASHBOARD_ELEARNING}
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboardElearning />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={ROUTES.ADMIN_REPORT}
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminReport />
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