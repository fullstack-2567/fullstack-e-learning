import LearningNavbar from "@/components/learner-projectSubmiter/LearnerNavbar";
import Player from "@/components/learner-projectSubmiter/contentVideo/Player";

export default function ContentVideo() {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <LearningNavbar />
            <div className="flex-grow bg-gray-100">
                <Player title={"Test"} videoSrc={""} />
            </div>
        </div>
    );
}