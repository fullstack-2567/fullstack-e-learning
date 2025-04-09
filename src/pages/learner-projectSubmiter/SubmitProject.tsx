import {
  createProject,
  getAllProject,
  getUserProjects,
} from "@/api/ProjectApi";
import LearningNavbar from "@/components/learner-projectSubmiter/LearnerNavbar";
import { CreateUserForm } from "@/components/learner-projectSubmiter/projectSubmit/CreateUserForm";
import { CreateProjectForm } from "@/components/learner-projectSubmiter/projectSubmit/CreateProjectForm";
import { ReviewForm } from "@/components/learner-projectSubmiter/projectSubmit/ReviewForm";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Project, SubmitProjectDto, User } from "@/utils/backend-openapi";
import { Label } from "@radix-ui/react-label";
import { FormikProps, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import SubmitSuccess from "@/components/learner-projectSubmiter/projectSubmit/SubmitSuccess";

export default function SubmitProject() {
  const [project, setProject] = useState<Project>();
  const [user, setUser] = useState<User>();
  const [step, setStep] = useState<number>(1);
  const [projectNameAndIds, setProjectNameAndIds] = useState<
    { name: string; id: string }[]
  >([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getUserProjects();
      const projectData = response.map((project) => ({
        name: project.projectThaiName,
        id: project.projectId,
      }));
      setProjectNameAndIds(projectData);
    };
    fetchProjects();
  }, []);

  const formikForCreateProject = useFormik<SubmitProjectDto>({
    initialValues: {
      projectThaiName: "",
      projectEngName: "",
      projectSummary: "",
      startDate: "",
      endDate: "",
      sdgType: "SDG1",
      //base64 encoded string of file
      projectDescriptionFile: "",
      projectType: "energy_and_environment",
      parentProjectID: undefined,
      userInfo: {},
    },
    validationSchema: yup.object({
      projectThaiName: yup
        .string()
        .required("Required")
        .min(1, "Too short")
        .max(255, "Too long"),
      projectEngName: yup
        .string()
        .required("Required")
        .min(1, "Too short")
        .max(255, "Too long"),
      projectSummary: yup
        .string()
        .required("Required")
        .min(1, "Too short")
        .max(1000, "Too long"),
      startDate: yup.date().required("Required"),
      endDate: yup
        .date()
        .required("Required")
        .min(yup.ref("startDate"), "End date must be after start date"),
      sdgType: yup.string().required("Required"),
      projectDescriptionFile: yup.mixed().required("กรุณาเลือกไฟล์"),
      projectType: yup.string().required("Required"),
      parentProjectID: yup.string(),
    }),
    onSubmit: async (values) => {
      // Handle form submission here
      console.log("Form values:", values);

      // Backend is not usable yet, so we will use local storage to store the data
      localStorage.setItem("project", JSON.stringify(values));
      // const res = await createProject(values);
      // if (res.status === 200) {
      //     alert("สร้างโครงการสำเร็จ");
      // }
      // else {
      //     alert("สร้างโครงการไม่สำเร็จ");
      // }
      // redirect to /learner-projectSubmiter/submit-success via react-router-dom
    },
  });

  const formikForCreatingUser = useFormik<User>({
    initialValues: {
      userId: "",
      email: "abcd@e.f",
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
    },

    validationSchema: yup.object({
      email: yup.string().email("Invalid email").required("Required"),
      role: yup.string().required("Required"),
      sex: yup.string().required("Required"),
      firstName: yup
        .string()
        .required("Required")
        .min(1, "Too short")
        .max(100, "Too long"),
      lastName: yup
        .string()
        .required("Required")
        .min(1, "Too short")
        .max(100, "Too long"),
      birthDate: yup
        .date()
        .required("Required")
        .max(new Date(), "Date must be in the past"),
      prefix: yup.string().required("Required"),
      education: yup.string().required("Required"),
      tel: yup
        .string()
        .required("Required")
        .matches(/^[0-9]+$/, "Only numbers are allowed"),
    }),

    onSubmit: async (values) => {
      // Handle form submission here
      console.log("Form values:", values);
      localStorage.setItem("user", JSON.stringify(values));
    },
  });

  useEffect(() => {
    // use react-router-dom to navigate to /learner-projectSubmiter/submitsuccess
    if (step === 4) {
      window.location.href = "/submitsuccess";
    }
    // if (formikForCreateProject.isSubmitting) {
    //     setStep(3);
    // }
  }, [formikForCreateProject.isSubmitting]);

  return (
    <div>
      <LearningNavbar />
      <div className="min-h-screen bg-gray-100 font-inter p-8 flex flex-col  gap-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formikForCreateProject.handleSubmit();
            formikForCreatingUser.handleSubmit();
          }}
        >
          <div>
            <h1 className="text-3xl">ลงทะเบียนโครงการ</h1>
          </div>
          <div className={`${step === 1 ? "" : "hidden"}`}>
            <CreateProjectForm
              formik={formikForCreateProject}
              projectNameAndIds={projectNameAndIds}
              readonly={false}
            />
          </div>
          <div className={`${step === 2 ? "" : "hidden"}`}>
            <CreateUserForm formik={formikForCreatingUser} readonly={false} />
          </div>
          <div className={`${step === 3 ? "" : "hidden"}`}>
            <ReviewForm
              projectFormik={formikForCreateProject}
              userFormik={formikForCreatingUser}
              projectNameAndIds={projectNameAndIds}
            />
          </div>

          <div className="flex flex-row justify-between  gap-4 mt-4">
            <div className="flex flex-row gap-4">
              <button
                type="button"
                className={`bg-blue-500 text-white px-4 py-2 rounded ${step === 1 ? "hidden" : ""}`}
                onClick={() => setStep(step - 1)}
              >
                ย้อนกลับ
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  formikForCreateProject.resetForm();
                  formikForCreatingUser.resetForm();
                  setStep(1);
                }}
              >
                ล้างข้อมูล
              </button>
            </div>
            <div className="flex flex-row gap-4">
              <div className={`w-100 ${step === 3 ? "" : "hidden"}`}>
                <p>
                  ข้าพเจ้าตกลงยินยอมให้บริษัทจัดเก็บเก็บข้อมูลส่วนบุคคลที่ข้าพเจ้าได้ให้ไว้ในการลงทะเบียนโครงการ
                  และยินยอมให้เปิดเผยข้อมูลส่วนบุคคลของข้าพเจ้าต่อหน่วยงานที่เกี่ยวข้อง
                  เพื่อพิจารณาและดำเนินการตามวัตถุประสงค์ของระบบ ทั้งนี้
                  ข้าพเจ้าขอรับรองว่าโครงการนี้เป็นความคิดริเริ่มของนักพัฒนาโครงการ
                  และไม่ได้ลอกเลียนแบบมาจากผู้อื่นผู้ใด
                </p>
                <RadioGroup defaultValue="agree">
                  <div className="flex items-center space-x-2 mt-4">
                    <RadioGroupItem
                      value="agree"
                      id="agree"
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <Label
                      htmlFor="agree"
                      className="text-sm text-gray-700 cursor-pointer "
                    >
                      ข้าพเจ้ายอมรับ
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <button
                type="button"
                className={`bg-gray-500 text-white px-4 py-2 rounded " ${step >= 3 ? "hidden" : ""}`}
                onClick={() => {
                  if (
                    (step === 1 && !formikForCreateProject.isValid) ||
                    (step === 2 && !formikForCreatingUser.isValid)
                  ) {
                    alert(
                      "กรุณากรอกข้อมูลให้ครบถ้วน ตอนนี้ยังขาดตรงที่ " +
                        (step === 1
                          ? formikForCreateProject.errors
                          : formikForCreatingUser.errors)
                    );
                    return;
                  }
                  setStep(step + 1);
                }}
              >
                ถัดไป
              </button>
              <button
                className={`bg-emerald-500 text-white px-4 py-2 rounded ${step === 3 ? "" : "hidden"}`}
                onClick={() => {
                  formikForCreateProject.handleSubmit();
                  formikForCreatingUser.handleSubmit();
                }}
              >
                ส่งข้อมูล
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
