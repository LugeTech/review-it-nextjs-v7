"use client"
import { iProduct, iReview } from '@/app/util/Interfaces'; // Update with the actual path
import Image from 'next/image';
import RatingModule from './RatingModule';
import { useState } from 'react';
import Link from 'next/link';
import YesNoAlert from './YesNoAlert';
import { useQuery } from '@tanstack/react-query';
import { getReviews } from '../util/serverFunctions';
import { calculateAverageReviewRating } from '../util/calculateAverageReviewRating';
import LoadingSpinner from './LoadingSpinner';

interface ProductCardProps {
  product: iProduct;
  options: {
    showLatestReview: boolean;
    size: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product, options }) => {
  const [rating, setRating] = useState(0); // Initial value
  const [showModal, setShowModal] = useState(false);
  const ratingChanged = (newRating: number) => {
    setRating(newRating);
    setShowModal(true);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reviews", product.id],
    queryFn: () => getReviews(product.id!),
    refetchOnWindowFocus: false,
  }) as any
  const reviews = data?.data as iReview[]
  if (isLoading) return <LoadingSpinner />
  if (isError) return <p>{error.message}</p>
  let calculaterRating = calculateAverageReviewRating(reviews)
  console.log(calculaterRating)
  return (
    <div className="flex flex-col w-full rounded-lg shadow-md p-4">
      <Link href={`/reviews/${product.id}`} className='border-b-2 border-myTheme-neutral-100'>
        {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <YesNoAlert message={`Write your own ${rating} star Review?`} />
          </div>
        )}
        <div className="flex justify-start items-center gap-2">
          {product.images && product.images.length > 0 && (
            <div className="mb-4">
              <Image
                src={product.images[0]}
                alt={`${product.name} Image`}
                className=" rounded-lg"
                width={80}
                height={80}
              />
            </div>
          )}
          <div className="mb-4 flex flex-col gap-2">
            <h2 className="text-xl font-semibold ">{product.name}</h2>
            {<RatingModule
              name={product.id!}
              rating={calculaterRating.roundedRating}
              ratingChanged={ratingChanged}
              size={options.size}
            />}
            <p className="text-gray-500  text-xs md:text-base">{
              reviews && reviews.length > 0 ?
                calculaterRating.roundedRatingOneDecimalPlace : 'No Reviews Yet'
            }</p>
          </div>
        </div>
      </Link>
      <div className="flex justify-between items-center">
        {product.createdDate && (
          <p className="text-gray-400">
            {/* Created: {new Date(product.createdDate).toLocaleDateString()} */}
            <Link href={`/createreview/${product.id}`}> Write a Review</Link>
          </p>
        )}
        {product.address && (
          <p className="text-gray-400">{product.address}</p>
        )}
        {options.showLatestReview && <Link href={'/products'} className="text-gray-400 ">Latest Review</Link>}
      </div>
    </div>
  );
};

export default ProductCard;
