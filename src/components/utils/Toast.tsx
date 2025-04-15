import { useEffect, useState, useCallback, memo, createContext, useContext, ReactNode } from 'react';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';
import './Toast.css';

// Make sure the CSS is properly imported and applied

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
}

// Memoize the Toast component to prevent unnecessary re-renders
const Toast = memo(({ 
  message, 
  type, 
  duration = 3000, 
  onClose 
}: ToastProps) => {
  // State to handle exit animation
  const [isExiting, setIsExiting] = useState(false);
  
  useEffect(() => {
    // Timer for auto closing
    const timer = setTimeout(() => {
      setIsExiting(true);
      // Add a slight delay before the actual removal to allow animation to complete
      setTimeout(() => {
        onClose();
      }, 300); // Match the animation duration
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getToastClasses = () => {
    const baseClasses = "toast flex items-center p-4 rounded-lg shadow-lg max-w-xs";
    const animationClass = isExiting ? "animate-toast-out" : "animate-toast-in";
    
    switch (type) {
      case 'success':
        return `${baseClasses} toast-success ${animationClass}`;
      case 'error':
        return `${baseClasses} toast-error ${animationClass}`;
      case 'info':
        return `${baseClasses} toast-info ${animationClass}`;
      default:
        return `${baseClasses} ${animationClass}`;
    }
  };

  // Handle manual close with animation
  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className={getToastClasses()}>
      <div className="flex items-center">
        <div className="toast-icon flex-shrink-0 mr-3">
          {getIcon()}
        </div>
        <div className="toast-message">
          {message}
        </div>
      </div>
      <button 
        onClick={handleClose}
        className="toast-close"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
});

Toast.displayName = 'Toast';

interface ToastContainerProps {
  toasts: Array<{
    id: string;
    message: string;
    type: ToastType;
  }>;
  removeToast: (id: string) => void;
}

// Memoize the ToastContainer for better performance
const ToastContainer = memo(({ 
  toasts, 
  removeToast 
}: ToastContainerProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-4">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
});

ToastContainer.displayName = 'ToastContainer';

// Toast Context Provider for global usage
interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Array<{
    id: string;
    message: string;
    type: ToastType;
  }>>([]);

  // Use useCallback for stable function references
  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};