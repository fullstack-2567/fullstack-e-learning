import EnrolledContentTable from "@/components/learner-projectSubmiter/enrolledContent/enrolledContentTable";
import LearningNavbar from "@/components/learner-projectSubmiter/LearnerNavbar";

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
