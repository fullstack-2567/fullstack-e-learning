import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateinCourses: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    courseTitle: "",
    courseDescription: "",
    videoLink: "",
    coverImageLink: "",
  });

  const [errors, setErrors] = useState({
    courseTitle: false,
    courseDescription: false,
    videoLink: false,
    coverImageLink: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleCancel = () => {
    navigate(-1); // go back to the previous page
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors = {
      courseTitle: !formData.courseTitle.trim(),
      courseDescription: !formData.courseDescription.trim(),
      videoLink: !formData.videoLink.trim(),
      coverImageLink: !formData.coverImageLink.trim(),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) return;

    // Submit logic here (e.g. API call)
    console.log("Course submitted:", formData);
    alert("Course created successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">คอร์สเรียน</h1>

      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-xl font-semibold border-b pb-2 mb-6">New Courses</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Course Title */}
          <div className="grid grid-cols-5 items-center gap-4">
            <label className="col-span-1 font-medium text-right ">
              ชื่อคอร์ส
            </label>
            <input
              type="text"
              name="courseTitle"
              value={formData.courseTitle}
              onChange={handleChange}
              className="col-span-4 border rounded px-4 py-2 w-full"
            />
            {errors.courseTitle && <p className="text-red-500 col-span-5 text-sm ml-[25%]">กรุณากรอกชื่อคอร์ส</p>}
          </div>

          {/* Course Description */}
          <div className="grid grid-cols-5 items-start gap-4">
            <label className="col-span-1 font-medium text-right">
              รายละเอียดคอร์ส
            </label>
            <textarea
              name="courseDescription"
              value={formData.courseDescription}
              onChange={handleChange}
              rows={4}
              className="col-span-4 border rounded px-4 py-2 w-full"
            />
            {errors.courseDescription && <p className="text-red-500 col-span-5 text-sm ml-[25%]">กรุณากรอกรายละเอียดคอร์ส</p>}
          </div>

          {/* Video Link */}
          <div className="grid grid-cols-5 items-center gap-4">
            <label className="col-span-1 font-medium text-right">
              Content Video Link 
            </label>
            <input
              type="text"
              name="videoLink"
              value={formData.videoLink}
              onChange={handleChange}
              className="col-span-4 border rounded px-4 py-2 w-full"
            />
            {errors.videoLink && <p className="text-red-500 col-span-5 text-sm ml-[25%]">กรุณาใส่ลิงก์วิดีโอ</p>}
          </div>

          {/* Cover Image Link */}
          <div className="grid grid-cols-5 items-center gap-4">
            <label className="col-span-1 font-medium text-right">
            Thumbnail
            </label>
            <input
              type="text"
              name="coverImageLink"
              value={formData.coverImageLink}
              onChange={handleChange}
              className="col-span-4 border rounded px-4 py-2 w-full"
            />
            {errors.coverImageLink && <p className="text-red-500 col-span-5 text-sm ml-[25%]">กรุณาใส่ลิงก์ภาพหน้าปก</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded"
            >
              ยืนยัน
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateinCourses;
