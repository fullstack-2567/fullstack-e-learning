import React, { useState } from "react";
import { SubmitProjectDto } from "@/utils/backend-openapi";

// Project types
const PROJECT_TYPES = [
  { value: "energy_and_environment", label: "พลังงานและสิ่งแวดล้อม" },
  {
    value: "construction_and_infrastructure",
    label: "การก่อสร้างและโครงสร้าง",
  },
  { value: "agriculture_and_food", label: "การเกษตรและอาหาร" },
  { value: "materials_and_minerals", label: "วัสดุและแร่ธาตุ" },
  { value: "finance_and_investment", label: "การเงินและการลงทุน" },
  { value: "technology_and_innovation", label: "เทคโนโลยีและนวัตกรรม" },
  { value: "medicine_and_health", label: "การแพทย์และสุขภาพ" },
  {
    value: "human_resource_development",
    label: "การศึกษาและพัฒนาทรัพยากรมนุษย์",
  },
  {
    value: "manufacturing_and_automotive",
    label: "อุตสาหกรรมการผลิตและหุ่นยนต์",
  },
  { value: "electronics_and_retail", label: "พาณิชย์อิเล็กทรอนิกส์และค้าปลีก" },
  {
    value: "real_estate_and_urban_development",
    label: "อสังหาริมทรัพย์และการพัฒนาเมือง",
  },
  { value: "media_and_entertainment", label: "สื่อและบันเทิง" },
  { value: "tourism_and_services", label: "การท่องเที่ยวและบริการ" },
  { value: "society_and_community", label: "สังคมและชุมชน" },
];

// SDG types
const SDG_TYPES = [
  { value: "SDG1", label: "SDG 1: No Poverty" },
  { value: "SDG2", label: "SDG 2: Zero Hunger" },
  { value: "SDG3", label: "SDG 3: Good Health and Well-being" },
  { value: "SDG4", label: "SDG 4: Quality Education" },
  { value: "SDG5", label: "SDG 5: Gender Equality" },
  { value: "SDG6", label: "SDG 6: Clean Water and Sanitation" },
  { value: "SDG7", label: "SDG 7: Affordable and Clean Energy" },
  { value: "SDG8", label: "SDG 8: Decent Work and Economic Growth" },
  { value: "SDG9", label: "SDG 9: Industry, Innovation and Infrastructure" },
  { value: "SDG10", label: "SDG 10: Reduced Inequality" },
  { value: "SDG11", label: "SDG 11: Sustainable Cities and Communities" },
  { value: "SDG12", label: "SDG 12: Responsible Consumption and Production" },
  { value: "SDG13", label: "SDG 13: Climate Action" },
  { value: "SDG14", label: "SDG 14: Life Below Water" },
  { value: "SDG15", label: "SDG 15: Life on Land" },
  { value: "SDG16", label: "SDG 16: Peace, Justice and Strong Institutions" },
  { value: "SDG17", label: "SDG 17: Partnerships for the Goals" },
];

interface ProjectInfoStepProps {
  data: SubmitProjectDto;
  errors: Record<string, string>;
  updateData: (field: string, value: any) => void;
  projectList: { name: string; id: string }[];
}

