"use client";
import { iProduct, iReview } from "@/app/util/Interfaces"; // Update with the actual path
import Image from "next/image";
import RatingModuleMini from "./RatingModuleMini";
import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../util/serverFunctions";
import { calculateAverageReviewRating } from "../util/calculateAverageReviewRating";
import LoadingSpinner from "./LoadingSpinner";

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
  const [_, setRating] = useState(0); // Initial value
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

  let dynamicStyles: any = {};
  if (roundedRating >= 4) {
    dynamicStyles.backgroundColor = "#00FF00";
    dynamicStyles.color = "#006400";
  } else if (roundedRating === 3) {
    dynamicStyles.backgroundColor = "#FFFF00";
    dynamicStyles.color = "#000000";
  } else if (roundedRating <= 2) {
    dynamicStyles.backgroundColor = "#FF0000";
    dynamicStyles.color = "#FFFFFF";
  }
  //NOTE: this is a hack and we should have it.
  let productAddress = "";
  if (product.address) {
    productAddress = product.address;
  }
  return (
    <div className="flex hover:bg-myTheme-base-100 flex-col w-full rounded-lg shadow-md p-1 text-myTheme-lightTextBody bg-myTheme-lightbg dark:bg-myTheme-niceGrey dark:text-myTheme-darkTextBody justify-start items-start">
      <Link
        href={`/reviews?id=${product.id}`}
        className="   dark:hover:bg-myTheme-darkbg/60  w-full"
      >
        <div className="flex justify-start items-center gap-2">
          {product.display_image && (
            <div className="flex justify-center items-center w-20 h-20 object-cover">
              <Image
                src={product.display_image}
                alt={`${product.name} Image`}
                className=" rounded-lg w-16 h-16 object-contain"
                width={64}
                height={64}
              />
            </div>
          )}
          <div className="flex w-full h-full justify-start items-center">
            <div className="flex flex-col w-full">
              <h2 className="text-sm text-black dark:text-myTheme-darkTextBody font-semibold flex justify-start items-start">
                {product.name}
              </h2>
              <h2 className="text-xs text-myTheme-lightTextBody dark:text-myTheme-darkTextBody text-left font-thin flex justify-start items-start">
                {productAddress.length > 100
                  ? productAddress.slice(0, 100) + "..."
                  : productAddress}
              </h2>
            </div>
            <div className="flex flex-col h-full w-auto justify-center items-center ">
              <div className="flex  h-full w-auto justify-center items-center gap-1 ">
                {
                  <RatingModuleMini
                    name={product.id!}
                    rating={roundedRating!}
                    ratingChanged={ratingChanged}
                    size={options.size}
                  />
                }
                <p className="text-sm text-myTheme-lightTextBody dark:text-myTheme-darkTextBody font-semibold flex justify-start items-start">
                  {roundedRatingOneDecimalPlace}{" "}
                </p>
              </div>
              <div className="flex  h-full w-auto justify-center items-center flex-nowrap">
                <p className="text-[10px] text-myTheme-lightTextBody dark:text-myTheme-darkTextBody font-thin text-cente">
                  {numberOfReviews} reviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCardSlim;
