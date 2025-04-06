import LearningNavbar from "@/components/learner-projectSubmiter/LearnerNavbar";
import { ProjectType, SDGType, SubmitProjectDto } from "@/types/Project";
import { Education, Gender, Prefix, User, UserRole } from "@/types/User";
import { useFormik } from 'formik';
import { useLocation } from "react-router-dom";
import * as yup from 'yup';

export default function SubmitProject() {
    const formikForCreateProject = useFormik<SubmitProjectDto>({
        initialValues: {
            projectThaiName: "",
            projectEngName: "",
            projectSummary: "",
            startDate: new Date(),
            endDate: new Date(),
            sdgType: SDGType.SDG1,
            projectDescriptionFile: "",
            projectType: ProjectType.AGRICULTURE_AND_FOOD,
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
            projectDescriptionFile: yup.mixed().required("Required"),
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
            createdAT: new Date(),
            updatedAT: new Date(),
            role: UserRole.USER,
            sex: Gender.MALE,
            firstName: "",
            lastName: "",
            birthDate: new Date(),
            prefix: Prefix.MASTER,
            education: Education.BACHELOR,
            tel: "",
        },

        validationSchema: yup.object({
            email: yup.string().email("Invalid email").required("Required"),
            role: yup.string().required("Required"),
            sex: yup.string().required("Required"),
            firstName: yup.string().required("Required").min(1, "Too short").max(100, "Too long"),
            lastName: yup.string().required("Required").min(1, "Too short").max(100, "Too long"),
            birthDate: yup.date().required("Required").max(new Date(), "Date must be in the past"),
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
            <div className="min-h-screen bg-gray-100">
            //component หน้าส่งโปรเจค
            </div>
        </div>

    );
  }

export const ProjectDataForm = () => {
    
}
