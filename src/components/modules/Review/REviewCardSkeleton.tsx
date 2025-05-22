import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Skeleton className="h-full w-full" />
      </div>
      <CardHeader className="p-4 pb-2 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 flex-grow">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-4/6" />
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-10" />
        </div>
        <Skeleton className="h-4 w-20" />
      </CardFooter>
    </Card>
  );
}
