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
  return (
    <div className="flex flex-grow-0">
      <div
        className={` w-auto rating gap-2 ${size} items-center justify-center  p-2 rounded-md bg-myTheme-accent `}
      >
        <input
          type="radio"
          name={name}
          value={1}
          className=" mask mask-star bg-white hover:bg-red-500"
          checked={rating === 1}
          onChange={() => ratingChanged(1)}
        />
        <input
          type="radio"
          name={name}
          value={2}
          className="mask mask-star bg-white hover:bg-orange-500"
          checked={rating === 2}
          onChange={() => ratingChanged(2)}
        />
        <input
          type="radio"
          name={name}
          value={3}
          className="mask mask-star bg-white hover:bg-yellow-500"
          checked={rating === 3}
          onChange={() => ratingChanged(3)}
        />
        <input
          type="radio"
          name={name}
          value={4}
          className="mask mask-star bg-white hover:bg-lime-500"
          checked={rating === 4}
          onChange={() => ratingChanged(4)}
        />
        <input
          type="radio"
          name={name}
          value={5}
          className="mask mask-star bg-white hover:bg-green-500 "
          checked={rating === 5}
          onChange={() => ratingChanged(5)}
        />
      </div>
    </div>
  );
};

export default RatingModule;
