import { reviewDtlType } from "@/components/types/add-review";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ViewReviewComponent({
  review,
}: {
  review: reviewDtlType;
}) {
  return (
    <Card className="w-full border-none">
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Badge className="bg-purple-100 text-green-600 hover:bg-purple-100">
            {review.isPremium === true ? "Paid" : "General"}
          </Badge>

          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            {review.isPublished === true ? "Published" : "Drafted"}
          </Badge>
        </div>
        <div className="space-y-1 mb-4 flex ">
          <label htmlFor="" className="w-[130px]">
            Title
          </label>
          <p className="text-gray-500 w-[calc(100%-130px)]">{review.title}</p>
        </div>

        <div className="space-y-1 mb-4 flex">
          <label htmlFor="" className=" w-[130px]">
            Description
          </label>
          <p className="text-gray-500 w-[calc(100%-130px)]">
            {review.description}
          </p>
        </div>
        <div className="space-y-1 mb-4 flex ">
          <label htmlFor="" className="w-[130px]">
            Purchase Link
          </label>
          <p className="text-gray-500 w-[calc(100%-130px)]">
            {review.purchaseSource}
          </p>
        </div>
        <div className="mb-4 flex ">
          <label htmlFor="" className="w-[130px]">
            Category
          </label>
          <p className="text-gray-500 w-[calc(100%-130px)]">
            {review.category.name}
          </p>
        </div>

        <div className="space-y-1 mb-4 flex">
          <label htmlFor="" className="w-[130px]">
            Price
          </label>
          <p className="text-gray-500 w-[calc(100%-130px)]">
            {review.price} BDT
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
