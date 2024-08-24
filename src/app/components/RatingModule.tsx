"use client";
import React from "react";

const RatingModule: React.FC<{
  name: string;
  rating: number;
  ratingChanged: (rating: number) => void;
  size: string;
}> = ({ name, rating = 1, ratingChanged, size = "rating-lg" }) => {
  const ratingColors = [
    "text-red-500 hover:text-red-600",
    "text-orange-500 hover:text-orange-600",
    "text-yellow-500 hover:text-yellow-600",
    "text-lime-500 hover:text-lime-600",
    "text-green-500 hover:text-green-600",
  ];

  const getRatingColor = (value: number) => ratingColors[value - 1] || ratingColors[0];

  return (
    <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <label key={value} className={`cursor-pointer ${size}`}>
          <input
            type="radio"
            name={name}
            value={value}
            checked={rating === value}
            onChange={() => ratingChanged(value)}
            className="hidden"
          />
          <svg
            className={`w-6 h-6 transition-colors ${value <= rating ? getRatingColor(value) : "text-gray-300 hover:text-gray-400"
              }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </label>
      ))}
    </div>
  );
};

export default RatingModule;
