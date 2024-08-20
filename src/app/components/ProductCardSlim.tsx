"use client";
import { iProduct, iReview } from "@/app/util/Interfaces"; // Update with the actual path
import Image from "next/legacy/image";
import RatingModuleMini from "./RatingModuleMini";
import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../util/serverFunctions";
import { calculateAverageReviewRating } from "../util/calculateAverageReviewRating";
import LoadingSpinner from "./LoadingSpinner";
import { Rating } from "@mantine/core";

interface ProductCardProps {
  product: iProduct;
  options: {
    size: string;
  };
}
interface iCalculatedRating {
  roundedRating: number;
  roundedRatingOneDecimalPlace: number;
  numberOfReviews: number;
}

const ProductCardSlim: React.FC<ProductCardProps> = ({ product, options }) => {
  const [_, setRating] = useState(0);
  const ratingChanged = (newRating: number) => {
    setRating(newRating);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reviews", product.id],
    queryFn: () => getReviews(product.id!),
    refetchOnWindowFocus: false,
  }) as any;

  const reviews = data?.data.reviews as iReview[];
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>{error.message}</p>;
  let { roundedRating, roundedRatingOneDecimalPlace, numberOfReviews } =
    calculateAverageReviewRating(reviews) as unknown as iCalculatedRating;

  let productAddress = "";
  let productDescription = "";
  if (product.address) {
    productAddress = product.address;
  }
  if (product.description) {
    productDescription = product.description;
  }
  return (
    <div className="flex w-full flex-col items-start justify-start rounded-lg bg-myTheme-lightbg p-1 text-myTheme-lightTextBody shadow-md hover:bg-myTheme-success ">
      <Link
        href={`/reviews?id=${product.id}`}
        className="  w-full"
      >
        <div className="flex h-full items-center justify-start gap-2">
          {product.display_image && (
            <div className="flex h-20 w-20 items-center justify-center object-cover">
              <Image
                src={product.display_image}
                alt={`${product.name} Image`}
                className=" h-16 w-16 rounded-lg object-contain"
                width={64}
                height={64}
              />
            </div>
          )}
          <div className="flex h-full w-full items-center justify-start">
            <div className="flex w-full flex-col">
              <p className="text-left text-sm font-semibold text-black ">
                {product.name}
              </p>
              <div className="flex items-center justify-start gap-1 text-[10px] font-thin text-myTheme-lightTextBody  sm:text-xs ">
                <div className="flex flex-nowrap items-center justify-start text-left">
                  {productAddress.length > 40
                    ? productAddress.slice(0, 40) + "..."
                    : productAddress}
                </div>
              </div>
              <div className="text-left text-[10px] font-thin text-myTheme-lightTextBody  sm:text-xs ">
                {/* {product.telephone !== null ? "# " : ""} */}
                {productDescription.length > 80
                  ? productDescription.slice(0, 80) + "..."
                  : productDescription}
              </div>
              <div className="text-left text-[10px] font-thin text-myTheme-lightTextBody  sm:text-xs ">
                {/* {product.telephone !== null ? "# " : ""} */}
                {product.telephone}
              </div>
            </div>
          </div>
          <div className="flex h-full w-auto flex-col items-start justify-start ">
            <div className="flex  h-auto w-auto items-start justify-center">
              <p className="text-cente text-[10px] font-thin text-myTheme-lightTextBody/50 ">
                {numberOfReviews ? numberOfReviews : 0} reviews
              </p>
            </div>
            <div className="flex  h-auto w-auto items-center justify-start gap-1 ">
              {roundedRating ? (
                <RatingModuleMini
                  name={product.id!}
                  rating={roundedRating!}
                  ratingChanged={ratingChanged}
                  size={options.size}
                />
              ) : (
                ""
              )}
              <p className="flex items-start justify-start text-xs font-semibold text-myTheme-lightTextBody ">
                {roundedRatingOneDecimalPlace}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCardSlim;
