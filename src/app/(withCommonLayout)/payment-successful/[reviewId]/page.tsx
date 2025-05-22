import Link from "next/link";
import { CheckCircle2, ArrowRight, LayoutDashboardIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
interface IProps {
  params: Promise<{
    reviewId: string;
  }>;
}

export default async function PaymentSuccessPage({ params }: IProps) {
  // console.log((await params).reviewId);

  const reveiwId = (await params)?.reviewId;
  // console.log(reveiwId);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-sm relative">
        <Card className="w-full border-none shadow-xl overflow-hidden pt-16">
          {/* Top decorative element */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-green-400 to-emerald-500 rounded-t-xl" />

          {/* Success icon with glow effect - repositioned */}
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-4 shadow-lg w-24 h-24 flex items-center justify-center z-10 ring-8 ring-white/50">
            <CheckCircle2 className="h-14 w-14 text-green-500" />
          </div>

          <CardHeader className="pt-24 pb-4 text-center relative z-0">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Payment Successful!
            </CardTitle>
          </CardHeader>

          <CardContent className="text-center space-y-4 pb-6 px-6">
            <p className="text-gray-600">
              Your order has been successfully received
            </p>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 pb-8 px-6">
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 rounded-lg shadow-md transition-colors"
              asChild
            >
              <Link
                href={`/reviews/${reveiwId}`}
                className="flex items-center justify-center"
              >
                View Review Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              variant="outline"
              className="w-full border-green-200 text-green-700 hover:bg-green-50 py-5 rounded-lg transition-colors"
              asChild
            >
              <Link
                href="/user/my-payments"
                className="flex items-center justify-center"
              >
                <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                Go To Dashboard
              </Link>
            </Button>
          </CardFooter>

          {/* Bottom decorative dots */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-300"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          </div>
        </Card>
      </div>
    </div>
  );
}
