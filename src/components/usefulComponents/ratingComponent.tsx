/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Heading1, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RatingComponent({
	max = 5,
	value,
	selectable,
	setRating,
}: {
	max?: number;
	selectable: boolean;
	value: number;
	setRating: React.Dispatch<React.SetStateAction<number>>;
}) {
	const [activeStatus, setActiveStatus] = useState<number | null>(null);

	return (
		<div className="flex gap-1">
			{Array.from({ length: max }, (_, i) => {
				const contained = (activeStatus ?? value) > i;
				return selectable === true ? (
					<span
						key={i}
						onClick={() => setRating(Number(i + 1))}
						onMouseEnter={() => setActiveStatus(i + 1)}
						onMouseLeave={() => setActiveStatus(null)}
					>
						<Star
							fill={contained ? 'currentColor' : 'none'}
							className={contained ? 'text-yellow-400' : 'text-gray-400'}
						/>
					</span>
				) : (
					<span key={i}>
						<Star
							fill={contained ? 'currentColor' : 'none'}
							className={contained ? 'text-yellow-400' : 'text-gray-400'}
						/>
					</span>
				);
			})}
		</div>
	);
}
