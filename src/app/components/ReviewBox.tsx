"use client";
import { useEffect, useState } from "react";
import { iReview } from "../util/Interfaces";
import Image from "next/image";
import DOMPurify from "dompurify";
import Link from "next/link";
import RatingModuleReadOnly from "./RatingModuleReadOnly";
// import { useAtom } from "jotai";
// import { currentReviewAtom } from "../store/store";
import dayjs from "dayjs";

interface ReviewBoxProps {
  review: iReview;
}

const ReviewBox: React.FC<ReviewBoxProps> = ({ review: review }) => {
  // const [reviewAtom, setReview] = useAtom(currentReviewAtom);

  const [reviewBody, setReviewBody] = useState(review.body);
  useEffect(() => {
    if (reviewBody.length > 90) {
      const splitIndex = reviewBody.lastIndexOf(" ", 90); // Find the last space before or at 90 characters so it don't cut a word
      setReviewBody(reviewBody.slice(0, splitIndex) + " . . .read more");
    }
  }, [reviewBody]);

  return (
    <div className=" my-1 flex-col h-full max-w-sm border p-2 pl-3 sm:p-4 bg-white dark:bg-myTheme-niceBlack border-[#E5E5DD] dark:border-gray-700 rounded-xl shadow-md">
      <div className=" flex flex-row h-auto w-full gap-1 sm:gap-2 pb-1  ">
        <Link
          href={`/userprofile/${review?.user?.id}`}
          className="sm:text-xl flex w-[40px] h-[40px] hover:underline justify-start items-start"
        >
          {/* user image */}
          {review?.user ? (
            <Image
              src={review?.user.avatar!}
              alt="avatar"
              width={40}
              height={40}
              className=" rounded-full object-cover w-[40px] h-[40px] md:w-[40px] md:h-[40px]"
            />
          ) : null}
        </Link>
        <div className="flex h-[40px] justify-start items-center ">
          <RatingModuleReadOnly
            name={review.id!}
            rating={review.rating}
            size={"rating-sm"}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-start items-start gap-2 pb-2 border-b-2 border-b-gray-100 dark:border-gray-700 ">
        <Link
          href={`/userprofile/${review?.user?.id}`}
          className="flex hover:underline justify-start items-start"
        >
          <p className="text-xs font-bold text-gray-700 dark:text-gray-400">
            @{review.user?.userName}
          </p>
        </Link>
        <p className="text-xs text-gray-500 dark:text-gray-400">reviewed</p>
        <Link href={`/reviews?id=${review?.product?.id}`} onClick={() => {}}>
          <p className="text-xs hover:underline font-bold text-gray-700 dark:text-gray-400">
            {review.product?.name}
          </p>
        </Link>
      </div>
      <div className="bg-white dark:bg-myTheme-niceBlack pt-2 w-full flex flex-col  justify-start items-start ">
        <Link
          href={`/fr/${review?.id}`}
          className=" hover:bg-gray-100 hover:dark:bg-myTheme-dark1 text-base"
        >
          <p className="md:text-sm font-bold text-myTheme-lightTextBody/80 dark:text-gray-300">
            {review.title}
          </p>
          <div className="flex flex-wrap  ">
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  `${review.body.length > 100 ? `${review.body.slice(0, 100)}...` : review.body}`,
                ),
              }}
              className="mb-1 text-xs md:text-md leading-tight font-extralight dark:text-gray-300"
            />
          </div>
          <div className=" w-full  tracking-tight ">
            <p className="text-xs font-light text-gray-500 dark:text-gray-600">
              {dayjs(review?.createdDate?.toString()).format(
                "MMMM D, YYYY h:mm A",
              )}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ReviewBox;
