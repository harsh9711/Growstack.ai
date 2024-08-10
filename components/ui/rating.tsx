import React from "react";
import { BsStarFill } from "react-icons/bs";

export default function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array(rating)
        .fill(null)
        .map((_, index) => (
          <BsStarFill key={index} size={18} className="text-[#FFA800]" />
        ))}
      {Array(5 - rating)
        .fill(null)
        .map((_, index) => (
          <BsStarFill key={index} size={18} className="text-[#0347370D]" />
        ))}
    </div>
  );
}
