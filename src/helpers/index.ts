/* eslint-disable @typescript-eslint/no-explicit-any */
// Helper function to safely create a query string
type StrictSearchParams = {
  [key: string]: string | string[] | undefined;
};
interface CustomPageProps {
  searchParams?: StrictSearchParams;
  params?: Record<string, string>;
}
export function createSafeQueryString(params: CustomPageProps) {
  // Create a new object with only serializable values
  const safeParams: Record<string, string> = {};

  // if (!params) return;
  Object.entries(params).forEach(([key, value]) => {
    // Only include string, number, or boolean values
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      safeParams[key] = String(value);
    }
  });

  return new URLSearchParams(safeParams).toString();
}

export async function createQueryString(params: Promise<any>) {
  const newParams = await params;
  const safeParams: Record<string, string> = {};
  Object.entries(newParams).forEach(([key, value]) => {
    // Only include string, number, or boolean values
    safeParams[key] = String(value);
  });
  return new URLSearchParams(safeParams).toString();
}

export async function createQueryStringForPublishedReviews(params: Promise<any>) {
  const newParams = await params;
  const safeParams: Record<string, string> = {};
  Object.entries(newParams).forEach(([key, value]) => {
    // Only include string, number, or boolean values
    safeParams[key] = String(value);
    safeParams["isPublished"] = "true";
  });
  return new URLSearchParams(safeParams).toString();
}
