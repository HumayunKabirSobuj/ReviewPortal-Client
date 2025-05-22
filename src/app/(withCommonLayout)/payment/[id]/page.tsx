import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface IProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PaymentPage({ params }: IProps) {
  const { id: reviewId } = await params;
  // In a real app, you would fetch the review details here
  const mockReview = {
    id: reviewId,
    title: "Premium Review",
    price: 2.99,
  };

  return (
    <div className="container max-w-3xl py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Secure Checkout</h1>
        <p className="text-muted-foreground">
          Complete your purchase to unlock premium content
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-5">
        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Details
              </CardTitle>
              <CardDescription>
                Enter your card information to complete the purchase
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="1234 5678 9012 3456" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name on Card</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Billing Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2 col-span-1">
                  <Label htmlFor="zip">Zip Code</Label>
                  <Input id="zip" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{mockReview.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Premium Content Access
                  </p>
                </div>
                <span>${mockReview.price.toFixed(2)}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${mockReview.price.toFixed(2)}</span>
              </div>

              <div className="bg-muted/50 p-3 rounded-lg text-sm flex items-start gap-2 mt-4">
                <ShieldCheck className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Secure Payment</p>
                  <p className="text-muted-foreground">
                    Your payment information is encrypted and secure.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <Button
                className="w-full bg-amber-500 hover:bg-amber-600"
                asChild
              >
                <Link href={`/reviews/${reviewId}?purchased=true`}>
                  <Lock className="h-4 w-4 mr-2" />
                  Pay ${mockReview.price.toFixed(2)}
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/reviews/${reviewId}`}>Cancel</Link>
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                By completing this purchase, you agree to our Terms of Service
                and Privacy Policy.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
