/* eslint-disable @typescript-eslint/no-explicit-any */
export const getAllCategories = async () => {
  try {
    const res = await fetch(
      //   `${process.env.NEXT_PUBLIC_BASE_API}/review?searchTerm=${searchQuery}&page=3&limit=1`,
      `${process.env.NEXT_PUBLIC_BASE_API}/category`,
    );

    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
