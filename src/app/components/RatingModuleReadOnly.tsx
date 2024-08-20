"use client";
import React from "react";

const RatingModule = ({
  name,
  rating = 1,
  // ratingChanged = () => { },
  size = "rating-lg",
}: {
  name: string;
  rating: number;
  // ratingChanged: (rating: number) => void;
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
        className={` w-auto rating gap-1 ${size} items-center justify-center  p-1 rounded-md bg-gray-700 `}
      >
        <input
          type="radio"
          name={name}
          value={1}
          className={` mask mask-star ${handleRating(rating)} hover:${handleRating(rating)}`}
          checked={rating === 1}
          readOnly
        // onChange={() => ratingChanged(1)}
        />
        <input
          type="radio"
          name={name}
          value={2}
          className={` mask mask-star ${handleRating(rating)} hover:${handleRating(rating)}`}
          checked={rating === 2}
          readOnly
        // onChange={() => ratingChanged(2)}
        />
        <input
          type="radio"
          name={name}
          value={3}
          className={` mask mask-star ${handleRating(rating)} hover:${handleRating(rating)}`}
          checked={rating === 3}
          readOnly
        // onChange={() => ratingChanged(3)}
        />
        <input
          type="radio"
          name={name}
          value={4}
          className={` mask mask-star ${handleRating(rating)} hover:${handleRating(rating)}`}
          checked={rating === 4}
          readOnly
        // onChange={() => ratingChanged(4)}
        />
        <input
          type="radio"
          name={name}
          value={5}
          className={` mask mask-star ${handleRating(rating)} hover:${handleRating(rating)}`}
          checked={rating === 5}
          readOnly
        // onChange={() => ratingChanged(5)}
        />
      </div>
    </div>
  );
};

export default RatingModule;
