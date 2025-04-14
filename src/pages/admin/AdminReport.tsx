import AdminSidebar from "@/components/admin/AdminSidebar"; // Assuming this path is correct
import { useEffect, useState } from "react";

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
type MainTab = "e-learning" | "project" | "summary";
type SubTab = "courses" | "users";

const ReportComponent: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState<MainTab>("summary");
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("courses");
  const [contentsReport, setContentsReport] = useState<ContentsReportDto[]>([]);
  const [usersReport, setUsersReport] = useState<UsersReportDto[]>([]);
  const [projectsReport, setProjectsReport] = useState<ProjectsReportDto[]>([]);
  const [usersThatSentProjectsCnt, setUsersThatSentProjectCnt] = useState<number>(0);
  const [usersThatEnrollCoursesCnt, setUsersThatEnrollCoursesCnt] = useState<number>(0);

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
        console.log(contentReponse.data);
        console.log(userReponse.data);
        console.log(projectReponse.data)
        
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

  const calculateUserThatSentProjectCnt = () => {
    const uniqueUsers = new Set(projectsReport.map((project) => project.submitter));
    setUsersThatSentProjectCnt(uniqueUsers.size);
    console.log(uniqueUsers);
    
  }

  const calculateUserThatEnrollCoursesCnt = () => {
    let cnt = 0;
    contentsReport.forEach(content => cnt += content.studentsEnrolled)
    setUsersThatEnrollCoursesCnt(cnt);
  } 

  useEffect(() => {
    fetchData();
    calculateUserThatSentProjectCnt();
    calculateUserThatEnrollCoursesCnt();
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
              รายงานโดยสรุป
            </h1>
            <Button onClick={handleGenerateReport}>ออกรายงาน</Button>
          </div>
          {/* Content Area */}
          <div className="contentArea">
            
              <>

                <div className = "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-between text-center gap-5">
                  <div className = "bg-white flex gap-2 flex-col">
                    <p className = "text-xl">จำนวนผู้ใช้งานในปัจจุบัน (บัญชี)</p>
                    <h1 className = "text-4xl">{usersReport.length}</h1>
                  </div>
                  <div className = "bg-white flex gap-2 flex-col">
                    <p className = "text-xl">จำนวนผู้ใช้งานที่ลงทะเบียนเรียน (บัญชี)</p>
                    <h1 className = "text-4xl text-green-400">{usersThatEnrollCoursesCnt} ({( usersThatEnrollCoursesCnt / usersReport.length * 100).toFixed(1)}%)</h1>
                  </div>
                  <div className = "bg-white flex gap-2 flex-col">
                    <p className = "text-xl">จำนวนคอร์สเรียนทั้งสิ้น (คอร์สเรียน)</p>
                    <h1 className = "text-4xl text-blue-400">{contentsReport.length}</h1>
                  </div>
                  
                  <div className = "xl:col-span-3 gap-2 flex flex-col">
                  <p className = "text-xl">คอร์สที่มีผู้เรียนจบมากที่สุด 5 อันดับแรก</p>
                    <div className="tableContainer overflow-x-auto">
                        <table className="reportTable w-full text-sm text-left text-gray-600">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                              
                              <th className="py-3 px-4 w-[35%]">Title</th>
                              <th className="py-3 px-4 w-[15%]">
                                จำนวนผู้เข้าเรียน
                              </th>
                              <th className="py-3 px-4 w-[15%]">
                                จำนวนผู้ที่จบคอร์ส
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {contentsReport.sort((a,b) => a.studentsCompleted - b.studentsCompleted).filter((content, idx)=> idx < 5).map((course) => (
                              <tr
                                key={course.id}
                                className="bg-white border-b hover:bg-gray-50"
                              >
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

                  </div>
                  <div className = "xl:col-span-3 gap-2 flex flex-col">
                  <p className = "text-xl">คอร์สยอดนิยม 5 อันดับแรก</p>
                    <div className="tableContainer overflow-x-auto">
                        <table className="reportTable w-full text-sm text-left text-gray-600">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                              
                              <th className="py-3 px-4 w-[35%]">Title</th>
                              <th className="py-3 px-4 w-[15%]">
                                จำนวนผู้เข้าเรียน
                              </th>
                              <th className="py-3 px-4 w-[15%]">
                                จำนวนผู้ที่จบคอร์ส
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {contentsReport.sort((a,b) => a.studentsEnrolled - b.studentsEnrolled).filter((content, idx)=> idx < 5).map((course) => (
                              <tr
                                key={course.id}
                                className="bg-white border-b hover:bg-gray-50"
                              >
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

                  </div>
                

                  {/* Courses Table */}
                  
                  <div className = "xl:col-span-3 gap-2 flex flex-col">
                  <p className = "text-xl">คอร์สเรียนทั้งหมด</p>
                    <div className="tableContainer overflow-x-auto">
                      <table className="reportTable w-full text-sm text-left text-gray-600">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                          <tr>
                            <th className="py-3 px-4 w-[35%]">Title</th>
                            <th className="py-3 px-4 w-[15%]">
                              จำนวนผู้เข้าเรียน
                            </th>
                            <th className="py-3 px-4 w-[15%]">
                              จำนวนผู้ที่จบคอร์ส
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {contentsReport.map((course) => (
                            <tr
                              key={course.id}
                              className="bg-white border-b hover:bg-gray-50"
                            >
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
                  </div>
                </div>

              </>

            
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
