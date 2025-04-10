import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { Project } from "@/utils/backend-openapi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { openApiclient } from "@/utils/api-client";
import { formatDate } from "@/utils/dateUtils";

interface TimelineItemProps {
  status: "pending" | "approved" | "rejected";
  title: string;
  date?: string;
  approver?: string;
}

const TimelineItem = ({ status, title, date, approver }: TimelineItemProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case "rejected":
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Clock className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <div className="flex gap-4 items-start">
      <div className="flex-shrink-0 mt-1">{getStatusIcon()}</div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{title}</h3>
        {date && <p className="text-sm text-gray-500">วันที่: {date}</p>}
        {approver && (
          <p className="text-sm text-gray-500">ผู้อนุมัติ: {approver}</p>
        )}
      </div>
    </div>
  );
};

export default function SubmitSuccess() {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);

  const fetchProject = async () => {
    try {
      const response = await openApiclient.getProjectById(projectId);
      const data = response.data;
      setProject(data);
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการโหลดข้อมูลโครงการ");
    }
  };

  const formatTimelineDate = (dateString: string | undefined) => {
    if (!dateString) {
      return "";
    }
    const date = new Date(dateString);
    return formatDate(date);
  };

  useEffect(() => {
    if (projectId && !project) {
      fetchProject();
    }
  }, [projectId]);

  return (
    <div className="flex min-h-dvh justify-center items-center w-full">
      {project === null ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลดข้อมูลโครงการ...</p>
        </div>
      ) : (
        <div className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-md">
          <div className="text-center mb-8">
            {project.rejectedDT ? (
              <>
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  โครงการถูกปฏิเสธ
                </h2>
                <p className="text-gray-600 mt-2 text-sm">
                  โครงการ {project.projectThaiName} ถูกปฏิเสธเมื่อวันที่{" "}
                  {formatTimelineDate(project.rejectedDT)}
                </p>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  ส่งโครงการสำเร็จ
                </h2>
                <p className="text-gray-600 mt-2">
                  โครงการ {project.projectThaiName} ถูกส่งเข้าสู่ระบบแล้ว
                </p>
              </>
            )}
          </div>

          <div className="space-y-6">
            <TimelineItem
              status="approved"
              title="ส่งโครงการ"
              date={formatTimelineDate(project.submittedDT)}
            />
            <div className="w-0.5 h-6 bg-gray-200 ml-3"></div>
            <TimelineItem
              status={
                project.firstApprovedDT
                  ? "approved"
                  : project.rejectedDT && !project.firstApprovedDT
                    ? "rejected"
                    : "pending"
              }
              title="การอนุมัติครั้งที่ 1"
              date={formatTimelineDate(
                project.rejectedDT && !project.firstApprovedDT
                  ? project.rejectedDT
                  : project.firstApprovedDT
              )}
            />
            <div className="w-0.5 h-6 bg-gray-200 ml-3"></div>
            <TimelineItem
              status={
                project.secondApprovedDT
                  ? "approved"
                  : project.rejectedDT && !project.secondApprovedDT
                    ? "rejected"
                    : "pending"
              }
              title="การอนุมัติครั้งที่ 2"
              date={formatTimelineDate(
                project.rejectedDT && !project.secondApprovedDT
                  ? project.rejectedDT
                  : project.secondApprovedDT
              )}
            />
            <div className="w-0.5 h-6 bg-gray-200 ml-3"></div>
            <TimelineItem
              status={
                project.thirdApprovedDT
                  ? "approved"
                  : project.rejectedDT && !project.thirdApprovedDT
                    ? "rejected"
                    : "pending"
              }
              title="การอนุมัติครั้งที่ 3"
              date={formatTimelineDate(
                project.rejectedDT && !project.thirdApprovedDT
                  ? project.rejectedDT
                  : project.thirdApprovedDT
              )}
            />
          </div>

          <div className="mt-8 text-center">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => navigate("/contents")}
            >
              กลับสู่หน้าแรก
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
