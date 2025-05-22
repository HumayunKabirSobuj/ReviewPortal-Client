/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react";
import ReviewsPageCard from "@/components/modules/Review/ReviewsPageCard";
import { createQueryString } from "@/helpers";
import { getAllCategories } from "@/services/Categories";
import { getAllPublishedReviews} from "@/services/Reviews";
import { Skeleton } from "@/components/ui/skeleton";

// Define proper types for the page props

// Loading component for Suspense fallback
function ReviewsLoading() {
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-32" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <aside className="col-span-1 hidden md:block">
          <Skeleton className="h-[500px] w-full rounded-lg" />
        </aside>

        <div className="col-span-4 md:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} className="h-64 w-full rounded-lg" />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Error component for displaying errors
function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="container py-8">
      <div className="bg-destructive/10 text-destructive p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Error Loading Reviews</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}


export default async function Reviews({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  try {
    const queryString = createQueryString(searchParams);

    // Fetch data in parallel for better performance
    const [reviewsResponse, categoriesResponse] = await Promise.all([
      getAllPublishedReviews(queryString),
      getAllCategories(),
    ]);

    // Handle errors from either API call
    if (reviewsResponse.error) {
      return (
        <ErrorDisplay
          message={`Failed to load reviews: ${reviewsResponse.error}`}
        />
      );
    }

    if (categoriesResponse.error) {
      return (
        <ErrorDisplay
          message={`Failed to load categories: ${categoriesResponse.error}`}
        />
      );
    }

    // Ensure we have data to display
    if (!reviewsResponse.data || !categoriesResponse.data) {
      return <ErrorDisplay message="No data available" />;
    }

    return (
      <Suspense fallback={<ReviewsLoading />}>
        <ReviewsPageCard
          initialData={reviewsResponse.data}
          category={categoriesResponse.data}
        />
      </Suspense>
    );
  } catch (error) {
    // Catch any unexpected errors
    console.error("Unexpected error in Reviews page:", error);
    return (
      <ErrorDisplay
        message={`An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}`}
      />
    );
  }
}
