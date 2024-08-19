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
  const handleRating = (rating: number) => {
    switch (rating) {
      case 1:
        return "bg-myTheme-ratingRed";
      case 2:
        return "bg-myTheme-ratingOrange";
      case 3:
        return "bg-myTheme-ratingYellow";
      case 4:
        return "bg-myTheme-ratingLightGreen";
      case 5:
        return "bg-myTheme-ratingGreen";
    }
  };
  return (
    <div className="flex flex-grow-0">
      <div
        className={` w-auto rating gap-1 ${size} items-center justify-center  p-1 rounded-md `}
      >
        <input
          type="radio"
          name={name}
          value={5}
          className={` mask mask-star ${handleRating(rating)} `}
          checked={rating === 5}
          onChange={() => { }}
        />
      </div>
    </div>
  );
};

export default RatingModule;
