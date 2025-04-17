import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Content } from "@/components/admin/ContentManagement";
import { openApiclient } from "@/utils/api-client";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const ContentCard = ({
  contentId,
  contentName,
  contentCategory,
  contentThumbnail,
  contentDescription = "...",
}: Content) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Card
        className="h-full p-0 flex flex-col overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsDialogOpen(true)}
      >
        {/* ... (rest of your existing card code) ... */}
        <div className="relative">
          {contentThumbnail ? (
            <div className="relative overflow-hidden">
              <img
                src={contentThumbnail}
                alt={contentName}
                className="w-full h-48 object-cover"
              />
            </div>
          ) : (
            <div className="w-full h-48 bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
              <Eye size={32} className="text-gray-400" />
            </div>
          )}

          <Badge
            variant="outline"
            className="absolute top-3 left-3 bg-slate-50 text-xs font-medium px-2 py-1 rounded-full"
          >
            {contentCategory}
          </Badge>

          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <div className="p-3 bg-white bg-opacity-90 rounded-full shadow-md">
              <Eye size={24} className="text-gray-800" />
            </div>
          </div>
        </div>

        <CardContent className="border-red-500">
          <CardTitle className="text-lg mb-2 line-clamp-2 transition-colors duration-200 font-prompt">
            {contentName}
          </CardTitle>
          {contentDescription && (
            <p className="text-sm text-gray-600 line-clamp-2 font-prompt">
              {contentDescription}
            </p>
          )}
        </CardContent>

        <CardFooter className=" px-4 pb-4 text-xs text-gray-500 border-t border-gray-100 mt-2 font-prompt">
          <span>ID: {contentId}</span>
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-5xl max-h-[85vh] h-[85vh] p-0 overflow-hidden border-none rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-10 h-full">
            {/* Left side - Course Image (5/10 width on desktop) */}
            <div className="relative md:col-span-5 h-64 md:h-full">
              {contentThumbnail ? (
                <img
                  src={contentThumbnail}
                  alt={contentName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-slate-100 to-slate-200 flex items-center justify-center">
                  <Eye size={64} className="text-slate-300" />
                </div>
              )}
            </div>

            {/* Right side - Course Details */}
            <div className="md:col-span-5 flex flex-col h-full p-6 md:p-8">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-3xl font-bold font-prompt tracking-tight">
                  {contentName}
                </DialogTitle>
                <Badge
                  variant="outline"
                  className="w-fit mt-2 font-medium text-xs px-3 py-1"
                >
                  {contentCategory}
                </Badge>
              </DialogHeader>

              {/* Scrollable content area with flexible height but limited */}
              <ScrollArea className="fixed h-70 border border-gray-200 rounded-lg p-4">
                <DialogDescription className="text-gray-600 font-prompt leading-relaxed">
                  {contentDescription || "No description available."}
                </DialogDescription>
              </ScrollArea>

              <DialogFooter className="mt-6 pt-4">
                <Button
                  size="lg"
                  className="w-full py-6 text-lg font-prompt font-medium transition-all hover:shadow-md"
                  onClick={async () => {
                    try {
                      const response = await openApiclient.enroll({
                        contentId: contentId!,
                      });
                      if (response.data) {
                        toast.success(
                          `Successfully enrolled to ${contentName}`
                        );
                        navigate("/enrolled");
                      }
                    } catch (error) {
                      toast.error("Enrollment failed");
                    }
                  }}
                >
                  ลงทะเบียนเรียน
                </Button>
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContentCard;
