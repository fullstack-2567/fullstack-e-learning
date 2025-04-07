import { BrowserRouter as Router, Routes, Route } from "react-router";
import ContentMenu from "./pages/learner-projectSubmiter/ContentMenu";
import ContentVideo from "./pages/learner-projectSubmiter/ContentVideo";
import Login from "./pages/Login";
import SubmitProject from "./pages/learner-projectSubmiter/SubmitProject";
import ApproveProjectMenu from "./pages/approver/ApproveProjectMenu";
import ApproveProjectDetails from "./pages/approver/ApproveProjectDetails";
import AdminDashboardProject from "./pages/admin/AdminDashboardProject";
import AdminDashboardElearning from "./pages/admin/AdminDashboardElearing";
import AdminReport from "./pages/admin/AdminReport";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminPM from "./pages/admin/AdminPM";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* เดี๋ยวตอนแรกเราทำแบบนี้ไปก่อนนะ ไว้มี login ละค่อยไปทำ protected path*/}  

        {/* All Roles */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Role Learner + Project Submiter */}
        <Route path="/contents" element={<ContentMenu />} />
        <Route path="/video" element={<ContentVideo />} />
        <Route path="/submit-project" element={<SubmitProject />} />

        {/* Role Approver */}
        <Route path="/approver/project-menu" element={<ApproveProjectMenu />} />
        <Route path="/approver/project-details" element={<ApproveProjectDetails />} />

        {/* Role Admin */}
        <Route path="/admin/dashboard/project" element={<AdminDashboardProject />} />
        <Route path="/admin/dashboard/e-learning" element={<AdminDashboardElearning />} />
        <Route path="/admin/report" element={<AdminReport />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/projectmanagement" element={<AdminPM />} />

      </Routes>
    </Router>
  );
}