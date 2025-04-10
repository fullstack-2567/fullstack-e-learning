import * as React from "react";
import { Link } from "react-router";
import { useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  User,
  LayoutDashboard,
  BarChart3,
  LogOut,
  FileText,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function AdminSidebar({ className }: SidebarProps) {
  const location = useLocation();
  const { logout } = useAuth();
  const currentPath = location.pathname;

  const menuItems = [
    {
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={18} />,
      label: "Dashboard",
    },
    {
      path: "/admin/courses",
      icon: <LayoutDashboard size={18} />,
      label: "คอร์สเรียน",
    },
    {
      path: "/admin/projectmanagement",
      icon: <LayoutDashboard size={18} />,
      label: "รายการโครงการ",
    },
    {
      path: "/admin/report",
      icon: <BarChart3 size={18} />,
      label: "รายงาน",
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-gradient-to-b from-[#606A9B] to-indigo-900 shadow-xl",
        className
      )}
    >
      <div className="p-6 border-b border-indigo-600">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-full">
            <User size={24} className="text-indigo-700" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white">Admin123</span>
            <span className="text-xs text-indigo-200">Administrator</span>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link to={item.path} key={item.path}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start rounded-lg mb-1 text-indigo-100 hover:text-white hover:bg-indigo-600 font-prompt transition-all duration-200",
                currentPath === item.path &&
                  "bg-indigo-800 text-white shadow-md"
              )}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Button>
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-indigo-600">
        <Button
          variant="ghost"
          className="w-full justify-start rounded-lg text-indigo-100 hover:text-white hover:bg-red-600 font-prompt transition-all duration-200"
          onClick={logout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          ออกจากระบบ
        </Button>
      </div>
    </div>
  );
}
