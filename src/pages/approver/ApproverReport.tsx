import AdminSidebar from "@/components/admin/AdminSidebar"; // Assuming this path is correct
import { useEffect, useState } from "react";
import "../admin/ReportComponent.css"; // Make sure this CSS file exists and contains the styles
import { Button } from "@/components/ui/button";
import { Project, ProjectsReportDto } from "@/utils/backend-openapi";
import { openApiclient } from "@/utils/api-client";
import ApproverSidebar from "@/components/approver/ApproverSidebar";

const ApproverReport: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsReport, setProjectsReport] = useState<ProjectsReportDto[]>([]);

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

  return (
    <div className="flex">
      <div className="w-64 fixed h-screen">
        <ApproverSidebar />
      </div>
      <div className="flex-1 min-h-screen bg-gray-100 p-8 ml-64">
        <div
          id="reportContainer"
          className="reportContent bg-white shadow-md rounded-lg p-6"
        >
          {/* Header */}
          <div className="header flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
            <h1 className="title text-2xl font-bold text-gray-700">รายงาน</h1>
            <Button>ออกรายงาน</Button>
          </div>
          {/* Content Area */}
          <div className="contentArea">
            <div className="tableContainer overflow-x-auto">
              <table className="reportTable w-full text-sm text-left text-gray-600">
                <tbody>
                  {projectsReport.map((project) => (
                    <tr
                      key={project.id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">{project.id}.</td>
                      <td className="py-3 px-4">{project.projectName}</td>
                      <td className="py-3 px-4">{project.submitter}</td>
                      <td className="py-3 px-4">{project.status}</td>
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
