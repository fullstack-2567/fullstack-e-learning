import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log(isAuthenticated);
      const userData = localStorage.getItem("user_data");
      if (userData) {
        const user = JSON.parse(userData);
        if (user.role === "admin") {
          navigate("/admin/dashboard/project");
        } else if (user.role === "approver") {
          navigate("/approver/project-menu");
        } else {
          navigate("/contents");
        }
      }
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center font-prompt">
            เข้าสู่ระบบ
          </CardTitle>
          <CardDescription className="text-center font-prompt">
            เข้าสู่ระบบด้วยบัญชี Google ของคุณ
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle className="font-prompt">ข้อผิดพลาด</AlertTitle>
              <AlertDescription className="font-prompt">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Google Login Button */}
          <div className="flex flex-col items-center  mt-2">
            <div className="text-center"></div>

            <a
              href={`${import.meta.env.VITE_API_BASE_URL}/auth/google`}
              className="group relative flex items-center justify-center w-full gap-3 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition hover:shadow-md hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <FcGoogle className="text-xl" />
              <span className="font-semibold tracking-wide">
                เข้าสู่ระบบด้วย Google
              </span>
            </a>
            {loading && (
              <div className="flex justify-center mt-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
