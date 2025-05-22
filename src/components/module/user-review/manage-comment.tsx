/* eslint-disable prefer-const */
"use client";

import { commentType } from "@/components/types/add-review";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { deleteCommentApi } from "@/services/UserDashboard/CommentServices";
import { CircleX, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ManageCommentClient({
  comments,
}: {
  comments: commentType[];
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [commentDtl, setCommentDtl] = useState<commentType>({
    id: "",
    content: "",
    userId: "",
    reviewId: "",
    createdAt: "",
    review: {
      title: "",
      excerp: "",
      description: "",
    },
  });

  const deleteUserComment = async (comment: commentType) => {
    try {
      let toastId = toast.loading("...Deleting", { id: 1 });
      const res = await deleteCommentApi(comment.id);
      if (res?.success) {
        toast.success(res.message, { id: toastId });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openDrawer = (comment: commentType) => {
    setOpen(true);
    setCommentDtl(comment);
  };

  return (
    <>
      <Card>
        <Drawer direction={"right"} open={open} onOpenChange={setOpen}>
          <DrawerContent className="min-w-xl overflow-y-auto overflow-x-hidden p-[15px]">
            <div className="mx-auto w-full max-w-2xl">
              <DrawerHeader>
                <div className="flex justify-between">
                  <DrawerTitle>View Comment Detail</DrawerTitle>
                  <DrawerClose>
                    <CircleX />
                  </DrawerClose>
                </div>
              </DrawerHeader>
              <div className="pt-4 pb-0">
                <div className="">
                  {/* {mode === 'view' && <ViewReviewComponent review={reviewDtl} />} */}
                  <Card className="w-full border-none">
                    <CardContent>
                      <div className="space-y-1 mb-4 flex ">
                        <label htmlFor="" className="w-[130px]">
                          Review Title
                        </label>
                        <p className="text-gray-500 w-[calc(100%-130px)]">
                          {commentDtl.review.title}
                        </p>
                      </div>

                      <div className="space-y-1 mb-4 flex">
                        <label htmlFor="" className=" w-[130px]">
                          Description
                        </label>
                        <p className="text-gray-500 w-[calc(100%-130px)]">
                          {commentDtl.review.description}
                        </p>
                      </div>
                      <div className="space-y-1 mb-4 flex ">
                        <label htmlFor="" className="w-[130px]">
                          Comment
                        </label>
                        <p className="text-gray-500 w-[calc(100%-130px)]">
                          {commentDtl.content}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
        <CardHeader className="space-y-2">
          <div className="w-full">
            <CardTitle>Manage your comments</CardTitle>
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
                    Review Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comment
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                    Actions
                  </th>
                </tr>
              </thead>
              {/* bg-gray-200 */}
              <tbody className="bg-white divide-y divide-gray-200">
                {comments.map((comment, index) => (
                  <tr key={index} className={`hover:bg-gray-50 `}>
                    <td className="px-4 py-3 text-sm font-medium">
                      <div className="flex flex-col">
                        <span className="truncate max-w-[200px]">
                          {comment.review.title}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {comment.content || "Untitled"}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-500"
                          title="View"
                          onClick={() => openDrawer(comment)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          title="Delete"
                          onClick={() => deleteUserComment(comment)}
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
      </Card>
    </>
  );
}
