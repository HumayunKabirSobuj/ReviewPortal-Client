import CreateReviewManagement from '@/components/module/user-review/create-review-management';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';

export default function AddReviews() {
	return (
		<div className="p-[15px]">
			<Suspense
				fallback={
					<div className="w-full h-[100vh] flex items-center justify-center">
						<Loader className="w-[80px] h-12 animate-spin" />
					</div>
				}
			>
				<CreateReviewManagement />
			</Suspense>
		</div>
	);
}
