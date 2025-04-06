import AdminSidebar from "@/components/admin/AdminSidebar";
import { useState } from "react";
import "./ReportComponent.css"; // <-- updated

// Define the structure for the course data
interface CourseData {
  id: number;
  title: string;
  instructor: string;
  studentsEnrolled: string | number; // Can be 'XXX' or a number
  studentsCompleted: string | number; // Can be 'YYY' or a number
}

// Sample data based on the image
const sampleCourseData: CourseData[] = [
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

// Define types for the tabs
type MainTab = "e-learning" | "project";
type SubTab = "courses" | "users";

const ReportComponent: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState<MainTab>("e-learning");
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("courses");

  // In a real app, you would fetch this data
  const [courseData] = useState<CourseData[]>(sampleCourseData);

  const handleExportClick = () => {
    // Add logic here to export the report data (e.g., generate CSV/PDF)
    console.log("Export report clicked");
    alert("Export functionality not implemented yet.");
  };

  return (
    <div className="flex">
      <div className="w-64 fixed h-screen">
        <AdminSidebar />
      </div>
      <div className="flex-1 min-h-screen bg-gray-100 p-8 ml-64">
        <div className="reportContainer">
          <div className="header">
            <h1 className="title">รายงาน สถิติ</h1>
            <button className="exportButton" onClick={handleExportClick}>
              ออก รายงาน
            </button>
          </div>
          <div className="mainTabs">
            <button
              className={`tabButton ${activeMainTab === "e-learning" ? "activeTab" : ""}`}
              onClick={() => setActiveMainTab("e-learning")}
            >
              E-learning
            </button>
            <button
              className={`tabButton ${activeMainTab === "project" ? "activeTab" : ""}`}
              onClick={() => setActiveMainTab("project")}
            >
              Project
            </button>
            <span className="pIcon">P</span>
          </div>
          <div className="contentArea">
            {activeMainTab === "e-learning" && (
              <>
                <div className="subTabs">
                  <button
                    className={`subTabButton ${activeSubTab === "courses" ? "activeSubTab" : ""}`}
                    onClick={() => setActiveSubTab("courses")}
                  >
                    คอร์สเรียน
                  </button>
                  <button
                    className={`subTabButton ${activeSubTab === "users" ? "activeSubTab" : ""}`}
                    onClick={() => setActiveSubTab("users")}
                  >
                    ผู้ใช้
                  </button>
                </div>

                {activeSubTab === "courses" && (
                  <div className="tableContainer">
                    <table className="reportTable">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Title</th>
                          <th>Instructor</th>
                          <th>จำนวนผู้เข้าเรียน</th>
                          <th>จำนวนผู้ที่จบครอส</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courseData.map((course) => (
                          <tr key={course.id}>
                            <td>{course.id}.</td>
                            <td>{course.title}</td>
                            <td>{course.instructor}</td>
                            <td>{course.studentsEnrolled}</td>
                            <td>{course.studentsCompleted}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeSubTab === "users" && (
                  <div className="placeholderContent">
                    User statistics content would go here.
                  </div>
                )}
              </>
            )}

            {activeMainTab === "project" && (
              <div className="placeholderContent">
                Project statistics content would go here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportComponent;
