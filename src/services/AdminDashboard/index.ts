/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function getAdminDashboardInfo() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment/admin-dashboard-info`,
      {
        method: "GET",
        headers: {
          Authorization: ` ${(await cookies()).get("accessToken")!.value}`,
        },
      },
    );

    const data = await response.json();
    return { data: data.data };
  } catch (error) {
    // console.error("Error fetching review:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
export async function getReveiwDataForAdminDashboard() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review?isPaid=true&isPublished=true`,
      {
        method: "GET",
        headers: {
          Authorization: ` ${(await cookies()).get("accessToken")!.value}`,
        },
      },
    );

    const data = await response.json();
    return { data: data.data };
  } catch (error) {
    // console.error("Error fetching review:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
