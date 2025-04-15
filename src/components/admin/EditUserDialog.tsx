import { X, ChevronDown } from "lucide-react";
import { useState, useEffect, useCallback, memo } from "react";
import "./EditUserDialog.css";
import { useToast } from "../utils/Toast";

interface RoleOption {
  value: string;
  label: string;
  class?: string;
}

interface EditUserDialogProps {
  isOpen: boolean;
  userData: EditUserData | null;
  onClose: () => void;
  onSave: (data: EditUserData) => void;
  roles: RoleOption[];
}

export interface EditUserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Memoized role badge to prevent unnecessary re-renders
const RoleBadge = memo(({ role }: { role: string }) => {
  const getRoleClass = (roleName: string) => {
    switch (roleName.toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "manager":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getRoleClass(role)}`}
    >
      {role}
    </span>
  );
});

RoleBadge.displayName = "RoleBadge";

const EditUserDialog: React.FC<EditUserDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  userData,
  roles,
}) => {
  const { showToast } = useToast();
  const [isExiting, setIsExiting] = useState(false);
  
  const [formData, setFormData] = useState<EditUserData>({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  // Reset form when userData changes
  useEffect(() => {
    if (userData) {
      setFormData({ ...userData });
    }
  }, [userData]);

  useEffect(() => {
    // Reset isExiting when dialog is explicitly closed from parent
    if (!isOpen) {
      setIsExiting(false);
    }
  }, [isOpen]);

  // Handle modal closing with animation
  const handleClose = useCallback(() => {
    setIsExiting(true);
    // Wait for animation to complete before actual closing
    setTimeout(() => {
      onClose();
      setIsExiting(false); // Reset exiting state after closing
    }, 450); // Match the animation duration in CSS (slightly longer to ensure completion)
  }, [onClose]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      try {
        if (!formData.role) {
          showToast("กรุณาเลือกบทบาท", "error");
          return;
        }

        onSave(formData);
        showToast("บันทึกข้อมูลเรียบร้อยแล้ว", "success");
        handleClose(); // Use the same close handler to ensure animation
      } catch (error) {
        showToast("เกิดข้อผิดพลาดในการบันทึกข้อมูล", "error");
        console.error("Save error:", error);
      }
    },
    [formData, onSave, showToast, handleClose]
  );

  // If dialog is not open and is not in exiting state, don't render anything
  if (!isOpen && !isExiting) return null;

  const dialogClasses = `bg-white/95 rounded-lg shadow-2xl w-full max-w-md mx-4 luxury-dialog ${
    isExiting ? "dialog-exit" : ""
  }`;

  const overlayClasses = `fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/25 luxury-overlay ${
    isExiting ? "overlay-exit" : ""
  }`;

  return (
    <div className={overlayClasses}>
      <div className={dialogClasses}>
        <div className="flex justify-between items-center border-b border-gray-200/60 px-6 py-4">
          <h3 className="text-lg font-medium text-gray-800">
            แก้ไขข้อมูลผู้ใช้
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            {/* User ID (Read-only) */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID
              </label>
              <input
                type="text"
                readOnly
                value={formData.id}
                className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50/80 text-gray-500"
              />
            </div>

            {/* Name */}
            <div className="relative">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ชื่อผู้ใช้
              </label>
              <div className="relative">
                <div className="w-full px-3 py-2 bg-gray-50/80 text-gray-700 rounded-md border border-gray-200">
                  {formData.name || "-"}
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                อีเมล
              </label>
              <div className="relative">
                <div className="w-full px-3 py-2 bg-gray-50/80 text-gray-700 rounded-md border border-gray-200">
                  {formData.email || "-"}
                </div>
              </div>
            </div>

            {/* Role - Improved Dropdown */}
            <div className="relative">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                บทบาท
              </label>
              <div className="relative">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="appearance-none w-full px-3 py-2 pr-8 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400/60 transition-colors duration-200 bg-white cursor-pointer"
                  aria-label="Select role"
                >
                  {roles.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className={option.class}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              {/* Current Role Badge */}
              <div className="mt-2">
                <RoleBadge role={formData.role} />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 shadow-sm hover:shadow"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white transition-colors duration-200 shadow-sm hover:shadow"
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(EditUserDialog);