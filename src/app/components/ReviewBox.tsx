"use client";
import { useState } from "react";
import { iReview, iUser, iComment, iProduct } from "../util/Interfaces";
import Image from "next/image";
import Votes from "./Votes";
import DOMPurify from 'dompurify';
import Link from "next/link";
import RatingModuleReadOnly from "./RatingModuleReadOnly";

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
      <div className="  block h-full max-w-sm gap-2 p-2 bg-myTheme-light dark:bg-myTheme-dark rounded-xl hover:bg-gray-100  dark:hover:bg-black ">
        <div className="flex flex-col justify-start items-center gap-1">
          <div className="flex flex-col w-full sm:ml-2 text-xs text-myTheme-dark dark:text-myTheme-light justify-start items-center ">
            <div className="flex w-full flex-col justify-start items-center border-b-2">
              <Link href={`/users/${user.id}`} className="sm:text-xl text-lg hover:underline flex flex-col justify-center items-center">
                {/* user image */}
                {review?.user ? (
                  <Image
                    src={
                      user.avatar!
                    }
                    alt="avatar"
                    width={60}
                    height={60}
                    className=" rounded-full object-cover w-[60px] h-[60px]"
                  />
                ) : null}
                {/* user name */}
                @{user?.userName}
              </Link >
              <p className="text-xs text-gray-500">
                reviewed
              </p>
              <Link href={`/reviews/${product.id}`}
                onClick={() => {
                }}
                className=" sm:text-1xl text-lg cursor-pointer font-bold hover:underline"
              >
                {
                  product?.name
                }
              </Link>
            </div>
            <Link href={`/reviews/${review.id}`} className="w-full font-semibold flex flex-col justify-center items-center pt-2 text-base hover:underline">
              {/* review title */}
              {review.title.length > 30
                ? review.title.slice(0, 30) + "..."
                : review.title}
            </Link>
            <div className=" w-full font-normal tracking-tight ">
              <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(review.body.slice(0, 90)) }} className="mb-4 text-sm" />

            </div>
            <div className="w-full pt-1 flex flex-row justify-start items-center">
              <RatingModuleReadOnly
                name="rating"
                rating={rating}
                ratingChanged={ratingChanged}
                size={"rating-sm"}
              />
            </div>
          </div>
        </div>
        {/* Top comment */}
        <div className="text-xs mt-2  text-gray-700 dark:text-gray-400 tracking-tighter font-semibold pl-1 border-t-2 border-gray-300">
          Top Comment
        </div>
        {comments[0] ? (
          <div className=" text-xs mt-1 text-gray-700 dark:text-gray-400 flex flex-row gap-1 pb-2 pl-4">
            <div className="">

              <Image
                src={
                  comments[0]?.user?.avatar!
                }
                alt="avatar"
                width={40}
                height={40}
                className=" rounded-full object-cover w-10 h-10"
              />

            </div>
            <div className="flex flex-col">
              {comments
                .find((comment) => comment.user === review.comments[0].user)
                ?.body.slice(0, 90)}
              <Votes review={review} />
            </div>
          </div>
        ) : <p className=" text-xs mt-1 pl-4 text-gray-700">No comments yet, add one!</p>}
      </div>
    </div >
  );
};

export default ReviewBox;
