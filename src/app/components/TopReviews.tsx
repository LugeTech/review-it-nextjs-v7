"use client";
import { iReview } from "../util/Interfaces";
import ReviewBox from "./ReviewBox";
import { useQuery } from "@tanstack/react-query";
import { getLatestReviews } from "../util/serverFunctions";
import LoadingSpinner from "./LoadingSpinner";
// import { MiniReview } from "@/components/mini-review";

const TopReviews = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["latestReviews"],
    queryFn: () => getLatestReviews(),
    refetchOnWindowFocus: false,
  }) as any;

  let reviews = data?.data as iReview[];

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="flex flex-col w-full justify-center items-center bg-mycolours-light dark:bg-mycolours-dark dark:text-mycolours-light">
      <h1 className=" flex flex-1 justify-center mt-2 text-xl font-bold text-mycolours-dark dark:text-mycolours-light">
        Latest reviews
      </h1>
      <div className="flex justify-between flex-col sm:flex-row gap-1">
        {reviews?.length > 0 &&
          reviews.map((review, index) => {
            return <ReviewBox key={index} review={review} />;
          })}
      </div>
      {/* <MiniReview /> */}
    </div>
  );
};

export default TopReviews;
