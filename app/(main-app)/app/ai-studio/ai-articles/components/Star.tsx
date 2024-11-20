import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  score: number;
  size?: number;
}

export function StarRating({ score, size = 48 }: StarRatingProps) {
  const percentage = (score / 10) * 100;

  return (
    <div className="relative w-fit">
      <Star
        size={size}
        className="text-gray-200"
        strokeWidth={1.5}
        fill="currentColor"
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          width: `${percentage}%`,
          left: 0,
        }}
      >
        <Star
          size={size}
          className="text-amber-400"
          strokeWidth={1.5}
          fill="currentColor"
        />
      </div>
    </div>
  );
}
