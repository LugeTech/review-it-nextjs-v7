// import { faker } from "@faker-js/faker";
import { iReview, iUser, iComment, iProduct } from "./util/Interfaces";
import QuickTabs from "./components/QuickTabs";
import TopReviews from "./components/TopReviews";
import HeroSection from "./components/HeroSection";
import { users } from "@clerk/nextjs/dist/api";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/LoadingSpinner";
import { calculateAverageReviewRating } from "./util/calculateAverageReviewRating";
import { getReviews } from "./util/serverFunctions";
import Token from "./components/Token";

export const revalidate = 30;

export default async function Home() {

  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["reviews"],
  //   queryFn: () => getLatestReviews(),
  //   refetchOnWindowFocus: false,
  // }) as any
  //
  // const reviews = data?.data as iReview[]
  // // const filteredReviews = reviews?.filter((review) => review.rating !== null && review.rating !== 0)
  // // console.log('filteredReviews', filteredReviews)
  // // return (
  // //   <div>
  // //   </div>
  // // )
  // if (isLoading) return <LoadingSpinner />
  // if (isError) return <p>{error.message}</p>
  // let { roundedRating, roundedRatingOneDecimalPlace, numberOfReviews } = calculateAverageReviewRating(reviews) as unknown as iCalculatedRating
  return (
    <div className="flex flex-1 flex-col justify-center  bg-myTheme-light dark:bg-myTheme-dark dark:text-myTheme-light">
      <div className="flex flex-1 flex-row">
        <HeroSection />
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <QuickTabs />
        <div className="flex flex-col mt-4 flex-1">
          <div className="flex flex-col justify-center">
            {/* this is the top reviews container*/}
            <div className="w-full flex flex-row px-2 sm:px-0">
              {/* <TopReviews */}
              {/*   reviews={reviews} */}
              {/*   products={products} */}
              {/*   users={users} */}
              {/*   comments={comments} */}
              {/* /> */}
            </div>
            {/* business of the day */}
            <div className="flex flex-col justify-center w-full mt-4 mb-4">
              <div className="flex justify-center items-center text-md mx-4">Business of the day goes here</div>
            </div>
            <Token />
          </div>
        </div>
      </div>
    </div>
  );
}
