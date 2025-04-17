import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Components
import LearningNavbar from "@/components/learner/LearnerNavbar";

// API
import { openApiclient } from "@/utils/api-client";

// Types
import { SubmitProjectDto, User } from "@/utils/backend-openapi";
import ProjectInfoStep from "@/components/learner/ProjectInfoStep";
import UserInfoStep from "@/components/learner/UserInfoStep";
import ReviewStep from "@/components/learner/ReviewStep";
import { ROUTES } from "@/App";

const initialProjectState: SubmitProjectDto = {
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
};

const initialUserState: User = {
  userId: "",
  email: "",
  createdDT: "",
  updatedDT: "",
  role: "user",
  sex: "male",
  firstName: "",
  lastName: "",
  birthDate: "",
  prefix: "master",
  education: "bachelor",
  tel: "",
  picture: "",
  googleId: "",
  refreshToken: null,
  contentReports: [],
};

const SubmitProject: React.FC = () => {
  // Navigation
  const navigate = useNavigate();

  // State for current step
  const [step, setStep] = useState(1);

  // Loading states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);

  // Form data
  const [projectData, setProjectData] =
    useState<SubmitProjectDto>(initialProjectState);
  const [userData, setUserData] = useState<User>(initialUserState);
  const [projectList, setProjectList] = useState<
    { name: string; id: string }[]
  >([]);

  // Form validation
  const [projectErrors, setProjectErrors] = useState<Record<string, string>>(
    {}
  );
  const [userErrors, setUserErrors] = useState<Record<string, string>>({});

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoadingProjects(true);
        const response = await openApiclient.getUserProjects();

        const formattedProjects = response.data.map((project) => ({
          name: project.projectThaiName,
          id: project.projectId,
        }));

        setProjectList(formattedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("ไม่สามารถดึงข้อมูลโครงการได้");
      } finally {
        setIsLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);
  useEffect(() => {
    const checkLatestProject = async () => {
      try {
        const res = await openApiclient.getUserLatestProject();
        const latest = res.data;
  
        const isRejected = !!latest.rejectedDT;
        const isFullyApproved = !!latest.thirdApprovedDT;
  
        if (!isRejected && !isFullyApproved) {
          toast.warning(
            "คุณไม่สามารถส่งโครงการใหม่ได้ในขณะนี้ เนื่องจากโครงการล่าสุดยังอยู่ระหว่างรออนุมัติ"
          );
          navigate(`${ROUTES.PROJECT_SUBMIT_SUCCESS_VIEW(latest.projectId)}`);
          return;
        }

      } catch (error: any) {
        if (error?.response?.status === 404) {
          return;
        }
  
        console.error("เกิดข้อผิดพลาดในการตรวจสอบโครงการล่าสุด", error);
        toast.error("ไม่สามารถโหลดสถานะโครงการล่าสุดได้");
        navigate(ROUTES.CONTENT_MENU);
      }
    };
  
    checkLatestProject();
  }, [navigate]);
  

  // Handlers for project data updates
  const updateProjectData = useCallback(
    (field: string, value: any) => {
      setProjectData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Clear error when field is updated
      if (projectErrors[field]) {
        setProjectErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [projectErrors]
  );

  // Handlers for user data updates
  const updateUserData = useCallback(
    (field: string, value: any) => {
      setUserData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Clear error when field is updated
      if (userErrors[field]) {
        setUserErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [userErrors]
  );

  // Validate project data
  const validateProjectData = useCallback(() => {
    const errors: Record<string, string> = {};

    // Required fields for step 1
    if (!projectData.projectThaiName)
      errors.projectThaiName = "กรุณากรอกชื่อโครงการภาษาไทย";
    if (!projectData.projectEngName)
      errors.projectEngName = "กรุณากรอกชื่อโครงการภาษาอังกฤษ";
    if (!projectData.projectSummary)
      errors.projectSummary = "กรุณากรอกสรุปโครงการ";
    if (!projectData.startDate)
      errors.startDate = "กรุณาเลือกวันที่เริ่มต้นโครงการ";
    if (!projectData.endDate) errors.endDate = "กรุณาเลือกวันสิ้นสุดโครงการ";

    // Check if end date is after start date
    if (projectData.startDate && projectData.endDate) {
      const start = new Date(projectData.startDate);
      const end = new Date(projectData.endDate);
      if (end < start) {
        errors.endDate = "วันสิ้นสุดโครงการต้องอยู่หลังวันเริ่มต้นโครงการ";
      }
    }

    if (!projectData.projectDescriptionFile)
      errors.projectDescriptionFile = "กรุณาอัปโหลดไฟล์คำอธิบายโครงการ";

    setProjectErrors(errors);
    return Object.keys(errors).length === 0;
  }, [projectData]);

  // Validate user data
  const validateUserData = useCallback(() => {
    const errors: Record<string, string> = {};

    // Required fields for step 2
    if (!userData.firstName) errors.firstName = "กรุณากรอกชื่อจริง";
    if (!userData.lastName) errors.lastName = "กรุณากรอกนามสกุล";

    // Email validation
    if (!userData.email) {
      errors.email = "กรุณากรอกอีเมล";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = "กรุณากรอกอีเมลที่ถูกต้อง";
    }

    // Phone validation
    if (!userData.tel) {
      errors.tel = "กรุณากรอกเบอร์โทรศัพท์";
    } else if (!/^\d+$/.test(userData.tel)) {
      errors.tel = "เบอร์โทรศัพท์ต้องเป็นตัวเลขเท่านั้น";
    }

    // Birth date validation
    if (!userData.birthDate) {
      errors.birthDate = "กรุณาเลือกวันเกิด";
    } else {
      const birthDate = new Date(userData.birthDate);
      const today = new Date();
      if (birthDate > today) {
        errors.birthDate = "วันเกิดต้องเป็นวันที่ผ่านมาแล้ว";
      }
    }

    setUserErrors(errors);
    return Object.keys(errors).length === 0;
  }, [userData]);

  // Handle next step
  const handleNext = useCallback(() => {
    if (step === 1) {
      if (validateProjectData()) {
        setStep(2);
      } else {
        toast.error("กรุณากรอกข้อมูลโครงการให้ครบถ้วน");
      }
    } else if (step === 2) {
      if (validateUserData()) {
        setStep(3);
      } else {
        toast.error("กรุณากรอกข้อมูลผู้ใช้ให้ครบถ้วน");
      }
    }
  }, [step, validateProjectData, validateUserData]);

  // Handle previous step
  const handlePrevious = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }
  }, [step]);

  // Handle form reset
  const handleReset = useCallback(() => {
    if (window.confirm("คุณต้องการล้างข้อมูลทั้งหมดใช่หรือไม่?")) {
      setProjectData(initialProjectState);
      setUserData(initialUserState);
      setProjectErrors({});
      setUserErrors({});
      setStep(1);
    }
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Validate both forms before submitting
      const isProjectValid = validateProjectData();
      const isUserValid = validateUserData();

      if (!isProjectValid || !isUserValid) {
        toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
      }

      try {
        setIsSubmitting(true);

        // กรณีที่ไม่มีไฟล์ ให้แจ้งเตือนผู้ใช้
        if (!projectData.projectDescriptionFile) {
          toast.error("กรุณาอัปโหลดไฟล์รายละเอียดโครงการ");
          setIsSubmitting(false);
          return;
        }

        // ส่งข้อมูลไปยัง API
        const response = await openApiclient.submitProject(null, {
          ...projectData,
          userInfo: {
            prefix: userData.prefix,
            firstName: userData.firstName,
            lastName: userData.lastName,
            birthDate: userData.birthDate,
            education: userData.education,
            tel: userData.tel,
            sex: userData.sex,
          },
        });

        const data = response.data;
        if ("projectId" in data) {
          toast.success("บันทึกข้อมูลสำเร็จ");
          navigate(`/submit-success/${data.projectId}`);
        } else {
          toast.error("รูปแบบการตอบกลับไม่ถูกต้อง");
        }
      } catch (error) {
        console.error("Error submitting project:", error);
        toast.error(
          "เกิดข้อผิดพลาดในการส่งข้อมูล โปรดตรวจสอบข้อมูลและลองใหม่อีกครั้ง"
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [projectData, userData, validateProjectData, validateUserData, navigate]
  );

  // Render loading skeleton
  const renderLoadingSkeleton = () => (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3 mb-6"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
      </div>
    </div>
  );

  // Render current step content
  const renderStepContent = () => {
    if (isLoadingProjects) {
      return renderLoadingSkeleton();
    }

    switch (step) {
      case 1:
        return (
          <ProjectInfoStep
            data={projectData}
            errors={projectErrors}
            updateData={updateProjectData}
            projectList={projectList}
          />
        );
      case 2:
        return (
          <UserInfoStep
            data={userData}
            errors={userErrors}
            updateData={updateUserData}
          />
        );
      case 3:
        return (
          <ReviewStep
            projectData={projectData}
            userData={userData}
            projectList={projectList}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LearningNavbar />

      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            ลงทะเบียนโครงการ
          </h1>

          {/* Step indicators - ปรับให้เหมือนรูปที่ต้องการ */}
          <div className="flex items-center justify-between max-w-2xl mx-auto mb-8 relative">
            {[1, 2, 3].map((s, i) => {
              const isCompleted = step > s;
              const isActive = step === s;

              return (
                <div
                  key={s}
                  className="relative flex flex-col items-center w-1/3 z-10"
                >
                  {/* เส้นพื้นหลัง */}
                  {i < 2 && (
                    <div className="absolute top-4 left-1/2 w-full h-0.5 bg-gray-300 -z-10" />
                  )}

                  {/* เส้น active (ขยับตาม step) */}
                  {i < 2 && step > s && (
                    <div
                      className="absolute top-4 left-1/2 h-0.5 bg-blue-600 -z-10 transition-all duration-500 ease-in-out"
                      style={{ width: "100%" }}
                    />
                  )}

                  {/* จุด Step */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ease-out transform ${
                      isCompleted || isActive
                        ? "bg-blue-600 text-white scale-110"
                        : "bg-gray-300 text-gray-700 scale-100"
                    }`}
                  >
                    {isCompleted ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <span className="text-sm">{s}</span>
                    )}
                  </div>

                  {/* ชื่อขั้นตอน */}
                  <span
                    className={`mt-2 text-sm font-medium transition-colors duration-300 ${
                      step >= s ? "text-blue-600" : "text-gray-500"
                    }`}
                  >
                    {s === 1
                      ? "ข้อมูลโครงการ"
                      : s === 2
                        ? "ข้อมูลผู้ใช้"
                        : "ตรวจสอบ"}
                  </span>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            {/* Consent (only on step 3) */}
            {step === 3 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700 mb-4">
                  ข้าพเจ้าตกลงยินยอมให้บริษัทจัดเก็บข้อมูลส่วนบุคคลที่ข้าพเจ้าได้ให้ไว้ในการลงทะเบียนโครงการ
                  และยินยอมให้เปิดเผยข้อมูลส่วนบุคคลของข้าพเจ้าต่อหน่วยงานที่เกี่ยวข้อง
                  เพื่อพิจารณาและดำเนินการตามวัตถุประสงค์ของระบบ ทั้งนี้
                  ข้าพเจ้าขอรับรองว่าโครงการนี้เป็นความคิดริเริ่มของนักพัฒนาโครงการ
                  และไม่ได้ลอกเลียนแบบมาจากผู้อื่นผู้ใด
                </p>
                <div className="flex items-center">
                  <input
                    id="consent"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    required
                  />
                  <label
                    htmlFor="consent"
                    className="ml-2 text-sm font-medium text-gray-700"
                  >
                    ข้าพเจ้ายอมรับ
                  </label>
                </div>
              </div>
            )}

            {/* Form buttons */}
            <div className="flex justify-between mt-8">
              <div className="flex gap-2">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
                  >
                    ย้อนกลับ
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  ล้างข้อมูล
                </button>
              </div>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  ถัดไป
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      กำลังส่งข้อมูล...
                    </>
                  ) : (
                    "ส่งข้อมูล"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitProject;
