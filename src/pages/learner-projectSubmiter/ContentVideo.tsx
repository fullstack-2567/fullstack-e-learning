import LearningNavbar from "@/components/learner-projectSubmiter/LearnerNavbar";
import Player from "@/components/learner-projectSubmiter/contentVideo/Player";
import { contentService } from "@/services/api";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Content } from "@/utils/backend-openapi";

export default function ContentVideo() {
  const location = useLocation();
  const [content, setContent] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await contentService.getContentById(id);
      if (response) {
        setContent(response);
      } else {
        setError("Failed to fetch content");
        console.error("Failed to fetch content:", response);
      }
    } catch (error) {
      setError("Error loading video content");
      console.error("Error fetching content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const id = query.get("videoId");
    if (id) {
      fetchContent(id);
    } else {
      setError("No video ID provided");
      setIsLoading(false);
    }
  }, [location.search]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <LearningNavbar />
      <div className="flex-grow bg-gray-100">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-red-500">{error}</div>
          </div>
        ) : content ? (
          <Player
            title={content.contentName || "Untitled Video"}
            videoSrc={content.contentVideo || ""}
          />
        ) : null}
      </div>
    </div>
  );
}
