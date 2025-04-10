import AdminSidebar from "@/components/admin/AdminSidebar"; // Assuming this path is correct
import { useEffect, useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { pdf } from "@react-pdf/renderer";
import MyReport from "./ReportDocument";
import "./ReportComponent.css"; // Make sure this CSS file exists and contains the styles
import { Button } from "@/components/ui/button";
import ReportDocument from "./ReportDocument";
import {
  ContentsReportDto,
  ProjectsReportDto,
  UsersReportDto,
} from "@/utils/backend-openapi";
import { openApiclient } from "@/utils/api-client";

// Define types for the tabs
type MainTab = "e-learning" | "project";
type SubTab = "courses" | "users";

const ReportComponent: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState<MainTab>("e-learning");
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("courses");
  const [contentsReport, setContentsReport] = useState<ContentsReportDto[]>([]);
  const [usersReport, setUsersReport] = useState<UsersReportDto[]>([]);
  const [projectsReport, setProjectsReport] = useState<ProjectsReportDto[]>([]);

  const fetchData = async () => {
    try {
      const contentReponse = await openApiclient.getContentsReport();
      const userReponse = await openApiclient.getUsersReport();
      const projectReponse = await openApiclient.getProjectsReport();

      if (
        contentReponse.status === 200 &&
        userReponse.status === 200 &&
        projectReponse.status === 200
      ) {
        setContentsReport(contentReponse.data);
        setUsersReport(userReponse.data);
        setProjectsReport(projectReponse.data);
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

  const getFileName = () => {
    if (activeSubTab === "courses") return "courses-report.pdf";
    if (activeSubTab === "users") return "users-report.pdf";
    if (activeMainTab === "e-learning") return "projects-report.pdf";
    return "report.pdf";
  };

  console.log("Exporting PDF with:", {
    courseData:
      activeMainTab === "e-learning" && activeSubTab === "courses"
        ? contentsReport
        : [],
    userData:
      activeMainTab === "e-learning" && activeSubTab === "users"
        ? usersReport
        : [],
    projectData: activeMainTab === "project" ? projectsReport : [],
  });

  const handleGenerateReport = async () => {
    const blob = await pdf(
      <ReportDocument
        courseData={contentsReport}
        userData={usersReport}
        projectData={projectsReport}
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

  const renderPDF = () => {
    if (activeSubTab === "courses") {
      return (
        <MyReport courseData={contentsReport} userData={[]} projectData={[]} />
      );
    } else if (activeSubTab === "users") {
      console.log("user used");
      return (
        <MyReport courseData={[]} userData={usersReport} projectData={[]} />
      );
    } else if (activeMainTab === "project") {
      return (
        <MyReport courseData={[]} userData={[]} projectData={projectsReport} />
      );
    } else {
      return <MyReport courseData={[]} userData={[]} projectData={[]} />;
    }
  };

  return (
    <div className="flex">
      <div className="w-64 fixed h-screen">
        <AdminSidebar />
      </div>
      <div className="flex-1 min-h-screen bg-gray-100 p-8 ml-64">
        <div
          id="reportContainer"
          className="reportContent bg-white shadow-md rounded-lg p-6"
        >
          {/* Header */}
          <div className="header flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
            <h1 className="title text-2xl font-bold text-gray-700">
              รายงานสถิติ
            </h1>
            <Button onClick={handleGenerateReport}>ออกรายงาน</Button>
          </div>
          {/* Main Tabs */}
          <div className="mainTabs flex border-b-2 border-gray-300 mb-6 relative">
            <button
              className={`tabButton py-3 px-5 mr-1 text-gray-600 hover:text-gray-900 focus:outline-none border-b-3 ${
                activeMainTab === "e-learning"
                  ? "activeTab text-blue-600 font-semibold border-blue-600"
                  : "border-transparent"
              }`}
              onClick={() => setActiveMainTab("e-learning")}
            >
              E-learning
            </button>
            <button
              className={`tabButton py-3 px-5 mr-1 text-gray-600 hover:text-gray-900 focus:outline-none border-b-3 ${
                activeMainTab === "project"
                  ? "activeTab text-blue-600 font-semibold border-blue-600"
                  : "border-transparent"
              }`}
              onClick={() => setActiveMainTab("project")}
            >
              Project
            </button>
            {/* P Icon - may not be relevant for project tab? Hide/show conditionally if needed */}
            {activeMainTab === "e-learning" && (
              <span className="pIcon absolute right-0 top-0 -mt-2 mr-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">
                P
              </span>
            )}
          </div>
          {/* Content Area */}
          <div className="contentArea">
            {/* E-learning Content */}
            {activeMainTab === "e-learning" && (
              <>
                {/* Sub Tabs */}
                <div className="subTabs mb-6 flex">
                  <button
                    className={`subTabButton text-sm px-4 py-2 mr-2 rounded-full transition duration-200 focus:outline-none ${
                      activeSubTab === "courses"
                        ? "activeSubTab bg-gray-700 text-white font-semibold"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => setActiveSubTab("courses")}
                  >
                    คอร์สเรียน
                  </button>
                  <button
                    className={`subTabButton text-sm px-4 py-2 rounded-full transition duration-200 focus:outline-none ${
                      activeSubTab === "users"
                        ? "activeSubTab bg-gray-700 text-white font-semibold"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => setActiveSubTab("users")}
                  >
                    ผู้ใช้
                  </button>
                </div>

                {/* Courses Table */}
                {activeSubTab === "courses" && (
                  <div className="tableContainer overflow-x-auto">
                    <table className="reportTable w-full text-sm text-left text-gray-600">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                          <th className="py-3 px-4 w-[5%]">No.</th>
                          <th className="py-3 px-4 w-[35%]">Title</th>
                          <th className="py-3 px-4 w-[15%]">
                            จำนวนผู้เข้าเรียน
                          </th>
                          <th className="py-3 px-4 w-[15%]">
                            จำนวนผู้ที่จบครอส
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {contentsReport.map((course) => (
                          <tr
                            key={course.id}
                            className="bg-white border-b hover:bg-gray-50"
                          >
                            <td className="py-3 px-4">{course.id}.</td>
                            <td className="py-3 px-4">{course.title}</td>
                            <td className="py-3 px-4">
                              {course.studentsEnrolled}
                            </td>
                            <td className="py-3 px-4">
                              {course.studentsCompleted}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Users Table */}
                {activeSubTab === "users" && (
                  <div className="tableContainer overflow-x-auto">
                    <table className="reportTable w-full text-sm text-left text-gray-600">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                          <th className="py-3 px-4 w-[5%]">No.</th>
                          <th className="py-3 px-4 w-[40%]">ชื่อผู้ใช้</th>
                          <th className="py-3 px-4 w-[25%]">
                            จำนวนคอร์สที่เรียน
                          </th>
                          <th className="py-3 px-4 w-[25%]">จำนวนที่จบคอร์ส</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usersReport.map((user) => (
                          <tr
                            key={user.id}
                            className="bg-white border-b hover:bg-gray-50"
                          >
                            <td className="py-3 px-4">{user.id}.</td>
                            <td className="py-3 px-4">{user.name}</td>
                            <td className="py-3 px-4">{user.coursesTaken}</td>
                            <td className="py-3 px-4">
                              {user.coursesCompleted}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}

            {/*Project Content*/}
            {activeMainTab === "project" && (
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
            )}
          </div>
          {/* End Content Area */}
        </div>
        {/* End Report Container */}
      </div>
      {/* End Content Area Wrapper */}
    </div> /* End Main Flex Container */
  );
};

export default ReportComponent;
