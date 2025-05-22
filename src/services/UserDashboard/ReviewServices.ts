"use server";

import { reviewDtlOne } from "@/components/types/add-review";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export const createUserReview = async (data: reviewDtlOne) => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review/create-review`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify(data),
      },
    );
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserReview = async (data: reviewDtlOne, id: string) => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review/update-review/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify(data),
      },
    );
    revalidateTag("REVIEWS");
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserReviewApi = async (id: string) => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review/delete-review/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      },
    );
    revalidateTag("REVIEWS");
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getAllReviewsApi = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review/my-reviews`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        next: { tags: ["REVIEWS"] },
      },
    );
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getMyReviewsApi = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review/my-reviews`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      },
    );
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};
