import React from "react";
import { User } from "@/utils/backend-openapi";

// Prefix options
const PREFIX_OPTIONS = [
  { value: "mr", label: "นาย" },
  { value: "master", label: "เด็กชาย" },
  { value: "mrs", label: "นาง" },
  { value: "miss", label: "นางสาว" },
  { value: "girl", label: "เด็กหญิง" },
  { value: "other", label: "อื่นๆ" },
];

// Education options
const EDUCATION_OPTIONS = [
  { value: "primary", label: "ประถมศึกษา" },
  { value: "secondary", label: "มัธยมศึกษา" },
  { value: "vocational", label: "ปวช./ปวส." },
  { value: "bachelor", label: "ปริญญาตรี" },
  { value: "master", label: "ปริญญาโท" },
  { value: "doctorate", label: "ปริญญาเอก" },
  { value: "other", label: "อื่นๆ" },
];

// Gender options
const GENDER_OPTIONS = [
  { value: "male", label: "ชาย" },
  { value: "female", label: "หญิง" },
  { value: "other", label: "อื่นๆ" },
];

interface UserInfoStepProps {
  data: User;
  errors: Record<string, string>;
  updateData: (field: string, value: any) => void;
}

const UserInfoStep: React.FC<UserInfoStepProps> = ({
  data,
  errors,
  updateData,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">ข้อมูลผู้ใช้</h2>

      {/* Name Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Prefix */}
        <div className="space-y-2">
          <label
            htmlFor="prefix"
            className="block text-sm font-medium text-gray-700"
          >
            คำนำหน้า <span className="text-red-500">*</span>
          </label>
          <select
            id="prefix"
            value={data.prefix}
            onChange={(e) => updateData("prefix", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.prefix ? "border-red-500" : "border-gray-300"
            }`}
          >
            {PREFIX_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.prefix && (
            <p className="text-red-500 text-sm">{errors.prefix}</p>
          )}
        </div>

        {/* First Name */}
        <div className="space-y-2">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            ชื่อ <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            value={data.firstName}
            onChange={(e) => updateData("firstName", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="กรอกชื่อจริง"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            นามสกุล <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            value={data.lastName}
            onChange={(e) => updateData("lastName", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="กรอกนามสกุล"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Birth Date and Gender */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Birth Date */}
        <div className="space-y-2">
          <label
            htmlFor="birthDate"
            className="block text-sm font-medium text-gray-700"
          >
            วันเกิด <span className="text-red-500">*</span>
          </label>
          <input
            id="birthDate"
            type="date"
            value={data.birthDate}
            onChange={(e) => updateData("birthDate", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.birthDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.birthDate && (
            <p className="text-red-500 text-sm">{errors.birthDate}</p>
          )}
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <label
            htmlFor="sex"
            className="block text-sm font-medium text-gray-700"
          >
            เพศ <span className="text-red-500">*</span>
          </label>
          <select
            id="sex"
            value={data.sex}
            onChange={(e) => updateData("sex", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.sex ? "border-red-500" : "border-gray-300"
            }`}
          >
            {GENDER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.sex && <p className="text-red-500 text-sm">{errors.sex}</p>}
        </div>
      </div>

      {/* Education */}
      <div className="space-y-2">
        <label
          htmlFor="education"
          className="block text-sm font-medium text-gray-700"
        >
          ระดับการศึกษา <span className="text-red-500">*</span>
        </label>
        <select
          id="education"
          value={data.education}
          onChange={(e) => updateData("education", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.education ? "border-red-500" : "border-gray-300"
          }`}
        >
          {EDUCATION_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.education && (
          <p className="text-red-500 text-sm">{errors.education}</p>
        )}
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            อีเมล <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => updateData("email", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="example@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label
            htmlFor="tel"
            className="block text-sm font-medium text-gray-700"
          >
            เบอร์โทรศัพท์ <span className="text-red-500">*</span>
          </label>
          <input
            id="tel"
            type="tel"
            value={data.tel}
            onChange={(e) => updateData("tel", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.tel ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="0812345678"
          />
          {errors.tel && <p className="text-red-500 text-sm">{errors.tel}</p>}
          <p className="text-xs text-gray-500">
            ระบุเฉพาะตัวเลขเท่านั้น เช่น 0812345678
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoStep;
