/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  blockUser,
  deleteUser,
  makeAdmin,
  makeUser,
  unblockUser,
} from "@/services/User";
import {
  AlertCircle,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
  Shield,
  Trash2,
  User,
  UserX,
  X,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// Types
interface UserData {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  status: "ACTIVE" | "BLOCKED";
  profileUrl: string | null;
}

interface ManageUsersProps {
  users: UserData[];
}

export default function ManageUsersForAdmin({ users = [] }: ManageUsersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial values from URL params
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("searchTerm") || "",
  );

  // Update role handling - default to "all" if not specified
  const [selectedRole, setSelectedRole] = useState("all");

  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get("page");
    return page ? Number.parseInt(page, 10) : 1;
  });
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const limit = searchParams.get("limit");
    return limit ? Number.parseInt(limit, 10) : 5;
  });

  // Get active tab from status param
  const getInitialTab = () => {
    const status = searchParams.get("status");
    if (status === "ACTIVE") return "ACTIVE";
    if (status === "BLOCKED") return "BLOCKED";
    return "all";
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<
    "delete" | "block" | "unblock" | "makeAdmin" | "makeUser"
  >("delete");
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  // Filter users based on current filters
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Filter by status (tab)
      if (activeTab !== "all" && user.status !== activeTab) {
        return false;
      }

      // Filter by role
      if (
        selectedRole &&
        selectedRole !== "all" &&
        user.role !== selectedRole
      ) {
        return false;
      }

      // Filter by search query
      if (
        searchQuery &&
        !user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !user.email.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [users, activeTab, selectedRole, searchQuery]);

  // Summary counts
  const summaries = {
    all: users.length,
    active: users.filter((user) => user.status === "ACTIVE").length,
    blocked: users.filter((user) => user.status === "BLOCKED").length,
  };

  // Handle search change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  // Handle role change
  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
    setCurrentPage(1); // Reset to first page when role changes
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1); // Reset to first page when tab changes
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedRole("all");
    setActiveTab("all");
    setCurrentPage(1);
  };

  // Open dialog for actions
  const openActionDialog = (
    user: UserData,
    type: "delete" | "block" | "unblock" | "makeAdmin" | "makeUser",
  ) => {
    setSelectedUser(user);
    setDialogType(type);
    setDialogOpen(true);
  };

  // Handle user actions
  const handleUserAction = async () => {
    if (!selectedUser) return;

    setActionLoading(selectedUser.id);

    // Create a promise ID for toast loading state
    const toastId = dialogType + "-" + selectedUser.id;

    // Show loading toast
    toast.loading("Processing...", { id: toastId });

    try {
      let result;

      switch (dialogType) {
        case "delete":
          result = await deleteUser(selectedUser.id);
          if (result.success !== false) {
            toast.success(
              `${selectedUser.name} has been deleted successfully.`,
              { id: toastId },
            );
            // Refresh the page to get updated data
            router.refresh();
          } else {
            throw new Error(result.error || "Failed to delete user");
          }
          break;

        case "block":
          result = await blockUser(selectedUser.id);
          if (result.success !== false) {
            toast.success(`${selectedUser.name} has been blocked.`, {
              id: toastId,
            });
            // Refresh the page to get updated data
            router.refresh();
          } else {
            throw new Error(result.error || "Failed to block user");
          }
          break;

        case "unblock":
          result = await unblockUser(selectedUser.id);
          if (result.success !== false) {
            toast.success(`${selectedUser.name} has been activated.`, {
              id: toastId,
            });
            // Refresh the page to get updated data
            router.refresh();
          } else {
            throw new Error(result.error || "Failed to activate user");
          }
          break;

        case "makeAdmin":
          result = await makeAdmin(selectedUser.id);
          if (result.success !== false) {
            toast.success(`${selectedUser.name} is now an admin.`, {
              id: toastId,
            });
            // Refresh the page to get updated data
            router.refresh();
          } else {
            throw new Error(result.error || "Failed to make user admin");
          }
          break;

        case "makeUser":
          result = await makeUser(selectedUser.id);
          if (result.success !== false) {
            toast.success(`${selectedUser.name} is now a regular user.`, {
              id: toastId,
            });
            // Refresh the page to get updated data
            router.refresh();
          } else {
            throw new Error(
              result.error || "Failed to make admin a regular user",
            );
          }
          break;
      }
    } catch (error) {
      console.error("Error performing user action:", error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred",
        { id: toastId },
      );
    } finally {
      setActionLoading(null);
      setDialogOpen(false);
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredUsers.length);
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Check if any filter is active
  const hasActiveFilters =
    searchQuery !== "" || selectedRole !== "all" || activeTab !== "all";

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Manage Users</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* All Users */}
        <Card
          className={`p-4 border rounded-lg flex justify-between items-center cursor-pointer hover:shadow-md `}
          // onClick={() => handleTabChange("all")}
        >
          <div>
            <p className="text-sm text-muted-foreground">All Users</p>
            <p className="text-3xl font-bold">{summaries.all}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-5 w-5 text-blue-700" />
          </div>
        </Card>

        {/* Active Users */}
        <Card
          className={`p-4 border rounded-lg flex justify-between items-center cursor-pointer hover:shadow-md $`}
          // onClick={() => handleTabChange("ACTIVE")}
        >
          <div>
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-3xl font-bold">{summaries.active}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <Shield className="h-5 w-5 text-green-700" />
          </div>
        </Card>

        {/* Blocked Users */}
        <Card
          className={`p-4 border rounded-lg flex justify-between items-center cursor-pointer hover:shadow-md `}
          // onClick={() => handleTabChange("BLOCKED")}
        >
          <div>
            <p className="text-sm text-muted-foreground">Blocked</p>
            <p className="text-3xl font-bold">{summaries.blocked}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <UserX className="h-5 w-5 text-red-700" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users..."
            className="w-full pl-9"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        <div className="flex gap-3 flex-wrap">
          <Select value={selectedRole} onValueChange={handleRoleChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="USER">User</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant="ghost" onClick={resetFilters}>
              <X className="mr-2 h-4 w-4" />
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={handleTabChange}
      >
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="ACTIVE">Active</TabsTrigger>
          <TabsTrigger value="BLOCKED">Blocked</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.length === 0 ? (
                    // Empty state
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <AlertCircle className="h-8 w-8 mb-2" />
                          <p>No users found matching your filters.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    // User rows
                    paginatedUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.role === "ADMIN"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.status === "ACTIVE"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end items-center gap-2">
                            {/* Role actions */}
                            {user.role === "USER" ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  openActionDialog(user, "makeAdmin")
                                }
                                disabled={!!actionLoading}
                                className="whitespace-nowrap"
                              >
                                {actionLoading === user.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                                ) : null}
                                Make Admin
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  openActionDialog(user, "makeUser")
                                }
                                disabled={!!actionLoading}
                                className="whitespace-nowrap"
                              >
                                {actionLoading === user.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                                ) : null}
                                Make User
                              </Button>
                            )}

                            {/* Status actions - only for users, not admins */}
                            {user.role === "USER" &&
                              (user.status === "ACTIVE" ? (
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() =>
                                    openActionDialog(user, "block")
                                  }
                                  disabled={!!actionLoading}
                                  className="whitespace-nowrap"
                                >
                                  {actionLoading === user.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin mr-1" />
                                  ) : null}
                                  Block
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="default"
                                  onClick={() =>
                                    openActionDialog(user, "unblock")
                                  }
                                  disabled={!!actionLoading}
                                  className="whitespace-nowrap"
                                >
                                  {actionLoading === user.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin mr-1" />
                                  ) : null}
                                  Activate
                                </Button>
                              ))}

                            {/* Delete action */}
                            {/* <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                              onClick={() => openActionDialog(user, "delete")}
                              disabled={!!actionLoading}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button> */}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination */}
          {filteredUsers.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {endIndex} of {filteredUsers.length}{" "}
                users
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronFirst className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page numbers */}
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                  // Calculate page number to display
                  let pageNum = i + 1;
                  if (totalPages > 5) {
                    if (currentPage > 3) {
                      pageNum = currentPage - 3 + i;
                    }
                    if (currentPage > totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    }
                  }

                  // Don't show pages beyond total
                  if (pageNum > totalPages) return null;

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="icon"
                      onClick={() => handlePageChange(pageNum)}
                      className="h-8 w-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                })}

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLast className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Action Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === "delete"
                ? "Delete User"
                : dialogType === "block"
                  ? "Block User"
                  : dialogType === "unblock"
                    ? "Activate User"
                    : dialogType === "makeAdmin"
                      ? "Make User Admin"
                      : "Remove Admin Privileges"}
            </DialogTitle>
            <DialogDescription>
              {dialogType === "delete"
                ? "This action cannot be undone. The user will be permanently removed from the system."
                : dialogType === "block"
                  ? "The user will not be able to log in or use the system while blocked."
                  : dialogType === "unblock"
                    ? "The user will regain access to the system."
                    : dialogType === "makeAdmin"
                      ? "This will grant administrative privileges to this user."
                      : "This will remove administrative privileges from this user."}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <p>
              <strong>User:</strong> {selectedUser?.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser?.email}
            </p>
            <p>
              <strong>Current Role:</strong> {selectedUser?.role}
            </p>
            <p>
              <strong>Current Status:</strong> {selectedUser?.status}
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={!!actionLoading}
            >
              Cancel
            </Button>
            <Button
              variant={
                dialogType === "delete" || dialogType === "block"
                  ? "destructive"
                  : "default"
              }
              onClick={handleUserAction}
              disabled={!!actionLoading}
            >
              {actionLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : dialogType === "delete" ? (
                "Delete User"
              ) : dialogType === "block" ? (
                "Block User"
              ) : dialogType === "unblock" ? (
                "Activate User"
              ) : dialogType === "makeAdmin" ? (
                "Make Admin"
              ) : (
                "Make User"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
