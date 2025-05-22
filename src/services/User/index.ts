/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// // Get all users
export const getAllUsers = async (queryString: Promise<string>) => {
  // console.log("queryString", { queryString });
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/all-users?${queryString}`,
      {
        method: "GET",
        headers: {
          Authorization: ` ${(await cookies()).get("accessToken")!.value}`,
        },
      },
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Make user an admin
export const makeAdmin = async (userId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/make-admin/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: ` ${(await cookies()).get("accessToken")!.value}`,
        },
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Failed to make user admin: ${res.status}`,
      );
    }

    revalidateTag("users");
    return await res.json();
  } catch (error: any) {
    console.error("Error making user admin:", error);
    return { success: false, error: error.message };
  }
};

// Make admin a normal user
export const makeUser = async (userId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/make-user/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: ` ${(await cookies()).get("accessToken")!.value}`,
        },
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Failed to make admin a user: ${res.status}`,
      );
    }

    revalidateTag("users");
    return await res.json();
  } catch (error: any) {
    console.error("Error making admin a user:", error);
    return { success: false, error: error.message };
  }
};

// Block a user
export const blockUser = async (userId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/block-user/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: ` ${(await cookies()).get("accessToken")!.value}`,
        },
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Failed to block user: ${res.status}`,
      );
    }

    revalidateTag("users");
    return await res.json();
  } catch (error: any) {
    console.error("Error blocking user:", error);
    return { success: false, error: error.message };
  }
};

// Unblock a user
export const unblockUser = async (userId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/make-user-active/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: ` ${(await cookies()).get("accessToken")!.value}`,
        },
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Failed to unblock user: ${res.status}`,
      );
    }

    revalidateTag("users");
    return await res.json();
  } catch (error: any) {
    console.error("Error unblocking user:", error);
    return { success: false, error: error.message };
  }
};

// Delete a user
export const deleteUser = async (userId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/delete-user/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: ` ${(await cookies()).get("accessToken")!.value}`,
        },
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Failed to delete user: ${res.status}`,
      );
    }

    revalidateTag("users");
    return await res.json();
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return { success: false, error: error.message };
  }
};
