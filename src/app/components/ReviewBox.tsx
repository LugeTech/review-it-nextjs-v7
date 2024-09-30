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
    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-200 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:space-x-4">
        <div className="flex items-center w-full sm:w-auto mb-2 sm:mb-0 gap-2">
          {review?.user && (
            <Image
              src={review.user.avatar!}
              alt="User avatar"
              width={60}
              height={60}
              className="rounded-full object-cover w-16 h-16 sm:w-12 sm:h-12 mr-3 sm:mr-0"
            />
          )}
          <div className="flex-grow sm:hidden">
            <Link href={`/userprofile/${review?.user?.id}`} className="font-medium text-myTheme-reviewBlue hover:underline truncate max-w-[200px]">
              @{review.user?.userName}
            </Link>
          </div>
        </div>
        <div className="flex-grow w-full min-w-0">
          <div className="hidden sm:flex flex-wrap items-center gap-1 text-sm mb-2">
            <Link href={`/userprofile/${review?.user?.id}`} className="font-medium text-myTheme-reviewBlue hover:underline truncate max-w-[150px]">
              @{review.user?.userName}
            </Link>
            <span className="text-gray-500">reviewed</span>
            <Link href={`/reviews?id=${review?.product?.id}`} className="font-medium text-myTheme-reviewBlue hover:underline ">
              {review.product?.name}
            </Link>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <RatingModuleReadOnly
                name={review.id!}
                rating={review.rating}
                size="rating-sm"
              />
              <p className="hidden sm:block text-xs text-gray-500 mt-1 truncate">{review.product?.tags[0]}</p>
            </div>
            <ReviewStats review={review} setReview={() => setReview(review)} />
          </div>
          <div className="sm:hidden text-sm mb-2">
            <span className="text-gray-500">reviewed</span>
            <Link href={`/reviews?id=${review?.product?.id}`} className="font-medium text-myTheme-reviewBlue hover:underline break-words ml-1">
              {review.product?.name}
            </Link>
          </div>
          <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{review.title}</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                `${review.body.length > 100 ? `${review.body.slice(0, 100)}...` : review.body}`
              ),
            }}
            className="text-sm text-gray-600 mb-2 line-clamp-3"
          />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-2">
            <p className="text-gray-500 truncate">
              {dayjs(review?.createdDate?.toString()).format("MMMM D, YYYY h:mm A")}
            </p>
            <Link
              href={`/fr?id=${review?.id}&productid=${review?.product?.id}`}
              className="bg-blue-600 text-white text-base hover:bg-blue-700 px-3 py-2 rounded transition-colors duration-200 w-full sm:w-auto text-center"
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
