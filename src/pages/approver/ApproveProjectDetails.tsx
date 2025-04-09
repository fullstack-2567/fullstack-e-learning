import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  CheckIcon,
  FileTextIcon,
  FileIcon,
  AlertCircleIcon,
} from "lucide-react";
import ApproverNavbar from "@/components/approver/ApproverNavbar";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllProject,
  getProject,
  updateProjectStatus,
} from "@/api/ProjectApi";
import { Project } from "@/utils/backend-openapi";

export default function ApproveProjectDetails() {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [actionCompleted, setActionCompleted] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProjectFromAllProjects = async () => {
      if (projectId) {
        try {
          setLoading(true);
          const project = await getProject(projectId);

          if (project) {
            setProject(project);
            setActiveStep(calculateApprovalStep(project));
          } else {
            setError("ไม่พบข้อมูลโครงการที่ต้องการ");
          }

          setLoading(false);
        } catch (err) {
          console.error("Error fetching projects:", err);
          setError("ไม่สามารถโหลดข้อมูลโครงการได้ กรุณาลองใหม่อีกครั้ง");
          setLoading(false);
        }
      }
    };

    fetchProjectFromAllProjects();
  }, [projectId]);

  const calculateApprovalStep = (project: Project): number => {
    if (project.thirdApprovedDT) {
      return 4;
    } else if (project.secondApprovedDT) {
      return 3;
    } else if (project.firstApprovedDT) {
      return 2;
    } else if (project.rejectedDT) {
      return 0;
    } else {
      return 1;
    }
  };

  const formatDateRange = (
    startDate: string | Date,
    endDate: string | Date
  ): string => {
    const start =
      typeof startDate === "string" ? new Date(startDate) : startDate;
    const end = typeof endDate === "string" ? new Date(endDate) : endDate;

    const formatDate = (date: Date) => {
      const day = date.getDate();
      const thaiMonths = [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ];
      const month = thaiMonths[date.getMonth()];
      // แปลงเป็นปี พ.ศ.
      const year = date.getFullYear() + 543;

      return `${day} ${month} ${year}`;
    };

    return `${formatDate(start)} ถึง ${formatDate(end)}`;
  };

  const getSdgDescription = (sdgType: string): string[] => {
    const sdgMap: Record<string, string> = {
      SDG1: "SDG 1: No poverty",
      SDG2: "SDG 2: Zero hunger",
      SDG3: "SDG 3: Good health and well-being",
      SDG4: "SDG 4: Quality education",
      SDG5: "SDG 5: Gender equality",
      SDG6: "SDG 6: Clean water and sanitation",
      SDG7: "SDG 7: Affordable and clean energy",
      SDG8: "SDG 8: Decent work and economic growth",
      SDG9: "SDG 9: Industry, innovation and infrastructure",
      SDG10: "SDG 10: Reduced inequalities",
      SDG11: "SDG 11: Sustainable cities and communities",
      SDG12: "SDG 12: Responsible consumption and production",
      SDG13: "SDG 13: Climate action",
      SDG14: "SDG 14: Life below water",
      SDG15: "SDG 15: Life on land",
      SDG16: "SDG 16: Peace, justice and strong institutions",
      SDG17: "SDG 17: Partnerships for the goals",
    };

    if (sdgType && sdgType.includes(",")) {
      return sdgType.split(",").map((sdg) => sdgMap[sdg.trim()] || sdg.trim());
    }

    return [sdgMap[sdgType] || sdgType || ""];
  };

  const formatUserName = (user: any): string => {
    if (!user) return "";

    let prefix = "";
    if (user.prefix === "mr") prefix = "นาย";
    else if (user.prefix === "mrs") prefix = "นาง";
    else if (user.prefix === "miss") prefix = "นางสาว";

    return `${prefix}${user.firstName} ${user.lastName}`;
  };

  const getProjectTypeInThai = (type: string): string => {
    const typeMap: Record<string, string> = {
      technology_and_innovation: "เทคโนโลยีและนวัตกรรม",
      social_development: "พัฒนาสังคม",
      environment: "สิ่งแวดล้อม",
      education: "การศึกษา",
      healthcare: "สาธารณสุข",
      agriculture: "เกษตรกรรม",
      energy: "พลังงาน",
      infrastructure: "โครงสร้างพื้นฐาน",
    };

    return typeMap[type] || type || "";
  };

  const getFormattedGender = (sex: string): string => {
    if (sex === "male") return "ชาย";
    if (sex === "female") return "หญิง";
    return sex || "";
  };

  const getFormattedEducation = (education: string): string => {
    const educationMap: Record<string, string> = {
      elementary: "ประถมศึกษา",
      middle: "มัธยมศึกษาตอนต้น",
      high: "มัธยมศึกษาตอนปลาย",
      vocational: "ปวช./ปวส.",
      bachelor: "ปริญญาตรี",
      master: "ปริญญาโท",
      doctoral: "ปริญญาเอก",
    };

    return educationMap[education] || education || "";
  };

  const formatBirthDate = (birthDate: string | Date): string => {
    if (!birthDate) return "";

    const date =
      typeof birthDate === "string" ? new Date(birthDate) : birthDate;

    const day = date.getDate();
    const thaiMonths = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    const month = thaiMonths[date.getMonth()];
    const year = date.getFullYear() + 543;

    return `${day} ${month} ${year}`;
  };

  const handleApprove = async () => {
    if (!project || !projectId) return;

    try {
      setIsSubmitting(true);
      await updateProjectStatus(project.projectId, "approve");
      setActiveStep(Math.min(activeStep + 1, 4));
      setShowApproveDialog(false);
      setActionCompleted("อนุมัติ");
      setShowSuccessDialog(true);
    } catch (err) {
      console.error("Error approving project:", err);
      alert("เกิดข้อผิดพลาดในการอนุมัติโครงการ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!project || !projectId) return;

    try {
      setIsSubmitting(true);
      await updateProjectStatus(project.projectId, "reject");
      setShowRejectDialog(false);
      setActionCompleted("ตีกลับ");
      setShowSuccessDialog(true);
    } catch (err) {
      console.error("Error rejecting project:", err);
      alert("เกิดข้อผิดพลาดในการตีกลับโครงการ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateToProjectMenu = () => {
    setShowSuccessDialog(false);
    navigate("/approver/project-menu");
  };

  const steps = [
    { label: "ลงทะเบียนเสร็จสิ้น", icon: <FileTextIcon className="size-5" /> },
    { label: "การตรวจสอบครั้งที่ 1", icon: <CheckIcon className="size-5" /> },
    { label: "การตรวจสอบครั้งที่ 2", icon: <CheckIcon className="size-5" /> },
    { label: "การตรวจสอบครั้งที่ 3", icon: <CheckIcon className="size-5" /> },
    { label: "ตรวจสอบสำเร็จ", icon: <CheckIcon className="size-5" /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col font-prompt">
        <ApproverNavbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
            <p className="mt-4 text-gray-600">กำลังโหลดข้อมูลโครงการ...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col font-prompt">
        <ApproverNavbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md mx-auto">
            <AlertCircleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">เกิดข้อผิดพลาด</h2>
            <p className="text-gray-600 mb-4">
              {error || "ไม่พบข้อมูลโครงการ"}
            </p>
            <Button
              onClick={() => navigate("/approver/project-menu")}
              className="bg-[#606A9B]"
            >
              กลับไปยังรายการโครงการ
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const parentProjectName =
    typeof project.parentProject === "string"
      ? project.parentProject
      : project.parentProject?.projectThaiName || "ไม่มี";
  const projectDate =
    project.startDate && project.endDate
      ? formatDateRange(project.startDate, project.endDate)
      : "ไม่ระบุ";
  const sdgDescriptions = getSdgDescription(project.sdgType);
  const projectTypeText = getProjectTypeInThai(project.projectType);

  const submitterName = project.submittedByUser
    ? formatUserName(project.submittedByUser)
    : "ไม่ระบุ";
  const submitterGender = project.submittedByUser
    ? getFormattedGender(project.submittedByUser.sex)
    : "ไม่ระบุ";
  const submitterBirthDate = project.submittedByUser
    ? formatBirthDate(project.submittedByUser.birthDate)
    : "ไม่ระบุ";
  const submitterEducation = project.submittedByUser
    ? getFormattedEducation(project.submittedByUser.education)
    : "ไม่ระบุ";
  const submitterPhone = project.submittedByUser
    ? project.submittedByUser.tel
    : "ไม่ระบุ";
  const submitterEmail = project.submittedByUser
    ? project.submittedByUser.email
    : "ไม่ระบุ";

  const getFileNameFromPresignedURL = (presignedURL: string) => {
    const url = new URL(presignedURL);
    const pathParts = url.pathname.split("/");
    const fileName = pathParts[pathParts.length - 1];
    return fileName;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-prompt">
      <ApproverNavbar />

      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-6">ตรวจสอบและทะเบียนโครงการ</h1>
          <div className="relative max-w-5xl mx-auto pt-5 pb-8">
            <div className="absolute top-[14px] left-0 right-0">
              <div className="h-1 w-full bg-[#A3A3A3]"></div>
              <div
                className="h-1 bg-[#606A9B] absolute top-0 left-0"
                style={{
                  width: `${(activeStep / (steps.length - 1)) * 100}%`,
                }}
              ></div>
            </div>

            <div className="flex justify-between relative z-10">
              {steps.map((step, index) => {
                const position = (index / (steps.length - 1)) * 100;

                return (
                  <div
                    key={index}
                    className="absolute flex flex-col items-center"
                    style={{
                      left: `${position}%`,
                      transform: "translate(-50%, -40%)",
                    }}
                  >
                    <div
                      className={`rounded-full w-9 h-9 flex items-center justify-center ${
                        index <= activeStep
                          ? "bg-[#606A9B]"
                          : "bg-white border border-[#A3A3A3]"
                      }`}
                    >
                      <div
                        className={`rounded-full w-4 h-4 ${
                          index <= activeStep ? "bg-white" : "bg-[#A3A3A3]"
                        }`}
                      ></div>
                    </div>
                    <div className="text-sm mt-2 text-center whitespace-nowrap">
                      {step.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <Alert className="mb-6">
            <FileTextIcon className="size-5" />
            <AlertTitle>ตรวจสอบรายละเอียดโครงการ</AlertTitle>
            <AlertDescription>
              กรุณาตรวจสอบข้อมูลโครงการให้ละเอียดก่อนทำการอนุมัติหรือปฏิเสธโครงการ
            </AlertDescription>
          </Alert>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>ข้อมูลโครงการ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="projectName">ชื่อโครงการ (ภาษาไทย)</Label>
                  <Input
                    id="projectName"
                    className="mt-3"
                    value={project.projectThaiName}
                    readOnly
                  />
                </div>
                <div>
                  <Label htmlFor="projectNameEn">
                    ชื่อโครงการ (ภาษาอังกฤษ)
                  </Label>
                  <Input
                    id="projectNameEn"
                    className="mt-3"
                    value={project.projectEngName}
                    readOnly
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="projectDescription">
                  คำอธิบายโครงการโดยสรุป
                </Label>
                <Input
                  id="projectDescription"
                  className="mt-3"
                  value={project.projectSummary}
                  readOnly
                />
              </div>

              <div>
                <Label htmlFor="projectExtension">
                  เป็นการพัฒนาต่อยอดโครงการหรือไม่
                </Label>
                <Input
                  id="projectExtension"
                  className="mt-3"
                  value={parentProjectName}
                  readOnly
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="projectCategory">ประเภทโครงการ</Label>
                  <Input
                    id="projectCategory"
                    className="mt-3"
                    value={projectTypeText}
                    readOnly
                  />
                </div>
                <div>
                  <Label htmlFor="projectDuration">
                    ระยะเวลาการดำเนินโครงการ
                  </Label>
                  <Input
                    id="projectDuration"
                    className="mt-3"
                    value={projectDate}
                    readOnly
                  />
                </div>
              </div>

              <div>
                <Label>เป้าหมายการพัฒนาที่ยั่งยืน</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {sdgDescriptions.map((sdg, index) => (
                    <Badge key={index} variant="secondary">
                      {sdg}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>ไฟล์รายละเอียดโครงการ</Label>
                <div className="flex items-center gap-2 mt-2 p-3 border rounded-md bg-gray-50">
                  <FileIcon className="size-5 text-blue-600" />
                  <span>
                    {getFileNameFromPresignedURL(
                      project.projectDescriptionFile
                    )}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto"
                    onClick={() => {
                      window.open(project.projectDescriptionFile, "_blank");
                    }}
                  >
                    ดาวน์โหลด
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>ข้อมูลผู้ส่ง</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="submitterName">ชื่อ - นามสกุล</Label>
                  <Input
                    id="submitterName"
                    className="mt-3"
                    value={submitterName}
                    readOnly
                  />
                </div>
                <div>
                  <Label htmlFor="submitterGender">เพศ</Label>
                  <Input
                    id="submitterGender"
                    className="mt-3"
                    value={submitterGender}
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="submitterBirthdate">วัน/เดือน/ปี เกิด</Label>
                  <Input
                    id="submitterBirthdate"
                    className="mt-3"
                    value={submitterBirthDate}
                    readOnly
                  />
                </div>
                <div>
                  <Label htmlFor="submitterEducation">ระดับการศึกษา</Label>
                  <Input
                    id="submitterEducation"
                    className="mt-3"
                    value={submitterEducation}
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="submitterPhone">เบอร์โทร</Label>
                  <Input
                    id="submitterPhone"
                    className="mt-3"
                    value={submitterPhone}
                    readOnly
                  />
                </div>
                <div>
                  <Label htmlFor="submitterEmail">อีเมล</Label>
                  <Input
                    id="submitterEmail"
                    className="mt-3"
                    value={submitterEmail}
                    readOnly
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              <span className="font-medium">รหัสโครงการ:</span>{" "}
              {project.projectId}
            </div>
            <div className="space-x-4">
              <Button
                variant="outline"
                className="bg-white text-amber-600 border-amber-600 hover:bg-amber-50"
                onClick={() => setShowRejectDialog(true)}
                disabled={isSubmitting}
              >
                ตีกลับ
              </Button>
              <Button
                onClick={() => setShowApproveDialog(true)}
                className="bg-green-600 hover:bg-green-700"
                disabled={isSubmitting}
              >
                อนุมัติ
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ยืนยันการอนุมัติโครงการ</DialogTitle>
            <DialogDescription>
              คุณต้องการอนุมัติโครงการ "{project.projectThaiName}" ใช่หรือไม่?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowApproveDialog(false)}
              disabled={isSubmitting}
            >
              ยกเลิก
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleApprove}
              disabled={isSubmitting}
            >
              {isSubmitting ? "กำลังดำเนินการ..." : "ยืนยัน"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ยืนยันการตีกลับโครงการ</DialogTitle>
            <DialogDescription>
              คุณต้องการตีกลับโครงการ "{project.projectThaiName}" ใช่หรือไม่?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="rejectReason">เหตุผลในการตีกลับ</Label>
            <Input
              id="rejectReason"
              placeholder="กรุณาระบุเหตุผลในการตีกลับโครงการ"
              className="mt-2"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRejectDialog(false)}
              disabled={isSubmitting}
            >
              ยกเลิก
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={!rejectReason.trim() || isSubmitting}
            >
              {isSubmitting ? "กำลังดำเนินการ..." : "ยืนยันการตีกลับ"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ดำเนินการเสร็จสิ้น</DialogTitle>
            <div className="flex justify-center py-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckIcon className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <DialogDescription>
              <p>
                คุณได้
                {actionCompleted === "อนุมัติ" ? (
                  <span className="text-green-600 font-bold"> อนุมัติ </span>
                ) : (
                  <span className="text-red-600 font-bold"> ตีกลับ </span>
                )}
                โครงการ "{project.projectThaiName}" เรียบร้อยแล้ว
              </p>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              className="w-full bg-[#605DEC] hover:bg-[#18167c]"
              onClick={navigateToProjectMenu}
            >
              กลับไปที่รายการโครงการ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
