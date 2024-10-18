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
import {
  iProduct,
  iReview,
  iCalculatedRating,
  iUser,
} from "@/app/util/Interfaces";
import Image from "next/legacy/image";
import RatingModuleReadOnly from "./RatingModuleReadOnly";
import Link from "next/link";
import { calculateAverageReviewRating } from "../util/calculateAverageReviewRating";
import VerticalLinks from "./VerticalLinks";
import { useRouter } from "next/navigation";
import ClaimProductComponent from "./ClaimProductComponent";
import {
  MdEmail,
  MdPhone,
  MdLanguage,
  MdAccessTime,
  MdLocationOn,
  MdCalendarToday,
} from "react-icons/md";
import AccordianComponent from "./AccordianComponent";

interface ProductCardProps {
  reviews?: iReview[] | null;
  options: {
    showLatestReview: boolean;
    size: string;
    showWriteReview: boolean;
    showClaimThisProduct: boolean;
  };
  product?: iProduct | null;
  currentUserId: string | null;
}

const ProductCard: React.FC<ProductCardProps> = ({
  reviews,
  options,
  product,
  currentUserId,
}) => {
  // const router = useRouter();
  if (!product) return <div>No product or reviews found</div>;
  const currentProduct =
    reviews && reviews.length > 0 ? reviews[0].product : product;

  const allReviews = product.reviews || (reviews as iReview[]);
  const ratingResult = calculateAverageReviewRating(allReviews);

  const amITheOwner = product.business?.ownerId === currentUserId;

  // Type guard function
  function isCalculatedRating(result: any): result is iCalculatedRating {
    return (
      typeof result === "object" &&
      "roundedRating" in result &&
      "roundedRatingOneDecimalPlace" in result &&
      "numberOfReviews" in result
    );
  }

  let roundedRating = 0;
  let roundedRatingOneDecimalPlace = "0";
  let numberOfReviews = 0;

  if (isCalculatedRating(ratingResult)) {
    roundedRating = ratingResult.roundedRating;
    roundedRatingOneDecimalPlace =
      ratingResult.roundedRatingOneDecimalPlace.toString();
    numberOfReviews = ratingResult.numberOfReviews;
  } else if (typeof ratingResult === "number") {
    roundedRating = ratingResult;
    roundedRatingOneDecimalPlace = ratingResult.toFixed(1);
    numberOfReviews = allReviews?.length;
  }

  const ratingColors = {
    1: "bg-red-500",
    2: "bg-orange-500",
    3: "bg-yellow-500",
    4: "bg-green-400",
    5: "bg-green-600",
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-4xl border border-gray-200 bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
        <Link
          href={`/reviews?id=${currentProduct?.id}`}
          className="flex flex-col md:flex-row items-start md:space-x-3"
        >
          {currentProduct?.display_image && (
            <div className="flex-shrink-0">
              <Image
                src={currentProduct.display_image}
                alt={`${currentProduct.name} Image`}
                width={64}
                height={64}
                className="rounded-md object-cover"
              />
            </div>
          )}
          <div className="flex-grow min-w-0">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 break-words">
              {currentProduct?.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 break-words flex items-center">
              <MdLocationOn className="mr-1" /> {currentProduct?.address}
            </p>
            {currentProduct?.openingHrs && currentProduct?.closingHrs && (
              <p className="text-xs sm:text-sm text-gray-600 mt-1 flex items-center">
                <MdAccessTime className="mr-1" /> Hours:{" "}
                {currentProduct.openingHrs} - {currentProduct.closingHrs}
              </p>
            )}
            <div className="mt-2 text-xs sm:text-sm text-gray-600">
              {currentProduct?.telephone && (
                <p className="flex items-center">
                  <MdPhone className="mr-1" /> {currentProduct.telephone}
                </p>
              )}
              {currentProduct?.email && (
                <p className="flex items-center">
                  <MdEmail className="mr-1" /> {currentProduct.email}
                </p>
              )}
            </div>

            <p className="text-sm text-gray-500 mt-1 line-clamp-10 break-words">
              {currentProduct?.description}
            </p>
            <div className="mt-2 flex items-center space-x-2">
              {allReviews?.length > 0 ? (
                <>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                      ratingColors[roundedRating as keyof typeof ratingColors]
                    }`}
                  >
                    {roundedRatingOneDecimalPlace}
                  </span>
                  <RatingModuleReadOnly
                    name={currentProduct?.id!}
                    rating={roundedRating}
                    size={options.size}
                  />
                  <span className="text-xs text-gray-500">
                    ({numberOfReviews} reviews)
                  </span>
                </>
              ) : (
                <span className="text-xs text-gray-500">No Reviews Yet</span>
              )}
            </div>
            {currentProduct?.tags && currentProduct.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {currentProduct.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-200 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {currentProduct?.website && currentProduct.website.length > 0 && (
              <a
                href={currentProduct.website[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-xs mt-2  flex items-center"
              >
                <MdLanguage className="mr-1" /> Visit Website
              </a>
            )}
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <MdCalendarToday className="mr-1" /> Added on:{" "}
              {currentProduct?.createdDate
                ? new Date(currentProduct.createdDate).toLocaleDateString()
                : "N/A"}
            </p>
            {currentProduct?.hasOwner && (
              <p className="text-xs text-gray-600 mt-1">Claimed Business</p>
            )}
          </div>
        </Link>
        {options.showLatestReview && allReviews && allReviews.length > 0 && (
          <div className="mt-2 text-sm text-gray-700 bg-gray-100 p-4 rounded-md">
            <p className="font-semibold">Latest Review:</p>
            {/* <p className="italic line-clamp-2">{allReviews[0].title}</p> */}
            <AccordianComponent review={allReviews[0]} />
          </div>
        )}
        <div className="mt-3 flex items-center justify-between text-xs">
          <VerticalLinks />
          {options.showClaimThisProduct &&
            currentProduct?.business === null && (
              <ClaimProductComponent product={product} />
            )}
          {(options.showWriteReview && !amITheOwner) ||
          (!options.showWriteReview && !amITheOwner) ? (
            <Link
              href={`/cr/?id=${currentProduct?.id}&rating=3`}
              className="text-blue-600 hover:underline"
            >
              Write Review
            </Link>
          ) : (
            <div className="font-light p-1 rounded-md text-gray-800">
              You own this product{" "}
              <Link
                href={`/editproduct?pid=${product.id}`}
                className="hover:bg-gray-300 underline rounded-md transition-colors duration-300"
              >
                Edit it
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
