"use client";
import React from "react";

const RatingModule = ({
  name,
  rating = 1,
  ratingChanged,
  size = "rating-lg",
}: {
  name: string;
  rating: number;
  ratingChanged: (rating: number) => void;
  size: string;
}) => {
  const customRed = "bg-red-600";
  const customOrange = "bg-orange-500";
  const customYellow = "bg-yellow-500";
  const customLightGreen = "bg-lime-500";
  const customGreen = "bg-green-500";

  // depending on the rating change the input bg color

  const handleRating = (rating: number) => {
    switch (rating) {
      case 1:
        return customRed;
      case 2:
        return customOrange;
      case 3:
        return customYellow;
      case 4:
        return customLightGreen;
      case 5:
        return customGreen;
    }
  };
  return (
    <div className="flex flex-grow-0">
      <div
        className={` w-auto rating gap-1 ${size} items-center justify-center  p-1 rounded-md dark:bg-myTheme-niceBlack `}
      >
        <input
          type="radio"
          name={name}
          value={5}
          className={` mask mask-star ${handleRating(rating)} `}
          checked={rating === 5}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

export default RatingModule;
