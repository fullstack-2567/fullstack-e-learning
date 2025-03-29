import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminReport() {
  return (
    <div className="flex">
      <div className="w-64 fixed h-screen">
        <AdminSidebar />
      </div>
      <div className="flex-1 min-h-screen bg-gray-100 p-8 ml-64">
        //เนื้อหา Report
      </div>
    </div>
  );
}