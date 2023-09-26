'use client';
import { iReview, iUser, iComment, iProduct, iCalculatedRating } from "../util/Interfaces";
import ReviewBox from "./ReviewBox";
import { useQuery } from "@tanstack/react-query";
import { getLatestReviews } from "../util/serverFunctions";
import LoadingSpinner from "./LoadingSpinner";
// import { users } from "@clerk/nextjs/dist/api";


const TopReviews = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["latestReviews"],
    queryFn: () => getLatestReviews(),
    refetchOnWindowFocus: false,
  }) as any

  let reviews = data?.data as iReview[]
  console.log(reviews)

  if (isLoading) return <LoadingSpinner />
  if (isError) return <p>{'Signin to see top reviews'}</p>

  return (
    <div className="flex flex-col w-full justify-center items-center  bg-mycolours-light dark:bg-mycolours-dark dark:text-mycolours-light">
      <h1 className=" flex flex-1 justify-center mt-2 text-xl font-bold text-mycolours-dark dark:text-mycolours-light">
        Top Reviews
      </h1>
      <div className="flex justify-between flex-col sm:flex-row gap-1">
        {reviews?.length > 0 && reviews.map((review, index) => {
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
