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
  product: iProduct;
  options: {
    showLatestReview: boolean;
    size: string;
    showWriteReview: boolean;
    showClaimThisProduct: boolean;
  };
}
interface iCalculatedRating {
  roundedRating: number;
  roundedRatingOneDecimalPlace: number;
  numberOfReviews: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, options }) => {
  const [rating, setRating] = useState(0); // Initial value
  const [showModal, setShowModal] = useState(false);

  // const ratingChanged = (newRating: number) => {
  //   setRating(newRating);
  //   setShowModal(true);
  // };


  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reviews", product.id],
    queryFn: () => getReviews(product.id!),
    refetchOnWindowFocus: false,
  }) as any

  const reviews = data?.data as iReview[]
  const totalComments = reviews?.reduce((accumulator, review) => accumulator + review.comments.length, 0);
  if (isLoading) return <LoadingSpinner />
  if (isError) return <p>{error.message}</p>
  let { roundedRating, roundedRatingOneDecimalPlace, numberOfReviews } = calculateAverageReviewRating(reviews) as unknown as iCalculatedRating

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
        <Link href={`/reviews?id=${product.id}`} className=' w-full'>
          {showModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <YesNoAlert message={`Write your own ${rating} star Review?`} />
            </div>
          )}
          <div className="flex justify-start items-center gap-2 w-full">
            {product.display_image && (
              <div className=" flex items-start justify-start">
                <Image
                  src={product.display_image}
                  alt={`${product.name} Image`}
                  className=" rounded-lg w-28 h-28 object-cover"
                  width={121}
                  height={121}
                />
              </div>
            )}
            <div className="mb-2 flex flex-col gap-2">
              <div className="flex flex-col">
                <p className="text-base md:text-xl font-semibold ">{product.name}</p>
                <p className="text-xs md:text-sm text-gray-700">{product.address || product.description}</p>
              </div>
              {reviews && reviews.length > 0 ? <RatingModuleReadOnly
                name={product.id!}
                rating={roundedRating!}
                size={options.size}
              /> : "No Reviews Yet"}
              <div className="flex gap-2">
                <span className={`mr-auto rounded flex items-start text-xs md:text-base`}
                  style={dynamicStyles}
                >{
                    reviews && reviews.length > 0 ?
                      roundedRatingOneDecimalPlace!
                      : <Link href={`/cr/?id=${product.id}&rating=3`} className="hover:underline p-0 ">Write Review</Link>
                  }
                  {
                    reviews && reviews.length > 0 ?
                      ` (${numberOfReviews!} reviews)` : ''
                  }
                </span>
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
        {/* {options.showLatestReview && <Link href={'/products'} className="text-gray-400 hidden md:block">Last Review</Link>} */}
        <div id='reviews_operations_div' className="flex flex-row justify-end items-center ">
          {options.showWriteReview ? (
            <p className="text-gray-400">
              {/* Created: {new Date(product.createdDate).toLocaleDateString()} */}
              <Link href={`/cr/?id=${product.id}&rating=3`} className="text-gray-400 hover:underline"> Write Review</Link>
            </p>
          ) : ''}

        </div>
      </div>
    </div>
  );
};

export default ProductCard;
