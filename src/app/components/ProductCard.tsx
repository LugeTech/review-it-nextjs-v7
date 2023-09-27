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
  const totalComments = reviews?.reduce((accumulator, review) => accumulator + review.comments.length, 0);
  // const filteredReviews = reviews?.filter((review) => review.rating !== null && review.rating !== 0)
  // console.log('filteredReviews', filteredReviews)
  // return (
  //   <div>
  //   </div>
  // )
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
      <Link href={`/reviews/${product.id}`} className='border-b-2 border-myTheme-neutral-100'>
        {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <YesNoAlert message={`Write your own ${rating} star Review?`} />
          </div>
        )}
        <div className="flex justify-start items-center gap-2">
          {product.display_image && (
            <div className="mb-4">
              <Image
                src={product.display_image}
                alt={`${product.name} Image`}
                className=" rounded-lg"
                width={80}
                height={80}
              />
            </div>
          )}
          <div className="mb-4 flex flex-col gap-2">
            <h2 className="text-xl font-semibold ">{product.name}</h2>
            {<RatingModuleReadOnly
              name={product.id!}
              rating={roundedRating!}
              ratingChanged={ratingChanged}
              size={options.size}
            />}
            <div className="flex gap-2">
              <span className={`mr-auto rounded p-1 flex items-start text-xs md:text-base`}
                style={dynamicStyles}
              >{
                  reviews && reviews.length > 0 ?
                    roundedRatingOneDecimalPlace! : 'No Reviews Yet'
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
      <div className="flex text-sm justify-between items-center">
        {options.showWriteReview ? (
          <p className="text-gray-400">
            {/* Created: {new Date(product.createdDate).toLocaleDateString()} */}
            <Link href={`/cr/${product.id}`}> Write Review</Link>
          </p>
        ) : 'Some other stat'}
        {options.showClaimThisProduct && (
          <p className="text-gray-400">{'Claim this product'}</p>
        )}
        {options.showLatestReview && <Link href={'/products'} className="text-gray-400 hidden md:block">Last Review</Link>}
      </div>
    </div>
  );
};

export default ProductCard;
