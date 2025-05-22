import UserDashboardSection from "@/components/module/user-review/user-dashboard";
import { getMyAllCommentsApi } from "@/services/UserDashboard/CommentServices";
import { getMyReviewsApi } from "@/services/UserDashboard/ReviewServices";
import { getMyAllVotesApi } from "@/services/UserDashboard/VoteServices";

const UserDashboard = async () => {
  const voteCount = (await getMyAllVotesApi()).data.length;
  const commentCount = (await getMyAllCommentsApi()).data.length;
  const ReviewsCount = (await getMyReviewsApi()).data.length;
  return (
    <UserDashboardSection voteCount={voteCount} commentCount={commentCount} ReviewsCount={ReviewsCount}/>
  );
};

export default UserDashboard;
