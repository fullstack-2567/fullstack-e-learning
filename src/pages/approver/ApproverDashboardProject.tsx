import ApproverSidebar from "@/components/approver/ApproverSidebar";
import ApproverDashboard from "@/components/approver/ApproverDashboard";

export default function ApproverDashboardProject() {
  return (
    <div className="flex">
      <div className="w-64 fixed h-screen">
        <ApproverSidebar />
      </div>
      <div className="flex-1 min-h-screen bg-gray-100 p-8 ml-64">
        <ApproverDashboard/>
      </div>
    </div>
  );
}
