/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import RatingComponent from '@/components/usefulComponents/ratingComponent';
import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { categoryList, reviewDtlOne, reviewDtlType } from '@/components/types/add-review';
import { createUserReview, getAllCategories, updateUserReview } from '@/services/UserDashboard/ReviewServices';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader, Loader2 } from 'lucide-react';
import Image from 'next/image';
import RatingComponent from '@/components/usefulComponents/ratingComponent';

const formSchemaPartOne = z.object({
	title: z.string().min(1, {
		message: 'Title cannot be empty!.',
	}),
	description: z.string().min(1, {
		message: 'Description cannot be empty!.',
	}),
	excerp: z.string().min(1, {
		message: 'Short description cannot be empty!.',
	}),
	categoryId: z.string().min(1, {
		message: 'Category cannot be empty!.',
	}),
	purchaseSource: z.string().optional(),
	isPremium: z.boolean(),
	price: z.string().optional(),
	isPublished: z.boolean(),
	rating: z.number().default(0).optional(),
});

export default function CreateReviewComponent({
	review,
	mode,
	setOpen,
}: {
	review: reviewDtlType | null;
	mode: 'create' | 'edit';
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const { control, register, handleSubmit, watch, reset } = useForm();
	// const [ratingNumber, setRatingNumber] = useState(0);
	const [imageLinks, setImageLinks] = useState<string[]>([]);
	const [premiumChecked, setPremiumChecked] = useState(false);
	const [getView, setGetView] = useState<string[]>([]);
	const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
	const [allCategories, setAllCategories] = useState<categoryList[]>([]);
	const imgFileInputRef = useRef<HTMLInputElement>(null);
	const [loader, setLoader] = useState<boolean>(false);

	const [ratingValue, setRatingValue] = useState<number>(0);

	useEffect(() => {
		getAllCategoriesApiCall();
		if (mode === 'edit') {
			updateStateToUpdateReview();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mode]);

	const updateStateToUpdateReview = () => {
		if (Number(review?.price) > 0) {
			setPremiumChecked(true);
		} else {
			setPremiumChecked(false);
		}
		if (review !== null) {
			setGetView(review.imageUrls);
			setImageLinks(review.imageUrls);
			setRatingValue(review.rating);
		}
	};

	const getAllCategoriesApiCall = async () => {
		try {
			setLoader(true);
			const res = await getAllCategories();
			setLoader(false);
			if (res?.success) {
				setAllCategories(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const ImgChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setDisableSubmit(true);
		const files = e.target.files;
		if (!files) return;

		const fileArray = Array.from(files);
		const formData = new FormData();

		formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!);
		formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!);

		let images: string[] = [];
		try {
			await Promise.all(
				fileArray.map(async (image) => {
					formData.append(`file`, image);
					const res = await fetch(
						`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
						{
							method: 'POST',
							body: formData,
						},
					);
					const resp = await res.json();
					images.push(resp.secure_url);
				}),
			);

			setImageLinks(images);
			setDisableSubmit(false);
		} catch (err) {
			console.log(err);
		}

		const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
		setGetView(previewUrls);
	};

	const formOne =
		mode === 'create'
			? useForm<z.infer<typeof formSchemaPartOne>>({
					resolver: zodResolver(formSchemaPartOne),
					defaultValues: {
						title: '',
						description: '',
						excerp: '',
						categoryId: '',
						purchaseSource: '',
						isPremium: false,
						price: '',
						isPublished: false,
					},
				})
			: useForm<z.infer<typeof formSchemaPartOne>>({
					resolver: zodResolver(formSchemaPartOne),
					defaultValues: {
						title: review?.title,
						description: review?.description,
						excerp: review?.excerp,
						categoryId: review?.categoryId,
						purchaseSource: review?.purchaseSource,
						isPremium: review?.isPremium,
						price: String(review?.price),
						isPublished: review?.isPublished,
					},
				});

	const onSubmitOne = async (data: any) => {
		let toastId: string | number = 'updateProfile';
		toastId = toast.loading('...Loading', { id: toastId });
		try {
			const jsonData = {
				...data,
				imageUrls: imageLinks,
				price: Number(data.price),
				rating: ratingValue,
			};

			console.log('json data', jsonData);

			let res;
			if (mode === 'edit') {
				const reviewId = (review !== null ? review.id : null) as string;
				res = await updateUserReview(jsonData, reviewId);
			} else {
				res = await createUserReview(jsonData);
			}
			if (res?.success) {
				formOne.reset({
					title: '',
					description: '',
					excerp: '',
					categoryId: '',
					purchaseSource: '',
					isPremium: false,
					price: '',
					isPublished: false,
				});
				setGetView([]);
				setImageLinks([]);
				setRatingValue(0);
				if (mode === 'edit') {
					setOpen(false);
				}
				imgFileInputRef.current?.value && (imgFileInputRef.current.value = '');
				toast.success(res?.message, { id: toastId });
			} else {
				toast.error(res?.message, { id: toastId });
				console.log(res);
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div className="p-[15px]">
			{!allCategories.length && !loader && (
				<div className="col-span-full text-center py-12 bg-card rounded-lg border shadow-sm">
					<h3 className="text-lg font-medium mb-2">No category available</h3>
					<p className="text-muted-foreground mb-4">Try adding some categories first</p>
				</div>
			)}
			{loader === true && (
				<div className="w-full h-[100vh] flex items-center justify-center">
					<Loader className="w-[80px] h-12 animate-spin" />
				</div>
			)}
			{!allCategories.length && (
				<div className="col-span-full text-center py-12 bg-card rounded-lg border shadow-sm">
					<h3 className="text-lg font-medium mb-2">No category available</h3>
					<p className="text-muted-foreground mb-4">Try adding some categories first</p>
				</div>
			)}
			{allCategories && allCategories.length > 0 && (
				<form onSubmit={formOne.handleSubmit(onSubmitOne)}>
					<Card className="w-full ">
						<CardHeader className="space-y-2">
							<div className="w-full">
								<CardTitle> {review === null ? 'Write' : 'Edit'} a review</CardTitle>
								<CardDescription>
									Share your experience and help others to make informed decisions
								</CardDescription>
							</div>
						</CardHeader>
						<CardContent>
							<Form {...formOne}>
								<div className="space-y-1 mb-4">
									<FormField
										control={formOne.control}
										name="title"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Title</FormLabel>
												<FormControl>
													<Input placeholder="Add a title" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="space-y-1 mb-4">
									<FormField
										control={formOne.control}
										name="description"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Description</FormLabel>
												<FormControl>
													<Input placeholder="Add a title" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="space-y-1 mb-4">
									<FormField
										control={formOne.control}
										name="excerp"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Short Description</FormLabel>
												<FormControl>
													<Input placeholder="Write a short description" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="space-y-1 mb-4">
									<Label htmlFor="multi-image">Rating</Label>
									<RatingComponent
										max={5}
										selectable={true}
										value={ratingValue}
										setRating={setRatingValue}
									/>
								</div>
								<div className="space-y-1 mb-4">
									<FormField
										control={formOne.control}
										name="purchaseSource"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Purchase Link</FormLabel>
												<FormControl>
													<Input placeholder="Add purchase link" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="mb-4">
									<FormField
										control={formOne.control}
										name="categoryId"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Category</FormLabel>
												<FormControl>
													<Select onValueChange={field.onChange} defaultValue={field.value}>
														<SelectTrigger>
															<SelectValue placeholder="Select Category" />
														</SelectTrigger>
														<SelectContent>
															{allCategories &&
																allCategories.length > 0 &&
																allCategories.map((item, index) => (
																	<SelectItem value={item.id} key={index}>
																		{item.name}
																	</SelectItem>
																))}
														</SelectContent>
													</Select>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="flex items-center space-x-2 mb-4">
									<Controller
										name="isPremium"
										control={formOne.control}
										defaultValue={false}
										render={({ field }) => (
											<Checkbox
												id="paid"
												checked={field.value}
												onCheckedChange={(checked) => {
													field.onChange(checked); // Update form value
													setPremiumChecked(checked as boolean); // Update local state
												}}
											/>
										)}
									/>
									<label
										htmlFor="paid"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										Mark as Premium
									</label>
								</div>
								{premiumChecked && (
									<div className="space-y-1 mb-4">
										<FormField
											control={formOne.control}
											name="price"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Price</FormLabel>
													<FormControl>
														<Input type="number" placeholder="Enter price" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								)}

								{/* <div className="flex items-center space-x-2 mb-4">
									<Controller
										name="isPublished"
										defaultValue={false}
										control={formOne.control}
										render={({ field }) => (
											<Checkbox
												id="publish"
												checked={field.value}
												onCheckedChange={(checked) => {
													field.onChange(checked); // Update form value
												}}
											/>
										)}
									/>
									<label htmlFor="publish" className="text-sm font-medium leading-none ">
										Publish
									</label>
								</div> */}
								<div className="flex flex-col gap-4">
									<Label htmlFor="multi-image">Upload Images</Label>
									<Input
										id="multi-image"
										type="file"
										ref={imgFileInputRef}
										accept="image/*"
										onChange={ImgChangeHandler}
									/>
									{disableSubmit && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

									{getView.length > 0 && !disableSubmit && (
										<div className="flex gap-2 flex-wrap">
											{getView.map((src, idx) => (
												<Image
													height={400}
													width={400}
													key={idx}
													src={src}
													alt={`Preview ${idx}`}
													className="w-24 h-24 object-cover rounded-md border"
												/>
											))}
										</div>
									)}

									{/* <Button onClick={handleUpload} disabled={getView.length === 0} className="w-[150px]">
            Upload Image
        </Button> */}
								</div>
								{/* <UploadMultipleImages setImageLinks={setImageLinks} /> */}
								{/* <RatingComponent value={ratingNumber} onChange={setRatingNumber} /> */}
							</Form>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button disabled={disableSubmit}>Submit</Button>
						</CardFooter>
					</Card>
				</form>
			)}
		</div>
	);
}
