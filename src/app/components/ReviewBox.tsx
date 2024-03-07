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
    <div className=" my-1 border border-gray-300 dark:border-gray-500 rounded-xl shadow-xl">
      <div className="  block h-full max-w-sm gap-2 p-4 bg-myTheme-light dark:bg-myTheme-dark rounded-xl hover:bg-gray-100  dark:hover:bg-black ">
        <div className="flex flex-col justify-start items-center gap-1">
          <div className="flex flex-col w-full text-xs text-myTheme-dark dark:text-myTheme-light justify-start items-center ">
            <div className="flex w-full flex-col justify-start items-center">
              <Link
                href={`/users/${review?.user?.id}`}
                className="sm:text-xl hover:underline flex flex-col justify-center items-center"
              >
                {/* user image */}
                {review?.user ? (
                  <Image
                    src={review?.user.avatar!}
                    alt="avatar"
                    width={40}
                    height={40}
                    className=" rounded-full object-cover w-[40px] h-[40px] md:w-[60px] md:h-[60px]"
                  />
                ) : null}
                {/* user name */}
                <p className="text-xs text-gray-500">
                  @{review.user?.userName}
                </p>
              </Link>
              <p className="text-xs text-gray-500">reviewed</p>
              <Link
                href={`/reviews?id=${review?.product?.id}`}
                onClick={() => { }}
                className=" sm:text-base text-md text-center cursor-pointer  hover:underline w-full"
              >
                {review?.product?.name}
                <div className="w-full pt-1 flex flex-row justify-center items-center">
                  <RatingModuleReadOnly
                    name={review.id!}
                    rating={review.rating}
                    size={"rating-sm"}
                  />
                </div>
              </Link>
            </div>
            <div className="  w-full flex flex-col  justify-start items-start pt-1">
              <Link href={`/fr/${review?.id}`} className=" text-base">
                <p className="text-sm font-medium text-gray-800">{review.title}</p>
                <div className="flex flex-wrap ">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(review.body.slice(0, 50)),
                    }}
                    className="mb-1 text-xs md:text-sm text-gray-600"
                  />
                  <span className="text-xs md:text-sm font-medium text-gray-500">{
                    review.body.length > 50 ? "...Read full review" : ""
                  }</span>
                </div>
              </Link>
            </div>
            <div className=" w-full  tracking-tight ">
              <p className="text-xs font-light text-gray-400">
                {dayjs(review?.createdDate?.toString()).format(
                  "MMMM D, YYYY h:mm A",
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewBox;
