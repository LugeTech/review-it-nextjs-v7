'use client';
import { Suspense } from "react";
import { iReview, iUser, iComment, iProduct, iCalculatedRating } from "../util/Interfaces";

import ReviewBox from "./ReviewBox";
import { useQuery } from "@tanstack/react-query";
import { calculateAverageReviewRating } from "../util/calculateAverageReviewRating";
import { getLatestReviews } from "../util/serverFunctions";
import LoadingSpinner from "./LoadingSpinner";
import { users } from "@clerk/nextjs/dist/api";

// interface TopReviewsProps {
//   reviews: iReview[];
//   users: iUser[];
//   products: iProduct[];
//   comments: iComment[];
// }

const TopReviews = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["latestReviews"],
    queryFn: () => getLatestReviews(),
    refetchOnWindowFocus: false,
  }) as any

  const reviews = data?.data as iReview[]
  // const filteredReviews = reviews?.filter((review) => review.rating !== null && review.rating !== 0)
  // console.log('filteredReviews', filteredReviews)
  // return (
  //   <div>
  //   </div>
  // )
  if (isLoading) return <LoadingSpinner />
  if (isError) return <p>{error.message}</p>
  // let { roundedRating, roundedRatingOneDecimalPlace, numberOfReviews } = calculateAverageReviewRating(reviews) as unknown as iCalculatedRating
  console.log('reviews', reviews)
  return (
    <div className="flex flex-col w-full justify-center items-center  bg-mycolours-light dark:bg-mycolours-dark dark:text-mycolours-light">
      <h1 className=" flex flex-1 justify-center mt-2 text-xl font-bold text-mycolours-dark dark:text-mycolours-light">
        Top Reviews
      </h1>
      <div className="flex justify-between flex-col sm:flex-row gap-1">
        {reviews.map((review, index) => {
          return (
            <ReviewBox
              key={index}
              review={review}
              product={review.product!}
              user={review.user!}
              comments={review.comments}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TopReviews;
