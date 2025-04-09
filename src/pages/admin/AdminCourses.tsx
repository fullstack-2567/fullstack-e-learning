import AdminSidebar from "@/components/admin/AdminSidebar";
import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPM.css";
import ContentManagement from "@/components/admin/ContentManagement";

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
    statusTag: "Publish",
  },
  {
    id: 2,
    name: "Project Alpha",
    description: "Description for Alpha project focusing on innovation.",
    statusTag: "Publish",
  },
  {
    id: 3,
    name: "Beta Initiative",
    description: "Research and development for the Beta platform.",
    statusTag: "Publish",
  },
  {
    id: 4,
    name: "Gamma Rollout",
    description: "Deployment phase for the Gamma feature set.",
    statusTag: "Publish",
  },
  {
    id: 5,
    name: "Delta Upgrade",
    description: "System upgrade project Delta.",
    statusTag: "Publish",
  },
  {
    id: 6,
    name: "Epsilon Integration",
    description: "Integrating Epsilon module with core system.",
    statusTag: "Publish",
  },
  {
    id: 7,
    name: "Zeta Marketing Campaign",
    description: "Launch campaign for Zeta product line.",
    statusTag: "Publish",
  },
  {
    id: 8,
    name: "Eta Compliance Audit",
    description: "Internal audit for Eta compliance standards.",
    statusTag: "Unpublish",
  },
  {
    id: 9,
    name: "Theta Platform Migration",
    description: "Migrating Theta services to new infrastructure.",
    statusTag: "Unpublish",
  },
  {
    id: 10,
    name: "Iota User Research",
    description: "Gathering user feedback for Iota features.",
    statusTag: "Unpublish",
  },
  {
    id: 11,
    name: "Kappa Performance Tuning",
    description: "Optimizing performance of the Kappa module.",
    statusTag: "Unpublish",
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
  const [showCreateDialog, setShowCreateDialog] = useState<boolean>(false);
  const indeterminateCheckboxRef = useRef<HTMLInputElement | null>(null);

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

  const navigate = useNavigate();

  const handlenewCourse = () => {
    setShowCreateDialog(true);
  };

  const isAllSelectedOnPage =
    paginatedProjects.length > 0 &&
    paginatedProjects.every((p) => selectedProjectIds.has(p.id));

  useEffect(() => {
    if (indeterminateCheckboxRef.current) {
      if (selectedProjectIds.size > 0 && !isAllSelectedOnPage) {
        indeterminateCheckboxRef.current.indeterminate = true;
      }
    }
  }, [selectedProjectIds, isAllSelectedOnPage]);

  return (
    <div className="flex">
      <div className="w-64 fixed h-screen">
        <AdminSidebar />
      </div>
      <div className="flex-1 min-h-screen bg-gray-100 ml-64">
        <ContentManagement />
      </div>
    </div>
  );
};

export default ProjectManagementPage;
