"use server";

import { cookies } from "next/headers";

export const getMyAllPaymentsApi = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment/my-payments`,
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
