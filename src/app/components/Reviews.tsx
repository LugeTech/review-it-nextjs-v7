"use client"
import Image from 'next/image';
import { iReview } from '../util/Interfaces'
import { useQuery } from '@tanstack/react-query';
import { getReviews } from '../util/serverFunctions';
import LoadingSpinner from './LoadingSpinner';
import ProductCard from './ProductCard';
import DOMPurify from 'dompurify';
import RatingModule from './RatingModule';
import dayjs from 'dayjs';
import 'dayjs/locale/en'; // Import the English locale
import ReviewCard from './ReviewCard';
import { useAtom } from 'jotai';
import { currentProductAtom } from '../store/store';


const Reviews = ({ productId }: { productId: string }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getReviews(productId),
    refetchOnWindowFocus: false,
  }) as any

  const [currentProduct, setCurrentProduct] = useAtom(currentProductAtom);
  const productCardOptions = {
    showLatestReview: false,
    size: 'rating-md',
    showWriteReview: true,
    showClaimThisProduct: true,
  }

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>{error?.toString()}</p>;
  const reviews = data?.data as iReview[]

  return (
    <div className='flex flex-col w-full p-2 md:px-28 sm:pt-8 bg-myTheme-light'>
      {/* <div>{reviews[0].product?.name} Reviews</div> */}
      {currentProduct ? <ProductCard
        // choosing the first review should be fine, just need to deal with 0 reviews
        product={currentProduct}
        options={productCardOptions}
      /> : <div>Something went wrong</div>}
      <div className='flex flex-col w-full lg:flex-row justify-evenly items-center gap-2'>
      </div>
      <div className="space-y-6 mt-4">
        {reviews.map((review: iReview) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
}

export default Reviews
