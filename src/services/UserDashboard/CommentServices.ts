"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getMyAllCommentsApi = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/comment/my-comments`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        next: { tags: ["COMMENTS"] },
      },
    );
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCommentApi = async (id: string) => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/comment/delete-comment/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      },
    );
    const result = await res.json();
    revalidateTag("REVIEWS");
    return result;
  } catch (error) {
    console.log(error);
  }
};
