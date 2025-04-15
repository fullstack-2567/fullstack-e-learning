import AdminSidebar from "@/components/admin/AdminSidebar";
import { useState, useEffect, useMemo, useCallback, memo } from "react";
import "./AdminPM.css";
import "../../components/utils/Toast.css";
import { ToastProvider, useToast } from "@/components/utils/Toast";
import EditUserDialog, {
  EditUserData,
} from "@/components/admin/EditUserDialog";
import { openApiclient } from "@/utils/api-client";
import { ChevronDown, EditIcon, SearchIcon } from "lucide-react";

export type UserRole = 'admin' | 'user' | 'project-approver';

// User Data Structure
interface UserListItem {
  userId: string;
  email: string;
  picture: string;
  role: string;
  firstName?: string;
  lastName?: string;
  createDT?: string;
  updateDT?: string;
}

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50];

// Memoized user table row component
const UserTableRow = memo(({ 
  user, 
  onEditClick,
  copyToClipboard,
  formatUuid,
  getRoleClass
}: { 
  user: UserListItem; 
  onEditClick: (user: UserListItem) => void;
  copyToClipboard: (text: string) => void;
  formatUuid: (uuid: string) => string;
  getRoleClass: (role: string) => string;
}) => (
  <tr key={user.userId}>
    <td className="idCol">
      <span
        className="cursor-pointer text-blue-600 hover:underline"
        onClick={() => copyToClipboard(user.userId)}
      >
        {formatUuid(user.userId)}
      </span>
    </td>
    <td>
      <div className="flex items-center space-x-2">
        <img
          src={user.picture}
          alt="avatar"
          className="w-8 h-8 rounded-full"
          loading="lazy"
        />
        <span>
          {[user.firstName, user.lastName]
            .filter(Boolean)
            .join(" ") || "ไม่ระบุชื่อ"}
        </span>
      </div>
    </td>
    <td>{user.email}</td>
    <td>
      <span
        className={`px-2 py-1 text-xs rounded ${getRoleClass(user.role)}`}
      >
        {user.role}
      </span>
    </td>
    <td>
      <button
        onClick={() => onEditClick(user)}
        className="text-sm text-blue-600 hover:underline"
        aria-label={`Edit user ${user.email}`}
      >
        <EditIcon className="w-4 h-4 inline-block" />
      </button>
    </td>
  </tr>
));

UserTableRow.displayName = 'UserTableRow';

