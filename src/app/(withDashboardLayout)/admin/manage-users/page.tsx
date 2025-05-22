/* eslint-disable @typescript-eslint/no-explicit-any */
import ManageUsersForAdmin from "@/components/modules/admin/manageUsers";
import { createQueryString } from "@/helpers";
import { getAllUsers } from "@/services/User";
import { Loader } from "lucide-react";
import { Suspense } from "react";

export default async function ManageUsersPage({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  // Create a safe query string from the resolved search parameters
  const queryString = createQueryString(searchParams);

  // Fetch data based on the query parameters
  let users = [];

  try {
    const { data, error } = await getAllUsers(queryString);
    users = data || [];

    if (error) {
      console.error("Error fetching users:", error);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }

  return (
    <>
      <Suspense
        fallback={
          <div className="w-full h-[100vh] flex items-center justify-center">
            <Loader className="w-[80px] h-12 animate-spin" />
          </div>
        }
      >
        <ManageUsersForAdmin users={users} />
      </Suspense>
    </>
  );
}
