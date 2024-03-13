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
"use client"
import { iProduct, iReview } from '@/app/util/Interfaces'; // Update with the actual path
import Image from 'next/image';
import RatingModuleReadOnly from './RatingModuleReadOnly';
import { useState } from 'react';
import Link from 'next/link';
import YesNoAlert from './YesNoAlert';
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

const ProductCard: React.FC<ProductCardProps> = ({ reviews, options, product }) => {
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
    <div className="flex flex-col w-full rounded-lg shadow-md p-4 bg-myTheme-lightbg dark:bg-myTheme-dark text-myTheme-dark">
      <div className="flex flex-row bg-myTheme-lightbg dark:bg-myTheme-dark text-myTheme-dark">
        <Link href={`/reviews?id=${currentProduct?.id}`} className=' w-full bg-myTheme-lightbg dark:bg-myTheme-dark text-myTheme-dark'>
          <div className="flex justify-start items-center gap-2 w-full bg-myTheme-lightbg dark:bg-myTheme-dark text-myTheme-dark dark:text-myTheme-light">
            {currentProduct?.display_image && (
              <div className=" flex items-start justify-start bg-myTheme-lightbg dark:bg-myTheme-dark text-myTheme-dark dark:text-myTheme-light">
                <Image
                  src={currentProduct.display_image}
                  alt={`${currentProduct.name} Image`}
                  className=" rounded-lg w-24 h-24 object-cover "
                  width={96}
                  height={96}
                />
              </div>
            )}
            <div className="mb-2 flex flex-col gap-2">
              <div className="flex flex-col">
                <p className="text-base md:text-xl font-semibold ">{currentProduct?.name}</p>
                <p className="text-xs md:text-sm text-myTheme-dark dark:text-myTheme-light">{currentProduct?.address || currentProduct?.description}</p>
              </div>
              {allReviews.length > 0 ? (
                <RatingModuleReadOnly
                  name={currentProduct?.id!}
                  rating={roundedRating!}
                  size={options.size}
                />
              ) : (
                "No Reviews Yet"
              )}
              <div className="flex gap-2">
                <span className={`rounded flex items-start text-xs md:text-base px-1`} style={dynamicStyles}>
                  {allReviews.length > 0 ? (
                    <>
                      {roundedRatingOneDecimalPlace!}
                      {`(${numberOfReviews!} reviews)`}
                    </>
                  ) : (
                    ""
                  )}
                </span>
                {allReviews.length === 0 && (
                  <Link href={`/cr/?id=${currentProduct?.id}&rating=3`} className="hover:underline p-0 ">
                    Write Review
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
                Write Review
              </Link>
            </p>
          ) : ''}
        </div>
      </div>
    </div>
  )
};

export default ProductCard;
