import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";

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

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes for Learner/Project Submiter */}
            <Route 
              path="/contents" 
              element={
                <ProtectedRoute>
                  <ContentMenu />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/video" 
              element={
                <ProtectedRoute>
                  <ContentVideo />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/submit-project" 
              element={
                <ProtectedRoute>
                  <SubmitProject />
                </ProtectedRoute>
              } 
            />

            {/* Protected Routes for Approver */}
            <Route 
              path="/approver/project-menu" 
              element={
                <ProtectedRoute allowedRoles={['approver', 'admin']}>
                  <ApproveProjectMenu />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/approver/project-details" 
              element={
                <ProtectedRoute allowedRoles={['approver', 'admin']}>
                  <ApproveProjectDetails />
                </ProtectedRoute>
              } 
            />

            {/* Protected Routes for Admin */}
            <Route 
              path="/admin/dashboard/project" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboardProject />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/dashboard/e-learning" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboardElearning />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/report" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminReport />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}