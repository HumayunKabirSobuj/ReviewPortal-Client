/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import ReviewComments from '@/components/modules/Review/ReviewComments';
import ReviewImageGallery from '@/components/modules/Review/ReviewImagerGallery';
// import ReviewImageGallery from "@/components/modules/Review/ReviewImagerGallery";
import ReviewVoting from '@/components/modules/Review/ReviewVoting';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { getReviewById } from '@/services/Reviews';
import { Calendar, CheckCircle2, ExternalLink, ShoppingBag, Tag } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

// Loading component
function ReviewDetailSkeleton() {
	return (
		<div className="container mx-auto py-6 px-4 md:px-6 max-w-7xl animate-pulse">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2 space-y-6">
					<div className="space-y-4">
						<div className="h-6 bg-muted rounded w-24"></div>
						<div className="h-10 bg-muted rounded w-3/4"></div>
						<div className="flex items-center gap-2">
							<div className="h-8 w-8 bg-muted rounded-full"></div>
							<div className="h-5 bg-muted rounded w-32"></div>
						</div>
						<div className="h-5 bg-muted rounded w-40"></div>
					</div>
					<div className="aspect-video bg-muted rounded-lg"></div>
					<div className="space-y-4">
						<div className="h-4 bg-muted rounded w-full"></div>
						<div className="h-4 bg-muted rounded w-full"></div>
						<div className="h-4 bg-muted rounded w-3/4"></div>
					</div>
				</div>
				<div className="space-y-6">
					<div className="h-64 bg-muted rounded-lg"></div>
					<div className="h-64 bg-muted rounded-lg"></div>
				</div>
			</div>
		</div>
	);
}
interface IProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function ReviewDetailPage({ params }: IProps) {
	// Fetch review data
	const reveiwId = (await params)?.id;
	const { data: review, error } = await getReviewById(reveiwId);

	// console.log("rev
	//
	//
	// iew", review);
	// Handle error state
	if (error) {
		return (
			<div className="container mx-auto py-6 px-4 md:px-6 max-w-7xl">
				<Alert variant="destructive" className="mb-6">
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>Failed to load review: {error}</AlertDescription>
				</Alert>
				<Button asChild>
					<Link href="/reviews">Back to Reviews</Link>
				</Button>
			</div>
		);
	}

	// If no review found
	if (!review) {
		return (
			<div className="container mx-auto py-6 px-4 md:px-6 max-w-7xl">
				<Alert className="mb-6">
					<AlertTitle>Not Found</AlertTitle>
					<AlertDescription>The review you're looking for doesn't exist.</AlertDescription>
				</Alert>
				<Button asChild>
					<Link href="/reviews">Back to Reviews</Link>
				</Button>
			</div>
		);
	}
	// For demo purposes, using mock data for premium status
	// In a real app, this would come from the database or user session
	const isPremiumUnlocked = review.Payment && review.Payment.length > 0;

	// Split content to separate regular and premium sections
	const contentParts = review.description.split('PREMIUM CONTENT SECTION:');
	const regularContent = contentParts[0];
	const premiumContent = contentParts.length > 1 ? contentParts[1] : '';

