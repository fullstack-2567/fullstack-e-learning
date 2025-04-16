import { X } from "lucide-react";
import { useState, useEffect, useCallback, memo } from "react";
import "./EditUserDialog.css";
import { useToast } from "../utils/Toast";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface EditUserDialogProps {
  isOpen: boolean;
  userData: EditUserData | null;
  onClose: () => void;
  onSave: (data: EditUserData) => void;
  roles: string[]; // เปลี่ยนจาก RoleOption[]
}

export interface EditUserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

const RoleBadge = memo(({ role }: { role: string }) => {
  const getRoleClass = (roleName: string) => {
    switch (roleName.toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "project-approver":
        return "bg-green-100 text-green-800";
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

  useEffect(() => {
    if (userData && roles.length > 0) {
      const matched = roles.includes(userData.role);
      setFormData({
        ...userData,
        role: matched ? userData.role : roles[0], // fallback ปลอดภัย
      });
    }
  }, [userData, roles]);

  useEffect(() => {
    if (!isOpen) {
      setIsExiting(false);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
      setIsExiting(false);
    }, 450);
  }, [onClose]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.role) {
        showToast("กรุณาเลือกบทบาท", "error");
        return;
      }
      onSave(formData);
      showToast("บันทึกข้อมูลเรียบร้อยแล้ว", "success");
      handleClose();
    },
    [formData, onSave, showToast, handleClose]
  );

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

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ชื่อผู้ใช้
              </label>
              <div className="w-full px-3 py-2 bg-gray-50/80 text-gray-700 rounded-md border border-gray-200">
                {formData.name || "-"}
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                อีเมล
              </label>
              <div className="w-full px-3 py-2 bg-gray-50/80 text-gray-700 rounded-md border border-gray-200">
                {formData.email || "-"}
              </div>
            </div>

            {/* Role Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                บทบาท
              </label>
              {roles.length > 0 && formData.role && (
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, role: value }))
                  }
                >
                  <SelectTrigger className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50/80 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/60 transition-colors duration-200">
                    <SelectValue placeholder="เลือกบทบาท" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

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
