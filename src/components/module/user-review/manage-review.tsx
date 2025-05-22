/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
'use client';

import { reviewDtlType } from '@/components/types/add-review';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { deleteUserReviewApi } from '@/services/UserDashboard/ReviewServices';
import { CircleX, Edit, Eye, Loader, Trash2 } from 'lucide-react';
import { useState } from 'react';
import CreateReviewComponent from './create-review';
import ViewReviewComponent from './sub-component/view-review';
import { toast } from 'sonner';

export default function UserReviewManagement({ reviews }: { reviews: reviewDtlType[] }) {
	// const [allReviews, setAllReviews] = useState<reviewDtlType[]>([]);
	const [open, setOpen] = useState<boolean>(false);
	const [mode, setMode] = useState<string>('view');
	const [reviewDtl, setReviewDtl] = useState<reviewDtlType>({
		id: '',
		title: '',
		description: '',
		rating: 0,
		purchaseSource: '',
		imageUrls: [],
		excerp: '',
		isPremium: false,
		price: 0,
		isPublished: false,
		userId: '',
		categoryId: '',
		author: {
			id: '',
			name: '',
			email: '',
			profileUrl: null,
		},
		category: {
			id: '',
			name: '',
		},
	});

	const deleteUserReview = async (review: reviewDtlType) => {
		try {
			let toastId = toast.loading('...Deleting', { id: 1 });
			const res = await deleteUserReviewApi(review.id);
			if (res?.success) {
				toast.success(res.message, { id: toastId });
			}
		} catch (err) {
			console.log(err);
		}
	};

	const openDrawer = (review: reviewDtlType, mode: string) => {
		setOpen(true);
		setReviewDtl(review);
		setMode(mode);
	};

	return (
		<Card className="w-full ">
			{!reviews.length && (
				// <div className="w-full h-[100vh] flex items-center justify-center">
				// 	<Loader className="w-[80px] h-12 animate-spin" />
				// </div>
				<div className="w-2/3 mx-auto border-2 p-[25px] border-red-500 bg-red-300 lg:h-[150px] rounded-4xl flex items-center justify-center">
					<h1 className="lg:text-3xl">No Reviews to display!</h1>
				</div>
			)}
			{reviews.length > 0 && (
				<>
					{' '}
					<Drawer direction={'right'} open={open} onOpenChange={setOpen}>
						<DrawerContent className="min-w-3xl overflow-y-auto overflow-x-hidden">
							<div className="mx-auto w-full max-w-2xl">
								<DrawerHeader>
									<div className="flex justify-between">
										<DrawerTitle>{mode === 'view' ? 'View' : 'Edit'} Review Detail </DrawerTitle>
										<DrawerClose>
											<CircleX />
										</DrawerClose>
									</div>
								</DrawerHeader>
								<div className="pt-4 pb-0">
									<div className="">
										{mode === 'view' && <ViewReviewComponent review={reviewDtl} />}
										{mode === 'edit' && (
											<CreateReviewComponent review={reviewDtl} mode="edit" setOpen={setOpen} />
										)}
									</div>
								</div>
							</div>
						</DrawerContent>
					</Drawer>
					<CardHeader className="space-y-2">
						<div className="w-full">
							<CardTitle>Manage your review</CardTitle>
							<CardDescription>
								Share your experience and help others to make informed decisions
							</CardDescription>
						</div>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Title
										</th>
										<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Author
										</th>
										<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Category
										</th>
										<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Rating
										</th>
										<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Premium
										</th>

										<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{reviews.map((review, index) => (
										<tr
											key={index}
											className={`hover:bg-gray-50 ${
												reviewDtl.id === review.id ? 'bg-gray-200' : ''
											}`}
										>
											<td className="px-4 py-3 text-sm font-medium">
												<div className="flex flex-col">
													<span className="truncate max-w-[200px]">
														{review.title || 'Untitled'}
													</span>
													<span className="text-xs text-gray-500 truncate max-w-[200px]">
														{review.excerp || 'some data'}
													</span>
												</div>
											</td>
											<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
												{review.author.name || 'Unknown'}
											</td>

											<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
												{review.category.name || 'Uncategorized'}
											</td>
											<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
												{review.rating || 0}
											</td>
											<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
												<Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
													{review.isPremium === true ? 'Paid' : 'General'}
												</Badge>
											</td>

											<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
												<div className="flex space-x-1">
													<Button
														variant="ghost"
														size="icon"
														className="h-8 w-8 text-blue-500"
														title="View"
														onClick={() => openDrawer(review, 'view')}
													>
														<Eye className="h-4 w-4" />
													</Button>

													<Button
														variant="ghost"
														size="icon"
														className="h-8 w-8 text-green-500"
														title="Edit"
														onClick={() => openDrawer(review, 'edit')}
													>
														<Edit className="h-4 w-4" />
													</Button>

													<Button
														variant="ghost"
														size="icon"
														className="h-8 w-8 text-red-500"
														title="Delete"
														onClick={() => deleteUserReview(review)}
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</CardContent>
				</>
			)}
		</Card>
	);
}
