import { useEffect, useState } from "react";
import LearningNavbar from "@/components/learner/LearnerNavbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDistanceToNow } from "date-fns";
import { th } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { Project } from "@/utils/backend-openapi";
import { openApiclient } from "@/utils/api-client";
import { ROUTES } from "@/App";

// Component สำหรับแสดงสถานะการอนุมัติ
const ApprovalStatus = ({ project }: { project: Project }) => {
  if (project.rejectedDT) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        ถูกปฏิเสธ
      </span>
    );
  } else if (project.thirdApprovedDT) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        อนุมัติแล้ว
      </span>
    );
  } else if (project.secondApprovedDT) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        รออนุมัติครั้งที่ 3
      </span>
    );
  } else if (project.firstApprovedDT) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        รออนุมัติครั้งที่ 2
      </span>
    );
  } else {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        รออนุมัติครั้งที่ 1
      </span>
    );
  }
};

// Function สำหรับแปลงประเภทโครงการเป็นภาษาไทย
const getProjectTypeText = (type: string) => {
  const types: { [key: string]: string } = {
    energy_and_environment: "พลังงานและสิ่งแวดล้อม",
    construction_and_infrastructure: "การก่อสร้างและโครงสร้างพื้นฐาน",
    agriculture_and_food: "การเกษตรและอาหาร",
    materials_and_minerals: "วัสดุและแร่ธาตุ",
    finance_and_investment: "การเงินและการลงทุน",
    technology_and_innovation: "เทคโนโลยีและนวัตกรรม",
    medicine_and_health: "การแพทย์และสุขภาพ",
    human_resource_development: "การพัฒนาทรัพยากรมนุษย์",
    manufacturing_and_automotive: "การผลิตและยานยนต์",
    electronics_and_retail: "อิเล็กทรอนิกส์และการค้าปลีก",
    real_estate_and_urban_development: "อสังหาริมทรัพย์และการพัฒนาเมือง",
    media_and_entertainment: "สื่อและความบันเทิง",
    tourism_and_services: "การท่องเที่ยวและบริการ",
    society_and_community: "สังคมและชุมชน",
  };
  return types[type] || type;
};

// Function สำหรับแปลง SDG Type เป็นข้อความที่อ่านง่าย
const getSDGTypeText = (type: string) => {
  const types: { [key: string]: string } = {
    SDG1: "1: ขจัดความยากจน",
    SDG2: "2: ขจัดความหิวโหย",
    SDG3: "3: การมีสุขภาพและความเป็นอยู่ที่ดี",
    SDG4: "4: การศึกษาที่เท่าเทียม",
    SDG5: "5: ความเท่าเทียมทางเพศ",
    SDG6: "6: การจัดการน้ำและสุขาภิบาล",
    SDG7: "7: พลังงานสะอาดที่ทุกคนเข้าถึงได้",
    SDG8: "8: การจ้างงานที่มีคุณค่าและการเติบโตทางเศรษฐกิจ",
    SDG9: "9: อุตสาหกรรม นวัตกรรม โครงสร้างพื้นฐาน",
    SDG10: "10: ลดความเหลื่อมล้ำ",
    SDG11: "11: เมืองและถิ่นฐานมนุษย์อย่างยั่งยืน",
    SDG12: "12: แผนการบริโภคและการผลิตที่ยั่งยืน",
    SDG13: "13: การรับมือการเปลี่ยนแปลงสภาพภูมิอากาศ",
    SDG14: "14: การใช้ประโยชน์จากมหาสมุทรและทรัพยากรทางทะเล",
    SDG15: "15: การใช้ประโยชน์จากระบบนิเวศทางบก",
    SDG16: "16: สังคมสงบสุข ยุติธรรม ไม่แบ่งแยก",
    SDG17: "17: ความร่วมมือเพื่อการพัฒนาที่ยั่งยืน",
  };
  return types[type] || type;
};

