import Link from "next/link";
import { XCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-sm relative">
        <Card className="w-full border-none shadow-xl overflow-hidden pt-16">
          {/* Top decorative element */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-red-400 to-rose-500 rounded-t-xl" />

          {/* Failed icon with glow effect */}
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-4 shadow-lg w-24 h-24 flex items-center justify-center z-10 ring-8 ring-white/50">
            <XCircle className="h-14 w-14 text-red-500" />
          </div>

          <CardHeader className="pt-24 pb-4 text-center relative z-0">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Payment Failed
            </CardTitle>
          </CardHeader>

          <CardContent className="text-center space-y-4 pb-6 px-6">
            <p className="text-gray-600">
              Your payment could not be processed at this time
            </p>

            {/* Additional info */}
          </CardContent>

          <CardFooter className="flex flex-col gap-3 pb-8 px-6">
            <Button
              className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-lg shadow-md transition-colors"
              asChild
            >
              <Link
                href="/reviews"
                className="flex items-center justify-center"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Go All Reviews Page
              </Link>
            </Button>
          </CardFooter>

          {/* Bottom decorative dots */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-300"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
          </div>
        </Card>
      </div>
    </div>
  );
}
