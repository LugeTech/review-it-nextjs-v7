/**
 * The ProductCard component is a React component that displays information about a product,
 * including its image, name, address/description, rating, and number of reviews.
 *
 * The component can work in two modes:
 * 1. If the `reviews` prop is provided, it will use those reviews to calculate the rating
 *    and display the product information. In this case, the product data is taken from
 *    the first review in the `reviews` array.
 * 2. If the `reviews` prop is not provided, it will fetch the reviews from the server
 *    using the `useQuery` hook from `@tanstack/react-query`. The product data is taken
 *    from the `product` prop in this case.
 *
 * The component also handles the following options:
 * - `showLatestReview`: Whether to show the link to the latest review.
 * - `size`: The size of the rating stars.
 * - `showWriteReview`: Whether to show the "Write Review" link.
 * - `showClaimThisProduct`: Whether to show the "Claim this product" link.
 *
 * The component renders a card-like UI with the product image, name, address/description,
 * rating stars, and other relevant information. It also includes a "Write Review" link
 * that navigates to a review creation page with a pre-set rating of 3 stars.
 */
"use client";
import { iProduct, iReview } from "@/app/util/Interfaces"; // Update with the actual path
import Image from "next/image";
import RatingModuleReadOnly from "./RatingModuleReadOnly";
// import { useState } from 'react';
import Link from "next/link";
// import YesNoAlert from './YesNoAlert';
import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../util/serverFunctions";
import { calculateAverageReviewRating } from "../util/calculateAverageReviewRating";
import LoadingSpinner from "./LoadingSpinner";
import VerticalLinks from "./VerticalLinks";

interface ProductCardProps {
  reviews?: iReview[] | null;
  options: {
    showLatestReview: boolean;
    size: string;
    showWriteReview: boolean;
    showClaimThisProduct: boolean;
  };
  product?: iProduct | null;
}
interface iCalculatedRating {
  roundedRating: number;
  roundedRatingOneDecimalPlace: number;
  numberOfReviews: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  reviews,
  options,
  product,
}) => {
  // const [showModal, setShowModal] = useState(false);

  const currentProduct =
    reviews && reviews.length > 0 ? reviews[0].product : product;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reviews", currentProduct?.id],
    queryFn: () => getReviews(currentProduct?.id!),
    refetchOnWindowFocus: false,
    enabled: !!currentProduct && !reviews,
  }) as any;

  const allReviews = reviews || data?.data.reviews || [];
  // const totalComments = allReviews.reduce((accumulator, review) => accumulator + review.comments.length, 0);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>{error.message}</p>;

  let { roundedRating, roundedRatingOneDecimalPlace, numberOfReviews } =
    calculateAverageReviewRating(allReviews) as unknown as iCalculatedRating;

  const handleRating = (roundedRating: number) => {
    switch (roundedRating) {
      case 1:
        return "bg-myTheme-ratingRed";
      case 2:
        return "bg-myTheme-ratingOrange";
      case 3:
        return "bg-myTheme-ratingYellow";
      case 4:
        return "bg-myTheme-ratingLightGreen";
      case 5:
        return "bg-myTheme-ratingGreen";
    }
  };

  return (
    <div className="flex flex-col w-full rounded-lg shadow-md p-2 border-zinc-200 dark:border-zinc-600 border-2 bg-myTheme-lightbg dark:bg-myTheme-niceGrey text-myTheme-dark">
      <div className="flex flex-row bg-myTheme-white dark:bg-myTheme-niceGrey text-myTheme-dark rounded-lg">
        <Link
          href={`/reviews?id=${currentProduct?.id}`}
          className="  w-full bg-myTheme-lightbg dark:bg-myTheme-niceGrey text-myTheme-dark "
        >
          <div className="flex justify-start items-center gap-2 w-full bg-myTheme-lightbg dark:bg-myTheme-niceGrey text-myTheme-niceGrey dark:text-myTheme-light">
            {currentProduct?.display_image && (
              <div className=" flex items-start justify-start bg-myTheme-lightbg dark:bg-myTheme-niceGrey text-myTheme-dark dark:text-myTheme-light">
                <div className="relative w-20 h-20">
                  <Image
                    src={currentProduct.display_image}
                    alt={`${currentProduct.name} Image`}
                    className=" object-cover rounded-lg "
                    fill
                  />
                </div>
              </div>
            )}
            <div className="mb-2 flex flex-col gap-1 w-full">
              <div className="p-1 flex flex-col bg-myTheme-lightbg dark:bg-myTheme-niceGrey text-myTheme-dark dark:text-myTheme-light rounded-lg">
                <div className="md:leading-5 text-base flex md:text-xl font-semibold text-black dark:text-white ">
                  {currentProduct?.name}
                </div>
                <div className="text-xs font-extralight md:text-sm md:font-extralight text-black dark:text-white border-b-2 border-gray-200 dark:border-gray-500">
                  {currentProduct?.address}
                </div>
                <p className="hidden text-xs md:flex md:text-sm leading-snug text-black/70 dark:text-white">
                  &quot;
                  {currentProduct && currentProduct.description?.length > 80
                    ? `${currentProduct.description.slice(0, 80)}...`
                    : currentProduct?.description}
                  &quot;
                </p>
              </div>
              <div className="flex justify-between md:justify-start md:gap-2 ">
                <div className="flex gap-2">
                  <span
                    className={`rounded flex items-center text-xs md:text-base px-1 ${handleRating(roundedRating)}`}
                  >
                    {allReviews.length > 0 ? (
                      <div className="flex gap-1 items-center justify-center text-black/70 text-sm ">
                        {roundedRatingOneDecimalPlace!}{" "}
                        {`(${numberOfReviews!} reviews)`}
                      </div>
                    ) : (
                      ""
                    )}
                  </span>
                  {allReviews.length > 0 ? (
                    <RatingModuleReadOnly
                      name={currentProduct?.id!}
                      rating={roundedRating!}
                      size={options.size}
                    />
                  ) : (
                    "No Reviews Yet"
                  )}
                </div>
                {allReviews.length === 0 && (
                  <Link
                    href={`/cr/?id=${currentProduct?.id}&rating=3`}
                    className="hover:underline "
                  >
                    Write Review
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Link>
        {/* <div className="hidden sm:flex">{<VerticalLinks />}</div> */}
      </div>
      {/* <div className="flex sm:hidden w-full justify-between"> */}
      {/*   {<VerticalLinks />} */}
      {/* </div> */}
      <div className="bg-myTheme-primary/10 flex w-full text-xs md:text-base justify-evenly items-center pr-2 rounded-lg ">
        {<VerticalLinks />}

        {options.showClaimThisProduct && (
          <div className="flex w-full justify-center items-center text-black dark:text-white hover:underline ">
            Claim Product
          </div>
        )}
        <div
          id="reviews_operations_div"
          className="flex w-full justify-end items-center "
        >
          {options.showWriteReview ? (
            <Link
              href={`/cr/?id=${currentProduct?.id}&rating=3`}
              className="text-black dark:text-white hover:underline"
            >
              Write Review
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
