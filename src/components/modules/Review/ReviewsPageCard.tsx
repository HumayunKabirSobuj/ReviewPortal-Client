/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {  Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import ReviewCard from "./ReviewCard";
import { Badge } from "@/components/ui/badge";
import ReviewCardSkeleton from "./REviewCardSkeleton";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  userId: string; // Add this property
  isPremium: boolean;
  price?: number;
  votes?: string[];
  comments?: string[];
  createdAt: string;
  imageUrls?: string[];
  Payment?: any[]; // Add this property
}

interface Category {
  id: string;
  name: string;
}

interface ReviewsPageCardProps {
  initialData: Review[];
  category: Category[];
}

// Main component
const ReviewsPageCard: React.FC<ReviewsPageCardProps> = ({
  initialData,
  category,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Initialize state from URL params to maintain filter state
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("searchTerm") || "",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("categoryId") || "",
  );
  const [ratingFilter, setRatingFilter] = useState(
    Number(searchParams.get("minRating") || 0),
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");
  const [premiumFilter, setPremiumFilter] = useState<string | null>(
    searchParams.has("isPremium")
      ? searchParams.get("isPremium") === "true"
        ? "premium"
        : "free"
      : null,
  );

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [shouldApplyFilters, setShouldApplyFilters] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page") || 1),
  );
  const itemsPerPage = 9;
  const [totalPages, setTotalPages] = useState(1);

  // Initialize data
  useEffect(() => {
    if (initialData) {
      // Apply initial filters based on URL params
      const filtered = filterReviews(
        initialData,
        selectedCategory,
        ratingFilter,
        sortBy,
        searchQuery,
        premiumFilter,
      );
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));

      // Apply pagination
      const paginatedData = getPaginatedData(
        filtered,
        currentPage,
        itemsPerPage,
      );
      setFilteredReviews(paginatedData);
      setLoadingInitial(false);
    }
  }, [initialData]); // Only run on initial data load

  // Get paginated data
  const getPaginatedData = (data: Review[], page: number, perPage: number) => {
    const startIndex = (page - 1) * perPage;
    return data.slice(startIndex, startIndex + perPage);
  };

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Apply search filter when debounced value changes
  useEffect(() => {
    if (debouncedSearchQuery !== searchQuery) {
      setShouldApplyFilters(true);
    }
  }, [debouncedSearchQuery, searchQuery]);

  // Apply filters when requested
  useEffect(() => {
    if (shouldApplyFilters) {
      applyFilters();
      setShouldApplyFilters(false);
    }
  }, [shouldApplyFilters]);

  // Count active filters
  useEffect(() => {
    let count = 0;
    if (selectedCategory) count++;
    if (ratingFilter > 0) count++;
    if (sortBy !== "newest") count++;
    if (searchQuery) count++;
    if (premiumFilter !== null) count++;
    setActiveFiltersCount(count);
  }, [selectedCategory, ratingFilter, sortBy, searchQuery, premiumFilter]);

  // Filter reviews without triggering API calls
  const filterReviews = useCallback(
    (
      reviews: Review[],
      categoryId: string,
      rating: number,
      sort: string,
      search: string,
      premium: string | null,
    ) => {
      // Filter by search query
      let filtered = reviews.filter((review) => {
        if (
          search &&
          !review.title.toLowerCase().includes(search.toLowerCase()) &&
          !review.description.toLowerCase().includes(search.toLowerCase())
        ) {
          return false;
        }

        // Filter by category
        if (categoryId && review.categoryId !== categoryId) {
          return false;
        }

        // Filter by rating
        if (rating > 0 && review.rating < rating) {
          return false;
        }

        // Filter by premium status
        if (premium !== null) {
          if (premium === "premium" && !review.isPremium) return false;
          if (premium === "free" && review.isPremium) return false;
        }

        return true;
      });

      // Sort the filtered reviews
      filtered = sortReviews(filtered, sort);

      return filtered;
    },
    [],
  );

  // Apply filters and update URL
  const applyFilters = useCallback(() => {
    setIsLoading(true);

    // Filter reviews locally without API call
    const filtered = filterReviews(
      initialData,
      selectedCategory,
      ratingFilter,
      sortBy,
      debouncedSearchQuery,
      premiumFilter,
    );

    // Calculate total pages
    const pages = Math.ceil(filtered.length / itemsPerPage);
    setTotalPages(pages);

    // Ensure current page is valid
    const validPage = Math.min(currentPage, pages || 1);
    if (validPage !== currentPage) {
      setCurrentPage(validPage);
    }

    // Get paginated data
    const paginatedData = getPaginatedData(filtered, validPage, itemsPerPage);

    // Update state with filtered reviews
    setFilteredReviews(paginatedData);

    // Update URL with filters (without triggering navigation)
    updateUrl(validPage);

    // Show toast notification for filter changes
    if (shouldApplyFilters) {
      toast.success("Filters applied", {
        description: `Found ${filtered.length} reviews matching your criteria`,
      });
    }

    // Simulate network delay for smoother UX
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [
    initialData,
    selectedCategory,
    ratingFilter,
    sortBy,
    debouncedSearchQuery,
    premiumFilter,
    currentPage,
    itemsPerPage,
    filterReviews,
  ]);

  // Update URL without triggering navigation
  const updateUrl = useCallback(
    (page: number) => {
      const params = new URLSearchParams();

      if (selectedCategory) params.set("categoryId", selectedCategory);
      if (ratingFilter > 0) params.set("minRating", ratingFilter.toString());
      if (sortBy !== "newest") params.set("sort", sortBy);
      if (debouncedSearchQuery) params.set("searchTerm", debouncedSearchQuery);
      if (premiumFilter === "premium") params.set("isPremium", "true");
      if (premiumFilter === "free") params.set("isPremium", "false");
      if (page > 1) params.set("page", page.toString());

      const queryString = params.toString();

      // Use startTransition for URL updates to avoid blocking the UI
      startTransition(() => {
        router.push(`/reviews${queryString ? `?${queryString}` : ""}`, {
          scroll: false,
        });
      });
    },
    [
      router,
      selectedCategory,
      ratingFilter,
      sortBy,
      debouncedSearchQuery,
      premiumFilter,
    ],
  );

  const sortReviews = useCallback((reviews: Review[], sortType: string) => {
    switch (sortType) {
      case "newest":
        return [...reviews].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      case "oldest":
        return [...reviews].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
      case "highest":
        return [...reviews].sort((a, b) => b.rating - a.rating);
      case "lowest":
        return [...reviews].sort((a, b) => a.rating - b.rating);
      case "popular":
        return [...reviews].sort(
          (a, b) => (b.votes?.length || 0) - (a.votes?.length || 0),
        );
      default:
        return reviews;
    }
  }, []);

  // Handle page change
  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages || page === currentPage) return;

      setCurrentPage(page);

      // Filter all data
      const filtered = filterReviews(
        initialData,
        selectedCategory,
        ratingFilter,
        sortBy,
        debouncedSearchQuery,
        premiumFilter,
      );

      // Get paginated data for the new page
      const paginatedData = getPaginatedData(filtered, page, itemsPerPage);

      setFilteredReviews(paginatedData);

      // Update URL with the new page
      // updateUrl(page);

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });

      // setTimeout(() => {
      // 	setIsLoading(false);
      // }, 300);
    },
    [
      currentPage,
      totalPages,
      initialData,
      selectedCategory,
      ratingFilter,
      sortBy,
      debouncedSearchQuery,
      premiumFilter,
      itemsPerPage,
      filterReviews,
      updateUrl,
    ],
  );

  // Handle filter changes
  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page when filter changes
    setShouldApplyFilters(true);
  }, []);

  const handleRatingChange = useCallback((value: number) => {
    setRatingFilter(value);
    setCurrentPage(1); // Reset to first page when filter changes
    setShouldApplyFilters(true);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value);
    setShouldApplyFilters(true);
  }, []);

  const handlePremiumFilterChange = useCallback((value: string | null) => {
    setPremiumFilter(value);
    setCurrentPage(1); // Reset to first page when filter changes
    setShouldApplyFilters(true);
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedCategory("");
    setRatingFilter(0);
    setSortBy("newest");
    setSearchQuery("");
    setPremiumFilter(null);
    setCurrentPage(1);
    setShouldApplyFilters(true);

    toast.info("Filters reset", {
      description: "All filters have been cleared",
    });
  }, []);

  // Memoize the category list to prevent unnecessary re-renders
  const categoryList = useMemo(
    () => (
      <div className="space-y-2">
        <div className="flex items-center">
          <button
            className={cn(
              "text-sm px-2 py-1 rounded-md w-full text-left transition-colors",
              selectedCategory === ""
                ? "font-medium text-primary bg-primary/10"
                : "text-muted-foreground hover:bg-muted",
            )}
            onClick={() => handleCategoryChange("")}
          >
            All Categories
          </button>
        </div>
        {category.map((cat) => (
          <div key={cat.id} className="flex items-center">
            <button
              className={cn(
                "text-sm px-2 py-1 rounded-md w-full text-left transition-colors",
                selectedCategory === cat.id
                  ? "font-medium text-primary bg-primary/10"
                  : "text-muted-foreground hover:bg-muted",
              )}
              onClick={() => handleCategoryChange(cat.id)}
            >
              {cat.name}
            </button>
          </div>
        ))}
      </div>
    ),
    [category, selectedCategory, handleCategoryChange],
  );

  // Generate pagination items
  const paginationItems = useMemo(() => {
    const items = [];

    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink
          isActive={currentPage === 1}
          onClick={() => handlePageChange(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>,
    );

    // Show ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    // Show pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink
            isActive={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  }, [currentPage, totalPages, handlePageChange]);

  // Memoize the review grid to prevent unnecessary re-renders
  const reviewGrid = useMemo(() => {
    if (loadingInitial) {
      return Array(6)
        .fill(0)
        .map((_, index) => <ReviewCardSkeleton key={`skeleton-${index}`} />);
    }

    if (isLoading) {
      return filteredReviews.map((_, index) => (
        <ReviewCardSkeleton key={`skeleton-${index}`} />
      ));
    }

    if (filteredReviews.length === 0) {
      return (
        <div className="col-span-full text-center py-12 bg-card rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-2">No reviews found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or search criteria
          </p>
          <Button
            variant="outline"
            onClick={resetFilters}
            className="hover:bg-muted/80 transition-colors"
          >
            Reset Filters
          </Button>
        </div>
      );
    }

    return filteredReviews.map((review) => (
      <ReviewCard key={review.id} review={review} />
    ));
  }, [filteredReviews, isLoading, loadingInitial, resetFilters]);

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search reviews..."
              className="w-full pl-10 pr-4 focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <aside className="col-span-1 hidden md:block">
          <div className="bg-card rounded-lg p-5 space-y-6 shadow-sm border sticky top-20">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                {activeFiltersCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1">
                    {activeFiltersCount} active
                  </span>
                )}
              </div>
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="text-md font-medium">Category</h4>
                  {categoryList}
                </div>
                <Separator className="my-4" />
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-md font-medium">Minimum Rating</h4>
                    <span className="text-sm font-medium">{ratingFilter}</span>
                  </div>
                  <Slider
                    defaultValue={[ratingFilter]}
                    max={5}
                    step={1}
                    value={[ratingFilter]}
                    onValueChange={([value]) => handleRatingChange(value)}
                    className="py-2"
                  />
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    {[0, 1, 2, 3, 4, 5].map((num) => (
                      <span key={num}>{num}</span>
                    ))}
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-3">
                  <h4 className="text-md font-medium">Premium Content</h4>
                  <div className="flex flex-col space-y-2">
                    <button
                      className={cn(
                        "text-sm px-2 py-1.5 rounded-md text-left transition-colors",
                        premiumFilter === null
                          ? "font-medium text-primary bg-primary/10"
                          : "text-muted-foreground hover:bg-muted",
                      )}
                      onClick={() => handlePremiumFilterChange(null)}
                    >
                      All Reviews
                    </button>
                    <button
                      className={cn(
                        "text-sm px-2 py-1.5 rounded-md text-left transition-colors flex items-center",
                        premiumFilter === "premium"
                          ? "font-medium text-primary bg-primary/10"
                          : "text-muted-foreground hover:bg-muted",
                      )}
                      onClick={() => handlePremiumFilterChange("premium")}
                    >
                      Premium Only
                      <Badge
                        variant="default"
                        className="ml-2 bg-primary hover:bg-primary/90"
                      >
                        PRO
                      </Badge>
                    </button>
                    <button
                      className={cn(
                        "text-sm px-2 py-1.5 rounded-md text-left transition-colors",
                        premiumFilter === "free"
                          ? "font-medium text-primary bg-primary/10"
                          : "text-muted-foreground hover:bg-muted",
                      )}
                      onClick={() => handlePremiumFilterChange("free")}
                    >
                      Free Only
                    </button>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <h4 className="text-md font-medium mb-2">Sort By</h4>
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-full focus:ring-primary">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="highest">Highest Rated</SelectItem>
                      <SelectItem value="lowest">Lowest Rated</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 hover:bg-muted/80 transition-colors"
                  onClick={resetFilters}
                  disabled={isPending}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
        </aside>

        <div className="col-span-4 md:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviewGrid}
          </div>

          {/* Pagination */}
          {!loadingInitial &&
            !isLoading &&
            filteredReviews.length > 0 &&
            totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      aria-disabled={currentPage === 1}
                      tabIndex={currentPage === 1 ? -1 : undefined}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                  {paginationItems}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      aria-disabled={currentPage === totalPages}
                      tabIndex={currentPage === totalPages ? -1 : undefined}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
        </div>
      </div>
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(ReviewsPageCard);
