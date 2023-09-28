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
                <div className="w-full pt-1 flex flex-row justify-center items-center">
                  <RatingModuleReadOnly
                    name="rating"
                    rating={rating}
                    ratingChanged={ratingChanged}
                    size={"rating-sm"}
                  />
                </div>
              </Link>
            </div>
            <Link href={`/fr/${review.id}`} onClick={() => setReview(review)} className="w-full font-semibold flex flex-col justify-center items-center pt-2 text-base hover:underline">
              {/* review title */}
              <div className="w-full flex flex-row justify-start items-center">
                {review.title.length > 30
                  ? review.title.slice(0, 30) + "..."
                  : review.title}
              </div>
              <div className=" w-full font-normal ">
                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(reviewBody) }} className="mb-4 text-sm" />

              </div>
            </Link>
          </div>
        </div>
        {/* Top comment */}
        <div className="text-xs mt-2  text-gray-700 dark:text-gray-400 tracking-tighter font-semibold pl-1 border-t-2 border-gray-300">
          Top Comment
        </div>
        <Comment comment={comments[0]} />
      </div>
    </div >
  );
};

export default ReviewBox;
