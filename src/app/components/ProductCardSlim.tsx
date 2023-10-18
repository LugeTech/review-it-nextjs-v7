"use client"
import { iProduct, iReview } from '@/app/util/Interfaces'; // Update with the actual path
import Image from 'next/image';
import RatingModule from './RatingModule';
import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getReviews } from '../util/serverFunctions';
import { calculateAverageReviewRating } from '../util/calculateAverageReviewRating';
import LoadingSpinner from './LoadingSpinner';

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
  const [rating, setRating] = useState(0); // Initial value
  const ratingChanged = (newRating: number) => {
    setRating(newRating);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reviews", product.id],
    queryFn: () => getReviews(product.id!),
    refetchOnWindowFocus: false,
  }) as any

  const reviews = data?.data as iReview[]
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
    <div className="flex flex-col w-full rounded-lg shadow-md p-2 bg-white justify-start items-start">
      <Link href={`/reviews/${product.id}`} className='flex w-full'>
        <div className="flex justify-start items-center gap-2">
          {product.display_image && (
            <div className="mb-2">
              <Image
                src={product.display_image}
                alt={`${product.name} Image`}
                className=" rounded-lg"
                width={50}
                height={50}
              />
            </div>
          )}
          <div className="mb-1 flex flex-col gap-2">
            <h2 className="text-md font-semibold ">{product.name}</h2>
            {<RatingModule
              name={product.id!}
              rating={roundedRating!}
              ratingChanged={ratingChanged}
              size={options.size}
            />}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCardSlim;
