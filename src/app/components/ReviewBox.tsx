"use client";
import { useEffect, useState } from "react";
import { iReview } from "../util/Interfaces";
import Image from "next/legacy/image";
import DOMPurify from "dompurify";
import Link from "next/link";
import RatingModuleReadOnly from "./RatingModuleReadOnly";
import dayjs from "dayjs";
import ReviewStats from "./ReviewStats";
import { useAtom } from "jotai";
import { currentReviewAtom } from "../store/store";

interface ReviewBoxProps {
  review: iReview;
}

const ReviewBox: React.FC<ReviewBoxProps> = ({ review: review }) => {
  const [reviewAtom, setReview] = useAtom(currentReviewAtom);

  const [reviewBody, setReviewBody] = useState(review.body);
  useEffect(() => {
    if (reviewBody.length > 90) {
      const splitIndex = reviewBody.lastIndexOf(" ", 90); // Find the last space before or at 90 characters so it don't cut a word
      setReviewBody(reviewBody.slice(0, splitIndex) + " . . .read more");
    }
  }, [reviewBody]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
        <div className="flex items-center mb-4 sm:mb-0">
          {review?.user && (
            <Image
              src={review.user.avatar!}
              alt={`${review.user.userName}'s avatar`}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
          )}
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-sm mb-2">
            <Link
              href={`/userprofile/${review?.user?.id}`}
              className="font-medium text-myTheme-reviewBlue hover:underline truncate max-w-[150px]"
            >
              @{review.user?.userName}
            </Link>
            <span className="text-gray-500">reviewed</span>
            <Link
              href={`/reviews?id=${review?.product?.id}`}
              className="font-medium text-myTheme-reviewBlue hover:underline truncate max-w-[200px]"
            >
              {review.product?.name}
            </Link>
          </div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <RatingModuleReadOnly
                name={review.id!}
                rating={review.rating}
                size="rating-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                {review.product?.tags[0]}
              </p>
            </div>
            <ReviewStats review={review} setReview={() => setReview(review)} />
          </div>
        </div>
      </div>
      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1">
        {review.title}
      </h3>
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            `${review.body.length > 150 ? `${review.body.slice(0, 150)}...` : review.body}`,
          ),
        }}
        className="text-sm text-gray-600 mb-4 line-clamp-3"
      />
      <div className="flex flex-wrap items-center justify-between text-xs gap-2">
        <p className="text-gray-500">
          {dayjs(review?.createdDate?.toString()).format("MMMM D, YYYY h:mm A")}
        </p>
        <Link
          href={`/fr?id=${review?.id}&productid=${review?.product?.id}`}
          className="bg-myTheme-primary text-white text-sm font-medium hover:bg-myTheme-secondary px-4 py-2 rounded transition-colors duration-200"
        >
          Full review
        </Link>
      </div>
    </div>
  );
};

export default ReviewBox;