export default function ProjectLists() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // เรียกข้อมูลโครงการทั้งหมดของผู้ใช้
        const response = await openApiclient.getUserProjects(); // ✅ เรียก API ด้วย Operation ID
        const data: any = response.data; // Explicitly typing as 'any' to avoid type errors

        if (Array.isArray(data)) {
          setProjects(data);
        } else if (data && typeof data === "object") {
          const possibleArrayProperties = [
            "data",
            "projects",
            "items",
            "results",
          ];
          for (const prop of possibleArrayProperties) {
            if (Array.isArray(data[prop])) {
              setProjects(data[prop]);
              return;
            }
          }

          if (typeof data === "object" && "projectId" in data) {
            setProjects([data]);
          } else {
            console.error("Unexpected API response format:", data);
            setProjects([]);
          }
        } else {
          console.error("Unexpected API response:", data);
          setProjects([]);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("ไม่สามารถโหลดข้อมูลโครงการได้");
        setProjects([]); // กำหนดให้เป็นอาร์เรย์ว่าง
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleViewDetails = (projectId: string) => {
    navigate(ROUTES.PROJECT_SUBMIT_SUCCESS_VIEW(projectId));
  };

  const getFilteredProjects = () => {
    const filtered =
      filterStatus === "all"
        ? projects
        : projects.filter((project) => {
            if (filterStatus === "approved") return !!project.thirdApprovedDT;
            if (filterStatus === "rejected") return !!project.rejectedDT;
            if (filterStatus === "pending")
              return !project.rejectedDT && !project.thirdApprovedDT;
            return true;
          });

    return filtered.sort(
      (a, b) =>
        new Date(b.submittedDT).getTime() - new Date(a.submittedDT).getTime()
    );
  };

  // ฟังก์ชันสำหรับเรนเดอร์โครงการแต่ละรายการ
  const renderProjectList = () => {
    // ตรวจสอบว่า projects เป็นอาร์เรย์และมีข้อมูลหรือไม่
    if (!Array.isArray(projects) || projects.length === 0) {
      return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-16 text-center">
            <p className="text-gray-500">คุณยังไม่มีโครงการในระบบ</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => navigate(ROUTES.PROJECT_SUBMIT_PROJECT)}
            >
              สร้างโครงการใหม่
            </button>
          </div>
        </div>
      );
    }

    // ถ้าเป็นอาร์เรย์และมีข้อมูล
    return (
      <>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          {/* ส่วนหัวของตาราง + filter */}
          <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-200 rounded-t-lg">
            <h2 className="text-base font-semibold text-gray-800">
              รายการโครงการ
            </h2>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">สถานะ:</span>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[160px] h-9 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white">
                  <SelectValue placeholder="เลือกสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="pending">รออนุมัติ</SelectItem>
                  <SelectItem value="approved">อนุมัติแล้ว</SelectItem>
                  <SelectItem value="rejected">ถูกปฏิเสธ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  โครงการ
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ประเภท
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  SDG
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  วันที่ยื่น
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  สถานะ
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  การดำเนินการ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getFilteredProjects().map((project: Project) => (
                <tr key={project.projectId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {project.projectThaiName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {project.projectEngName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {getProjectTypeText(project.projectType)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {getSDGTypeText(project.sdgType)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(project.submittedDT).toLocaleDateString("th-TH")}
                    <div className="text-xs text-gray-400">
                      {formatDistanceToNow(new Date(project.submittedDT), {
                        addSuffix: true,
                        locale: th,
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ApprovalStatus project={project} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleViewDetails(project.projectId)}
                      className="text-blue-600 hover:text-blue-900 font-medium"
                    >
                      ดูรายละเอียด
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => navigate(ROUTES.PROJECT_SUBMIT_PROJECT)}
          >
            สร้างโครงการใหม่
          </button>
        </div>
      </>
    );
  };

  return (
    <div>
      <LearningNavbar />
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              โครงการทั้งหมดของฉัน
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              รายการโครงการที่คุณได้ยื่นเข้าสู่ระบบ
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
              <p>{error}</p>
              <button
                className="mt-2 text-sm font-medium text-red-600 hover:text-red-800"
                onClick={() => window.location.reload()}
              >
                ลองใหม่อีกครั้ง
              </button>
            </div>
          ) : (
            renderProjectList()
          )}
        </div>
      </div>
    </div>
  );
}
