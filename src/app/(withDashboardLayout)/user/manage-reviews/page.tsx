import UserReviewManagement from "@/components/module/user-review/manage-review";
import { Skeleton } from "@/components/ui/skeleton";
import { getMyReviewsApi } from "@/services/UserDashboard/ReviewServices";
import { Suspense } from "react";

const ManageReviewsForUser = async () => {
  const reviews = (await getMyReviewsApi()).data;
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

  return (
    <div className="p-[15px]">
      <Suspense fallback={<ReviewsLoading />}>
        <UserReviewManagement reviews={reviews} />
      </Suspense>
    </div>
  );
};

export default ManageReviewsForUser;
