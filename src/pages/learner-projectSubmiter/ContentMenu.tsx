import LearningNavbar from "@/components/learner-projectSubmiter/LearnerNavbar";
import ContentTable from "@/components/learner-projectSubmiter/contentMenu/contentTable";

export default function ContentMenu() {
    return (
        <div>
            <LearningNavbar />
            <div className="min-h-screen bg-gray-100">
            <ContentTable />
            </div>
        </div>

    );
  }