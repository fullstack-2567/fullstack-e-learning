import LearningNavbar from "@/components/learner-projectSubmiter/LearnerNavbar";
import { SubmitProjectDto, User } from "@/utils/backend-openapi";

import { useFormik } from 'formik';
import { useLocation } from "react-router-dom";
import * as yup from 'yup';

export default function SubmitProject() {
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
            birthDate: yup.date().required("Required").max("", "Date must be in the past"),
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