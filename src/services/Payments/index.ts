/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

export const makePayment = async (reviewId: string) => {
  // console.log({ reviewId });
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    // console.log(accessToken);
    if (!accessToken) {
      throw new Error("Login First...");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment/make-order/${reviewId}`,
      {
        method: "POST",
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("Payment Error:", error);
    return { error: error.message || "Something went wrong" };
  }
};
