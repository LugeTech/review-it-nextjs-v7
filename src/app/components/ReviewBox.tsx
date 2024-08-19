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
    <div className=" my-1 flex-col h-full max-w-full border p-2 pl-3 sm:p-4 bg-white  border-[#E5E5DD]  rounded-xl shadow-md">
      <div className=" flex flex-row h-auto w-full gap-1 sm:gap-2 pb-1  ">
        <div
          className="sm:text-xl flex  hover:underline justify-start items-start"
        >
          {review?.user ? (
            <Image
              src={review?.user.avatar!}
              alt="avatar"
              width={60}
              height={60}
              className=" rounded object-cover w-[60px] h-[60px] md:w-[60px] md:h-[60px]"
            />
          ) : null}
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col justify-start items-start gap-2 ">
            <div className="flex justify-start items-start ">
              <RatingModuleReadOnly
                name={review.id!}
                rating={review.rating}
                size={"rating-sm"}
              />
            </div>
            <p className="text-sm text-gray-500 ">
              {review.product?.tags[0]}
            </p>
          </div>
          <div className="w-full pl-2 ">
            <ReviewStats review={review} setReview={() => { setReview(review) }} />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-start items-start gap-2   ">
        <Link
          href={`/userprofile/${review?.user?.id}`}
          className="flex hover:underline justify-start items-start"
        >
          <p className="text-sm font-bold text-gray-700 ">
            @{review.user?.userName}
          </p>
        </Link>
        <p className="text-sm text-gray-500 ">reviewed</p>
        <Link href={`/reviews?id=${review?.product?.id}`} onClick={() => { }}>
          <p className="text-sm hover:underline font-bold text-myTheme-accent  ">
            {review.product?.name}
          </p>
        </Link>
      </div>
      <div className="bg-white  pt-2 w-full flex flex-col  justify-start items-start ">
        <div
          // href={`/fr/${review?.id}`}
          className=" hover:bg-gray-100  text-base w-full"
        >
          <p className="md:text-md font-bold text-myTheme-lightTextBody/80 ">
            {review.title}
          </p>
          <div className="flex flex-wrap  ">
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  `${review.body.length > 100 ? `${review.body.slice(0, 100)}...` : review.body}`,
                ),
              }}
              className="mb-1 text-sm md:text-md leading-tight font-extralight "
            />
          </div>
          <div className=" w-full  tracking-tight flex justify-between ">
            <p className="text-sm font-light text-gray-500 ">
              {dayjs(review?.createdDate?.toString()).format(
                "MMMM D, YYYY h:mm A",
              )}
            </p>
            <Link href={`/fr/${review?.id}`}
              className="bg-myTheme-accent text-myTheme-light hover:bg-myTheme-success hover:text-black px-2 py-2 rounded-sm transition-colors">
              Read review
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewBox;
