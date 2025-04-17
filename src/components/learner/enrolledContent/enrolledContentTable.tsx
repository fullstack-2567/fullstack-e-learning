import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Search,
  BookOpen,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import EnrolledContentCard from "./enrolledContentCard";
import { Badge } from "@/components/ui/badge";
import { openApiclient } from "@/utils/api-client";
import { Enrollment } from "@/utils/backend-openapi";
import { getContentCategoryInThai } from "@/utils/enumMapping";

export default function EnrolledContentTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  const fetchContents = async () => {
    try {
      const response = await openApiclient.getUserContents();
      const data = response.data;
      if (data) {
        setEnrollments([...data]);
      } else {
        console.error("Failed to fetch contents:", response);
      }
    } catch (error) {
      console.error("Error fetching contents:", error);
    } finally {
    }
  };
  // Fetch real content from API
  useEffect(() => {
    fetchContents();
  }, []);

  const categories = [
    "All",
    ...new Set(
      enrollments.map((enrollment) => enrollment.content.contentCategory)
    ),
  ];

  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, 5);

  const filteredEnrollment = enrollments.filter((enrollment) => {
    const matchesSearch =
      enrollment.content.contentName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      enrollment.content.contentCategory
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeFilter === "All" ||
      enrollment.content.contentCategory === activeFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl font-prompt">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-prompt">
            My Courses
          </h1>
          <p className="text-gray-500 mb-4 md:mb-0 font-prompt">
            Courses you've enrolled in
          </p>
        </div>

        <div className="relative max-w-md w-full">
          <div className="flex items-center border rounded-xl overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            <div className="pl-3 flex items-center">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="font-prompt w-full px-3 py-2 bg-transparent focus:outline-none"
              style={{ border: "none", outline: "none", boxShadow: "none" }}
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <SlidersHorizontal size={18} className="mr-2 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 font-prompt">
            Filters:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {visibleCategories.map((category) => (
            <Badge
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              className={`cursor-pointer px-3 py-1 rounded-full font-prompt ${
                activeFilter === category
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveFilter(category)}
            >
              {getContentCategoryInThai(category)}
            </Badge>
          ))}

          {categories.length > 5 && (
            <button
              className="text-sm text-blue-500 hover:text-blue-700 font-prompt flex items-center ml-2"
              onClick={() => setShowAllCategories(!showAllCategories)}
            >
              {showAllCategories ? (
                <>
                  <ChevronUp size={16} className="mr-1" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown size={16} className="mr-1" />
                  Show all ({categories.length - 5} more)
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {filteredEnrollment.length === 0 ? (
        <div className="bg-gray-50 rounded-xl text-center p-12 mt-6">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2 font-prompt">
            No courses found
          </h3>
          <p className="text-gray-500 max-w-md mx-auto font-prompt">
            We couldn't find any courses matching your search criteria. Try
            adjusting your filters or search terms.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4 font-prompt">
            Showing {filteredEnrollment.length} of {enrollments.length} courses
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEnrollment.map((enrollment) => (
              <EnrolledContentCard
                key={enrollment.content.contentId}
                contentId={enrollment.content.contentId}
                contentName={enrollment.content.contentName}
                contentCategory={enrollment.content.contentCategory}
                contentThumbnail={enrollment.content.contentThumbnail}
                contentDescription={enrollment.content.contentDescription}
                isCompleted={enrollment.completedDT !== null}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
