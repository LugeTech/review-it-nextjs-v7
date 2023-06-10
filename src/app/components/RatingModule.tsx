"use client";

import { Rating } from "@smastrom/react-rating";
import { styleForRating } from "@/app/util/CONST";

const RatingModule = ({
  name,
  rating,
  ratingChanged,
  size = "rating-lg",
}: {
  name: string;
  rating: number;
  ratingChanged: (rating: number) => void;
  size: string;
}) => {
  return (
    <div>
      {/* <Rating itemStyles={styleForRating} style={{ maxWidth: size }} value={rating} onChange={ratingChanged} /> */}
      <div className={`rating gap-2 rating-lg ${size}`}>
        <input
          type="radio"
          name="rating-3"
          className="mask mask-star bg-red-400"
        />
        <input
          type="radio"
          name="rating-3"
          className="mask mask-star bg-orange-400"
        />
        <input
          type="radio"
          name="rating-3"
          className="mask mask-star bg-yellow-400"
        />
        <input
          type="radio"
          name="rating-3"
          className="mask mask-star bg-lime-400"
        />
        <input
          type="radio"
          name="rating-3"
          className="mask mask-star bg-green-400"
        />
      </div>
    </div>
  );
};

export default RatingModule;
