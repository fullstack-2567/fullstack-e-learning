import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { GoogleLogin } from '@react-oauth/google'

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const userData = localStorage.getItem('user_data');
      if (userData) {
        const user = JSON.parse(userData);
        if (user.role === 'admin') {
          navigate('/admin/dashboard/project');
        } else if (user.role === 'approver') {
          navigate('/approver/project-menu');
        } else {
          navigate('/contents');
        }
      }
    }
  }, [isAuthenticated, navigate]);

  // Function to handle Google login
  const handleGoogleLogin = async (googleToken: string) => {
    setLoading(true);
    setError('');
    
    try {
      await login(googleToken);
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.data?.error?.code) {
        setError(getErrorMessage(err.data.error.code));
      } else {
        setError('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
      }
    } finally {
      setLoading(false);
    }
  };

  // Map API error codes to user-friendly messages
  const getErrorMessage = (errorCode: string): string => {
    const errorMessages: Record<string, string> = {
      'AUTH_GOOGLE_FAILED': 'การยืนยันตัวตนด้วย Google ล้มเหลว',
      'AUTH_INVALID_TOKEN': 'โทเค็นการยืนยันตัวตนไม่ถูกต้อง',
      'AUTH_TOKEN_EXPIRED': 'โทเค็นการยืนยันตัวตนหมดอายุ',
      'AUTH_REFRESH_INVALID': 'Refresh token ไม่ถูกต้อง',
      'AUTH_REFRESH_EXPIRED': 'Refresh token หมดอายุ',
      'AUTH_USER_NOT_FOUND': 'ไม่พบบัญชีผู้ใช้',
      'AUTH_USER_DISABLED': 'บัญชีผู้ใช้ถูกปิดการใช้งาน'
    };
    
    return errorMessages[errorCode] || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ';
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center font-prompt">เข้าสู่ระบบ</CardTitle>
          <CardDescription className="text-center font-prompt">เข้าสู่ระบบด้วยบัญชี Google ของคุณ</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle className="font-prompt">ข้อผิดพลาด</AlertTitle>
              <AlertDescription className="font-prompt">{error}</AlertDescription>
            </Alert>
          )}
          
          {/* Google Login Button */}
          <div className="flex flex-col items-center  mt-2">
            <div className="text-center">
        
            </div>
            
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                  handleGoogleLogin(credentialResponse.credential);
                }
              }}
              onError={() => {
                setError('การเข้าสู่ระบบด้วย Google ล้มเหลว กรุณาลองอีกครั้ง');
              }}
              text="continue_with"
              shape="circle"
              locale="th"
              theme="outline"
              size="large"
            />
            
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