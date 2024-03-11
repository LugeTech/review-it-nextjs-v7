
"use client"
import { iProduct, iReview } from '@/app/util/Interfaces';
import Image from 'next/image';
import RatingModuleReadOnly from './RatingModuleReadOnly';
import { useState } from 'react';
import Link from 'next/link';
// import YesNoAlert from './YesNoAlert';
import { useQuery } from '@tanstack/react-query';
import { getReviews } from '../util/serverFunctions';
import { calculateAverageReviewRating } from '../util/calculateAverageReviewRating';
import LoadingSpinner from './LoadingSpinner';
import VerticalLinks from './VerticalLinks';

interface ProductCardProps {
  reviews?: iReview[] | null
  options: {
    showLatestReview: boolean;
    size: string;
    showWriteReview: boolean;
    showClaimThisProduct: boolean;
  };
  product?: iProduct | null
}
interface iCalculatedRating {
  roundedRating: number;
  roundedRatingOneDecimalPlace: number;
  numberOfReviews: number;
}

const ProductCardExtended: React.FC<ProductCardProps> = ({ reviews, options, product }) => {
  const [showModal, setShowModal] = useState(false);

  const currentProduct = reviews && reviews.length > 0 ? reviews[0].product : product;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reviews", currentProduct?.id],
    queryFn: () => getReviews(currentProduct?.id!),
    refetchOnWindowFocus: false,
    enabled: !!currentProduct && !reviews,
  }) as any

  const allReviews = reviews || data?.data.reviews || [];
  // const totalComments = allReviews.reduce((accumulator, review) => accumulator + review.comments.length, 0);

  if (isLoading) return <LoadingSpinner />
  if (isError) return <p>{error.message}</p>

  let { roundedRating, roundedRatingOneDecimalPlace, numberOfReviews } = calculateAverageReviewRating(allReviews) as unknown as iCalculatedRating

  let dynamicStyles: any = {};
  if (roundedRating >= 4) {
    dynamicStyles.backgroundColor = '#00FF00';
    dynamicStyles.color = '#006400';
  } else if (roundedRating === 3) {
    dynamicStyles.backgroundColor = '#FFFF00';
    dynamicStyles.color = '#000000';
  } else if (roundedRating <= 2) {
    dynamicStyles.backgroundColor = '#FF0000';
    dynamicStyles.color = '#FFFFFF';
  }

  return (
    <div className="flex flex-col w-full rounded-lg shadow-md p-4 bg-white">
      <div className="flex flex-row">
        <Link href={`/reviews?id=${currentProduct?.id}`} className=' w-full'>
          <div className="flex justify-start items-center gap-2 w-full">
            {currentProduct?.display_image && (
              <div className=" flex items-start justify-start">
                <Image
                  src={currentProduct.display_image}
                  alt={`${currentProduct.name} Image`}
                  className=" rounded-lg w-24 h-24 object-cover"
                  width={96}
                  height={96}
                />
              </div>
            )}
            <div className="mb-2 flex flex-col gap-2">
              <div className="flex flex-col">
                <p className="text-base md:text-xl font-semibold ">{currentProduct?.name}</p>
                <p className="text-xs md:text-sm text-gray-700">{currentProduct?.address || currentProduct?.description}</p>
              </div>
              {allReviews.length > 0 ? (
                <RatingModuleReadOnly
                  name={currentProduct?.id!}
                  rating={roundedRating!}
                  size={options.size}
                />
              ) : (
                "No ratings yet"
              )}
              <div className="flex gap-1 text-xs md:text-base">
                <span className={`mr-0 rounded flex items-start `} style={dynamicStyles}>
                  {allReviews.length > 0 ? (
                    <>
                      {roundedRatingOneDecimalPlace!}
                      {`(${numberOfReviews!} reviews)`}
                    </>
                  ) : (
                    "No Reviews"
                  )}
                </span>
                {allReviews.length === 0 && (
                  <Link href={`/cr/?id=${currentProduct?.id}&rating=3`} className="hover:underline p-0 ">
                    write first review
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Link>
        <VerticalLinks />
      </div>
      <div className="flex text-xs md:text-base justify-between items-center border-t-2">
        {options.showClaimThisProduct && (
          <p className="text-gray-400 hover:underline ">{'Claim this product'}</p>
        )}
        <div id='reviews_operations_div' className="flex flex-row justify-end items-center ">
          {options.showWriteReview ? (
            <p className="text-gray-400">
              <Link href={`/cr/?id=${currentProduct?.id}&rating=3`} className="text-gray-400 hover:underline">
                Write First Review
              </Link>
            </p>
          ) : ''}
        </div>
      </div>
    </div>
  )
};

export default ProductCardExtended;
