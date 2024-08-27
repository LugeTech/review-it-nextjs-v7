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
    // refetchOnMount: "always"
  }) as any;
  if (isError) return <div>Error</div>;

  let reviews = data?.reviews as iReview[];

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col w-full h-full justify-center items-center  ">
      <h1 className=" flex flex-1 justify-center mt-2 text-xl font-bold ">
        Latest reviews
      </h1>
      <div className="w-full grid mx-auto items-center justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 md:gap-4 ">
        {reviews?.length > 0 &&
          reviews?.map((review, index) => {
            return <ReviewBox key={index} review={review} />;
          })}
      </div>
      {/* <MiniReview /> */}
    </div>
  );
};

export default TopReviews;
