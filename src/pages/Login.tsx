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
import { getRouteByRole, useAuth } from "@/contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      console.log(user);
      document.cookie = `userId=${user.userId}; path=/;`;
      navigate(getRouteByRole(user.role));
    }
  }, [user]);

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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
