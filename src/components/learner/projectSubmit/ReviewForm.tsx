import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitProjectDto, User } from "@/utils/backend-openapi";
import { FormikProps } from "formik";
import { CreateProjectForm } from "./CreateProjectForm";
import { CreateUserForm } from "./CreateUserForm";

export const ReviewForm = ({
  projectFormik,
  userFormik,
  projectNameAndIds,
}: {
  projectFormik: FormikProps<SubmitProjectDto>;
  userFormik: FormikProps<Partial<User>>;
  projectNameAndIds: { name: string; id: string }[];
}) => {
  // all fields are readonly
  return (
    projectFormik &&
    userFormik && (
      <>
        <div>
          <h1 className="text-2xl">ตรวจสอบข้อมูล</h1>
        </div>
        <div className="border-2 border-gray-600 rounded-lg p-4 mt-4">
          <CreateProjectForm
            formik={projectFormik}
            readonly={true}
            projectNameAndIds={projectNameAndIds}
          />
        </div>
        <div className="border-2 border-gray-600 rounded-lg p-4 mt-4">
          <CreateUserForm formik={userFormik} readonly={true} />
        </div>
      </>
    )
  );
};
