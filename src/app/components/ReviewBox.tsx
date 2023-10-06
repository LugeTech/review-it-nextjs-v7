"use client";
import { useEffect, useState } from "react";
import { iReview, iUser, iComment, iProduct } from "../util/Interfaces";
import Image from "next/image";
import Votes from "./Votes";
import DOMPurify from 'dompurify';
import Link from "next/link";
import RatingModuleReadOnly from "./RatingModuleReadOnly";
import { useAtom } from "jotai";
import { currentReviewAtom } from "../store/store";
import Comment from "./Comment";
import dayjs from "dayjs";

interface ReviewBoxProps {
  review: iReview;
}

const ReviewBox: React.FC<ReviewBoxProps> = ({
  review: review,
}) => {
  // const [rating, setRating] = useState(review.rating); // Initial value

  // const ratingChanged = (newRating: number) => {
  //   setRating(newRating);
  // };
  const [reviewAtom, setReview] = useAtom(currentReviewAtom);

  const [reviewBody, setReviewBody] = useState(review.body);
  useEffect(() => {
    if (reviewBody.length > 90) {
      const splitIndex = reviewBody.lastIndexOf(' ', 90); // Find the last space before or at 90 characters so it don't cut a word
      setReviewBody(reviewBody.slice(0, splitIndex) + " . . .read more");
    }
  }, [reviewBody]);


  return (
    <div className="sm:w-6/12 my-1 border border-gray-300 dark:border-gray-500 rounded-xl shadow-xl">
      <div className="  block h-full max-w-sm gap-2 p-2 bg-myTheme-light dark:bg-myTheme-dark rounded-xl hover:bg-gray-100  dark:hover:bg-black ">
        <div className="flex flex-col justify-start items-center gap-1">
          <div className="flex flex-col w-full sm:ml-2 text-xs text-myTheme-dark dark:text-myTheme-light justify-start items-center ">
            <div className="flex w-full flex-col justify-start items-center">
              <Link href={`/users/${review?.user?.id}`} className="sm:text-xl text-lg hover:underline flex flex-col justify-center items-center">
                {/* user image */}
                {review?.user ? (
                  <Image
                    src={
                      review?.user.avatar!
                    }
                    alt="avatar"
                    width={60}
                    height={60}
                    className=" rounded-full object-cover w-[60px] h-[60px]"
                  />
                ) : null}
                {/* user name */}
                @{review.user?.userName}
              </Link >
              <p className="text-xs text-gray-500">
                reviewed
              </p>
              <Link href={`/reviews/${review?.product?.id}`}
                onClick={() => {
                }}
                className=" sm:text-1xl text-lg text-center cursor-pointer font-bold hover:underline"
              >
                {
                  review?.product?.name
                }
                <div className="w-full pt-1 flex flex-row justify-center items-center">
                  <RatingModuleReadOnly
                    name={review.id!}
                    rating={review.rating}
                    size={"rating-sm"}
                  />
                </div>
              </Link>
            </div>
            <div className=" font-semibold w-full flex flex-col  justify-start items-start pt-3">

              <p className="font-semibold text-lg">
                {/* review title */}
                {review.title.length > 30
                  ? review.title.slice(0, 30) + "..."
                  : review.title}
              </p>
              <p className="text-xs font-thin ">{dayjs(review?.createdDate?.toString()).format('MMMM D, YYYY h:mm A')}</p>
            </div>
            <div className=" w-full font-normal tracking-tight ">
              <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(review.body.slice(0, 90)) }} className="mb-4 text-sm" />

            </div>
          </div>
        </div>

      </div>
    </div >
  );
};

export default ReviewBox;
