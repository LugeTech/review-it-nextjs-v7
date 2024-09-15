"use client";
import { iProduct, iReview } from "@/app/util/Interfaces";
import Image from "next/legacy/image";
import RatingModuleReadOnly from "./RatingModuleReadOnly";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../util/serverFunctions";
import { calculateAverageReviewRating } from "../util/calculateAverageReviewRating";
import LoadingSpinner from "./LoadingSpinner";
import VerticalLinks from "./VerticalLinks";
import { useRouter } from "next/navigation";
import ClaimProductComponent from "./ClaimProductComponent";

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

const ratingColors = {
  1: "bg-red-500",
  2: "bg-orange-500",
  3: "bg-yellow-500",
  4: "bg-lime-500",
  5: "bg-green-500",
};

const ProductCardExtended: React.FC<ProductCardProps> = ({
  reviews,
  options,
  product,
}) => {
  const router = useRouter();
  const currentProduct =
    reviews && reviews.length > 0 ? reviews[0].product : product;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reviews", currentProduct?.id],
    queryFn: () => getReviews(currentProduct?.id!),
    refetchOnWindowFocus: false,
    enabled: !!currentProduct && !reviews,
  }) as any;

  const allReviews = reviews || data?.data.reviews || [];

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>{error.message}</p>;

  let { roundedRating, roundedRatingOneDecimalPlace, numberOfReviews } =
    calculateAverageReviewRating(allReviews) as unknown as iCalculatedRating;
  console.log(currentProduct);
  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-4xl border border-gray-200 bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
        <Link
          href={`/reviews?id=${currentProduct?.id}`}
          className="flex flex-col sm:flex-row items-start sm:space-x-3"
        >
          {currentProduct?.display_image && (
            <div className="flex-shrink-0 w-full sm:w-auto mb-2 sm:mb-0">
              <Image
                src={currentProduct.display_image}
                alt={`${currentProduct.name} Image`}
                width={64}
                height={64}
                className="rounded-md object-cover w-full sm:w-16 h-16"
              />
            </div>
          )}
          <div className="flex flex-col min-w-0 w-full">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 break-words">
              {currentProduct?.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 break-words">
              {currentProduct?.address}
            </p>
            <p className="text-xs text-gray-500 mt-1 line-clamp-10 break-words">
              {currentProduct?.description}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {allReviews.length > 0 ? (
                <>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium text-white ${ratingColors[roundedRating as keyof typeof ratingColors]
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
          </div>
        </Link>
        <div className="mt-3 flex flex-wrap items-center justify-between text-xs gap-2">
          <VerticalLinks />
          <div className="flex gap-2 justify-end items-center text-sm">
            {options.showClaimThisProduct && (currentProduct?.businessId === null) && <ClaimProductComponent product={currentProduct} />}
            {options.showWriteReview ? (
              <Link
                href={`/cr/?id=${currentProduct?.id}&rating=3`}
                className="text-blue-600 hover:underline w-full h-full"
              >
                Write Review
              </Link>
            ) : (
              <button className="text-red-600 hover:underline">
                Report Product
              </button>
            )}
          </div>
        </div>
      </div>
    </div >
  );
};

export default ProductCardExtended;
