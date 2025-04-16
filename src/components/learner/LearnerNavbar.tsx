import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/App";

export default function LearningNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname.startsWith(path);

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
          FULLSTACK TEAM B
        </Link>

        <div className="flex items-center space-x-6">
          {[
            { path: ROUTES.PROJECT_SUBMIT_PROJECT, 
              label: "ส่งโครงการ" 
            },
            {
              path: ROUTES.PROJECT_LISTS,
              label: "สถานะโครงการ",
            },
            { 
              path: ROUTES.CONTENT_MENU, 
              label: "คอร์สเรียน" 
            },
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`text-sm font-prompt transition-colors ${
                isActive(path)
                  ? "text-white border-b-2 border-white"
                  : "text-white opacity-80 hover:opacity-100"
              }`}
            >
              {label}
            </Link>
          ))}

          <Button variant="destructive" onClick={logout}>
            ออกจากระบบ
          </Button>
        </div>
      </div>
    </nav>
  );
}
