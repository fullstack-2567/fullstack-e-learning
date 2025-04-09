import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, getRouteByRole } from "../contexts/AuthContext";

type Role = "user" | "admin" | "project-approver";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: Role[];
}

export const ProtectedRoute = ({
  children,
  allowedRoles = [],
}: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading, refreshToken } = useAuth();
  const location = useLocation();

  // Attempt to refresh token if it's about to expire
  useEffect(() => {
    // Check token freshness
    const checkAndRefreshToken = async () => {
      // We would normally check token expiry here
      // For now we just force a refresh if user is authenticated but no user data
      if (isAuthenticated && !user) {
        await refreshToken();
      }
    };

    checkAndRefreshToken();
  }, [isAuthenticated, user, refreshToken, location.pathname]);

  // Show loading state with improved UI
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-gray-600 font-prompt">
          กำลังตรวจสอบการเข้าสู่ระบบ...
        </p>
      </div>
    );
  }

  // Check if user is not authenticated
  if (!isAuthenticated) {
    // Save the attempted URL for redirecting after login
    console.log("not authenticated");
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Check role restrictions (if any)
  if (
    allowedRoles.length > 0 &&
    user?.role &&
    !allowedRoles.includes(user.role)
  ) {
    // Redirect to appropriate dashboard based on role using centralized function
    return <Navigate to={getRouteByRole(user.role)} replace />;
  }

  // Add an extra layer of security - if we don't have a user object, something is wrong
  if (!user) {
    console.error(
      "Protected route accessed with isAuthenticated=true but no user data"
    );
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
