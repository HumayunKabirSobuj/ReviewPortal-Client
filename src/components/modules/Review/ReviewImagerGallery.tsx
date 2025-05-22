"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ReviewImageGalleryProps {
  images: string[];
  title: string;
}

export default function ReviewImageGallery({
  images,
  title,
}: ReviewImageGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="relative aspect-video overflow-hidden rounded-lg border">
        <Image
          src={images[activeImageIndex] || "/placeholder.svg"}
          alt={`Image ${activeImageIndex + 1} for ${title}`}
          fill
          className="object-cover"
          priority={activeImageIndex === 0}
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={cn(
                "relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all",
                activeImageIndex === index
                  ? "border-primary"
                  : "border-transparent hover:border-primary/50",
              )}
              onClick={() => setActiveImageIndex(index)}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
