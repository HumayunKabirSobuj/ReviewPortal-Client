/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, MessageSquare, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";
import PaywallModal from "./PayWallModal";
import { useUser } from "@/components/context/UserContext";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";

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

interface ReviewCardProps {
  review: Review;
}

// Optimized Review Card component with entire card clickable
const ReviewCard = memo(({ review }: ReviewCardProps) => {
  // console.log(review);
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const { user } = useUser();

  // Check if user has already paid for this review
  const hasUserPaid =
    user && review?.Payment?.some((payment) => payment.userId === user?.id);

  // Navigate to review details page
  const handleCardClick = () => {
    if (
      review.isPremium &&
      !hasUserPaid &&
      user?.role !== "ADMIN" &&
      review?.userId !== user?.id
    ) {
      // Show paywall modal for premium content
      setShowPaywall(true);
    } else if (!user) {
      toast.error("Authentication required", {
        description: "Please login to view this review",
        action: {
          label: "Login",
          onClick: () => router.push("/login"),
        },
      });
    } else {
      // Navigate to review details for free content or paid premium content
      router.push(`/reviews/${review.id}`);
    }
  };

  // Prevent navigation when clicking on specific elements
  const handleInnerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Handle unlock button click
  const handleUnlockClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Authentication required", {
        description: "Please login to purchase premium content",
        action: {
          label: "Login",
          onClick: () => router.push("/login"),
        },
      });
      return;
    }
    setShowPaywall(true);
  };

  // Handle vote actions
  const handleVote = (e: React.MouseEvent, voteType: "up" | "down") => {
    e.stopPropagation();
    if (!user) {
      toast.error("Authentication required", {
        description: "Please login to vote",
        action: {
          label: "Login",
          onClick: () => router.push("/login"),
        },
      });
      return;
    }

    toast.success(`Vote ${voteType} registered`, {
      description: `You voted ${voteType} for this review`,
    });
    // Implement actual vote logic here
  };

  // Close paywall modal
  const handleClosePaywall = () => {
    setShowPaywall(false);
  };

  // Optimized rendering of stars
  const renderStars = () => {
    return (
      <div className="flex mr-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "w-4 h-4",
              i < review.rating
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300 fill-gray-300"
            )}
          />
        ))}
      </div>
    );
  };

  // Get excerpt from description or use provided excerpt
  const excerpt = review.excerp || review.description.substring(0, 100) + "...";

  return (
    <>
      <Card
        className={cn(
          "h-full flex flex-col max-w-md transition-all duration-200 cursor-pointer",
          isHovered ? "shadow-md translate-y-[-2px]" : "hover:shadow-sm"
        )}
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <h3
                className={cn(
                  "font-semibold text-lg line-clamp-2 transition-colors",
                  isHovered ? "text-primary" : ""
                )}
              >
                {review.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                by {review.author.name}
              </p>
            </div>
            {review.isPremium && (
              <Badge
                variant="default"
                className="bg-primary hover:bg-primary/90"
              >
                Premium
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="py-2 flex-grow">
          <div className="flex items-center mb-3">
            {renderStars()}
            <span className="text-sm text-muted-foreground">
              ({review.rating.toFixed(1)})
            </span>
          </div>
          <Badge variant="outline" className="mb-3">
            {review.category.name}
          </Badge>

          {review.imageUrls && review.imageUrls.length > 0 && (
            <div className="mt-3 mb-3 relative aspect-video rounded-md overflow-hidden">
              <Image
                src={review.imageUrls[0] || "/placeholder.svg"}
                alt={review.title}
                className="w-full h-full"
                width={500}
                height={400}
              />
            </div>
          )}

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {excerpt}
          </p>

          {user &&
            review?.isPremium &&
            user?.role === "USER" &&
            !hasUserPaid &&
            review?.userId !== user?.id && (
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs hover:bg-primary/10 transition-colors"
                  onClick={handleUnlockClick}
                >
                  Unlock for BDT{review?.price || "0000"}{" "}
                  {review?.Discount && (
                    <div>
                      <Badge variant="outline">{review.Discount.percent} % Off</Badge>
                    </div>
                  )}
                </Button>
              </div>
            )}

          {user && !review?.isPremium && (
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs hover:bg-primary/10 transition-colors mt-4"
            >
              <Link href={`/reviews/${review.id}`}>Show Details</Link>
            </Button>
          )}
          {!user && !review?.isPremium && (
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs hover:bg-primary/10 transition-colors mt-4"
            >
              <Link href={`/login`}>Login for details</Link>
            </Button>
          )}
          {!user && review?.isPremium && (
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs hover:bg-primary/10 transition-colors mt-4"
            >
              <Link href={`/login`}>Login for payment</Link>
            </Button>
          )}

          {user && review?.isPremium && user?.role === "ADMIN" && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs hover:bg-primary/10 transition-colors"
              >
                <Link href={`/reviews/${review.id}`}>Show Details</Link>
              </Button>
            </div>
          )}

          {user &&
            review?.isPremium &&
            user?.role === "USER" &&
            hasUserPaid && (
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs hover:bg-green-50 transition-colors"
                >
                  <Link href={`/reviews/${review.id}`}>Show Details</Link>
                </Button>
              </div>
            )}

          {user &&
            review?.isPremium &&
            user?.role === "USER" &&
            review?.userId === user?.id && (
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs hover:bg-green-50 transition-colors"
                >
                  <Link href={`/reviews/${review.id}`}>Show Details</Link>
                </Button>
              </div>
            )}
        </CardContent>
        <CardFooter className="pt-3 flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4" onClick={handleInnerClick}>
            <div className="flex items-center gap-1">
              <button
                className="hover:text-primary focus:text-primary focus:outline-none transition-colors p-1 rounded-full hover:bg-muted"
                onClick={(e) => handleVote(e, "up")}
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <span>{review.votes?.length || 0}</span>
              <button
                className="hover:text-primary focus:text-primary focus:outline-none transition-colors p-1 rounded-full hover:bg-muted"
                onClick={(e) => handleVote(e, "down")}
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{review.comments?.length || 0}</span>
            </div>
          </div>
          <span>{new Date(review.createdAt).toLocaleDateString()}</span>
        </CardFooter>
      </Card>

      {/* Premium Content Paywall Modal */}
      <PaywallModal
        isOpen={showPaywall}
        onClose={handleClosePaywall}
        reviewId={review.id}
        title={review.title}
        excerpt={excerpt}
        price={review.price || 2.99}
        author={review.author.name}
        review={review}
      />
    </>
  );
});

ReviewCard.displayName = "ReviewCard";

export default ReviewCard;
