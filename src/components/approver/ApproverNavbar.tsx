import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router";

export default function ApproverNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#606A9B]/95 backdrop-blur-sm shadow-lg" : "bg-[#606A9B]"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <Link
          to="/contents"
          className="text-white text-lg font-medium font-prompt"
        >
          Web
        </Link>

        <div className="flex items-center space-x-6">
          <Link
            to="/approver/project-menu"
            className={`text-white/80 hover:text-white transition-colors text-sm font-prompt ${
              isActive("/approve-project-menu")
                ? "border-b-2 border-white text-white"
                : ""
            }`}
          >
            กลับไปยังรายการโครงการ
          </Link>
        </div>
      </div>
    </nav>
  );
}
