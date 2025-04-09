import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function ApproveProjectMenu() {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");

    const projects = [
        {
            id: 1,
            projectName: "โครงการพัฒนาระบบขนส่งสินค้าอัจฉริยะ",
            description: "โครงการนี้มุ่งเน้นการพัฒนาระบบขนส่งสินค้าที่ใช้ AI และ IoT เพื่อลดต้นทุนโลจิสติกส์ เพิ่มประสิทธิภาพการกระจายสินค้าและลดการปล่อยก๊าซคาร์บอนไดออกไซด์จากการขนส่ง",
            status: "รอการตรวจสอบครั้งที่ 3"
        },
        {
            id: 2,
            projectName: "โครงการพัฒนาแพลตฟอร์มการเรียนรู้ออนไลน์",
            description: "แพลตฟอร์มการเรียนรู้ออนไลน์ที่ใช้เทคโนโลยี AI ในการปรับรูปแบบการเรียนการสอนให้เหมาะกับผู้เรียนแต่ละคน เพื่อเพิ่มประสิทธิภาพการเรียนรู้",
            status: "อนุมัติแล้ว"
        },
        {
            id: 3,
            projectName: "โครงการระบบจัดการสมาร์ทซิตี้",
            description: "ระบบบริหารจัดการเมืองอัจฉริยะที่เชื่อมโยงข้อมูลจากเซ็นเซอร์ต่างๆ เพื่อวิเคราะห์และปรับปรุงการให้บริการแก่ประชาชน",
            status: "รอการตรวจสอบครั้งที่ 2"
        }
    ];

    const [filteredProjects, setFilteredProjects] = useState(projects);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredProjects(projects);
        } else {
            const filtered = projects.filter(
                project =>
                    project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    project.status.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProjects(filtered);
        }
    }, [searchTerm]);

    return (
        <div className="flex">
            <div className="w-64 fixed h-screen">
                <AdminSidebar />
            </div>

            <div className="flex-1 pl-64">
                <div className="min-h-screen bg-gray-100 p-6">
                    <div className="mb-6">
                        <h1 className="text-4xl font-bold mb-2">คอร์สเรียน</h1>
                    </div>

                    <Card className="w-full">
                        <CardHeader className="border-b">
                            <CardTitle className="text-2xl">Courses List</CardTitle>
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
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                                <circle cx="11" cy="11" r="8"></circle>
                                                <path d="m21 21-4.3-4.3"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b text-left">
                                            <th className="p-4 w-10">
                                                <input type="checkbox" className="rounded border-gray-300" />
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
                                            <th className="p-4 font-medium text-sm">
                                                คำอธิบาย
                                            </th>
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
                                        {filteredProjects.map(project => (
                                            <tr key={project.id} className="border-b hover:bg-gray-50">
                                                <td className="p-4 w-10">
                                                    <input type="checkbox" className="rounded border-gray-300" />
                                                </td>
                                                <td className="p-4 w-14 align-top">{project.id}</td>
                                                <td className="p-4 font-medium align-top">{project.projectName}</td>
                                                <td className="p-4 text-sm align-top">{project.description}</td>
                                                <td className="p-4 align-top">
                                                    <Badge variant="secondary" className="text-[#606A9B] bg-[#606A9B]/15">
                                                        {project.status}
                                                    </Badge>
                                                </td>
                                                <td className="p-4 text-sm align-top">
                                                    <Link to={`/approver/project-details/${project.id}`}>
                                                        <Button className="bg-[#606A9B]">จัดการ</Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

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
                                            {[5, 10, 15, 20].map(value => (
                                                <DropdownMenuItem
                                                    key={value}
                                                    onClick={() => setRowsPerPage(value)}
                                                >
                                                    {value}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm">1/10</span>
                                    <div className="flex">
                                        <Button variant="outline" size="icon" className="rounded-r-none border-r-0">
                                            <ChevronLeft size={16} />
                                        </Button>
                                        <Button variant="outline" size="icon" className="rounded-l-none">
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