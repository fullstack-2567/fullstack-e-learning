import ApproverSidebar from "@/components/approver/ApproverSidebar";

export default function ApproverDashboardProject() {
  return (
    <div className="flex">
      <div className="w-64 fixed h-screen">
        <ApproverSidebar />
      </div>
      <div className="flex-1 min-h-screen bg-gray-100 p-8 ml-64">//เนื้อหา</div>
    </div>
  );
}