	// Format comments from API response
	const formattedComments =
		review.comments?.map((comment: any) => ({
			id: comment.id,
			author: {
				id: comment.author.id,
				name: comment.author.name,
				avatar: comment.author.profileUrl || '/placeholder.svg?height=40&width=40',
			},
			content: comment.content,
			date: new Date(comment.createdAt || Date.now()).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			}),
		})) || [];

	// Use actual image URLs or placeholders
	const images =
		review.imageUrls && review.imageUrls.length > 0 ? review.imageUrls : ['/placeholder.svg?height=400&width=600'];

	return (
		<Suspense fallback={<ReviewDetailSkeleton />}>
			<div className="container mx-auto py-6 px-4 md:px-6 max-w-7xl">
				{/* Purchase Confirmation Alert (if premium is unlocked) */}

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-6">
						{/* Review Header */}
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<Badge variant="outline" className="px-3 py-1">
									<Tag className="w-3.5 h-3.5 mr-1" />
									{review.category?.name || 'Uncategorized'}
								</Badge>
								{/* <ShareButton reviewId={review.id} title={review.title} /> */}
							</div>

							{isPremiumUnlocked && review.isPremium && (
								<div className="flex items-center gap-2">
									<Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
										<CheckCircle2 className="w-3.5 h-3.5 mr-1" />
										Premium Unlocked
									</Badge>
								</div>
							)}

							<h1 className="text-2xl md:text-3xl font-bold">{review.title}</h1>

							<div className="flex flex-wrap items-center gap-4">
								<div className="flex items-center gap-2">
									<Avatar className="h-8 w-8">
										<AvatarImage
											src={review.author?.profileUrl || '/placeholder.svg?height=40&width=40'}
											alt={review.author?.name || ''}
										/>
										<AvatarFallback>{(review.author?.name || 'A')[0]}</AvatarFallback>
									</Avatar>
									<span className="font-medium">{review.author?.name || 'Anonymous'}</span>
								</div>

								<div className="flex items-center gap-2 text-muted-foreground">
									<Calendar className="w-4 h-4" />
									<span className="text-sm">
										{new Date(review.createdAt).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										})}
									</span>
								</div>
							</div>

							<div className="flex flex-wrap items-center gap-6">
								<div className="flex items-center">
									<div className="flex">
										{[1, 2, 3, 4, 5].map((star) => (
											<svg
												key={star}
												className={cn(
													'w-5 h-5',
													star <= Math.floor(review.rating)
														? 'text-yellow-400 fill-yellow-400'
														: star - 0.5 <= review.rating
															? 'text-yellow-400 fill-yellow-400'
															: 'text-gray-300 fill-gray-300',
												)}
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
											>
												<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
											</svg>
										))}
									</div>
									<span className="ml-2 font-medium">{review.rating.toFixed(1)}</span>
								</div>

								{review.purchaseSource && (
									<div className="flex items-center gap-1 text-sm">
										<ShoppingBag className="w-4 h-4" />
										<span>Purchased from:</span>
										{review.purchaseLink ? (
											<Link
												href={review.purchaseLink}
												className="text-primary flex items-center gap-0.5 hover:underline"
												target="_blank"
											>
												{review.purchaseSource}
												<ExternalLink className="w-3 h-3" />
											</Link>
										) : (
											<span>{review.purchaseSource}</span>
										)}
									</div>
								)}
							</div>
						</div>

						{/* Review Images */}
						{images && images.length > 0 && <ReviewImageGallery images={images} title={review.title} />}

						{/* Review Content */}
						<div className="space-y-6">
							{/* Regular Content */}
							<div className="prose max-w-none">
								<p>{regularContent}</p>
							</div>

							{/* Premium Content Section */}
							{premiumContent && isPremiumUnlocked && (
								<div className="relative">
									<div className="absolute inset-0 w-1 bg-primary rounded-full -left-4 hidden md:block" />
									<div className="bg-primary/5 border border-primary/10 rounded-lg p-6 relative">
										<Badge className="absolute -top-3 left-4 bg-primary text-primary-foreground">
											Premium Content
										</Badge>
										<div className="prose max-w-none mt-2">
											<p>{premiumContent}</p>
										</div>
									</div>
								</div>
							)}

							{/* Premium Content Locked */}
						</div>

						{/* Voting Section */}
						<ReviewVoting
							reviewId={review.id}
							initialVotes={{
								upvotes: review.totalUpVotes || 0,
								downvotes: review.totalDownVotes || 0,
							}}
							commentsCount={review.totalComments || 0}
						/>

						{/* Comments Section */}
						<ReviewComments reviewId={review.id} initialComments={formattedComments} />
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Author Card */}
						<Card>
							<CardHeader className="pb-3">
								<h3 className="text-lg font-semibold">About the Reviewer</h3>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center gap-3">
									<Avatar className="h-12 w-12">
										<AvatarImage
											src={review.author?.profileUrl || '/placeholder.svg?height=40&width=40'}
											alt={review.author?.name || ''}
										/>
										<AvatarFallback>{(review.author?.name || 'A')[0]}</AvatarFallback>
									</Avatar>
									<div>
										<h4 className="font-medium">{review.author?.name || 'Anonymous'}</h4>
										<p className="text-sm text-muted-foreground">Product Reviewer</p>
									</div>
								</div>
								<div className="text-sm text-muted-foreground">
									<p>
										Passionate about technology and gadgets. Sharing honest reviews to help others
										make informed decisions.
									</p>
								</div>
								{/* <Button variant="outline" className="w-full" asChild>
                  <Link href={`/profile/${review.author?.id}`}>View Profile</Link>
                </Button> */}
							</CardContent>
						</Card>

						{/* More Premium Reviews */}
						<Card>
							<CardHeader className="pb-3">
								<h3 className="text-lg font-semibold">More Premium Reviews</h3>
							</CardHeader>

							<CardFooter>
								<Button variant="outline" className="w-full" asChild>
									<Link href="/reviews?isPremium=true">Browse Premium Reviews</Link>
								</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</Suspense>
	);
}
