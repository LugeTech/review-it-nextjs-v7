"use client";
import { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import { iReview, iUser, iComment, iProduct } from "../util/Interfaces";
import Image from "next/image";
import Votes from "./Votes";
// import { Heart } from '@smastrom/react-rating'
import RatingModule from "@/app/components/RatingModule";

interface ReviewBoxProps {
  review: iReview;
  users: iUser[];
  comments: iComment[];
  products: iProduct[];
}

const ReviewBox: React.FC<ReviewBoxProps> = ({
  review: review,
  users: users,
  comments: comments,
  products: products,
}) => {
  const [rating, setRating] = useState(review.rating); // Initial value


  const ratingChanged = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <div className="sm:w-6/12 my-1 border border-gray-300 dark:border-gray-500 rounded-xl shadow-xl">
      <div className="  block h-full max-w-sm gap-2 p-2 bg-mycolours-light dark:bg-mycolours-dark rounded-xl hover:bg-gray-100  dark:hover:bg-black">
        <div className="flex flex-col justify-start items-center gap-1">
          <div className="flex flex-1 flex-col w-full sm:ml-2 text-xs text-mycolours-dark dark:text-mycolours-light justify-start items-center ">
            <div>
              <div onClick={() => {}} className="">
                <div className="flex flex-col justify-start items-center">
                  {/* user image */}
                  {review?.user ? (
                    <Image
                      src={
                        users.find((user) => user._id === review.user)?.avatar!
                      }
                      alt="avatar"
                      width={60}
                      height={60}
                      className=" flex rounded-full"
                    />
                  ) : null}
                  {/* user name */}
                  <p>
                    {users.find((user) => user._id === review.user)?.firstName}{" "}
                    reviewed{" "}
                  </p>
                  {/* product name */}
                  <p
                    onClick={() => {
                      console.log(`product name clicked`);
                    }}
                    className=" sm:text-1xl text-lg cursor-pointer font-bold"
                  >
                    {
                      products.find((product) => product._id === review.product)
                        ?.name
                    }
                  </p>
                </div>
                <div className=" font-semibold flex flex-col gap-2 justify-start items-start pt-3">
                  {/* review title */}
                  {review.title.length > 30
                    ? review.title.slice(0, 30) + "..."
                    : review.title}
                </div>
                <div className=" font-normal tracking-tight ">
                  {/* review body */}
                  {review.body.slice(0, 90) + "... read more"}

                  {/* <Rating itemStyles={styleForRating} style={{ maxWidth: 100 }} value={rating} onChange={ratingChanged} /> */}
                  <RatingModule
                    name="rating"
                    rating={rating}
                    ratingChanged={ratingChanged}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top comment */}
        <div className="text-xs mt-2  text-gray-700 dark:text-gray-400 tracking-tighter font-semibold">
          Top Comment
        </div>
        <div className=" text-xs mt-1 text-gray-700 dark:text-gray-400 flex flex-row gap-1 pb-2">
          <div className="">
            {/* will di this calculation in a useState above */}
            {review?.title ? (
              <Image
                src={
                  users.find((user) => user._id === review.comments[0].user)
                    ?.avatar!
                }
                alt="avatar"
                width={60}
                height={60}
                className=" flex rounded-full"
              />
            ) : null}
          </div>
          <div className="flex flex-col">
            {comments
              .find((comment) => comment.user === review.comments[0].user)
              ?.body.slice(0, 90) + "... read more"}
            <Votes review={review} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewBox;
