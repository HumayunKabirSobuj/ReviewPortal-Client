import ManageCommentClient from "@/components/module/user-review/manage-comment";
import { getMyAllCommentsApi } from "@/services/UserDashboard/CommentServices";
import { Loader } from "lucide-react";
import { Suspense } from "react";

export default async function ManageCommentSection() {
  const comments = (await getMyAllCommentsApi()).data;
  return (
    <div className="p-[15px]">
      <Suspense
        fallback={
          <div className="w-full h-[100vh] flex items-center justify-center">
            <Loader className="w-[80px] h-12 animate-spin" />
          </div>
        }
      >
        <ManageCommentClient comments={comments} />
      </Suspense>
    </div>
  );
}
