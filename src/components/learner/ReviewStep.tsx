import React from "react";
import { SubmitProjectDto, User } from "@/utils/backend-openapi";

// Maps for reference data
const PROJECT_TYPES_MAP = {
  energy_and_environment: "พลังงานและสิ่งแวดล้อม",
  food_and_agriculture: "อาหารและการเกษตร",
  health_and_medicine: "สุขภาพและการแพทย์",
  education: "การศึกษา",
  other: "อื่นๆ",
};

const SDG_TYPES_MAP = {
  SDG1: "SDG 1: No Poverty",
  SDG2: "SDG 2: Zero Hunger",
  SDG3: "SDG 3: Good Health and Well-being",
  SDG4: "SDG 4: Quality Education",
  SDG5: "SDG 5: Gender Equality",
  SDG6: "SDG 6: Clean Water and Sanitation",
  SDG7: "SDG 7: Affordable and Clean Energy",
  SDG8: "SDG 8: Decent Work and Economic Growth",
  SDG9: "SDG 9: Industry, Innovation and Infrastructure",
  SDG10: "SDG 10: Reduced Inequality",
  SDG11: "SDG 11: Sustainable Cities and Communities",
  SDG12: "SDG 12: Responsible Consumption and Production",
  SDG13: "SDG 13: Climate Action",
  SDG14: "SDG 14: Life Below Water",
  SDG15: "SDG 15: Life on Land",
  SDG16: "SDG 16: Peace, Justice and Strong Institutions",
  SDG17: "SDG 17: Partnerships for the Goals",
};

const PREFIX_MAP = {
  mr: "นาย",
  master: "เด็กชาย",
  mrs: "นาง",
  miss: "นางสาว",
  girl: "เด็กหญิง",
  other: "อื่นๆ",
};

const EDUCATION_MAP = {
  primary: "ประถมศึกษา",
  secondary: "มัธยมศึกษา",
  vocational: "ปวช./ปวส.",
  bachelor: "ปริญญาตรี",
  master: "ปริญญาโท",
  doctorate: "ปริญญาเอก",
  other: "อื่นๆ",
};

const GENDER_MAP = {
  male: "ชาย",
  female: "หญิง",
  other: "อื่นๆ",
};

interface ReviewStepProps {
  projectData: SubmitProjectDto;
  userData: User;
  projectList: { name: string; id: string }[];
}

const ReviewStep: React.FC<ReviewStepProps> = ({
  projectData,
  userData,
  projectList,
}) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Find parent project name if exists
  const getParentProjectName = () => {
    if (!projectData.parentProjectID) return null;

    const parentProject = projectList.find(
      (project) => project.id === projectData.parentProjectID
    );
    return parentProject ? parentProject.name : "ไม่พบข้อมูลโครงการ";
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        ตรวจสอบข้อมูล
      </h2>

      {/* Project Information Review */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="bg-blue-50 px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium text-blue-800">ข้อมูลโครงการ</h3>
        </div>

        <div className="divide-y divide-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 px-4 py-3">
            <div className="font-medium text-gray-600">ชื่อโครงการภาษาไทย</div>
            <div className="md:col-span-2 mt-1 md:mt-0">
              {projectData.projectThaiName}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 px-4 py-3">
            <div className="font-medium text-gray-600">
              ชื่อโครงการภาษาอังกฤษ
            </div>
            <div className="md:col-span-2 mt-1 md:mt-0">
              {projectData.projectEngName}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 px-4 py-3">
            <div className="font-medium text-gray-600">สรุปโครงการ</div>
            <div className="md:col-span-2 mt-1 md:mt-0 whitespace-pre-line">
              {projectData.projectSummary}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 px-4 py-3">
            <div className="font-medium text-gray-600">ระยะเวลาโครงการ</div>
            <div className="md:col-span-2 mt-1 md:mt-0">
              {formatDate(projectData.startDate)} ถึง{" "}
              {formatDate(projectData.endDate)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 px-4 py-3">
            <div className="font-medium text-gray-600">ประเภทโครงการ</div>
            <div className="md:col-span-2 mt-1 md:mt-0">
              {PROJECT_TYPES_MAP[
                projectData.projectType as keyof typeof PROJECT_TYPES_MAP
              ] || projectData.projectType}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 px-4 py-3">
            <div className="font-medium text-gray-600">
              เป้าหมายการพัฒนาที่ยั่งยืน
            </div>
            <div className="md:col-span-2 mt-1 md:mt-0">
              {SDG_TYPES_MAP[
                projectData.sdgType as keyof typeof SDG_TYPES_MAP
              ] || projectData.sdgType}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 px-4 py-3">
            <div className="font-medium text-gray-600">
              ไฟล์รายละเอียดโครงการ
            </div>
            <div className="md:col-span-2 mt-1 md:mt-0">
              {projectData.projectDescriptionFile
                ? "มีไฟล์แนบ"
                : "ไม่มีไฟล์แนบ"}
            </div>
          </div>

          {projectData.parentProjectID && (
            <div className="grid grid-cols-1 md:grid-cols-3 px-4 py-3">
              <div className="font-medium text-gray-600">โครงการต้นแบบ</div>
              <div className="md:col-span-2 mt-1 md:mt-0">
                {getParentProjectName()}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Information Review */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="bg-green-50 px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium text-green-800">ข้อมูลผู้ใช้</h3>
        </div>

        <div className="divide-y divide-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 px-4 py-3">
            <div className="font-medium text-gray-600">ชื่อ-นามสกุล</div>
            <div className="md:col-span-2 mt-1 md:mt-0">
              {PREFIX_MAP[userData.prefix as keyof typeof PREFIX_MAP] || ""}{" "}
              {userData.firstName} {userData.lastName}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 px-4 py-3">
            <div className="font-medium text-gray-600">วันเกิด</div>
            <div className="md:col-span-2 mt-1 md:mt-0">
              {formatDate(userData.birthDate)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 px-4 py-3">
            <div className="font-medium text-gray-600">เพศ</div>
            <div className="md:col-span-2 mt-1 md:mt-0">
              {GENDER_MAP[userData.sex as keyof typeof GENDER_MAP] ||
                userData.sex}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 px-4 py-3">
            <div className="font-medium text-gray-600">ระดับการศึกษา</div>
            <div className="md:col-span-2 mt-1 md:mt-0">
              {EDUCATION_MAP[
                userData.education as keyof typeof EDUCATION_MAP
              ] || userData.education}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 px-4 py-3">
            <div className="font-medium text-gray-600">อีเมล</div>
            <div className="md:col-span-2 mt-1 md:mt-0">{userData.email}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 px-4 py-3">
            <div className="font-medium text-gray-600">เบอร์โทรศัพท์</div>
            <div className="md:col-span-2 mt-1 md:mt-0">{userData.tel}</div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-700">
          กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนทำการส่ง เมื่อยืนยันการส่งข้อมูลแล้ว
          จะไม่สามารถแก้ไขข้อมูลได้
        </p>
      </div>
    </div>
  );
};

export default ReviewStep;
