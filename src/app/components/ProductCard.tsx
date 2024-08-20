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
import Image from "next/legacy/image";
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
    <div className="flex w-full flex-col rounded-lg border-2 border-zinc-200 bg-myTheme-lightbg p-2  text-myTheme-dark shadow-md  hover:border-myTheme-primary">
      <div className="flex flex-row rounded-lg  bg-myTheme-white text-myTheme-dark">
        <Link
          href={`/reviews?id=${currentProduct?.id}`}
          className="  w-full bg-myTheme-lightbg  text-myTheme-dark "
        >
          <div className="flex w-full items-center justify-start gap-2 bg-myTheme-lightbg  text-myTheme-niceGrey ">
            {currentProduct?.display_image && (
              <div className=" flex items-start justify-start bg-myTheme-lightbg text-myTheme-dark ">
                <div className="relative h-20 w-20">
                  <Image
                    src={currentProduct.display_image}
                    alt={`${currentProduct.name} Image`}
                    className=" rounded-lg object-cover "
                    layout="fill"
                  />
                </div>
              </div>
            )}
            <div className="mb-2 flex w-full flex-col gap-1">
              <div className="flex flex-col rounded-lg bg-myTheme-lightbg p-1 text-myTheme-dark ">
                <div className="flex text-base font-semibold text-black  md:text-xl md:leading-5 ">
                  {currentProduct?.name}
                </div>
                <div className="border-b-2 border-gray-200 text-xs font-extralight text-black  md:text-sm md:font-extralight">
                  {currentProduct?.address}
                </div>
                <p className="hidden text-xs leading-snug text-black/70  md:flex md:text-sm">
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
                    className={`flex items-center rounded px-1 text-xs md:text-base ${handleRating(roundedRating)}`}
                  >
                    {allReviews.length > 0 ? (
                      <div className="flex items-center justify-center gap-1 text-sm text-black/70 ">
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
      <div className="flex w-full items-center justify-evenly rounded-lg bg-myTheme-primary/10 pr-2 text-xs md:text-base ">
        {<VerticalLinks />}

        {options.showClaimThisProduct && (
          <div className="flex w-full items-center justify-center text-black hover:underline ">
            Claim Product
          </div>
        )}
        <div
          id="reviews_operations_div"
          className="flex w-full items-center justify-end "
        >
          {options.showWriteReview ? (
            <Link
              href={`/cr/?id=${currentProduct?.id}&rating=3`}
              className="text-black hover:underline "
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
