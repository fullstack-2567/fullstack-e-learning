import AdminSidebar from "@/components/admin/AdminSidebar"; // Assuming this path is correct
import { useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import MyReport from "./ReportDocument";
import "./ReportComponent.css"; // Make sure this CSS file exists and contains the styles
import { Button } from "@/components/ui/button";

// Define the structure for the course data
interface CourseData {
  id: number;
  title: string;
  instructor: string;
  studentsEnrolled: string | number;
  studentsCompleted: string | number;
}

// Define the structure for the user data
interface UserData {
  id: number;
  username: string;
  coursesTaken: string | number;
  coursesCompleted: string | number;
}

// --- NEW: Define the structure for the project data ---
interface ProjectData {
  id: number;
  projectName: string;
  submitter: string; // Assuming 'ผู้ส่งโปรเจกต์' is the submitter name/ID
  status: string;
}

// Sample data for courses
const sampleCourseData: CourseData[] = [
  // ... (course data remains the same)
  {
    id: 1,
    title: "Python in 4 hours",
    instructor: "James Mars",
    studentsEnrolled: "XXX",
    studentsCompleted: "YYY",
  },
  {
    id: 2,
    title: "Calculus 2",
    instructor: "Harvard University",
    studentsEnrolled: "XXX",
    studentsCompleted: "YYY",
  },
  {
    id: 3,
    title: "Microsoft Excel",
    instructor: "Microsoft",
    studentsEnrolled: "XXX",
    studentsCompleted: "YYY",
  },
  {
    id: 4,
    title: "Machine learning for every one",
    instructor: "Sindy Yung",
    studentsEnrolled: "XXX",
    studentsCompleted: "YYY",
  },
  {
    id: 5,
    title: "Harvard CS50",
    instructor: "Harvard University",
    studentsEnrolled: "XXX",
    studentsCompleted: "YYY",
  },
  {
    id: 6,
    title: "Linux for ethical hackers",
    instructor: "Harvard University",
    studentsEnrolled: "XXX",
    studentsCompleted: "YYY",
  },
];

// Sample data for users
const sampleUserData: UserData[] = [
  // ... (user data remains the same)
  {
    id: 1,
    username: "Gachimuchi",
    coursesTaken: "XXX",
    coursesCompleted: "YYY",
  },
  {
    id: 2,
    username: "Billy Herrington",
    coursesTaken: "XXX",
    coursesCompleted: "YYY",
  },
  {
    id: 3,
    username: "Van Darkholme",
    coursesTaken: "XXX",
    coursesCompleted: "YYY",
  },
  {
    id: 4,
    username: "Mark Wolff",
    coursesTaken: "XXX",
    coursesCompleted: "YYY",
  },
  {
    id: 5,
    username: "Danny Lee",
    coursesTaken: "XXX",
    coursesCompleted: "YYY",
  },
  {
    id: 6,
    username: "Terebi-Chan",
    coursesTaken: "XXX",
    coursesCompleted: "YYY",
  },
  {
    id: 7,
    username: "Terebi-Duncan MillsChan",
    coursesTaken: "XXX",
    coursesCompleted: "YYY",
  },
  {
    id: 8,
    username: "Anthony Stone",
    coursesTaken: "XXX",
    coursesCompleted: "YYY",
  },
  {
    id: 9,
    username: "Alexander Vishnevsky",
    coursesTaken: "XXX",
    coursesCompleted: "YYY",
  },
  {
    id: 10,
    username: "Steve Rambo",
    coursesTaken: "XXX",
    coursesCompleted: "YYY",
  },
  {
    id: 11,
    username: "Lynn Ross",
    coursesTaken: "XXX",
    coursesCompleted: "YYY",
  },
  {
    id: 12,
    username: "Chi Chi LaRue",
    coursesTaken: "XXX",
    coursesCompleted: "YYY",
  },
  {
    id: 13,
    username: "Ricardo Milos",
    coursesTaken: "XXX",
    coursesCompleted: "YYY",
  },
];

// --- NEW: Sample data for projects based on the third image ---
const sampleProjectData: ProjectData[] = [
  {
    id: 1,
    projectName: "Gachimuchi",
    submitter: "XXX",
    status: "ลงทะเบียนเสร็จสิ้น",
  }, // Registration Complete
  {
    id: 2,
    projectName: "Billy Herrington",
    submitter: "XXX",
    status: "ลงทะเบียนเสร็จสิ้น",
  }, // Registration Complete
  {
    id: 3,
    projectName: "Van Darkholme",
    submitter: "XXX",
    status: "ผ่านการตรวจสอบรอบที่ 1",
  }, // Passed Review Round 1
  {
    id: 4,
    projectName: "Mark Wolff",
    submitter: "XXX",
    status: "ผ่านการตรวจสอบรอบที่ 1",
  }, // Passed Review Round 1
  {
    id: 5,
    projectName: "Danny Lee",
    submitter: "XXX",
    status: "ผ่านการตรวจสอบรอบที่ 1",
  }, // Passed Review Round 1
  {
    id: 6,
    projectName: "Terebi-Chan",
    submitter: "XXX",
    status: "ผ่านการตรวจสอบรอบที่ 2",
  }, // Passed Review Round 2
  {
    id: 7,
    projectName: "Terebi-Duncan MillsChan",
    submitter: "XXX",
    status: "ผ่านการตรวจสอบรอบที่ 2",
  }, // Passed Review Round 2
  {
    id: 8,
    projectName: "Anthony Stone",
    submitter: "XXX",
    status: "ผ่านการตรวจสอบรอบที่ 2",
  }, // Passed Review Round 2
  {
    id: 9,
    projectName: "Alexander Vishnevsky",
    submitter: "XXX",
    status: "ผ่านการตรวจสอบรอบที่ 3",
  }, // Passed Review Round 3
  {
    id: 10,
    projectName: "Steve Rambo",
    submitter: "XXX",
    status: "ตรวจสอบสำเร็จ",
  }, // Review Successful
  {
    id: 11,
    projectName: "Lynn Ross",
    submitter: "XXX",
    status: "ตรวจสอบสำเร็จ",
  }, // Review Successful
  {
    id: 12,
    projectName: "Chi Chi LaRue",
    submitter: "XXX",
    status: "ตรวจสอบสำเร็จ",
  }, // Review Successful
  {
    id: 13,
    projectName: "Ricardo Milos",
    submitter: "XXX",
    status: "ตรวจสอบสำเร็จ",
  }, // Review Successful
];

// Define types for the tabs
type MainTab = "e-learning" | "project";
type SubTab = "courses" | "users";

const ReportComponent: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState<MainTab>("e-learning");
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("courses");

  // Data states
  const [courseData] = useState<CourseData[]>(sampleCourseData);
  const [userData] = useState<UserData[]>(sampleUserData);
  const [projectData] = useState<ProjectData[]>(sampleProjectData); // Add project data state

  const getFileName = () => {
    if (activeSubTab === "courses") return "courses-report.pdf";
    if (activeSubTab === "users") return "users-report.pdf";
    if (activeMainTab === "e-learning") return "projects-report.pdf";
    return "report.pdf";
  };

  console.log("Exporting PDF with:", {
    courseData:
      activeMainTab === "e-learning" && activeSubTab === "courses"
        ? courseData
        : [],
    userData:
      activeMainTab === "e-learning" && activeSubTab === "users"
        ? userData
        : [],
    projectData: activeMainTab === "project" ? projectData : [],
  });

  const renderPDF = () => {
    if (activeSubTab === "courses") {
      return (
        <MyReport courseData={courseData} userData={[]} projectData={[]} />
      );
    } else if (activeSubTab === "users") {
      return <MyReport courseData={[]} userData={userData} projectData={[]} />;
    } else if (activeMainTab === "project") {
      return (
        <MyReport courseData={[]} userData={[]} projectData={projectData} />
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
            <PDFDownloadLink document={renderPDF()} fileName={getFileName()}>
              {({ loading }) =>
                loading ? (
                  <Button disabled>กำลังโหลด...</Button>
                ) : (
                  <Button>ออกรายงาน</Button>
                )
              }
            </PDFDownloadLink>
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
                          <th className="py-3 px-4 w-[25%]">Instructor</th>
                          <th className="py-3 px-4 w-[15%]">
                            จำนวนผู้เข้าเรียน
                          </th>
                          <th className="py-3 px-4 w-[15%]">
                            จำนวนผู้ที่จบครอส
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {courseData.map((course) => (
                          <tr
                            key={course.id}
                            className="bg-white border-b hover:bg-gray-50"
                          >
                            <td className="py-3 px-4">{course.id}.</td>
                            <td className="py-3 px-4">{course.title}</td>
                            <td className="py-3 px-4">{course.instructor}</td>
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
                        {userData.map((user) => (
                          <tr
                            key={user.id}
                            className="bg-white border-b hover:bg-gray-50"
                          >
                            <td className="py-3 px-4">{user.id}.</td>
                            <td className="py-3 px-4">{user.username}</td>
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
                    {projectData.map((project) => (
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
