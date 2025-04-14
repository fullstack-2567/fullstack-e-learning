import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminDashboardElearning() {
  return (
    <div className="flex">
      <div className="w-64 fixed h-screen">
        <AdminSidebar />
      </div>
      <div className="flex-1 min-h-screen bg-gray-100 p-8 ml-64">
      <AdminDashboard />
      </div>
    </div>
  );
}