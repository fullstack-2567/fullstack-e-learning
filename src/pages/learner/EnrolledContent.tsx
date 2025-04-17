import EnrolledContentTable from "@/components/learner/enrolledContent/enrolledContentTable";
import LearningNavbar from "@/components/learner/LearnerNavbar";

export default function EnrolledContent() {
  return (
    <div>
      <LearningNavbar />
      <div className="min-h-screen bg-gray-100">
        <EnrolledContentTable />
      </div>
    </div>
  );
}
