import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Project } from "@/utils/backend-openapi";
import ApproverSidebar from "@/components/approver/ApproverSidebar";
import { openApiclient } from "@/utils/api-client";

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
        const res = await openApiclient.getAllProjects();
        const data = res.data;
        setProjects(data);
        setFilteredProjects(data);
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
    setCurrentPage(1);
  }, [searchTerm, projects]);

  const getProjectStatus = (project: Project): string => {
    if (project.rejectedDT) {
      return "ไม่อนุมัติ";
    } else if (project.thirdApprovedDT) {
      return "อนุมัติแล้ว";
    } else if (project.secondApprovedDT) {
      return "รอการตรวจสอบครั้งที่ 3";
    } else if (project.firstApprovedDT) {
      return "รอการตรวจสอบครั้งที่ 2";
    } else {
      return "รอการตรวจสอบครั้งที่ 1";
    }
  };

  const getStatusBadgeColor = (project: Project): string => {
    if (project.thirdApprovedDT) {
      return "text-green-700 bg-green-100";
    } else if (project.rejectedDT) {
      return "text-red-700 bg-red-100";
    } else {
      return "text-[#606A9B] bg-[#606A9B]/15";
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
            <p className="text-gray-600">รายการโครงการทั้งหมดที่รอการอนุมัติ</p>
          </div>

          <Card className="w-full">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl">Project List</CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              {/* Search bar */}
              <div className="p-4 bg-gray-50">
                <div className="relative max-w-md w-full">
                  <div className="flex items-center border rounded-xl overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                    <div className="pl-3 flex items-center">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="font-prompt w-full px-3 py-2 bg-transparent focus:outline-none"
                      style={{
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Loading and error states */}
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
                  {/* Project table */}
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left">
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
                            <td className="p-4 w-14 align-top">
                              {startIndex + index + 1}
                            </td>
                            <td className="p-4 font-medium align-top">
                              <div>{project.projectThaiName}</div>
                              <div className="text-sm text-gray-500">
                                {project.projectEngName}
                              </div>
                            </td>
                            <td className="p-4 text-sm align-top">
                              <div className="line-clamp-2">
                                {project.projectSummary}
                              </div>
                            </td>
                            <td className="p-4 align-top">
                              <Badge
                                variant="secondary"
                                className={getStatusBadgeColor(project)}
                              >
                                {getProjectStatus(project)}
                              </Badge>
                            </td>
                            <td className="p-4 text-sm align-top text-center">
                              <Link
                                to={`/approver/project-details/${project.projectId}`}
                              >
                                <Button className="bg-[#606A9B] hover:bg-[#4A5179]">
                                  จัดการ
                                </Button>
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

              {/* Pagination controls */}
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
