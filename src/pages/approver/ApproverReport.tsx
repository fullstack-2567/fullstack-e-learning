import AdminSidebar from "@/components/admin/AdminSidebar"; // Assuming this path is correct
import { useEffect, useState } from "react";
import "../admin/ReportComponent.css"; // Make sure this CSS file exists and contains the styles
import "./ApproverReport.css"
import { Button } from "@/components/ui/button";
import { Project, ProjectsReportDto } from "@/utils/backend-openapi";
import { openApiclient } from "@/utils/api-client";
import ApproverSidebar from "@/components/approver/ApproverSidebar";
import { pdf } from "@react-pdf/renderer";
import MyReport from "./ApproverReportDocument";

const ApproverReport: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [projectsReport, setProjectsReport] = useState<ProjectsReportDto[]>([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    projectType: "",
    sdgType: "",
    approvalStatus: ""
  });
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];


  const handleApprovedThisMonth = () => {
    setFilters((prev) => ({
      ...prev,
      approvalStatus: "approved",
      startDate: firstDayOfMonth,
      endDate: lastDayOfMonth
    }));
  };
  
  const handleRejectedThisMonth = () => {
    setFilters((prev) => ({
      ...prev,
      approvalStatus: "rejected",
      startDate: firstDayOfMonth,
      endDate: lastDayOfMonth
    }));
  };

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClear = () => {
    setFilters({
      startDate: "",
      endDate: "",
      projectType: "",
      sdgType: "",
      approvalStatus: ""
    });
  };

  const fetchData = async () => {
    try {
      const projectsResponse = await openApiclient.getAllProjects();
      const projectResponse = await openApiclient.getProjectsReport();

      if (projectResponse.status === 200 && projectsResponse.status === 200) {
        setProjectsReport(projectResponse.data);
        setProjects(projectsResponse.data);
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...projects];
  
      if (filters.startDate) {
        filtered = filtered.filter(project => new Date(project.submittedDT) >= new Date(filters.startDate));
      }
  
      if (filters.endDate) {
        filtered = filtered.filter(project => new Date(project.submittedDT) <= new Date(filters.endDate));
      }
  
      if (filters.projectType) {
        filtered = filtered.filter(project => project.projectType === filters.projectType);
      }
  
      if (filters.sdgType) {
        filtered = filtered.filter(project => project.sdgType === filters.sdgType);
      }
  
      if (filters.approvalStatus) {
        const statusMap: Record<string, string> = {
          approved: "ตรวจสอบสำเร็จ",
          "not-approved": "กำลังรอการตรวจสอบ",
          rejected: "ถูกปฏิเสธ", // or however you distinguish this
          pending: "กำลังรอการตรวจสอบ"
        };
        filtered = filtered.filter(project => getProjectStatus(project) === statusMap[filters.approvalStatus]);
      }
  
      setFilteredProjects(filtered);
      setIsFilterApplied(true);
    };
  
    applyFilters();
  }, [filters, projects]);

  const handleGenerateReport = async () => {
    console.log("projects", projects);
    console.log("filteredProjectData",filteredProjects );
    console.log("filters", filters);
    const blob = await pdf(
      <MyReport
        projectData={projects}
        filteredProjectData={filteredProjects}
        filters={filters}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "report.pdf";
    link.click();

    // Optional: clean up
    URL.revokeObjectURL(url);
  };
  

  const getProjectStatus = (project: any) => {
    if (project.rejectedDT) return "ถูกปฏิเสธ";
    if (project.thirdApprovedDT) return "ตรวจสอบสำเร็จ";
    if (project.secondApprovedDT) return "ผ่านการตรวจสอบรอบที่ 2";
    if (project.firstApprovedDT) return "ผ่านการตรวจสอบรอบที่ 1";
    return "กำลังรอการตรวจสอบ";
  };
  
  const selectFilter = () => {
    setShowFilterMenu(prev => !prev);
  };

  const projectTypeMap = {
    energy_and_environment: "พลังงานและสิ่งแวดล้อม",
    construction_and_infrastructure: "ก่อสร้างและโครงสร้างพื้นฐาน",
    agriculture_and_food: "เกษตรและอาหาร",
    materials_and_minerals: "วัสดุและแร่ธาตุ",
    finance_and_investment: "การเงินและการลงทุน",
    technology_and_innovation: "เทคโนโลยีและนวัตกรรม",
    medicine_and_health: "การแพทย์และสุขภาพ",
    human_resource_development: "พัฒนาทรัพยากรมนุษย์",
    manufacturing_and_automotive: "การผลิตและยานยนต์",
    electronics_and_retail: "อิเล็กทรอนิกส์และค้าปลีก",
    real_estate_and_urban_development: "อสังหาริมทรัพย์และพัฒนาเมือง",
    media_and_entertainment: "สื่อและบันเทิง",
    tourism_and_services: "การท่องเที่ยวและบริการ",
    society_and_community: "สังคมและชุมชน"
  };
  

  return (
    <div className="flex">
      <div className="w-64 fixed h-screen">
        <ApproverSidebar />
      </div>
      <div className="flex-1 min-h-screen bg-gray-100 p-8 ml-64">
        <div id="reportContainer" className="reportContent bg-white shadow-md rounded-lg p-6">
          {/* Header */}
          <div className="header flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
            <h1 className="title text-2xl font-bold text-gray-700">รายงาน</h1>
            <Button variant="outline" className="generate-report-button" onClick={handleGenerateReport}>
              ออกรายงาน
            </Button>
          </div>
          {/* Content Area */}
          <div className="contentArea w-260">
            <div className="total-summary">
              <div className="total-projects">
                <p className="text-lg font-semibold text-gray-700">
                  จำนวนโครงการทั้งหมด: {" "}
                  
                </p>
                <h2>{projectsReport.length}</h2>
              </div>
              <div className="pass-projects">
                <p className="text-lg font-semibold text-gray-700">
                  จำนวนโครงการที่ผ่านการอนุมัติ:{" "}
                </p>
                <h2>
                {projectsReport.filter((project) => project.status === "ตรวจสอบสำเร็จ").length}</h2>
              </div>
              <div className="fail-projects">
                <p className="text-lg font-semibold text-gray-700">
                  จำนวนโครงการที่ไม่ผ่านการอนุมัติ:{" "}
                </p>
                <h2>
                {projectsReport.filter((project) => project.status === "ถูกปฏิเสธ").length}</h2>
              </div>
              <div className="pending-projects">
                <p className="text-lg font-semibold text-gray-700">
                  จำนวนโครงการที่รอการอนุมัติ:{" "}
                </p>
                <h2>
                {projectsReport.filter((project) => project.status === "กำลังรอการตรวจสอบ").length}</h2>
              </div>
            </div>
            
            <div className="filter-button">
              <button className="filter" onClick={selectFilter}>ตัวกรอง</button>
              <button className="filter" onClick={handleApprovedThisMonth}>โครงการที่ผ่านในเดือนนี้</button>
              <button className="filter" onClick={handleRejectedThisMonth}>โครงการที่ถูกปฏิเสธในเดือนนี้</button>
            </div>
            {showFilterMenu && (
        <div className="filter-menu">
          <div className="filter-options">
            <div className="filter-panel">
              <div className="filter-group">
                <label htmlFor="startDate">วันที่เริ่มส่ง:</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleChange}
                />
              </div>

              <div className="filter-group">
                <label htmlFor="endDate">วันที่สิ้นสุด:</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleChange}
                />
              </div>

              <div className="filter-group">
                <label htmlFor="projectType">ประเภทของโครงการ:</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={filters.projectType}
                  onChange={handleChange}
                >
                  <option value="">-- เลือกประเภทโครงการ --</option>
                  <option value="energy_and_environment">พลังงานและสิ่งแวดล้อม</option>
                  <option value="construction_and_infrastructure">ก่อสร้างและโครงสร้างพื้นฐาน</option>
                  <option value="agriculture_and_food">เกษตรและอาหาร</option>
                  <option value="materials_and_minerals">วัสดุและแร่ธาตุ</option>
                  <option value="finance_and_investment">การเงินและการลงทุน</option>
                  <option value="technology_and_innovation">เทคโนโลยีและนวัตกรรม</option>
                  <option value="medicine_and_health">การแพทย์และสุขภาพ</option>
                  <option value="human_resource_development">พัฒนาทรัพยากรมนุษย์</option>
                  <option value="manufacturing_and_automotive">การผลิตและยานยนต์</option>
                  <option value="electronics_and_retail">อิเล็กทรอนิกส์และค้าปลีก</option>
                  <option value="real_estate_and_urban_development">อสังหาริมทรัพย์และพัฒนาเมือง</option>
                  <option value="media_and_entertainment">สื่อและบันเทิง</option>
                  <option value="tourism_and_services">การท่องเที่ยวและบริการ</option>
                  <option value="society_and_community">สังคมและชุมชน</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="sdgType">เป้าหมายการพัฒนาที่ยั่งยืน (SDG):</label>
                <select
                  id="sdgType"
                  name="sdgType"
                  value={filters.sdgType}
                  onChange={handleChange}
                >
                  <option value="">-- เลือก SDG --</option>
                  {[...Array(17)].map((_, i) => (
                    <option key={i + 1} value={`SDG${i + 1}`}>
                      SDG{i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="approvalStatus">สถานะของโครงการ:</label>
                <select
                  id="approvalStatus"
                  name="approvalStatus"
                  value={filters.approvalStatus}
                  onChange={handleChange}
                >
                  <option value="">-- เลือกสถานะ --</option>
                  <option value="pending">กำลังรอการตรวจสอบ</option>
                  <option value="approved">ตรวจสอบสำเร็จ</option>
                  <option value="not-approved">ถูกปฏิเสธ</option>
                </select>
              </div>
            </div>
          </div>
          <div className="submit-button">
            <button className="clear-filter" onClick={handleClear}>
              ล้างตัวกรอง
            </button>
          </div>
        </div>
      )}
            <div className="tableContainer overflow-x-auto">
              <table className="reportTable table-fixed min-w-[1800px] text-xs text-left text-gray-600">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th className="py-2 px-2 w-32">หมายเลขโครงการ</th>
                    <th className="py-2 px-2 w-4 ">ชื่อโครงการ(TH)</th>
                    <th className="py-2 px-2 w-8 ">ชื่อโครงการ(EN)</th>
                    <th className="py-2 px-2 w-8 ">ผู้ส่ง</th>
                    <th className="py-2 px-2 ">ประเภท</th>
                    <th className="py-2 px-2 w-26">SDGs</th>
                    <th className="py-2 px-2 w-36">วันที่ส่ง</th>
                    <th className="py-2 px-2 w-48">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {(isFilterApplied ? filteredProjects : projects).map((project, index) => (
                    <tr
                      key={project.projectId ?? index}
                      className={`border-b hover:bg-gray-50 ${
                        isFilterApplied ? "bg-gray-50 hover:bg-gray-100" : "bg-white"
                      }`}
                    >
                      <td className="py-1 px-2 w-12 truncate">{project.projectId}</td>
                      <td className="py-1 px-2 w-24 truncate">{project.projectThaiName}</td>
                      <td className="py-1 px-2 w-24 truncate">{project.projectEngName}</td>
                      <td className="py-1 px-2 w-24 truncate">
                        {project.submittedByUser.firstName} {project.submittedByUser.lastName}
                      </td>
                      <td className="py-1 px-2 w-24 truncate">
                        {projectTypeMap[project.projectType] || project.projectType}
                      </td>
                      <td className="py-1 px-2 w-16">{project.sdgType}</td>
                      <td className="py-1 px-2 w-24">
                        {new Date(project.submittedDT).toLocaleDateString("th-TH", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }).replace(/(\d+)\/(\d+)\/(\d+)/, "$1/$2/$3")}
                      </td>
                      <td className="py-1 px-2 w-24 truncate">{getProjectStatus(project)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* End Content Area */}
        </div>
        {/* End Report Container */}
      </div>
      {/* End Content Area Wrapper */}
    </div>
  );
};

export default ApproverReport;
