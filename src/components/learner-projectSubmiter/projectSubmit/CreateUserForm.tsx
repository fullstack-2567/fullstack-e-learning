import { getAllProject } from "@/api/ProjectApi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "@/utils/backend-openapi";
import { FormikProps } from "formik";
import { useEffect } from "react";

export const CreateUserForm = ({ formik, readonly }: { formik: FormikProps<User>, readonly: boolean }) => {
    return (
        <section>
            <div>
                <h1 className="text-2xl">ข้อมูลผู้ส่ง</h1>
            </div>

            <div className="flex flex-col xl:flex-row gap-4">
                <div className="flex-1 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 flex flex-col gap-4">
                        <Label htmlFor="text" className="block mt-8">คำนำหน้า</Label>
                        <Select
                            defaultValue="master"
                            onValueChange={(value) => formik.setFieldValue("prefix", value)}
                            {...formik.getFieldProps("prefix")}
                            disabled={readonly}
                        >
                            <SelectTrigger className={`w-full ${readonly ? "bg-gray-200" : ""}`}>
                                <SelectValue placeholder="เลือกคำนำหน้าชื่อ" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="master">นาย(อายุน้อยกว่า 20 ปี)</SelectItem>
                                <SelectItem value="mr">นาย</SelectItem>
                                <SelectItem value="miss">นางสาว(อายุน้อยกว่า 20 ปี)</SelectItem>
                                <SelectItem value="ms">นางสาว</SelectItem>
                                <SelectItem value="mrs">นาง</SelectItem>
                            </SelectContent>
                        </Select>
                        {formik.touched.prefix && formik.errors.prefix ? (
                            <div className="text-red-500 text-sm">{formik.errors.prefix}</div>
                        ) : null}
                    </div>
                    <div className="flex-1 flex flex-col gap-4 grow-2">
                        <Label htmlFor="text" className="block mt-8">ชื่อ</Label>
                        <Input
                            type="text"
                            id="firstName"
                            {...formik.getFieldProps("firstName")}
                            className={`mt-1 block border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${readonly ? "bg-gray-200" : ""} ${formik.touched.firstName && formik.errors.firstName ? 'border-red-500' : ''}`}
                            disabled={readonly}
                        />
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
                        ) : null}
                    </div>

                    <div className="flex-1 flex flex-col gap-4 grow-2">
                        <Label htmlFor="text" className="block mt-8">นามสกุล</Label>
                        <Input
                            type="text"
                            id="lastName"
                            {...formik.getFieldProps("lastName")}
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${readonly ? "bg-gray-200" : ""} ${formik.touched.lastName && formik.errors.lastName ? 'border-red-500' : ''}`}
                            disabled={readonly}
                        />
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
                        ) : null}
                    </div>
                </div>
                <div className="flex-1 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 flex flex-col gap-4">
                        <Label htmlFor="text" className="block mt-8">เพศ</Label>
                        <Select
                            defaultValue="ms"
                            onValueChange={(value) => formik.setFieldValue("sex", value)}
                            {...formik.getFieldProps("sex")}
                            disabled={readonly}
                        >
                            <SelectTrigger className={`w-full ${readonly ? "bg-gray-200" : ""}`}>
                                <SelectValue placeholder="เลือกเพศ" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">ชาย</SelectItem>
                                <SelectItem value="female">หญิง</SelectItem>
                                <SelectItem value="other">ไม่ระบุ</SelectItem>
                            </SelectContent>
                        </Select>
                        {formik.touched.sex && formik.errors.sex ? (
                            <div className="text-red-500 text-sm">{formik.errors.sex}</div>
                        ) : null}
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                        <Label htmlFor="text" className="block mt-8">เบอร์โทร</Label>
                        <Input
                            readOnly={readonly}
                            type="text"
                            id="tel"
                            {...formik.getFieldProps("tel")}
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${readonly ? "bg-gray-200" : ""} ${formik.touched.tel && formik.errors.tel ? 'border-red-500' : ''}`}
                        />
                        {formik.touched.tel && formik.errors.tel ? (
                            <div className="text-red-500 text-sm">{formik.errors.tel}</div>
                        ) : null}
                    </div>

                    <div className="flex-1 flex flex-col gap-4">
                        <Label htmlFor="text" className="block mt-8">วันเดือนปีเกิด</Label>
                        <Input
                            readOnly={readonly}
                            type="date"
                            id="birthDate"
                            {...formik.getFieldProps("birthDate")}
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${readonly ? "bg-gray-200" : ""} ${formik.touched.birthDate && formik.errors.birthDate ? 'border-red-500' : ''}`}
                        />
                        {formik.touched.birthDate && formik.errors.birthDate ? (
                            <div className="text-red-500 text-sm">{formik.errors.birthDate}</div>
                        ) : null}
                    </div>
                </div>
                <div className="flex-1 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 flex flex-col gap-4">
                        <Label htmlFor="text" className="block mt-8">ระดับการศึกษา</Label>
                        <Select
                            disabled={readonly}
                            defaultValue="bachelor"
                            onValueChange={(value) => formik.setFieldValue("education", value)}
                            {...formik.getFieldProps("education")}
                        >
                            <SelectTrigger className={`w-full ${readonly ? "bg-gray-200" : ""}`}>
                                <SelectValue placeholder="เลือกระดับการศึกษา" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="elementary">ประถมศึกษา</SelectItem>
                                <SelectItem value="secondary">มัธยมศึกษา</SelectItem>
                                <SelectItem value="bachelor">ปริญญาตรี</SelectItem>
                                <SelectItem value="master">ปริญญาโท</SelectItem>
                                <SelectItem value="doctoral">ปริญญาเอก</SelectItem>
                                <SelectItem value="vocational_certificate">ประกาศนียบัตรวิชาชีพ</SelectItem>
                                <SelectItem value="high_vocational_certificate">ประกาศนียบัตรวิชาชีพชั้นสูง</SelectItem>
                            </SelectContent>
                        </Select>
                        {formik.touched.education && formik.errors.education ? (
                            <div className="text-red-500 text-sm">{formik.errors.education}</div>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
};
