/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Camera, Loader2, Star, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// Define the form schema with validation
const reviewFormSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(100, { message: "Title must not exceed 100 characters" }),
  description: z
    .string()
    .min(50, { message: "Description must be at least 50 characters" })
    .max(5000, { message: "Description must not exceed 5000 characters" }),
  rating: z.coerce
    .number()
    .min(1, { message: "Please provide a rating" })
    .max(5),
  purchaseSource: z.string().optional(),
  excerp: z
    .string()
    .min(10, { message: "Summary must be at least 10 characters" })
    .max(200, { message: "Summary must not exceed 200 characters" }),
  categoryId: z.string({ required_error: "Please select a category" }),
  pros: z.string().optional(),
  cons: z.string().optional(),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

// Mock categories - in a real app, you would fetch these from your API
const categories = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Fashion" },
  { id: "3", name: "Books" },
  { id: "4", name: "Home & Kitchen" },
  { id: "5", name: "Beauty" },
  { id: "6", name: "Sports & Outdoors" },
  { id: "7", name: "Toys & Games" },
  { id: "8", name: "Automotive" },
];

interface ReviewFormProps {
  initialData?: ReviewFormValues;
  isEditing?: boolean;
}

export function ReviewForm({
  initialData,
  isEditing = false,
}: ReviewFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Initialize the form with default values or editing values
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      rating: 5,
      purchaseSource: "",
      excerp: "",
      categoryId: "",
      pros: "",
      cons: "",
    },
  });

  // Handle form submission
  async function onSubmit(data: ReviewFormValues) {
    setIsSubmitting(true);

    try {
      // In a real app, you would send this data to your API
      console.log("Form data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success toast

      // Redirect after successful submission
      router.push("/reviews");
      router.refresh();
    } catch (error) {}
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form completion percentage
  const formValues = form.getValues();
  const requiredFields = [
    "title",
    "description",
    "rating",
    "excerp",
    "categoryId",
  ];
  const completedFields = requiredFields.filter(
    (field) => formValues[field as keyof ReviewFormValues],
  );
  const completionPercentage = Math.round(
    (completedFields.length / requiredFields.length) * 100,
  );

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              {isEditing ? "Edit Review" : "Write a Review"}
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              Share your experience and help others make informed decisions
            </CardDescription>
          </div>
          <div className="hidden md:block">
            <div className="bg-white rounded-full p-1 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="relative w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-gray-600">
                  {completionPercentage}% complete
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs
          defaultValue="details"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="details">Basic Details</TabsTrigger>
            <TabsTrigger value="content">Review Content</TabsTrigger>
            <TabsTrigger value="media">Media & Extras</TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TabsContent value="details" className="space-y-6 mt-0">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter a descriptive title for your review"
                            className="border-gray-300 focus:border-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500 text-xs">
                          A concise but descriptive title for your review
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Category
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-gray-300 focus:border-blue-500">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Rating</FormLabel>
                      <FormControl>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                          {/* <StarRating value={field.value} onChange={field.onChange} size="lg" /> */}
                        </div>
                      </FormControl>
                      <FormDescription className="text-gray-500 text-xs">
                        Rate the product from 1 to 5 stars
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="purchaseSource"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Purchase Source (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Where you purchased the item (store, website, etc.)"
                          className="border-gray-300 focus:border-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500 text-xs">
                        Specify where you purchased the product
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setActiveTab("content")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Next: Review Content
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-6 mt-0">
                <FormField
                  control={form.control}
                  name="excerp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Summary</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write a brief summary of your review"
                          className="resize-none border-gray-300 focus:border-blue-500"
                          rows={2}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500 text-xs">
                        This will be displayed in review listings
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="pros"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Pros (Optional)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What did you like about the product?"
                            className="resize-none border-gray-300 focus:border-blue-500 h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cons"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Cons (Optional)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What could be improved?"
                            className="resize-none border-gray-300 focus:border-blue-500 h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Detailed Review
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your experience in detail"
                          className="resize-none border-gray-300 focus:border-blue-500"
                          rows={8}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500 text-xs">
                        Include details about quality, usage experience, pros
                        and cons, etc.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab("details")}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setActiveTab("media")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Next: Add Media
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-6 mt-0">
                <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300">
                  <div className="text-center">
                    <Camera className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <h3 className="text-gray-700 font-medium mb-1">
                      Add Photos
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      Upload photos of the product to enhance your review
                    </p>

                    <div className="flex justify-center mb-4">
                      <label className="cursor-pointer">
                        <div className="bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition flex items-center gap-2">
                          <Upload className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">
                            Upload Images
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>

                    {imagePreview && (
                      <div className="mt-4">
                        <div className="relative w-32 h-32 mx-auto">
                          <Image
                            height={400}
                            width={400}
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-md border border-gray-200"
                          />
                          <button
                            type="button"
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600"
                            onClick={() => setImagePreview(null)}
                          >
                            <span className="sr-only">Remove</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">
                      Review Guidelines
                    </h4>
                    <p className="text-xs text-blue-600 mt-1">
                      Please ensure your review is honest, respectful, and
                      helpful. Avoid including personal information or offensive
                      language. Reviews that don't meet our guidelines may not
                      be published.
                    </p>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab("content")}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isEditing ? "Update Review" : "Submit Review"}
                  </Button>
                </div>
              </TabsContent>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  );
}
