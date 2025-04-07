import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckIcon, FileTextIcon, FileIcon } from "lucide-react";
import ApproverNavbar from "@/components/approver/ApproverNavbar";
import { useNavigate } from "react-router-dom";

export default function ApproveProjectDetails() {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(1);
    const [showApproveDialog, setShowApproveDialog] = useState(false);
    const [showRejectDialog, setShowRejectDialog] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [actionCompleted, setActionCompleted] = useState("");

    const projectData = {
        thaiName: "โครงการพัฒนาระบบขนส่งสินค้าอัจฉริยะ",
        englishName: "Smart Logistics System Development Project",
        description: "โครงการนี้มุ่งเน้นการพัฒนาระบบขนส่งสินค้าที่ใช้ AI และ IoT เพื่อลดต้นทุนโลจิสติกส์ เพิ่มประสิทธิภาพการกระจายสินค้า และลดการปล่อยก๊าซเรือนกระจกefegefgefgefgefgefgegergerg",
        extension: "โครงการต่อยอดจาก โครงการระบบติดตามขนส่งอัตโนมัติ (Automated Transport Tracking System)",
        category: "โลจิสติกส์และขนส่ง",
        duration: "1 มีนาคม 2568 ถึง 30 กันยายน 2568",
        sdgs: ["SDG 9: Industry, innovation and infrastructure", "SDG 11: Sustainable cities and communities", "SDG 13: Climate action"],
        file: "smart_logistics_project_details.pdf",
        submitter: {
            name: "นายกิตติ วัฒนชัย",
            gender: "ชาย",
            birthdate: "15 กรกฎาคม 2538",
            education: "ปริญญาตรี",
            phone: "081-234-5678",
            email: "kitti.wattana@email.com"
        },
        projectId: "ONPY55433111"
    };

    const steps = [
        { label: "ลงทะเบียนเสร็จสิ้น", icon: <FileTextIcon className="size-5" /> },
        { label: "การตรวจสอบครั้งที่ 1", icon: <CheckIcon className="size-5" /> },
        { label: "การตรวจสอบครั้งที่ 2", icon: <CheckIcon className="size-5" /> },
        { label: "การตรวจสอบครั้งที่ 3", icon: <CheckIcon className="size-5" /> },
        { label: "ตรวจสอบสำเร็จ", icon: <CheckIcon className="size-5" /> }
    ];

    const handleApprove = () => {
        setActiveStep(Math.min(activeStep + 1, steps.length - 1));
        setShowApproveDialog(false);
        setActionCompleted("อนุมัติ");
        setShowSuccessDialog(true);
    };

    const handleReject = () => {
        setShowRejectDialog(false);
        setActionCompleted("ตีกลับ");
        setShowSuccessDialog(true);
    };

    const navigateToProjectMenu = () => {
        setShowSuccessDialog(false);
        navigate("/approver/project-menu");
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
                                    width: `${activeStep / (steps.length - 1) * 100}%`
                                }}
                            ></div>
                        </div>

                        <div className="flex justify-between relative z-10">
                            {steps.map((step, index) => {
                                const position = index / (steps.length - 1) * 100;

                                return (
                                    <div
                                        key={index}
                                        className="absolute flex flex-col items-center"
                                        style={{
                                            left: `${position}%`,
                                            transform: 'translate(-50%, -40%)'
                                        }}
                                    >
                                        <div
                                            className={`rounded-full w-9 h-9 flex items-center justify-center ${index <= activeStep
                                                ? "bg-[#606A9B]"
                                                : "bg-white border border-[#A3A3A3]"
                                                }`}
                                        >
                                            <div className={`rounded-full w-4 h-4 ${index <= activeStep
                                                ? "bg-white"
                                                : "bg-[#A3A3A3]"
                                                }`}></div>
                                        </div>
                                        <div className="text-sm mt-2 text-center whitespace-nowrap">{step.label}</div>
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
                                    <Input id="projectName" className="mt-3" value={projectData.thaiName} readOnly />
                                </div>
                                <div>
                                    <Label htmlFor="projectNameEn">ชื่อโครงการ (ภาษาอังกฤษ)</Label>
                                    <Input id="projectNameEn" className="mt-3" value={projectData.englishName} readOnly />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="projectDescription">คำอธิบายโครงการโดยสรุป</Label>
                                <Input id="projectNameEn" className="mt-3" value={projectData.description} readOnly />
                            </div>

                            <div>
                                <Label htmlFor="projectExtension">เป็นการพัฒนาต่อยอดพลังงานหรือไม่</Label>
                                <Input id="projectNameEn" className="mt-3" value={projectData.extension} readOnly />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="projectCategory">ประเภทโครงการ</Label>
                                    <Input id="projectCategory" className="mt-3" value={projectData.category} readOnly />
                                </div>
                                <div>
                                    <Label htmlFor="projectDuration">ระยะเวลาการดำเนินโครงการ</Label>
                                    <Input id="projectDuration" className="mt-3" value={projectData.duration} readOnly />
                                </div>
                            </div>

                            <div>
                                <Label>เป้าหมายการพัฒนาที่ยั่งยืน</Label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {projectData.sdgs.map((sdg, index) => (
                                        <Badge key={index} variant="secondary">{sdg}</Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label>ไฟล์รายละเอียดโครงการ</Label>
                                <div className="flex items-center gap-2 mt-2 p-3 border rounded-md bg-gray-50">
                                    <FileIcon className="size-5 text-blue-600" />
                                    <span>{projectData.file}</span>
                                    <Button variant="outline" size="sm" className="ml-auto">ดาวน์โหลด</Button>
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
                                    <Input id="submitterName" className="mt-3" value={projectData.submitter.name} readOnly />
                                </div>
                                <div>
                                    <Label htmlFor="submitterGender">เพศ</Label>
                                    <Input id="submitterGender" className="mt-3" value={projectData.submitter.gender} readOnly />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="submitterBirthdate">วัน/เดือน/ปี เกิด</Label>
                                    <Input id="submitterBirthdate" className="mt-3" value={projectData.submitter.birthdate} readOnly />
                                </div>
                                <div>
                                    <Label htmlFor="submitterEducation">ระดับการศึกษา</Label>
                                    <Input id="submitterEducation" className="mt-3" value={projectData.submitter.education} readOnly />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="submitterPhone">เบอร์โทร</Label>
                                    <Input id="submitterPhone" className="mt-3" value={projectData.submitter.phone} readOnly />
                                </div>
                                <div>
                                    <Label htmlFor="submitterEmail">อีเมล</Label>
                                    <Input id="submitterEmail" className="mt-3" value={projectData.submitter.email} readOnly />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center justify-between gap-4">
                        <div className="text-sm text-gray-500">
                            <span className="font-medium">รหัสโครงการ:</span> {projectData.projectId}
                        </div>
                        <div className="space-x-4">
                            <Button
                                variant="outline"
                                className="bg-white text-amber-600 border-amber-600 hover:bg-amber-50"
                                onClick={() => setShowRejectDialog(true)}
                            >
                                ตีกลับ
                            </Button>
                            <Button
                                onClick={() => setShowApproveDialog(true)}
                                className="bg-green-600 hover:bg-green-700"
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
                            คุณต้องการอนุมัติโครงการ "{projectData.thaiName}" ใช่หรือไม่?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowApproveDialog(false)}
                        >
                            ยกเลิก
                        </Button>
                        <Button
                            className="bg-green-600 hover:bg-green-700"
                            onClick={handleApprove}
                        >
                            ยืนยัน
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>ยืนยันการตีกลับโครงการ</DialogTitle>
                        <DialogDescription>
                            คุณต้องการตีกลับโครงการ "{projectData.thaiName}" ใช่หรือไม่?
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
                        >
                            ยกเลิก
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleReject}
                            disabled={!rejectReason.trim()}
                        >
                            ยืนยันการตีกลับ
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            ดำเนินการเสร็จสิ้น
                        </DialogTitle>
                        <div className="flex justify-center py-4">
                            <div className="rounded-full bg-green-100 p-3">
                                <CheckIcon className="h-8 w-8 text-green-600" />
                            </div>
                        </div>
                        <DialogDescription>
                            <p>คุณได้
                                {actionCompleted === "อนุมัติ"
                                    ? <span className="text-green-600 font-bold">อนุมัติ</span>
                                    : <span className="text-red-600 font-bold">ตีกลับ</span>
                                }
                                โครงการ "{projectData.thaiName}" เรียบร้อยแล้ว</p>
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