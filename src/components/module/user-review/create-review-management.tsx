'use client';

import CreateReviewComponent from './create-review';

export default function CreateReviewManagement() {
	return <CreateReviewComponent review={null} mode="create" setOpen={() => console.log('create')} />;
}
