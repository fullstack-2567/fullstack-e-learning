import LearningNavbar from "@/components/learner/LearnerNavbar";
import ContentTable from "@/components/learner/contentMenu/contentTable";

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