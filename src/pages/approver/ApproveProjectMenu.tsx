import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllProject } from "@/api/ProjectApi";
import { Project } from "@/utils/backend-openapi";
import ApproverNavbar from "@/components/approver/ApproverNavbar";
import ApproverSidebar from "@/components/approver/ApproverSidebar";

export default function ApproveProjectMenu() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getAllProject();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch projects");
        setLoading(false);
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) =>
          project.projectThaiName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.projectEngName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.projectSummary
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          getProjectStatus(project)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [searchTerm, projects]);

  const getProjectStatus = (project: Project): string => {
    if (project.thirdApprovedDT) {
      return "อนุมัติแล้ว";
    } else if (project.secondApprovedDT) {
      return "รอการตรวจสอบครั้งที่ 3";
    } else if (project.firstApprovedDT) {
      return "รอการตรวจสอบครั้งที่ 2";
    } else if (project.rejectedDT) {
      return "ไม่อนุมัติ";
    } else {
      return "รอการตรวจสอบครั้งที่ 1";
    }
  };

  const totalPages = Math.ceil(filteredProjects.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex">
      <div className="w-64 fixed h-screen">
        <ApproverSidebar />
      </div>

      <div className="flex-1 pl-64">
        <div className="min-h-screen bg-gray-100 p-6">
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2">จัดการโครงการ</h1>
          </div>

          <Card className="w-full">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl">Project List</CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <div className="p-4 bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      placeholder="Search..."
                      className="pl-10 bg-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
                  <p className="mt-4 text-gray-600">กำลังโหลดข้อมูล...</p>
                </div>
              ) : error ? (
                <div className="p-8 text-center text-red-500">
                  <p>{error}</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => window.location.reload()}
                  >
                    ลองใหม่
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="p-4 w-10">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                        </th>
                        <th className="p-4 w-14 font-medium text-sm">
                          <div className="flex items-center gap-1">
                            # <ChevronDown size={14} />
                          </div>
                        </th>
                        <th className="p-4 font-medium text-sm">
                          <div className="flex items-center gap-1">
                            ชื่อโครงการ <ChevronDown size={14} />
                          </div>
                        </th>
                        <th className="p-4 font-medium text-sm">คำอธิบาย</th>
                        <th className="p-4 font-medium text-sm">
                          <div className="flex items-center gap-1">
                            สถานะ <ChevronDown size={14} />
                          </div>
                        </th>
                        <th className="p-4 font-medium text-sm text-center">
                          จัดการ
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedProjects.length > 0 ? (
                        paginatedProjects.map((project, index) => (
                          <tr
                            key={project.projectId}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="p-4 w-10">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300"
                              />
                            </td>
                            <td className="p-4 w-14 align-top">
                              {startIndex + index + 1}
                            </td>
                            <td className="p-4 font-medium align-top">
                              {project.projectThaiName}
                            </td>
                            <td className="p-4 text-sm align-top">
                              {project.projectSummary}
                            </td>
                            <td className="p-4 align-top">
                              <Badge
                                variant="secondary"
                                className="text-[#606A9B] bg-[#606A9B]/15"
                              >
                                {getProjectStatus(project)}
                              </Badge>
                            </td>
                            <td className="p-4 text-sm align-top">
                              <Link
                                to={`/approver/project-details/${project.projectId}`}
                              >
                                <Button className="bg-[#606A9B]">จัดการ</Button>
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={6}
                            className="p-8 text-center text-gray-500"
                          >
                            ไม่พบโครงการที่ตรงกับการค้นหา
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="p-4 flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Rows per page:</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 gap-1 px-2">
                        {rowsPerPage} <ChevronDown size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {[5, 10, 15, 20].map((value) => (
                        <DropdownMenuItem
                          key={value}
                          onClick={() => {
                            setRowsPerPage(value);
                            setCurrentPage(1); // Reset to first page when changing rows per page
                          }}
                        >
                          {value}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    {currentPage}/{totalPages || 1}
                  </span>
                  <div className="flex">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-r-none border-r-0"
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-l-none"
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages || totalPages === 0}
                    >
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
