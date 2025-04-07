import LearningNavbar from "@/components/learner-projectSubmiter/LearnerNavbar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Project, SubmitProjectDto, User } from "@/utils/backend-openapi";
import { Label } from "@radix-ui/react-label";
import { FormikProps, useFormik } from 'formik';
import { useState } from "react";
import { useLocation } from "react-router-dom";
import * as yup from 'yup';

export default function SubmitProject() {
    const [project, setProject] = useState<Project>();
    const [user, setUser] = useState<User>();
    const formikForCreateProject = useFormik<SubmitProjectDto>({
        initialValues: {
            projectThaiName: "",
            projectEngName: "",
            projectSummary: "",
            startDate: "",
            endDate: "",
            sdgType: "SDG1",
            projectDescriptionFile: "",
            projectType: "energy_and_environment",
            parentProjectID: undefined,
            userInfo: {},
        },
        validationSchema: yup.object({
            projectThaiName: yup.string().required("Required").min(1, "Too short").max(255, "Too long"),
            projectEngName: yup.string().required("Required").min(1, "Too short").max(255, "Too long"),
            projectSummary: yup.string().required("Required").min(1, "Too short").max(1000, "Too long"),
            startDate: yup.date().required("Required"),
            endDate: yup.date().required("Required"),
            sdgType: yup.string().required("Required"),
            projectDescriptionFile: yup.mixed()
            .required("กรุณาเลือกไฟล์")
            .test("fileType", "รองรับไฟล์ PDF เท่านั้น", (value) => {
                if (!value) return true; // Let required handle empty files
                return value && ["application/pdf"].includes((value as File).type);
            })
            .test("fileSize", "ขนาดไฟล์ต้องไม่เกิน 10 MB", (value) => {
                if (!value) return true; // Let required handle empty files
                return value && (value as File).size <= 10 * 1024 * 1024; // 10MB
            }),
            projectType: yup.string().required("Required"),
            parentProjectID: yup.string(),
        }),
        onSubmit: (values) => {
            // Handle form submission here
            console.log("Form values:", values);
        },
    });

    const formikForCreatingUser = useFormik<User>({
        initialValues: {
            userId: "",
            email: "",
            createdDT: "",
            updatedAT: "",
            role: "user",
            sex: "male",
            firstName: "",
            lastName: "",
            birthDate: "",
            prefix: "master",
            education: "bachelor",
            tel: "",
        },

        validationSchema: yup.object({
            email: yup.string().email("Invalid email").required("Required"),
            role: yup.string().required("Required"),
            sex: yup.string().required("Required"),
            firstName: yup.string().required("Required").min(1, "Too short").max(100, "Too long"),
            lastName: yup.string().required("Required").min(1, "Too short").max(100, "Too long"),
            birthDate: yup.date().required("Required").max((new Date()), "Date must be in the past"),
            prefix: yup.string().required("Required"),
            education: yup.string().required("Required"),
            tel: yup.string().required("Required").matches(/^[0-9]+$/, "Only numbers are allowed")
        }),
        onSubmit: (values) => {
            // Handle form submission here
            console.log("Form values:", values);
        },
    });

    
    return (
        <div>
            <LearningNavbar />
            <div className="min-h-screen bg-gray-100 font-inter p-8 flex flex-col gap-8">
                <div>
                    <h1 className = "text-3xl">ลงทะเบียนโครงการ</h1>
                </div>
                <CreateProjectForm formik={formikForCreateProject} />
                
            </div>
        </div>

    );
  }

