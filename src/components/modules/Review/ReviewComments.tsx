/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useUser } from "@/components/context/UserContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "@/services/Reviews";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
}

interface ReviewCommentsProps {
  reviewId: string;
  initialComments: Comment[];
}

export default function ReviewComments({
  reviewId,
  initialComments,
}: ReviewCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  // Mock current user - in a real app, this would come from auth context
  const currentUser = {
    id: user?.id as string,
    name: user?.name as string,
    avatar: `${user?.profileUrl}?height=40&width=40`,
  };

  const handleComment = async () => {
    if (commentText.trim() === "") return;

    setIsSubmitting(true);

    try {
      const response = await createComment(reviewId, commentText);

      if (!response.success) {
        throw new Error(response.error || "Failed to post comment");
      }

      // Create a new comment with the response data
      const newComment: Comment = {
        id: response.data.id || `temp-${Date.now()}`,
        author: currentUser,
        content: commentText,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };

      setComments([newComment, ...comments]);
      setCommentText("");

      toast.success("Comment posted", {
        description: "Your comment has been posted successfully.",
      });
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Error", {
        description:
          error instanceof Error
            ? error.message
            : "Failed to post your comment. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      //   const response = await deleteComment(commentId)

      //   if (!response.success) {
      //     throw new Error(response.error || "Failed to delete comment")
      //   }

      //   // Remove the comment from the list
      //   setComments(comments.filter((comment) => comment.id !== commentId))

      toast.success("Comment deleted", {
        description: "Your comment has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Error", {
        description:
          error instanceof Error
            ? error.message
            : "Failed to delete your comment. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Comments ({comments.length})</h2>

      {/* Comment Form */}
      <div className="space-y-4">
        <Textarea
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="min-h-[100px]"
          disabled={isSubmitting}
        />
        <div className="flex justify-end">
          <Button
            onClick={handleComment}
            disabled={commentText.trim() === "" || isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-center text-muted-foreground py-6">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="space-y-2 border-b pb-4">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={comment.author.avatar || "/placeholder.svg"}
                    alt={comment.author.name}
                  />
                  <AvatarFallback>
                    {comment.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{comment.author.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {comment.date}
                      </span>
                    </div>
                    {comment.author.id === currentUser.id && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild></AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Comment</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this comment? This
                              action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteComment(comment.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
