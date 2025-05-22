/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type React from 'react';

import { format } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import RatingComponent from '@/components/usefulComponents/ratingComponent';
import { approveReviewApi } from '@/services/Reviews';
import { deleteUserReviewApi } from '@/services/UserDashboard/ReviewServices';
import {
	BookCheck,
	Calendar,
	Check,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	CircleX,
	DollarSign,
	Eye,
	Search,
	Star,
	Trash2,
	X,
} from 'lucide-react';
import { toast } from 'sonner';

// Types
interface Author {
	id: string;
	name: string;
	email: string;
	profileUrl: string | null;
}

interface Category {
	id: string;
	name: string;
}

interface Review {
	id: string;
	title: string;
	description: string;
	rating: number;
	purchaseSource: string;
	imageUrls: string[];
	excerp: string;
	isPremium: boolean;
	price: number;
	isPublished: boolean;
	userId: string;
	categoryId: string;
	createdAt: string;
	updatedAt: string;
	author: Author;
	category: Category;
	comments: any[];
	votes: any[];
}

interface PaginationInfo {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
}

interface ManageReviewsProps {
	initialData: Review[];
	category: Category[];
}

export default function ManageReviews({ initialData = [], category = [] }: ManageReviewsProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [open, setOpen] = useState<boolean>(false);
	const [review, setReviewDtl] = useState<Review>();

	// open drawer
	const openDrawer = (review: Review) => {
		setOpen(true);
		setReviewDtl(review);
	};

	// Loading state
	const [isLoading, setIsLoading] = useState(false);

	// Pagination state
	const [currentPage, setCurrentPage] = useState(() => {
		const page = searchParams.get('page');
		return page ? Number.parseInt(page) : 1;
	});

	const [itemsPerPage, setItemsPerPage] = useState(() => {
		const limit = searchParams.get('limit');
		return limit ? Number.parseInt(limit) : 5;
	});

	// State for filters
	const [searchQuery, setSearchQuery] = useState(searchParams.get('searchTerm') || '');
	const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoryId') || '');
	const [selectedPremium, setSelectedPremium] = useState<boolean | undefined>(() => {
		const isPaid = searchParams.get('isPaid');
		if (isPaid === 'true') return true;
		if (isPaid === 'false') return false;
		return undefined;
	});

	// Publication status state
	const [isPublished, setIsPublished] = useState<boolean | undefined>(() => {
		const published = searchParams.get('isPublished');
		if (published === 'true') return true;
		if (published === 'false') return false;
		return undefined;
	});

	// Set active tab based on isPublished value from URL
	const getInitialTab = () => {
		const published = searchParams.get('isPublished');
		if (published === 'true') return 'published';
		if (published === 'false') return 'unpublished';
		return 'all';
	};

	const [activeTab, setActiveTab] = useState(getInitialTab());

	// Dialog state
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [selectedReview, setSelectedReview] = useState<Review | null>(null);
	const [moderationReason, setModerationReason] = useState('');

	// Check if any filter is active
	const hasActiveFilters = useMemo(() => {
		return (
			searchQuery !== '' || selectedCategory !== '' || selectedPremium !== undefined || isPublished !== undefined
		);
	}, [searchQuery, selectedCategory, selectedPremium, isPublished]);

	// Update isPublished when tab changes
	const handleTabChange = (value: string) => {
		setActiveTab(value);

		// Set isPublished based on tab
		if (value === 'published') {
			setIsPublished(true);
		} else if (value === 'unpublished') {
			setIsPublished(false);
		} else {
			setIsPublished(undefined);
		}

		// Reset to page 1 when changing tabs
		setCurrentPage(1);
	};

	// Filter handler function
	const handleFilter = async (tabValue?: string, page?: number) => {
		setIsLoading(true);

		try {
			// Create a new URLSearchParams object based on the current search params
			const params = new URLSearchParams(searchParams.toString());

			// Update parameters based on current state
			if (searchQuery) params.set('searchTerm', searchQuery);
			else params.delete('searchTerm');

			if (selectedCategory) params.set('categoryId', selectedCategory);
			else params.delete('categoryId');

			// Handle publication status based on tab or current state
			const pubStatus = tabValue
				? tabValue === 'published'
					? true
					: tabValue === 'unpublished'
						? false
						: undefined
				: isPublished;

			if (pubStatus !== undefined) {
				params.set('isPublished', pubStatus.toString());
			} else {
				params.delete('isPublished');
			}

			// Handle premium status
			if (selectedPremium !== undefined) {
				params.set('isPaid', selectedPremium.toString());
			} else {
				params.delete('isPaid');
			}

			// Add pagination parameters
			const pageToUse = page !== undefined ? page : currentPage;
			params.set('page', pageToUse.toString());
			params.set('limit', itemsPerPage.toString());

			// Construct the URL with all parameters
			const url = `/admin/manage-reviews?${params.toString()}`;

			router.push(url);

			// Add a small delay to show loading state
			await new Promise((resolve) => setTimeout(resolve, 300));
		} finally {
			setIsLoading(false);
		}
	};

	// Handle page change
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		// No need to update URL or make backend requests
	};

	// Reset all filters
	const handleResetFilters = () => {
		setSearchQuery('');
		setSelectedCategory('');
		setSelectedPremium(undefined);
		setIsPublished(undefined);
		setActiveTab('all');
		setCurrentPage(1);
		router.push(`/admin/manage-reviews`);
	};

	// Filter reviews based on all filters for local display
	const filteredReviews = useMemo(() => {
		return initialData.filter((review) => {
			// Filter by publication status if set
			if (isPublished !== undefined && review.isPublished !== isPublished) {
				return false;
			}

			// Filter by premium status if set
			if (selectedPremium !== undefined && review.isPremium !== selectedPremium) {
				return false;
			}

			// Filter by category if selected
			if (selectedCategory && review.categoryId !== selectedCategory) {
				return false;
			}

			// Filter by search query
			if (searchQuery && !review.title.toLowerCase().includes(searchQuery.toLowerCase())) {
				return false;
			}

			return true;
		});
	}, [initialData, isPublished, selectedPremium, selectedCategory, searchQuery]);

	// Calculate pagination info
	const paginationInfo = useMemo((): PaginationInfo => {
		const totalItems = filteredReviews.length;
		const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

		return {
			currentPage,
			totalPages,
			totalItems,
			itemsPerPage,
		};
	}, [filteredReviews, currentPage, itemsPerPage]);

	// Get paginated reviews
	const paginatedReviews = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return filteredReviews.slice(startIndex, startIndex + itemsPerPage);
	}, [filteredReviews, currentPage, itemsPerPage]);

	// Summary counts
	const summaries = useMemo(() => {
		return {
			all: initialData.length,
			published: initialData.filter((r) => r.isPublished).length,
			unpublished: initialData.filter((r) => !r.isPublished).length,
			premium: initialData.filter((r) => r.isPremium).length,
		};
	}, [initialData]);

	// Sync URL params with component state on mount
	useEffect(() => {
		// This ensures the component state reflects the URL parameters on initial load and when URL changes
		const tab = getInitialTab();
		if (tab !== activeTab) {
			setActiveTab(tab);
		}

		// We don't need to sync the page from URL anymore since we're handling pagination locally
		// const page = searchParams.get("page");
		// if (page && Number.parseInt(page) !== currentPage) {
		//   setCurrentPage(Number.parseInt(page));
		// }

		const limit = searchParams.get('limit');
		if (limit && Number.parseInt(limit) !== itemsPerPage) {
			setItemsPerPage(Number.parseInt(limit));
		}
	}, [searchParams, activeTab, itemsPerPage]);

	return (
		<div className="container mx-auto p-4">
			{/* Summary Cards */} <h1 className="text-2xl font-bold mb-6">Manage Reviews</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				<SummaryCard
					title="All Reviews"
					count={summaries.all}
					icon={<Calendar className="h-5 w-5" />}
					color="bg-blue-100 text-blue-700"
					// isActive={activeTab === "all"}
					// onClick={() => handleTabChange("all")}
				/>
				<SummaryCard
					title="Published"
					count={summaries.published}
					icon={<Check className="h-5 w-5" />}
					color="bg-green-100 text-green-700"
					// isActive={activeTab === "published"}
					// onClick={() => handleTabChange("published")}
				/>
				<SummaryCard
					title="Unpublished"
					count={summaries.unpublished}
					icon={<X className="h-5 w-5" />}
					color="bg-red-100 text-red-700"
					// isActive={activeTab === "unpublished"}
					// onClick={() => handleTabChange("unpublished")}
				/>
				<SummaryCard
					title="Premium"
					count={summaries.premium}
					icon={<DollarSign className="h-5 w-5" />}
					color="bg-purple-100 text-purple-700"
					// isActive={selectedPremium === true}
					// onClick={() => {
					// 	setSelectedPremium((prev) => (prev === true ? undefined : true))
					// 	setCurrentPage(1)
					// }}
				/>
			</div>
			{/* Drawer codes */}
			{/* add fields of title, description, comments and by whom, rating */}
			<Drawer direction={'right'} open={open} onOpenChange={setOpen}>
				<DrawerContent className="min-w-3xl overflow-y-auto overflow-x-hidden">
					<div className="mx-auto w-full max-w-2xl">
						<DrawerHeader>
							<div className="flex justify-between">
								<DrawerTitle>View Review Detail </DrawerTitle>
								<DrawerClose>
									<CircleX />
								</DrawerClose>
							</div>
						</DrawerHeader>
						<div className="pt-4 pb-0">
							<Card className="w-full border-none">
								<CardContent>
									<div className="space-y-1 mb-4 flex ">
										<label htmlFor="" className="w-[130px]">
											Title
										</label>
										<p className="text-gray-500 w-[calc(100%-130px)]">{review?.title}</p>
									</div>

									<div className="space-y-1 mb-4 flex">
										<label htmlFor="" className=" w-[130px]">
											Description
										</label>
										<p className="text-gray-500 w-[calc(100%-130px)]">{review?.description}</p>
									</div>
									<div className="space-y-1 mb-4 flex ">
										<label htmlFor="" className="w-[130px]">
											Rating
										</label>
										<div className="text-gray-500 w-[calc(100%-130px)]">
											<RatingComponent
												value={review?.rating as number}
												setRating={() => console.log('hello')}
												selectable={false}
											/>
										</div>
									</div>
									<div className="mb-4 flex ">
										<label htmlFor="" className="w-[130px]">
											Comments
										</label>
										<div className="text-gray-500 w-[calc(100%-130px)]">
											{review?.comments &&
												Array.from(review.comments).map((comment, index) => (
													<div key={index} className="mb-2">
														<div className="flex flex-col">
															<p>{comment.content}</p>
															<span className="text-gray-800">
																by{' '}
																<span className="font-bold text-gray-700">
																	{comment.author && comment.author.name}
																</span>{' '}
															</span>
														</div>
													</div>
												))}
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</DrawerContent>
			</Drawer>
			{/* Filters and Tabs */}
			<div className="bg-white rounded-lg shadow p-4 mb-6">
				<div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
					<div className="flex flex-wrap gap-2">
						{/* Search Input */}
						<div className="relative flex-grow max-w-md">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
							<Input
								placeholder="Search reviews..."
								className="pl-9"
								value={searchQuery}
								onChange={(e) => {
									setSearchQuery(e.target.value);
									setCurrentPage(1); // Reset to first page when filter changes
								}}
							/>
						</div>

						{/* Category Dropdown */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant={selectedCategory ? 'default' : 'outline'}
									className={`cursor-pointer ${
										selectedCategory ? 'bg-primary text-primary-foreground' : ''
									}`}
								>
									{selectedCategory
										? category.find((c) => c.id === selectedCategory)?.name || 'Category'
										: 'Category'}
									<ChevronDown className="ml-2 h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem
									onClick={() => {
										setSelectedCategory('');
										setCurrentPage(1);
									}}
								>
									All Categories
								</DropdownMenuItem>
								{category.map((cat) => (
									<DropdownMenuItem
										key={cat.id}
										onClick={() => {
											setSelectedCategory(cat.id);
											setCurrentPage(1);
										}}
										className="cursor-pointer"
									>
										{cat.name}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>

						{/* Premium Filter */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant={selectedPremium !== undefined ? 'default' : 'outline'}
									className={`cursor-pointer ${
										selectedPremium !== undefined ? 'bg-primary text-primary-foreground' : ''
									}`}
								>
									{selectedPremium === undefined
										? 'Premium Status'
										: selectedPremium
											? 'Premium'
											: 'Free'}
									<ChevronDown className="ml-2 h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem
									onClick={() => {
										setSelectedPremium(undefined);
										setCurrentPage(1);
									}}
									className="cursor-pointer"
								>
									All Reviews
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => {
										setSelectedPremium(true);
										setCurrentPage(1);
									}}
									className="cursor-pointer"
								>
									Premium Only
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => {
										setSelectedPremium(false);
										setCurrentPage(1);
									}}
									className="cursor-pointer"
								>
									Free Only
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						{hasActiveFilters && (
							<Button variant="ghost" onClick={handleResetFilters} className="cursor-pointer">
								<X className="mr-2 h-4 w-4" />
								Reset
							</Button>
						)}
					</div>
				</div>

				{/* Tabs */}

				<Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange}>
					<TabsList className="mb-4 flex items-center gap-4">
						{/* <TabsTrigger value="all" className="cursor-pointer">
							All Reviews
						</TabsTrigger> */}
						<TabsTrigger value="published" className="cursor-pointer bg-green-500 text-white">
							Published
						</TabsTrigger>
						<TabsTrigger value="unpublished" className="cursor-pointer bg-purple-500 text-white">
							Unpublished
						</TabsTrigger>
					</TabsList>

					{isLoading ? (
						<TableSkeleton />
					) : (
						<>
							<TabsContent value="all">
								<ReviewsTable
									reviews={paginatedReviews}
									onDelete={(review) => {
										setSelectedReview(review);
										setDeleteDialogOpen(true);
									}}
									openDrawer={openDrawer}
								/>
								<Pagination paginationInfo={paginationInfo} onPageChange={handlePageChange} />
							</TabsContent>

							<TabsContent value="published">
								<ReviewsTable
									reviews={paginatedReviews}
									onDelete={(review) => {
										setSelectedReview(review);
										setDeleteDialogOpen(true);
									}}
									openDrawer={openDrawer}
								/>
								<Pagination paginationInfo={paginationInfo} onPageChange={handlePageChange} />
							</TabsContent>

							<TabsContent value="unpublished">
								<ReviewsTable
									reviews={paginatedReviews}
									onDelete={(review) => {
										setSelectedReview(review);
										setDeleteDialogOpen(true);
									}}
									openDrawer={openDrawer}
								/>
								<Pagination paginationInfo={paginationInfo} onPageChange={handlePageChange} />
							</TabsContent>
						</>
					)}
				</Tabs>
			</div>
			{/* Delete Confirmation Dialog */}
			<Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete Review</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete this review? This action cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<div className="py-4">
						<h3 className="font-medium">{selectedReview?.title}</h3>
						<p className="text-sm text-gray-500 mt-1">By {selectedReview?.author.name}</p>
						<Textarea
							className="mt-4"
							placeholder="Reason for deletion (optional)..."
							value={moderationReason}
							onChange={(e) => setModerationReason(e.target.value)}
						/>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="cursor-pointer">
							Cancel
						</Button>
						<Button
							variant="destructive"
							onClick={() => {
								// console.log(
								//   `Deleted review: ${selectedReview?.id}, Reason: ${moderationReason}`,
								// );
								setDeleteDialogOpen(false);
								setSelectedReview(null);
								setModerationReason('');
							}}
							className="cursor-pointer"
						>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

// Pagination Component
function Pagination({
	paginationInfo,
	onPageChange,
}: {
	paginationInfo: PaginationInfo;
	onPageChange: (page: number) => void;
}) {
	const { currentPage, totalPages, totalItems, itemsPerPage } = paginationInfo;

	// Calculate start and end item numbers
	const startItem = Math.min(totalItems, (currentPage - 1) * itemsPerPage + 1);
	const endItem = Math.min(totalItems, currentPage * itemsPerPage);

	// Generate page numbers to display
	const getPageNumbers = () => {
		const pages = [];
		const maxPagesToShow = 5;

		if (totalPages <= maxPagesToShow) {
			// Show all pages if there are few
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			// Always show first page
			pages.push(1);

			// Calculate start and end of page range
			let start = Math.max(2, currentPage - 1);
			let end = Math.min(totalPages - 1, currentPage + 1);

			// Adjust if at the beginning
			if (currentPage <= 2) {
				end = Math.min(totalPages - 1, 4);
			}

			// Adjust if at the end
			if (currentPage >= totalPages - 1) {
				start = Math.max(2, totalPages - 3);
			}

			// Add ellipsis if needed
			if (start > 2) {
				pages.push(-1); // -1 represents ellipsis
			}

			// Add middle pages
			for (let i = start; i <= end; i++) {
				pages.push(i);
			}

			// Add ellipsis if needed
			if (end < totalPages - 1) {
				pages.push(-2); // -2 represents ellipsis
			}

			// Always show last page
			pages.push(totalPages);
		}

		return pages;
	};

	const pageNumbers = getPageNumbers();

	if (totalPages <= 1) {
		return null;
	}

	return (
		<div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
			<div className="text-sm text-gray-500">
				Showing {startItem} to {endItem} of {totalItems} reviews
			</div>

			<div className="flex items-center space-x-2">
				<Button
					variant="outline"
					size="icon"
					onClick={() => onPageChange(1)}
					disabled={currentPage === 1}
					className="cursor-pointer"
					aria-label="First page"
				>
					<ChevronsLeft className="h-4 w-4" />
				</Button>

				<Button
					variant="outline"
					size="icon"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="cursor-pointer"
					aria-label="Previous page"
				>
					<ChevronLeft className="h-4 w-4" />
				</Button>

				{pageNumbers.map((page, index) => {
					if (page < 0) {
						// Render ellipsis
						return (
							<span key={`ellipsis-${index}`} className="px-2">
								&hellip;
							</span>
						);
					}

					return (
						<Button
							key={page}
							variant={currentPage === page ? 'default' : 'outline'}
							size="sm"
							onClick={() => onPageChange(page)}
							className="cursor-pointer"
						>
							{page}
						</Button>
					);
				})}

				<Button
					variant="outline"
					size="icon"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="cursor-pointer"
					aria-label="Next page"
				>
					<ChevronRight className="h-4 w-4" />
				</Button>

				<Button
					variant="outline"
					size="icon"
					onClick={() => onPageChange(totalPages)}
					disabled={currentPage === totalPages}
					className="cursor-pointer"
					aria-label="Last page"
				>
					<ChevronsRight className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}

// Helper Components
function SummaryCard({
	title,
	count,
	icon,
	color,
	isActive = false,
	onClick,
}: {
	title: string;
	count: number;
	icon: React.ReactNode;
	color: string;
	isActive?: boolean;
	onClick?: () => void;
}) {
	return (
		<Card
			className={`transition-all duration-200 ${
				isActive ? 'ring-2 ring-primary' : 'hover:shadow-md'
			} cursor-pointer`}
			onClick={onClick}
		>
			<CardContent className="p-4 flex items-center justify-between">
				<div>
					<p className="text-sm text-gray-500">{title}</p>
					<p className="text-2xl font-bold">{count}</p>
				</div>
				<div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center`}>{icon}</div>
			</CardContent>
		</Card>
	);
}

function ReviewsTable({
	reviews,
	onDelete,
	openDrawer,
}: {
	reviews: Review[];
	onDelete: (review: Review) => void;
	openDrawer: (review: Review) => void;
}) {
	if (reviews.length === 0) {
		return <div className="text-center py-8 text-gray-500">No reviews found.</div>;
	}
	const approveReview = async (review: Review) => {
		try {
			const toastId = toast.loading('...Loading', { id: 1 });
			const res = await approveReviewApi(review.id);
			if (res?.success) {
				toast.success(res.message, { id: toastId });
			} else {
				toast.error(res.message, { id: toastId });
			}
		} catch (err) {
			console.log(err);
		}
	};

	const deleteReviewMethod = async (review: Review) => {
		try {
			const toastId = toast.loading('...Loading', { id: 1 });
			const res = await deleteUserReviewApi(review.id);
			if (res?.success) {
				toast.success(res.message, { id: toastId });
			} else {
				toast.error(res.message, { id: toastId });
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Title</TableHead>
						<TableHead>Author</TableHead>
						<TableHead>Category</TableHead>
						<TableHead>Rating</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Date</TableHead>
						<TableHead className="w-[100px]">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{reviews.map((review) => (
						<TableRow key={review.id}>
							<TableCell className="font-medium max-w-[200px] truncate">{review.title}</TableCell>
							<TableCell>{review.author.name}</TableCell>
							<TableCell>{review.category.name}</TableCell>
							<TableCell>
								<div className="flex items-center">
									{review.rating}
									<Star className="h-4 w-4 fill-yellow-400 ml-1" />
								</div>
							</TableCell>
							<TableCell>
								{review.isPublished ? (
									<Badge className="bg-green-100 text-green-800 hover:bg-green-100">Published</Badge>
								) : (
									<Badge variant="outline" className="text-red-800">
										Unpublished
									</Badge>
								)}
							</TableCell>
							<TableCell>
								{review.isPremium ? (
									<Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
										${review.price.toFixed(2)}
									</Badge>
								) : (
									<Badge variant="outline">Free</Badge>
								)}
							</TableCell>
							<TableCell>{format(new Date(review.createdAt), 'MMM d, yyyy')}</TableCell>
							<TableCell>
								<div className="flex space-x-1">
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8 text-blue-500 cursor-pointer"
										onClick={() => openDrawer(review)}
									>
										<Eye className="h-4 w-4" />
									</Button>
									{review.isPublished != true && (
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 text-green-500 cursor-pointer"
											onClick={() => approveReview(review)}
										>
											<BookCheck className="h-4 w-4" />
										</Button>
									)}
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8 text-red-500 cursor-pointer"
										onClick={() => deleteReviewMethod(review)}
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

function TableSkeleton() {
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Title</TableHead>
						<TableHead>Author</TableHead>
						<TableHead>Category</TableHead>
						<TableHead>Rating</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.from({ length: 5 }).map((_, i) => (
						<TableRow key={i}>
							<TableCell>
								<Skeleton className="h-5 w-[180px]" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-5 w-[100px]" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-5 w-[80px]" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-5 w-[40px]" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-5 w-[80px]" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-5 w-[60px]" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-5 w-[100px]" />
							</TableCell>
							<TableCell>
								<div className="flex space-x-1">
									<Skeleton className="h-8 w-8 rounded" />
									<Skeleton className="h-8 w-8 rounded" />
									<Skeleton className="h-8 w-8 rounded" />
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
