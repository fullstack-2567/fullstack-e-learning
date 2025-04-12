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
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

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

  const mockUsersPerMonthData = [
    {
      month: "1/2568",
      users: "0"
    },
    {
      month: "2/2568",
      users: "7"
    },
    {
      month: "3/2568",
      users: "8"
    },
    {
      month: "4/2568",
      users: "9"
    },
  ]

  const mockProjectsPerMonthData = [
    {
      month: "1/2568",
      projects: "20"
    },
    {
      month: "2/2568",
      projects: "48"
    },
    {
      month: "3/2568",
      projects: "50"
    },
    {
      month: "4/2568",
      projects: "60"
    },
  ]

  const mockContentsPerMonthData = [
    {
      month: "1/2568",
      contents: "2"
    },
    {
      month: "2/2568",
      contents: "7"
    },
    {
      month: "3/2568",
      contents: "45"
    },
    {
      month: "4/2568",
      contents: "88"
    },
  ]

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
    // const uniqueUsers = new Set(contentsReport.map((content) => content.))
    setUsersThatEnrollCoursesCnt(999);
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
          {/* Main Tabs */}
          <div className="mainTabs flex border-b-2 border-gray-300 mb-6 relative">
            <button
              className ={`tabButton py-3 px-5 mr-1 text-gray-600 hover:text-gray-900 focus:outline-none border-b-3 ${
                activeMainTab === "summary"
                  ? "activeTab text-blue-600 font-semibold border-blue-600"
                  : "border-transparent"
              }`}
              onClick={() => setActiveMainTab("summary")}
            >
              Summary
            </button>
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
            {/* Summary */}
            {activeMainTab === "summary" && (
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
                  <p className = "text-xl">จำนวนผู้ใช้งานที่ส่งโปรเจกต์ (บัญชี)</p>
                  <h1 className = "text-4xl text-green-400">{usersThatSentProjectsCnt} ({( usersThatSentProjectsCnt / usersReport.length * 100).toFixed(1)}%)</h1>
                </div>
                <div className = "bg-white flex gap-2 flex-col">
                  <p className = "text-xl">จำนวนโปรเจกต์ทั้งสิ้น (โปรเจกต์)</p>
                  <h1 className = "text-4xl text-blue-400">{projectsReport.length}</h1>
                </div>
                <div className = "bg-white flex gap-2 flex-col">
                  <p className = "text-xl">จำนวนคอร์สเรียนทั้งสิ้น (คอร์สเรียน)</p>
                  <h1 className = "text-4xl text-blue-400">{contentsReport.length}</h1>
                </div>
                <div className = "bg-white flex gap-2 flex-col">
                  <p className = "text-xl">จำนวนบัญชีที่ถูกแบน (บัญชี)</p>
                  <h1 className = "text-4xl text-red-400">{999}</h1>
                </div>
                <div className = "xl:col-span-3 gap-2 flex flex-col">
                  <p className = "text-xl">จำนวนของบัญชีในแต่ละเดือน</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={mockUsersPerMonthData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <Line type="monotone" dataKey="users" stroke="#8884d8" />
                      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                      <XAxis dataKey="month" />
                      <YAxis />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className = "xl:col-span-3 gap-2 flex flex-col">
                  <p className = "text-xl">จำนวนโปรเจกต์ในแต่ละเดือน</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={mockProjectsPerMonthData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <Line type="monotone" dataKey="projects" stroke="#8884d8" />
                      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                      <XAxis dataKey="month" />
                      <YAxis />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className = "xl:col-span-3 gap-2 flex flex-col">
                <p className = "text-xl">คอร์สที่มีผู้เรียนจบมากที่สุด 5 อันดับแรก</p>
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

                </div>
                <div className = "xl:col-span-3 gap-2 flex flex-col">
                <p className = "text-xl">คอร์สยอดนิยม 5 อันดับแรก</p>
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

                </div>
              </div>
              
            )

            }
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
