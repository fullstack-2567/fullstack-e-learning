import { CheckCircle2, Clock, XCircle } from "lucide-react";

interface TimelineItemProps {
  status: 'pending' | 'approved' | 'rejected';
  title: string;
  date?: string;
  approver?: string;
}

const TimelineItem = ({ status, title, date, approver }: TimelineItemProps) => {
    
  const getStatusIcon = () => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case 'rejected':
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
        {approver && <p className="text-sm text-gray-500">ผู้อนุมัติ: {approver}</p>}
      </div>
    </div>
  );
};

export default function SubmitSuccess() {
    const submittedProject = JSON.parse(localStorage.getItem("submittedProject") || "{}");

    const projectTitle = submittedProject.title || "โครงการของคุณ";
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900">ส่งโครงการสำเร็จ</h2>
        <p className="text-gray-600 mt-2">โครงการ {projectTitle}ได้ถูกส่งเข้าสู่ระบบแล้ว</p>
      </div>

      <div className="space-y-6">
        <TimelineItem 
          status="approved"
          title="ส่งโครงการ"
          date="8 เมษายน 2567"
        />
        <div className="w-0.5 h-6 bg-gray-200 ml-3"></div>
        <TimelineItem 
          status="pending"
          title="รออนุมัติจากผู้อนุมัติคนที่ 1"
        />
        <div className="w-0.5 h-6 bg-gray-200 ml-3"></div>
        <TimelineItem 
          status="pending"
          title="รออนุมัติจากผู้อนุมัติคนที่ 2"
        />
        <div className="w-0.5 h-6 bg-gray-200 ml-3"></div>
        <TimelineItem 
          status="pending"
          title="รออนุมัติจากผู้อนุมัติคนที่ 3"
        />
      </div>

      <div className="mt-8 text-center">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => window.location.href = '/submit-project'}
        >
          กลับสู่หน้าส่งโครงการ
        </button>
      </div>
    </div>
  );
}