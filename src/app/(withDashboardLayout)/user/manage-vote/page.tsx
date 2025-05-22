import ManageVoteClient from "@/components/module/user-review/manage-vote";
import { getMyAllVotesApi } from "@/services/UserDashboard/VoteServices";
import { Loader } from "lucide-react";
import { Suspense } from "react";

export default async function ManageVoteSection() {
  const votes = (await getMyAllVotesApi()).data;
  return (
    <div className="p-[15px]">
      <Suspense
        fallback={
          <div className="w-full h-[100vh] flex items-center justify-center">
            <Loader className="w-[80px] h-12 animate-spin" />
          </div>
        }
      >
        <ManageVoteClient votes={votes} />
      </Suspense>
    </div>
  );
}