const ProjectInfoStep: React.FC<ProjectInfoStepProps> = ({
  data,
  errors,
  updateData,
  projectList,
}) => {
  const [showParentProject, setShowParentProject] = useState(
    !!data.parentProjectID
  );

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result?.toString();
        if (base64String) {
          // ส่งค่า base64 ทั้งหมดรวม data:application/... prefix
          updateData("projectDescriptionFile", base64String);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error handling file upload:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        ข้อมูลโครงการ
      </h2>

      {/* Project Thai Name */}
      <div className="space-y-2">
        <label
          htmlFor="projectThaiName"
          className="block text-sm font-medium text-gray-700"
        >
          ชื่อโครงการภาษาไทย <span className="text-red-500">*</span>
        </label>
        <input
          id="projectThaiName"
          type="text"
          value={data.projectThaiName}
          onChange={(e) => updateData("projectThaiName", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.projectThaiName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="กรอกชื่อโครงการภาษาไทย"
        />
        {errors.projectThaiName && (
          <p className="text-red-500 text-sm">{errors.projectThaiName}</p>
        )}
      </div>

      {/* Project English Name */}
      <div className="space-y-2">
        <label
          htmlFor="projectEngName"
          className="block text-sm font-medium text-gray-700"
        >
          ชื่อโครงการภาษาอังกฤษ <span className="text-red-500">*</span>
        </label>
        <input
          id="projectEngName"
          type="text"
          value={data.projectEngName}
          onChange={(e) => updateData("projectEngName", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.projectEngName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter project name in English"
        />
        {errors.projectEngName && (
          <p className="text-red-500 text-sm">{errors.projectEngName}</p>
        )}
      </div>

      {/* Project Summary */}
      <div className="space-y-2">
        <label
          htmlFor="projectSummary"
          className="block text-sm font-medium text-gray-700"
        >
          สรุปโครงการ <span className="text-red-500">*</span>
        </label>
        <textarea
          id="projectSummary"
          value={data.projectSummary}
          onChange={(e) => updateData("projectSummary", e.target.value)}
          rows={4}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.projectSummary ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="กรอกรายละเอียดโครงการโดยย่อ"
        />
        {errors.projectSummary && (
          <p className="text-red-500 text-sm">{errors.projectSummary}</p>
        )}
      </div>

      {/* Project Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            วันที่เริ่มต้นโครงการ <span className="text-red-500">*</span>
          </label>
          <input
            id="startDate"
            type="date"
            value={data.startDate}
            onChange={(e) => updateData("startDate", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.startDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm">{errors.startDate}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            วันที่สิ้นสุดโครงการ <span className="text-red-500">*</span>
          </label>
          <input
            id="endDate"
            type="date"
            value={data.endDate}
            onChange={(e) => updateData("endDate", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.endDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm">{errors.endDate}</p>
          )}
        </div>
      </div>

      {/* Project Type */}
      <div className="space-y-2">
        <label
          htmlFor="projectType"
          className="block text-sm font-medium text-gray-700"
        >
          ประเภทโครงการ <span className="text-red-500">*</span>
        </label>
        <select
          id="projectType"
          value={data.projectType}
          onChange={(e) => updateData("projectType", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.projectType ? "border-red-500" : "border-gray-300"
          }`}
        >
          {PROJECT_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p className="text-red-500 text-sm">{errors.projectType}</p>
        )}
      </div>

      {/* SDG Type */}
      <div className="space-y-2">
        <label
          htmlFor="sdgType"
          className="block text-sm font-medium text-gray-700"
        >
          เป้าหมายการพัฒนาที่ยั่งยืน (SDG){" "}
          <span className="text-red-500">*</span>
        </label>
        <select
          id="sdgType"
          value={data.sdgType}
          onChange={(e) => updateData("sdgType", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.sdgType ? "border-red-500" : "border-gray-300"
          }`}
        >
          {SDG_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.sdgType && (
          <p className="text-red-500 text-sm">{errors.sdgType}</p>
        )}
      </div>

      {/* Project Description File */}
      <div className="space-y-2">
        <label
          htmlFor="projectDescriptionFile"
          className="block text-sm font-medium text-gray-700"
        >
          ไฟล์รายละเอียดโครงการ <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center">
          <input
            id="projectDescriptionFile"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
          <label
            htmlFor="projectDescriptionFile"
            className={`cursor-pointer px-4 py-2 border rounded-md focus:outline-none hover:bg-gray-50 ${
              errors.projectDescriptionFile
                ? "border-red-500 text-red-500"
                : "border-gray-300 text-gray-700"
            }`}
          >
            เลือกไฟล์
          </label>
          <span className="ml-3 text-sm text-gray-500">
            {data.projectDescriptionFile
              ? "ไฟล์พร้อมอัปโหลดแล้ว"
              : "ยังไม่ได้เลือกไฟล์"}
          </span>
        </div>
        {errors.projectDescriptionFile && (
          <p className="text-red-500 text-sm">
            {errors.projectDescriptionFile}
          </p>
        )}
        <p className="text-xs text-gray-500">
          รองรับไฟล์ PDF, DOC, DOCX ขนาดไม่เกิน 10MB
        </p>
      </div>

      {/* Parent Project */}
      <div className="space-y-2">
        <div className="flex items-center mb-2">
          <input
            id="hasParentProject"
            type="checkbox"
            checked={showParentProject}
            onChange={(e) => setShowParentProject(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="hasParentProject"
            className="ml-2 text-sm font-medium text-gray-700"
          >
            โครงการนี้เป็นโครงการต่อเนื่อง/ต่อยอด
          </label>
        </div>

        {showParentProject && (
          <div className="pl-6 border-l-2 border-gray-200 mt-2">
            <label
              htmlFor="parentProjectID"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              เลือกโครงการต้นแบบ
            </label>
            <select
              id="parentProjectID"
              value={data.parentProjectID || ""}
              onChange={(e) =>
                updateData("parentProjectID", e.target.value || undefined)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">- เลือกโครงการ -</option>
              {projectList.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectInfoStep;
