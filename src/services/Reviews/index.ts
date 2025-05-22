/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export const getAllReviews = async (queryString: Promise<string>) => {
	// console.log("queryString", { queryString });
	try {
		const res = await fetch(
			//   `${process.env.NEXT_PUBLIC_BASE_API}/review?searchTerm=${searchQuery}&page=3&limit=1`,
			`${process.env.NEXT_PUBLIC_BASE_API}/review?${queryString}`,
			{
				next: {
					tags: ['ALL-REVIEWS'],
				},
			},
		);

		return await res.json();
	} catch (error: any) {
		return Error(error);
	}
};
export const getAllPublishedReviews = async (queryString: Promise<string>) => {
	// console.log("queryString", { queryString });
	try {
		const res = await fetch(
			//   `${process.env.NEXT_PUBLIC_BASE_API}/review?searchTerm=${searchQuery}&page=3&limit=1`,
			`${process.env.NEXT_PUBLIC_BASE_API}/review?isPublished=true&${queryString}`,
			{
				next: {
					tags: ['ALL-REVIEWS'],
				},
			},
		);

		return await res.json();
	} catch (error: any) {
		return Error(error);
	}
};

export async function getReviewById(id: string) {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review/${id}`, {
			method: 'GET',
			headers: {
				Authorization: ` ${(await cookies()).get('accessToken')!.value}`,
			},
			next: {
				tags: ['reviews'],
			},
		});

		const data = await response.json();
		return { data: data.data, error: null };
	} catch (error) {
		console.error('Error fetching review:', error);
		return {
			data: null,
			error: error instanceof Error ? error.message : 'Unknown error',
		};
	}
}

export const pendingReviews = async () => {
	//   console.log({ searchQuery });
	try {
		const res = await fetch(
			//   `${process.env.NEXT_PUBLIC_BASE_API}/review?searchTerm=${searchQuery}&page=3&limit=1`,
			`${process.env.NEXT_PUBLIC_BASE_API}/review/pending-reviews`,
			{
				method: 'GET',
				headers: {
					Authorization: ` ${(await cookies()).get('accessToken')!.value}`,
				},
			},
		);

		const result = await res.json();
		// console.log(result);
		return result;
	} catch (error: any) {
		return Error(error);
	}
};

export async function createVote(reviewId: string, voteType: 'up' | 'down') {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/vote/create-vote`, {
			method: 'POST',
			headers: {
				Authorization: ` ${(await cookies()).get('accessToken')!.value}`,
				'Content-Type': 'Application/json',
			},

			body: JSON.stringify({
				reviewId,
				type: voteType === 'up' ? 'UP' : 'DOWN',
			}),
		});
		revalidateTag('reviews');
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || 'Failed to create vote');
		}

		return { success: true, data, error: null };
	} catch (error) {
		console.error('Error creating vote:', error);
		return {
			success: false,
			data: null,
			error: error instanceof Error ? error.message : 'Unknown error',
		};
	}
}

export async function createComment(reviewId: string, content: string) {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/comment/create-comment`, {
			method: 'POST',
			headers: {
				Authorization: ` ${(await cookies()).get('accessToken')!.value}`,
				'Content-Type': 'Application/json',
			},

			body: JSON.stringify({
				reviewId,
				content,
			}),
		});
		revalidateTag('reviews');
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || 'Failed to create comment');
		}

		return { success: true, data, error: null };
	} catch (error) {
		console.error('Error creating comment:', error);
		return {
			success: false,
			data: null,
			error: error instanceof Error ? error.message : 'Unknown error',
		};
	}
}

export const approveReviewApi = async (id: string) => {
	const accessToken = (await cookies()).get('accessToken')?.value;
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review/make-review-published/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${accessToken}`,
			},
		});
		revalidateTag('ALL-REVIEW');
		const result = await res.json();

		return result;
	} catch (error) {
		console.log(error);
	}
};
