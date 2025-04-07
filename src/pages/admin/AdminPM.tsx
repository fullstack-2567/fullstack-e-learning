import AdminSidebar from "@/components/admin/AdminSidebar";
import { useState, useEffect, useMemo } from "react";
import "./AdminPM.css";

// Data Structure 
interface ProjectListItem {
  id: number;
  name: string;
  description: string;
  statusTag: string;
}

//  Sample Data 
const sampleProjectData: ProjectListItem[] = [
  {
    id: 1,
    name: "โครงการพัฒนาระบบการ...",
    description: "เพื่อลดต้นทุนโลจิสติกส์และเพิ่มประสิทธิภาพการกระจายสินค้า...",
    statusTag: "Completed",
  },
  {
    id: 2,
    name: "Project Alpha",
    description: "Description for Alpha project focusing on innovation.",
    statusTag: "In Progress",
  },
  {
    id: 3,
    name: "Beta Initiative",
    description: "Research and development for the Beta platform.",
    statusTag: "Planning",
  },
  {
    id: 4,
    name: "Gamma Rollout",
    description: "Deployment phase for the Gamma feature set.",
    statusTag: "Completed",
  },
  {
    id: 5,
    name: "Delta Upgrade",
    description: "System upgrade project Delta.",
    statusTag: "On Hold",
  },
  {
    id: 6,
    name: "Epsilon Integration",
    description: "Integrating Epsilon module with core system.",
    statusTag: "In Progress",
  },
  {
    id: 7,
    name: "Zeta Marketing Campaign",
    description: "Launch campaign for Zeta product line.",
    statusTag: "Planning",
  },
  {
    id: 8,
    name: "Eta Compliance Audit",
    description: "Internal audit for Eta compliance standards.",
    statusTag: "Completed",
  },
  {
    id: 9,
    name: "Theta Platform Migration",
    description: "Migrating Theta services to new infrastructure.",
    statusTag: "In Progress",
  },
  {
    id: 10,
    name: "Iota User Research",
    description: "Gathering user feedback for Iota features.",
    statusTag: "Planning",
  },
  {
    id: 11,
    name: "Kappa Performance Tuning",
    description: "Optimizing performance of the Kappa module.",
    statusTag: "In Progress",
  },
];

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50];

// Component Implementation
const ProjectManagementPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProjectIds, setSelectedProjectIds] = useState<Set<number>>(
    new Set()
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    ROWS_PER_PAGE_OPTIONS[0]
  );

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProjects(sampleProjectData);
      setLoading(false);
    }, 500);
  }, []);

  const filteredProjects = useMemo(() => {
    if (!searchTerm) return projects;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        p.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        p.statusTag.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [projects, searchTerm]);

  const totalRows = filteredProjects.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredProjects.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredProjects, currentPage, rowsPerPage]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedIds = new Set(selectedProjectIds);
    if (event.target.checked) {
      paginatedProjects.forEach((project) => newSelectedIds.add(project.id));
    } else {
      paginatedProjects.forEach((project) => newSelectedIds.delete(project.id));
    }
    setSelectedProjectIds(newSelectedIds);
  };

  const handleSelectRowClick = (id: number) => {
    const newSelectedIds = new Set(selectedProjectIds);
    if (newSelectedIds.has(id)) {
      newSelectedIds.delete(id);
    } else {
      newSelectedIds.add(id);
    }
    setSelectedProjectIds(newSelectedIds);
  };

  const isAllSelectedOnPage =
    paginatedProjects.length > 0 &&
    paginatedProjects.every((p) => selectedProjectIds.has(p.id));

  return (
    <div className="flex">
      <div className="w-64 fixed h-screen">
        <AdminSidebar />
      </div>
      <div className="flex-1 min-h-screen bg-gray-100 p-8 ml-64">
        <div className="projectpmContainer bg-white shadow-md rounded-lg p-6">
          {/* Header */}
          <div className="header flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
            <h1 className="title text-2xl font-bold text-gray-700">
              รายงาน สถิติ
            </h1>
          </div>
          {/* Toolbar */}
          <div className="toolbar">
            {" "}
            {/* Changed */}
            <button className="filterButton" title="Filter options">
              {" "}
              {/* Changed */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="icon"
              >
                {" "}
                {/* Changed */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.572a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                />
              </svg>
            </button>
            <div className="searchContainer">
              {" "}
              {/* Changed */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="searchIcon"
              >
                {" "}
                {/* Changed */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="searchInput" // Changed
              />
            </div>
          </div>
          {/* Table Area */}
          <div className="tableWrapper">
            {" "}
            {/* Changed */}
            {loading ? (
              <div className="loading">Loading projects...</div> // Changed
            ) : (
              <table className="projectTable">
                {" "}
                {/* Changed */}
                <thead>
                  <tr>
                    <th className="checkboxCol">
                      {" "}
                      {/* Changed */}
                      <input
                        type="checkbox"
                        checked={isAllSelectedOnPage}
                        onChange={handleSelectAllClick}
                        indeterminate={
                          selectedProjectIds.size > 0 && !isAllSelectedOnPage
                        }
                      />
                    </th>
                    <th className="idCol">#</th> {/* Changed */}
                    <th>โครงการ</th>
                    <th>รายละเอียด</th>
                    <th>สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProjects.length > 0 ? (
                    paginatedProjects.map((project, index) => (
                      <tr
                        key={project.id}
                        className={
                          selectedProjectIds.has(project.id)
                            ? "selectedRow"
                            : ""
                        }
                      >
                        {" "}
                        <td className="checkboxCol">
                          {" "}
                          <input
                            type="checkbox"
                            checked={selectedProjectIds.has(project.id)}
                            onChange={() => handleSelectRowClick(project.id)}
                          />
                        </td>
                        <td className="idCol">
                          {(currentPage - 1) * rowsPerPage + index + 1}
                        </td>{" "}
                        <td>{project.name}</td>
                        <td>{project.description}</td>
                        <td>
                          <span className="statusTag">{project.statusTag}</span>
                        </td>{" "}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="noResults">
                        No projects found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
          {!loading && totalRows > 0 && (
            <div className="pagination">
              <span className="rowCount">
                {`${(currentPage - 1) * rowsPerPage + 1}-${Math.min(currentPage * rowsPerPage, totalRows)} of ${totalRows}`}
              </span>
              <span className="rowsPerPageLabel">Rows per page:</span>{" "}
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="rowsPerPageSelect" // Changed
              >
                {ROWS_PER_PAGE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="pageButton" // Changed
              >
                &lt;
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="pageButton" // Changed
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectManagementPage;
