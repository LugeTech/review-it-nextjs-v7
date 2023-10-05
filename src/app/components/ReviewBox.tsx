"use client";
import { useState } from "react";
import { iReview, iUser, iComment, iProduct } from "../util/Interfaces";
import Image from "next/image";
import Votes from "./Votes";
import RatingModule from "@/app/components/RatingModule";
import DOMPurify from 'dompurify';
import dayjs from "dayjs";

interface ReviewBoxProps {
  review: iReview;
  user: iUser;
  comments: iComment[];
  product: iProduct;
}

const ReviewBox: React.FC<ReviewBoxProps> = ({
  review: review,
  comments: comments,
  product: product,
  user: user,
}) => {
  const [rating, setRating] = useState(review.rating); // Initial value

  const ratingChanged = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <div className="sm:w-6/12 my-1 border border-gray-300 dark:border-gray-500 rounded-xl shadow-xl">
      <div className="  block h-full max-w-sm gap-2 p-2 bg-myTheme-light dark:bg-myTheme-dark rounded-xl hover:bg-gray-100  dark:hover:bg-black cursor-pointer">
        <div className="flex flex-col justify-start items-center gap-1">
          <div className="flex flex-col w-full sm:ml-2 text-xs text-myTheme-dark dark:text-myTheme-light justify-start items-center ">
            <div className="flex w-full flex-col justify-start items-center border-b-2">
              {/* user image */}
              {review?.user ? (
                <Image
                  src={
                    user.avatar!
                  }
                  alt="avatar"
                  width={60}
                  height={60}
                  className=" flex rounded-full"
                />
              ) : null}
              {/* user name */}
              <p>
                {user.firstName} {user.lastName} reviewed{" "}
              </p>
              {/* product name */}
              <p
                onClick={() => {
                }}
                className=" sm:text-1xl text-lg cursor-pointer font-bold"
              >
                {
                  product?.name
                }
              </p>
            </div>
            <div className=" font-semibold w-full flex flex-col  justify-start items-start pt-3">
              <RatingModule
                name="rating"
                rating={rating}
                ratingChanged={ratingChanged}
                size={"rating-sm"}
              />

              <p className="font-semibold text-lg">
                {/* review title */}
                {review.title.length > 30
                  ? review.title.slice(0, 30) + "..."
                  : review.title}
              </p>
              <p className="text-xs font-thin ">{dayjs(review?.createdDate?.toString()).format('MMMM D, YYYY h:mm A')}</p>
            </div>
            <div className=" w-full font-normal tracking-tight ">
              {/* review body */}
              {/* {review.body.slice(0, 90) + "... read more"} */}
              <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(review.body.slice(0, 90)) }} className="mb-4 text-sm" />

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReviewBox;
