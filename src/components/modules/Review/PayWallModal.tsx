/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import { makePayment } from "@/services/Payments";
import { toast } from "sonner";
interface Review {
  id: string;
  title: string;
  description: string;
  rating: number;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  author: {
    id: string;
    name: string;
  };
  isPremium: boolean;
  userId: string;
  price?: number;
  votes?: string[];
  comments?: string[];
  createdAt: string;
  excerp?: string;
  Payment?: any[];
  imageUrls?: string[];
  Discount?: {
    id: string;
    percent: number;
    newPrice: number;
    reviewId: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
  };
}

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewId: string;
  title: string;
  excerpt: string;
  price: number;
  author: string;
  review?: Review;
}

export default function PaywallModal({
  isOpen,
  onClose,
  reviewId,
  title,
  excerpt,
  price,
  author,
  review,
}: PaywallModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async (reviewIdHere: string) => {
    try {
      setIsLoading(true);
      toast.loading("Processing your payment...", {
        id: "payment-toast",
      });

      const result = await makePayment(reviewIdHere);

      if (result.url) {
        toast.success("Payment initiated successfully!", {
          id: "payment-toast",
          description: "Redirecting you to the payment page...",
        });
        window.location.replace(result.url);
      } else {
        toast.error("Payment initiation failed", {
          id: "payment-toast",
          description: "Please try again later",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment processing failed", {
        id: "payment-toast",
        description: "Please try again later",
      });
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="bg-primary hover:bg-primary/90">
              Premium Content
            </Badge>
            <Badge variant="outline" className="text-muted-foreground">
                {review?.Discount ? (
              <div>
                {review.Discount.newPrice.toFixed(2)}
              </div>
            ) : (
              <div>
                {price.toFixed(2)}
              </div>
            )} BDT
            </Badge>
          </div>
          <DialogTitle className="text-xl mt-2">{title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            By {author}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="flex items-center justify-center bg-muted/50 p-4 rounded-lg">
            <Lock className="h-12 w-12 text-muted-foreground/70" />
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Preview:</h4>
            <p className="text-sm">{excerpt}</p>
            <p className="text-sm text-muted-foreground italic">
              Unlock this premium review to read the full content...
            </p>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg space-y-2">
            <h4 className="font-medium">What you'll get:</h4>
            <ul className="text-sm space-y-1">
              <li>• Full in-depth review content</li>
              <li>• Detailed pros and cons analysis</li>
              <li>• Comparison with similar products</li>
              <li>• Expert recommendations</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="sm:flex-1">
            Maybe Later
          </Button>
          <Button
            onClick={() => handlePayment(reviewId)}
            className="sm:flex-1 bg-primary hover:bg-primary/90 text-white"
            disabled={isLoading}
          >
            {/* {isLoading ? "Processing..." : `Pay ${price.toFixed(2)}  BDT Now`} */}
            {review?.Discount ? (
              <div>
                 {isLoading
                    ? "Processing..."
                    : `Pay ${review.Discount.newPrice.toFixed(2)}  BDT Now`}
              </div>
            ) : (
              <div>
                {isLoading
                  ? "Processing..."
                  : `Pay ${price.toFixed(2)}  BDT Now`}
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
