import { useState, useEffect, useRef } from "react";
import { PlusCircle, Pencil, Trash2, Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { openApiclient } from "@/utils/api-client";
import { ContentCategory } from "@/types";

// Types ตามโครงสร้าง API
export interface Content {
  contentId?: string;
  contentName: string;
  contentDescription: string;
  contentCategory: string;
  contentVideo?: string; // base64 encoded video
  contentThumbnail: string; // base64 encoded thumbnail
  createdDT?: string;
  updatedDT?: string;
  isPublic?: boolean;
}

// Component
const ContentManagement = () => {
  // States
  const [contents, setContents] = useState<Content[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [newContent, setNewContent] = useState<Partial<Content>>({
    contentName: "",
    contentDescription: "",
    contentCategory: "",
    contentVideo: "",
    contentThumbnail: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [categories] = useState([
    { id: "1", name: "cybersecurity" },
    { id: "2", name: "frontend_development" },
    { id: "3", name: "backend_development" },
    { id: "4", name: "fullstack_development" },
    { id: "5", name: "food" },
    { id: "6", name: "fashion" },
    { id: "7", name: "language" },
  ]);

  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const editThumbnailInputRef = useRef<HTMLInputElement>(null);
  const editVideoInputRef = useRef<HTMLInputElement>(null);

  const itemsPerPage = 5;

  const fetchContents = async () => {
    setIsLoading(true);
    try {
      const response = await openApiclient.getAllContents();
      if (response) {
        setContents([...response.data]);
      } else {
        console.error("Failed to fetch contents:", response);
      }
    } catch (error) {
      console.error("Error fetching contents:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // Fetch real content from API
  useEffect(() => {
    fetchContents();
  }, []);

  // ฟังก์ชันสำหรับการอัปโหลดรูปภาพ thumbnail
  const handleThumbnailUpload = async (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const encoded = reader.result || "";
      setNewContent((prev) => ({
        ...prev,
        contentThumbnail: encoded.toString(),
      }));
    };
  };

  // ฟังก์ชันสำหรับการอัปโหลดไฟล์วิดีโอ
  const handleVideoUpload = async (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const encoded = reader.result || "";
      setNewContent((prev) => ({
        ...prev,
        contentVideo: encoded.toString(),
      }));
    };
  };

  // ฟังก์ชันสำหรับการอัปโหลดรูปภาพ thumbnail สำหรับการแก้ไข
  const handleEditThumbnailUpload = async (file: File) => {
    if (!selectedContent) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const encoded = reader.result || "";
      setSelectedContent({
        ...selectedContent,
        contentThumbnail: encoded.toString(),
      });
    };
  };

  // ฟังก์ชันสำหรับการอัปโหลดไฟล์วิดีโอสำหรับการแก้ไข
  const handleEditVideoUpload = async (file: File) => {
    if (!selectedContent) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const encoded = reader.result || "";
      setSelectedContent({
        ...selectedContent,
        contentVideo: encoded.toString(),
      });
    };
  };

  // Filter contents based on search query
  const filteredContents = contents.filter((content) => {
    return content.contentName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredContents.length / itemsPerPage);
  const paginatedContents = filteredContents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleCreateContent = async () => {
    setIsLoading(true);

    if (
      !newContent.contentName ||
      !newContent.contentCategory ||
      !newContent.contentDescription ||
      !newContent.contentVideo ||
      !newContent.contentThumbnail
    ) {
      setIsLoading(false);
      return;
    }

    const contentToCreate: Content = {
      contentName: newContent.contentName as string,
      contentDescription: newContent.contentDescription as string,
      contentCategory: newContent.contentCategory as string,
      contentVideo: newContent.contentVideo as string,
      contentThumbnail: newContent.contentThumbnail as string,
      isPublic: true,
    };

    try {
      const response = await openApiclient.createContent(null, {
        contentName: contentToCreate.contentName,
        contentDescription: contentToCreate.contentDescription,
        contentCategory: contentToCreate.contentCategory as ContentCategory,
        contentVideo: contentToCreate.contentVideo as string,
        contentThumbnail: contentToCreate.contentThumbnail,
        isPublic: contentToCreate.isPublic as boolean,
      });

      if (response) {
        // Refresh the content list
        await fetchContents();

        // Reset form
        setNewContent({
          contentName: "",
          contentDescription: "",
          contentCategory: "",
          contentVideo: "",
          contentThumbnail: "",
        });
      } else {
        console.error("Failed to create content:", response);
      }
    } catch (error) {
      console.error("Error creating content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateContent = async () => {
    if (!selectedContent) return;

    setIsLoading(true);

    try {
      // Assuming there's an updateContent method in the API service
      const response = await openApiclient.updateContent(
        {
          contentId: selectedContent.contentId as string,
        },
        selectedContent
      );

      if (response) {
        // Refresh the content list
        await fetchContents();
        setSelectedContent(null);
      } else {
        console.error("Failed to update content:", response);
      }
    } catch (error) {
      console.error("Error updating content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteContent = async (id: string) => {
    setIsLoading(true);

    try {
      // Assuming there's a deleteContent method in the API service
      const response = await openApiclient.deleteContent({
        contentId: id,
      });

      if (response) {
        // Refresh the content list
        await fetchContents();
      } else {
        console.error("Failed to delete content:", response);
      }
    } catch (error) {
      console.error("Error deleting content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (content: Content) => {
    setSelectedContent({ ...content });
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="border-none shadow-md py-0">
        <CardHeader className="bg-[#606A9B] text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold font-prompt">
            คอร์สเรียน
          </CardTitle>
          <CardDescription className="text-white/80 font-prompt">
            จัดการคอร์สเรียนทั้งหมดในระบบ
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4 w-1/2">
              <div className="relative w-full">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  placeholder="ค้นหาคอร์สเรียน..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-[#E5E7EB] font-prompt"
                />
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#606A9B] hover:bg-[#4a547b] font-prompt">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  สร้างคอร์สใหม่
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px] font-prompt">
                <DialogHeader>
                  <DialogTitle className="font-prompt">
                    สร้างคอร์สใหม่
                  </DialogTitle>
                  <DialogDescription className="font-prompt">
                    กรอกข้อมูลเพื่อสร้างคอร์สเรียนใหม่ในระบบ
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="contentName"
                      className="text-right font-prompt"
                    >
                      ชื่อคอร์ส
                    </Label>
                    <Input
                      id="contentName"
                      value={newContent.contentName}
                      onChange={(e) =>
                        setNewContent({
                          ...newContent,
                          contentName: e.target.value,
                        })
                      }
                      className="col-span-3 font-prompt"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="contentCategory"
                      className="text-right font-prompt"
                    >
                      หมวดหมู่
                    </Label>
                    <Select
                      value={newContent.contentCategory}
                      onValueChange={(value) =>
                        setNewContent({ ...newContent, contentCategory: value })
                      }
                    >
                      <SelectTrigger className="col-span-3 font-prompt">
                        <SelectValue placeholder="เลือกหมวดหมู่" />
                      </SelectTrigger>
                      <SelectContent className="font-prompt">
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label
                      htmlFor="contentDescription"
                      className="text-right pt-2 font-prompt"
                    >
                      รายละเอียด
                    </Label>
                    <Textarea
                      id="contentDescription"
                      value={newContent.contentDescription}
                      onChange={(e) =>
                        setNewContent({
                          ...newContent,
                          contentDescription: e.target.value,
                        })
                      }
                      className="col-span-3 font-prompt"
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label
                      htmlFor="contentThumbnail"
                      className="text-right pt-2 font-prompt"
                    >
                      รูปภาพปก
                    </Label>
                    <div className="col-span-3">
                      <input
                        ref={thumbnailInputRef}
                        type="file"
                        id="contentThumbnail"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleThumbnailUpload(e.target.files[0]);
                          }
                        }}
                      />
                      <div className="flex flex-col gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => thumbnailInputRef.current?.click()}
                          className="font-prompt w-full"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          อัปโหลดรูปภาพปก
                        </Button>
                        {newContent.contentThumbnail && (
                          <div className="mt-2">
                            <img
                              src={newContent.contentThumbnail}
                              alt="Thumbnail preview"
                              className="max-h-40 rounded-md object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label
                      htmlFor="contentVideo"
                      className="text-right pt-2 font-prompt"
                    >
                      ไฟล์วิดีโอ
                    </Label>
                    <div className="col-span-3">
                      <input
                        ref={videoInputRef}
                        type="file"
                        id="contentVideo"
                        className="hidden"
                        accept="video/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleVideoUpload(e.target.files[0]);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => videoInputRef.current?.click()}
                        className="font-prompt w-full"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        อัปโหลดไฟล์วิดีโอ
                      </Button>
                      {newContent.contentVideo && (
                        <div className="mt-2 text-sm text-green-600 font-prompt">
                          อัปโหลดไฟล์วิดีโอเรียบร้อยแล้ว
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" className="font-prompt">
                      ยกเลิก
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      onClick={handleCreateContent}
                      className="bg-[#606A9B] hover:bg-[#4a547b] font-prompt"
                      disabled={isLoading}
                    >
                      {isLoading ? "กำลังสร้าง..." : "สร้างคอร์ส"}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader className="bg-[#CBD5E1]">
              <TableRow>
                <TableHead className="w-[50px] font-prompt">รหัส</TableHead>
                <TableHead className="font-prompt">ชื่อคอร์ส</TableHead>
                <TableHead className="font-prompt">หมวดหมู่</TableHead>
                <TableHead className="font-prompt">วันที่สร้าง</TableHead>
                <TableHead className="text-right font-prompt">จัดการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedContents.length > 0 ? (
                paginatedContents.map((content) => (
                  <TableRow key={content.contentId}>
                    <TableCell className="font-medium font-prompt">
                      {content.contentId}
                    </TableCell>
                    <TableCell className="font-prompt">
                      {content.contentName}
                    </TableCell>
                    <TableCell className="font-prompt">
                      {content.contentCategory}
                    </TableCell>
                    <TableCell className="font-prompt">
                      {new Date(content.createdDT!).toLocaleDateString("th-TH")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditClick(content)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[550px]">
                            <DialogHeader>
                              <DialogTitle className="font-prompt">
                                แก้ไขคอร์ส
                              </DialogTitle>
                              <DialogDescription className="font-prompt">
                                แก้ไขข้อมูลคอร์สเรียน{" "}
                                {selectedContent?.contentName}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedContent && (
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="edit-contentName"
                                    className="text-right font-prompt"
                                  >
                                    ชื่อคอร์ส
                                  </Label>
                                  <Input
                                    id="edit-contentName"
                                    value={selectedContent.contentName}
                                    onChange={(e) =>
                                      setSelectedContent({
                                        ...selectedContent,
                                        contentName: e.target.value,
                                      })
                                    }
                                    className="col-span-3 font-prompt"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="edit-contentCategory"
                                    className="text-right font-prompt"
                                  >
                                    หมวดหมู่
                                  </Label>
                                  <Select
                                    value={selectedContent.contentCategory}
                                    onValueChange={(value) =>
                                      setSelectedContent({
                                        ...selectedContent,
                                        contentCategory: value,
                                      })
                                    }
                                  >
                                    <SelectTrigger className="col-span-3 font-prompt">
                                      <SelectValue placeholder="เลือกหมวดหมู่" />
                                    </SelectTrigger>
                                    <SelectContent className="font-prompt">
                                      {categories.map((category) => (
                                        <SelectItem
                                          key={category.id}
                                          value={category.name}
                                        >
                                          {category.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4">
                                  <Label
                                    htmlFor="edit-contentDescription"
                                    className="text-right pt-2 font-prompt"
                                  >
                                    รายละเอียด
                                  </Label>
                                  <Textarea
                                    id="edit-contentDescription"
                                    value={selectedContent.contentDescription}
                                    onChange={(e) =>
                                      setSelectedContent({
                                        ...selectedContent,
                                        contentDescription: e.target.value,
                                      })
                                    }
                                    className="col-span-3 font-prompt"
                                    rows={4}
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4">
                                  <Label
                                    htmlFor="edit-contentThumbnail"
                                    className="text-right pt-2 font-prompt"
                                  >
                                    รูปภาพปก
                                  </Label>
                                  <div className="col-span-3">
                                    <input
                                      ref={editThumbnailInputRef}
                                      type="file"
                                      id="edit-contentThumbnail"
                                      className="hidden"
                                      accept="image/*"
                                      onChange={(e) => {
                                        if (
                                          e.target.files &&
                                          e.target.files[0]
                                        ) {
                                          handleEditThumbnailUpload(
                                            e.target.files[0]
                                          );
                                        }
                                      }}
                                    />
                                    <div className="flex flex-col gap-2">
                                      <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                          editThumbnailInputRef.current?.click()
                                        }
                                        className="font-prompt w-full"
                                      >
                                        <Upload className="mr-2 h-4 w-4" />
                                        อัปโหลดรูปภาพปก
                                      </Button>
                                      {selectedContent.contentThumbnail && (
                                        <div className="mt-2">
                                          <img
                                            src={
                                              selectedContent.contentThumbnail
                                            }
                                            alt="Thumbnail preview"
                                            className="max-h-40 rounded-md object-cover"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4">
                                  <Label
                                    htmlFor="edit-contentVideo"
                                    className="text-right pt-2 font-prompt"
                                  >
                                    ไฟล์วิดีโอ
                                  </Label>
                                  <div className="col-span-3">
                                    <input
                                      ref={editVideoInputRef}
                                      type="file"
                                      id="edit-contentVideo"
                                      className="hidden"
                                      accept="video/*"
                                      onChange={(e) => {
                                        if (
                                          e.target.files &&
                                          e.target.files[0]
                                        ) {
                                          handleEditVideoUpload(
                                            e.target.files[0]
                                          );
                                        }
                                      }}
                                    />
                                    <Button
                                      type="button"
                                      variant="outline"
                                      onClick={() =>
                                        editVideoInputRef.current?.click()
                                      }
                                      className="font-prompt w-full"
                                    >
                                      <Upload className="mr-2 h-4 w-4" />
                                      อัปโหลดไฟล์วิดีโอ
                                    </Button>
                                    {selectedContent.contentVideo && (
                                      <div className="mt-2 text-sm text-green-600 font-prompt">
                                        อัปโหลดไฟล์วิดีโอเรียบร้อยแล้ว
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button
                                  variant="outline"
                                  className="font-prompt"
                                >
                                  ยกเลิก
                                </Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button
                                  onClick={handleUpdateContent}
                                  className="bg-[#606A9B] hover:bg-[#4a547b] font-prompt"
                                  disabled={isLoading}
                                >
                                  {isLoading
                                    ? "กำลังบันทึก..."
                                    : "บันทึกการแก้ไข"}
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 border-red-200 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="font-prompt">
                                ยืนยันการลบคอร์ส
                              </AlertDialogTitle>
                              <AlertDialogDescription className="font-prompt">
                                คุณต้องการลบคอร์ส "{content.contentName}"
                                ใช่หรือไม่? การดำเนินการนี้ไม่สามารถเรียกคืนได้
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="font-prompt">
                                ยกเลิก
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-500 hover:bg-red-600 font-prompt"
                                onClick={() =>
                                  handleDeleteContent(content.contentId!)
                                }
                              >
                                ลบคอร์ส
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-gray-500 font-prompt"
                  >
                    ไม่พบข้อมูลคอร์สที่ตรงกับเงื่อนไข
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <div className="text-sm text-gray-500 font-prompt">
            แสดง {paginatedContents.length} จาก {filteredContents.length} รายการ
          </div>
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;

                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        isActive={currentPage === pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={
                          currentPage === pageNumber ? "bg-[#606A9B]" : ""
                        }
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ContentManagement;
