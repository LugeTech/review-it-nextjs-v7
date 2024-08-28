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
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        {review?.user && (
          <Image
            src={review.user.avatar!}
            alt="User avatar"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        )}
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <div>
              <RatingModuleReadOnly
                name={review.id!}
                rating={review.rating}
                size="rating-sm"
              />
              <p className="text-xs text-gray-500 mt-1">{review.product?.tags[0]}</p>
            </div>
            <ReviewStats review={review} setReview={() => setReview(review)} />
          </div>
          <div className="flex items-center space-x-2 text-sm mb-2">
            <Link href={`/userprofile/${review?.user?.id}`} className="font-medium text-myTheme-reviewBlue hover:underline">
              @{review.user?.userName}
            </Link>
            <span className="text-gray-500">reviewed</span>
            <Link href={`/reviews?id=${review?.product?.id}`} className="font-medium text-myTheme-reviewBlue hover:underline">
              {review.product?.name}
            </Link>
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">{review.title}</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                `${review.body.length > 100 ? `${review.body.slice(0, 100)}...` : review.body}`
              ),
            }}
            className="text-sm text-gray-600 mb-2"
          />
          <div className="flex items-center justify-between text-xs">
            <p className="text-gray-500">
              {dayjs(review?.createdDate?.toString()).format("MMMM D, YYYY h:mm A")}
            </p>
            <Link
              href={`/fr?id=${review?.id}&productId=${review?.product?.id}`}
              className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 rounded transition-colors duration-200"
            >
              View review
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewBox;