// Inner component that uses the toast
const UserManagementContent: React.FC = () => {
  const { showToast } = useToast();
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<EditUserData | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    ROWS_PER_PAGE_OPTIONS[0]
  );
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);

  // Memoize derived values
  const totalPages = useMemo(() => Math.ceil(totalUsers / rowsPerPage), [totalUsers, rowsPerPage]);

  // Load users with debounce for search
  useEffect(() => {
    let isMounted = true;
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await openApiclient.getAllUsers({
          limit: rowsPerPage,
          page: currentPage,
          search: searchTerm || undefined,
          role: roleFilter !== "All" ? roleFilter : undefined,
        });

        if (!isMounted) return;

        const resData = response.data as {
          users: any[];
          total: number;
          page: number;
          totalPages: number;
        };

        const usersData: UserListItem[] = resData.users.map((user) => ({
          userId: user.userId,
          email: user.email,
          picture: user.picture,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          createDT: user.createdDT,
          updateDT: user.updatedDT,
        }));

        setUsers(usersData);
        setTotalUsers(resData.total);
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching users:", error);
          showToast("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้", "error");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Add debounce for search
    const timerId = setTimeout(fetchUsers, searchTerm ? 300 : 0);
    
    return () => {
      isMounted = false;
      clearTimeout(timerId);
    };
  }, [rowsPerPage, currentPage, roleFilter, searchTerm, showToast]);

  // Fetch available roles once
  useEffect(() => {
    let isMounted = true;
    
    const fetchRoles = async () => {
      try {
        const response = await openApiclient.getUserRoles();
        if (isMounted) {
          setAvailableRoles([
            "All",
            ...(Array.isArray(response.data) ? response.data : []),
          ]);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching roles:", error);
        }
      }
    };

    fetchRoles();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Memoize utility functions
  const formatUuid = useCallback((uuid: string) => {
    // Show only first 8 characters with ellipsis
    return uuid.substring(0, 8) + "...";
  }, []);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showToast("คัดลอก ID เรียบร้อยแล้ว", "success");
      })
      .catch((err) => {
        showToast("ไม่สามารถคัดลอก ID ได้", "error");
        console.error("Failed to copy text: ", err);
      });
  }, [showToast]);

  const getRoleClass = useCallback((role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "project-approver":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }, []);

  const handleEditClick = useCallback((user: UserListItem) => {
    setCurrentUser({
      id: user.userId,
      name: user.firstName || "",
      email: user.email,
      role: user.role as UserRole,
    });
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
    // Clear the user data after dialog is fully closed
    setTimeout(() => {
      setCurrentUser(null);
    }, 500);
  }, []);

  const handleSaveUser = useCallback(async (updatedUser: EditUserData) => {
    try {
      await openApiclient.patchUserRole(updatedUser.id, {
        role: updatedUser.role as UserRole,
      });

      showToast("อัปเดตบทบาทเรียบร้อยแล้ว", "success");

      setUsers((prev) =>
        prev.map((user) =>
          user.userId === updatedUser.id
            ? { ...user, role: updatedUser.role }
            : user
        )
      );
      
      // Dialog will close itself after the animation completes
      // We need to clean up the current user reference here
      setTimeout(() => {
        setCurrentUser(null);
      }, 500);
    } catch (error) {
      console.error("Update failed", error);
      showToast("เกิดข้อผิดพลาดในการอัปเดต", "error");
    }
  }, [showToast]);

  // Memoize role options for dialog
  const roleOptions = useMemo(() => 
    availableRoles
      .filter((r) => r !== "All")
      .map((r) => ({
        value: r,
        label: r,
      })), 
    [availableRoles]
  );

  return (
    <div className="flex-1 min-h-screen bg-gray-100 p-8 ml-64">
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-700">จัดการผู้ใช้งาน</h1>
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <div className="relative mr-4">
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1); // Reset to first page when filter changes
              }}
              className="appearance-none border rounded-md px-4 py-2 pr-8 text-sm bg-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
              aria-label="Filter by role"
            >
              {availableRoles.map((role) => (
                <option key={role} value={role}>
                  {role === "All" ? "ทุกบทบาท" : role}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
          <div className="searchContainer">
            <SearchIcon className="searchIcon" />
            <input
              type="text"
              placeholder="Search by name, email, role, or ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="searchInput !w-80"
              style={{ width: "350px" }}
              aria-label="Search users"
            />
          </div>
        </div>

        {/* Table Area */}
        <div className="tableWrapper">
          {loading ? (
            <div className="loading">Loading users...</div>
          ) : (
            <table className="projectTable">
              <thead>
                <tr>
                  <th className="idCol">ID</th>
                  <th>ชื่อผู้ใช้</th>
                  <th>อีเมล</th>
                  <th>บทบาท</th>
                  <th>การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <UserTableRow 
                      key={user.userId}
                      user={user}
                      onEditClick={handleEditClick}
                      copyToClipboard={copyToClipboard}
                      formatUuid={formatUuid}
                      getRoleClass={getRoleClass}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="noResults">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {!loading && totalUsers > 0 && (
          <div className="pagination">
            <span className="rowCount">
              {`${Math.min((currentPage - 1) * rowsPerPage + 1, totalUsers)}-${Math.min(currentPage * rowsPerPage, totalUsers)} of ${totalUsers}`}
            </span>
            <span className="rowsPerPageLabel">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="rowsPerPageSelect"
              aria-label="Select rows per page"
            >
              {ROWS_PER_PAGE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pageButton"
              aria-label="Previous page"
            >
              &lt;
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="pageButton"
              aria-label="Next page"
            >
              &gt;
            </button>
          </div>
        )}
      </div>

      {/* Using the EditUserDialog component */}
      <EditUserDialog
        isOpen={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveUser}
        userData={currentUser}
        roles={roleOptions}
      />
    </div>
  );
};

// Outer component that provides the toast context
const UserManagement: React.FC = () => {
  return (
    <ToastProvider>
      <div className="flex">
        <div className="w-64 fixed h-screen">
          <AdminSidebar />
        </div>
        <UserManagementContent />
      </div>
    </ToastProvider>
  );
};

export default UserManagement;