const CreateProjectForm = ({ formik }: { formik: FormikProps<SubmitProjectDto> }) => {
    return (
        
        <section>
            <div>
                <h1 className = "text-2xl">ข้อมูลโครงการ</h1>
            </div>

            <div className = "flex flex-col xl:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-8">
                    <Label htmlFor="projectThaiName" className="block mt-8">ชื่อโครงการภาษาไทย</Label>
                    <Input
                        type="text"
                        id="projectThaiName"
                        {...formik.getFieldProps("projectThaiName")}
                        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${formik.touched.projectThaiName && formik.errors.projectThaiName ? 'border-red-500' : ''}`}
                    />
                    {formik.touched.projectThaiName && formik.errors.projectThaiName ? (
                        <div className="text-red-500 text-sm">{formik.errors.projectThaiName}</div>
                    ) : null}
                    <Label htmlFor="projectEngName" className="block">ชื่อโครงการภาษาอังกฤษ</Label>
                    <Input
                        type="text"
                        id="projectEngName"
                        {...formik.getFieldProps("projectEngName")}
                        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${formik.touched.projectEngName && formik.errors.projectEngName ? 'border-red-500' : ''}`}
                    />

                    {formik.touched.projectEngName && formik.errors.projectEngName ? (
                        <div className="text-red-500 text-sm">{formik.errors.projectEngName}</div>
                    ) : null}

                    <Label htmlFor="projectSummary" className="block">คำอธิบายโครงการโดยสรุป</Label>
                    <Textarea
                        id="projectSummary"
                        {...formik.getFieldProps("projectSummary")}
                        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${formik.touched.projectSummary && formik.errors.projectSummary ? 'border-red-500' : ''}`}
                    />
                    {formik.touched.projectSummary && formik.errors.projectSummary ? (
                        <div className="text-red-500 text-sm">{formik.errors.projectSummary}</div>
                    ) : null}

                    <Label>ระยะเวลาการดำเนินโครงการ</Label>
                    <div className="flex flex-row gap-4">
                    <Input
                        type="date"
                        id="startDate"
                        {...formik.getFieldProps("startDate")}
                        className={`mt-1 block w-1/3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${formik.touched.startDate && formik.errors.startDate ? 'border-red-500' : ''}`}
                    />
                    ถึง
                    <Input
                        type="date"
                        id="endDate"
                        {...formik.getFieldProps("endDate")}
                        className={`mt-1 block w-1/3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${formik.touched.endDate && formik.errors.endDate ? 'border-red-500' : ''}`}
                    />
                    </div>

                    <Label>โครงการมีเป้าหมายการพัฒนาที่ยั่งยืนด้านใด (Sustainable Development Goals : SDGs) *</Label>
                    
                    <Select
                        defaultValue="SDG1"
                        onValueChange={(value) => formik.setFieldValue("sdgType", value)}
                        // className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${formik.touched.sdgType && formik.errors.sdgType ? 'border-red-500' : ''}`}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select SDG" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="SDG1">SDG1: No Poverty</SelectItem>
                        <SelectItem value="SDG2">SDG2: Zero Hunger</SelectItem>
                        <SelectItem value="SDG3">SDG3: Good Health and Well-being</SelectItem>
                        <SelectItem value="SDG4">SDG4: Quality Education</SelectItem>
                        <SelectItem value="SDG5">SDG5: Gender Equality</SelectItem>
                        <SelectItem value="SDG6">SDG6: Clean Water and Sanitation</SelectItem>
                        <SelectItem value="SDG7">SDG7: Affordable and Clean Energy</SelectItem>
                        <SelectItem value="SDG8">SDG8: Decent Work and Economic Growth</SelectItem>
                        <SelectItem value="SDG9">SDG9: Industry, Innovation, and Infrastructure</SelectItem>
                        <SelectItem value="SDG10">SDG10: Reduced Inequality</SelectItem>
                        <SelectItem value="SDG11">SDG11: Sustainable Cities and Communities</SelectItem>
                        <SelectItem value="SDG12">SDG12: Responsible Consumption and Production</SelectItem>
                        <SelectItem value="SDG13">SDG13: Climate Action</SelectItem>
                        <SelectItem value="SDG14">SDG14: Life Below Water</SelectItem>
                        <SelectItem value="SDG15">SDG15: Life on Land</SelectItem>
                        <SelectItem value="SDG16">SDG16: Peace and Justice Strong Institutions</SelectItem>
                        <SelectItem value="SDG17">SDG17: Partnerships to achieve the Goal</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex-1 flex flex-col gap-8">
                    //File dropzone
                    <Label htmlFor="projectDescriptionFile" className="block mt-8">ไฟล์เอกสารโครงการ</Label>
                    <Input
                        type="file"
                        id="projectDescriptionFile"
                        {...formik.getFieldProps("projectDescriptionFile")}
                        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 h-20 ${formik.touched.projectDescriptionFile && formik.errors.projectDescriptionFile ? 'border-red-500' : ''}`}
                    />
                    {formik.touched.projectDescriptionFile && formik.errors.projectDescriptionFile ? (
                        <div className="text-red-500 text-sm">{formik.errors.projectDescriptionFile}</div>
                    ) : null}

                    <Label>เป็นการพัฒนาต่อยอดผลงานหรือไม่</Label>
                    

                </div>


            </div>
        </section>
    );
}
