import { getAllProject } from "@/api/ProjectApi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SubmitProjectDto } from "@/utils/backend-openapi";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";

export const CreateProjectForm = ({ formik, projectNameAndIds, readonly }: { formik: FormikProps<SubmitProjectDto>, projectNameAndIds: { name: string; id: string }[], readonly: boolean })  => {
    const [hasParentProject, setHasParentProject] = useState(false);
    const inputBgClass = readonly ? 'bg-gray-200' : '';
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

    return (
        <section>
            <div>
                <h1 className="text-2xl">ข้อมูลโครงการ</h1>
            </div>

            <div className="flex flex-col xl:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-4">
                    <Label htmlFor="projectThaiName" className="block mt-8">ชื่อโครงการภาษาไทย</Label>
                    <Input
                        type="text"
                        id="projectThaiName"
                        {...formik.getFieldProps("projectThaiName")}
                        readOnly={readonly}
                        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${inputBgClass} ${formik.touched.projectThaiName && formik.errors.projectThaiName ? 'border-red-500' : ''}`}
                    />
                    {formik.touched.projectThaiName && formik.errors.projectThaiName ? (
                        <div className="text-red-500 text-sm">{formik.errors.projectThaiName}</div>
                    ) : null}
                    <Label htmlFor="projectEngName" className="block">ชื่อโครงการภาษาอังกฤษ</Label>
                    <Input
                        type="text"
                        id="projectEngName"
                        {...formik.getFieldProps("projectEngName")}
                        readOnly={readonly}
                        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${inputBgClass} ${formik.touched.projectEngName && formik.errors.projectEngName ? 'border-red-500' : ''}`}
                    />

                    {formik.touched.projectEngName && formik.errors.projectEngName ? (
                        <div className="text-red-500 text-sm">{formik.errors.projectEngName}</div>
                    ) : null}

                    <Label htmlFor="projectSummary" className="block">คำอธิบายโครงการโดยสรุป</Label>
                    <Textarea
                        id="projectSummary"
                        {...formik.getFieldProps("projectSummary")}
                        readOnly={readonly}
                        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${inputBgClass} ${formik.touched.projectSummary && formik.errors.projectSummary ? 'border-red-500' : ''}`}
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
                            readOnly={readonly}
                            className={`mt-1 block w-1/3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${inputBgClass} ${formik.touched.startDate && formik.errors.startDate ? 'border-red-500' : ''}`}
                        />
                        ถึง
                        <Input
                            type="date"
                            id="endDate"
                            {...formik.getFieldProps("endDate")}
                            readOnly={readonly}
                            className={`mt-1 block w-1/3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${inputBgClass} ${formik.touched.endDate && formik.errors.endDate ? 'border-red-500' : ''}`}
                        />
                        {formik.touched.endDate && formik.errors.endDate ? (
                            <div className="text-red-500 text-sm">{formik.errors.endDate}</div>
                        ) : null}
                        {formik.touched.startDate && formik.errors.startDate ? (
                            <div className="text-red-500 text-sm">{formik.errors.startDate}</div>
                        ) : null}

                    </div>

                    <Label>โครงการมีเป้าหมายการพัฒนาที่ยั่งยืนด้านใด (Sustainable Development Goals : SDGs) *</Label>
                    <Select
                        defaultValue="SDG1"
                        onValueChange={(value) => formik.setFieldValue("sdgType", value)}
                        disabled={readonly}
                        {...formik.getFieldProps("sdgType")}
                    >
                        <SelectTrigger className={`w-full ${inputBgClass}`}>
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
                <div className="flex-1 flex flex-col gap-4">
                    {
                        !readonly && (
                            <>
                            <Label htmlFor="projectDescriptionFile" className="block mt-8">ไฟล์เอกสารโครงการ</Label>
                    <Input
                        type="file"
                        id="projectDescriptionFile"
                        // {...formik.getFieldProps("projectDescriptionFile")}
                        readOnly={readonly}
                        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 h-20 ${inputBgClass} ${formik.touched.projectDescriptionFile && formik.errors.projectDescriptionFile ? 'border-red-500' : ''}`}
                        accept=".pdf"
                        onChange={async (e) => {
                            const file = e.target.files[0];
                               //check the size of image 
                            if (file?.size/1024/1024 < 5) {
                              const base64 = await convertToBase64(file);
                              formik.setFieldValue('projectDescriptionFile', base64);
                            }
                            else {
                                console.error('File size must be 5MB or less');
                            };
                          }}
                    />
                    {formik.touched.projectDescriptionFile && formik.errors.projectDescriptionFile ? (
                        <div className="text-red-500 text-sm">{formik.errors.projectDescriptionFile}</div>
                    ) : null}
                            </>
                        )
                    }

                    <Label>เป็นการพัฒนาต่อยอดผลงานหรือไม่</Label>
                    <RadioGroup>
                        <div className="flex flex-col space-x-2 gap-4">
                            <div className = "flex flex-row gap-4">
                                <RadioGroupItem
                                    {...formik.getFieldProps("projectType")}
                                    className={`h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 ${inputBgClass}`}
                                    onClick={() => {
                                        if (!readonly) setHasParentProject(false);
                                    }}
                                    checked={!hasParentProject}
                                    disabled={readonly}
                                />
                                <Label htmlFor="projectType1" className="text-sm">โครงการพัฒนาใหม่</Label>
                            </div>
                            <div className = "flex flex-row gap-4">
                                <RadioGroupItem
                                    {...formik.getFieldProps("projectType")}
                                    className={`h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 ${inputBgClass}`}
                                    onClick={() => {
                                        if (!readonly) setHasParentProject(true);
                                    }}
                                    checked={hasParentProject}
                                    disabled={readonly}
                                />
                                <Label htmlFor="projectType1" className="text-sm">โครงการต่อยอดจากโครงการเดิม</Label>
                                {
                                    hasParentProject && (
                                        <div className="flex flex-col gap-4 mt-4">
                                            <Label htmlFor="parentProjectID" className="block">เลือกโครงการที่ต้องการพัฒนาต่อยอด</Label>
                                            <Select
                                                defaultValue=""
                                                onValueChange={(value) => formik.setFieldValue("parentProjectID", value)}
                                                disabled={readonly}
                                                {...formik.getFieldProps("parentProjectID")}
                                            >
                                                <SelectTrigger className={`w-full ${inputBgClass}`}>
                                                    <SelectValue placeholder="Select Parent Project" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {projectNameAndIds.map((project) => (
                                                        <SelectItem key={project.id} value={project.id}>
                                                            {project.name}
                                                        </SelectItem>
                                                    ))}
                                                    {projectNameAndIds.length === 0 &&
                                                        <p>No projects available</p>}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </RadioGroup>

                    <Label>ประเภทโครงการ</Label>
                    <Select
                        defaultValue="energy_and_environment"
                        onValueChange={(value) => formik.setFieldValue("projectType", value)}
                        disabled={readonly}
                        {...formik.getFieldProps("projectType")}
                    >
                        <SelectTrigger className={`w-full ${inputBgClass}`}>
                            <SelectValue placeholder="Select Project Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="energy_and_environment">พลังงานและสิ่งแวดล้อม</SelectItem>
                            <SelectItem value="construction_and_infrastructure">การก่อสร้างและโครงสร้าง</SelectItem>
                            <SelectItem value="agriculture_and_food">การเกษตรและอาหาร</SelectItem>
                            <SelectItem value="materials_and_minerals"></SelectItem>
                            <SelectItem value="finance_and_investment"></SelectItem>
                            <SelectItem value="technology_and_innovation">เทคโนโลยีและนวัตกรรม</SelectItem>
                            <SelectItem value="medicine_and_health">การแพทย์และสุขภาพ</SelectItem>
                            <SelectItem value="human_resources_development">การศึกษาและพัฒนาทรัพยากรมนุษย์</SelectItem>
                            <SelectItem value="manufacturing_and_automotive">อุตสาหกรรมการผลิตและหุ่นยนต์</SelectItem>
                            <SelectItem value="electronics_and_retail">พาณิชย์อิเล็กทรอนิกส์และค้าปลีก</SelectItem>
                            <SelectItem value="real_estate_and_urban_development">อสังหาริมทรัพย์และการพัฒนาเมือง</SelectItem>
                            <SelectItem value="media_and_entertainment">สื่อและบันเทิง</SelectItem>
                            <SelectItem value="tourism_and_services">การท่องเที่ยวและบริการ</SelectItem>
                            <SelectItem value="society_and_community">สังคมและชุมชน</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </section>
    );
}
