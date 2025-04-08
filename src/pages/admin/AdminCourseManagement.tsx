import AdminSidebar from "@/components/admin/AdminSidebar";
import ContentManagement from "@/components/admin/ContentManagement";

export default function AdminCourseManagement() {
  return (
    <div className="flex">
      <div className="w-64 fixed h-screen">
        <AdminSidebar />
      </div>
      <div className="flex-1 min-h-screen bg-gray-100 px-8 pb-8 pt-0 ml-64">
        <ContentManagement />
      </div>
    </div>
  );
}