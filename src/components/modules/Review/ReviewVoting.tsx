'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { createVote } from '@/services/Reviews';
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface VotingProps {
	reviewId: string;
	initialVotes: {
		upvotes: number;
		downvotes: number;
	};
	commentsCount?: number;
}

export default function ReviewVoting({ reviewId, initialVotes, commentsCount = 0 }: VotingProps) {
	const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
	const [votes, setVotes] = useState(initialVotes);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleVote = async (type: 'up' | 'down') => {
		if (isSubmitting) return;

		const previousVote = userVote;
		const newVote = userVote === type ? null : type;

		setUserVote(newVote);
		setVotes((prev) => {
			const newVotes = { ...prev };

			// Remove previous vote if exists
			if (previousVote === 'up') newVotes.upvotes--;
			if (previousVote === 'down') newVotes.downvotes--;

			// Add new vote if not null
			if (newVote === 'up') newVotes.upvotes++;
			if (newVote === 'down') newVotes.downvotes++;

			return newVotes;
		});

		try {
			setIsSubmitting(true);

			if (newVote) {
				const response = await createVote(reviewId, newVote);

				if (!response.success) {
					throw new Error(response.error || 'Failed to update vote');
				}

				if (previousVote === null) {
					toast.success(`Vote recorded`, {
						description: `You ${newVote === 'up' ? 'upvoted' : 'downvoted'} this review.`,
					});
				} else {
					toast.success(`Vote changed`, {
						description: `Changed from ${previousVote === 'up' ? 'upvote' : 'downvote'} to ${newVote === 'up' ? 'upvote' : 'downvote'}.`,
					});
				}
			} else {
				toast.info(`Vote removed`, {
					description: `Your ${previousVote === 'up' ? 'upvote' : 'downvote'} has been removed.`,
				});
			}
		} catch (error) {
			console.error('Error submitting vote:', error);
			setUserVote(previousVote);
			setVotes(initialVotes);

			toast.error(`Voting failed`, {
				description: error instanceof Error ? error.message : 'Unable to process your vote. Please try again.',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="flex items-center justify-between py-4 border-t border-b">
			<div className="flex items-center gap-4">
				<Button
					variant="outline"
					size="sm"
					className={cn(
						'transition-all',
						userVote === 'up' && 'bg-primary/10 border-primary',
						isSubmitting && 'opacity-70 cursor-not-allowed',
					)}
					onClick={() => handleVote('up')}
					disabled={isSubmitting}
					aria-label="Upvote"
					title="Upvote this review"
				>
					<ChevronUp className={cn('w-4 h-4 mr-1', userVote === 'up' && 'text-primary fill-primary')} />
					<span className={cn(userVote === 'up' && 'text-primary font-medium')}>{votes.upvotes}</span>
				</Button>
				<Button
					variant="outline"
					size="sm"
					className={cn(
						'transition-all',
						userVote === 'down' && 'bg-primary/10 border-primary',
						isSubmitting && 'opacity-70 cursor-not-allowed',
					)}
					onClick={() => handleVote('down')}
					disabled={isSubmitting}
					aria-label="Downvote"
					title="Downvote this review"
				>
					<ChevronDown className={cn('w-4 h-4 mr-1', userVote === 'down' && 'text-primary fill-primary')} />
					<span className={cn(userVote === 'down' && 'text-primary font-medium')}>{votes.downvotes}</span>
				</Button>
			</div>
			<div className="text-sm text-muted-foreground flex items-center gap-1">
				<MessageSquare className="w-4 h-4" />
				{commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
			</div>
		</div>
	);
}
