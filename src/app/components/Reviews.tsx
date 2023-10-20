"use client"
import { iReview } from '../util/Interfaces'
import { useQuery } from '@tanstack/react-query';
import { getReviews } from '../util/serverFunctions';
import LoadingSpinner from './LoadingSpinner';
import ProductCard from './ProductCard';
import 'dayjs/locale/en'; // Import the English locale
import ReviewCard from './ReviewCard';
import Link from 'next/link';
import WriteAReview from './WriteAReview';

const Reviews = ({ productId }: { productId: string }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getReviews(productId),
    refetchOnWindowFocus: false,
  }) as any

  const productCardOptions = {
    showLatestReview: false,
    size: 'rating-md',
    showWriteReview: true,
    showClaimThisProduct: true,
  }

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>{error?.toString()}</p>;
  const reviews = data?.data as iReview[]
  if (reviews.length === 0) return <Link href={`/cr?id=${productId}&rating=3`} className='text-center underline'>No reviews yet click here to add one</Link>

  return (
    <div className='flex flex-col w-full h-full p-2 md:px-28 sm:pt-8 '>
      <div className='flex w-full md:w-1/2 mx-auto '>
        <ProductCard
          // choosing the first review should be fine, just need to deal with 0 reviews
          product={reviews[0]?.product!}
          options={productCardOptions}
        />
      </div>
      <div className='flex flex-col md:flex-row w-full justify-between items-center '>
        <WriteAReview />
      </div>
      <div className='flex flex-col  w-full justify-between items-center '>
        <div className="space-y-6 mt-4 w-full md:w-1/2  ">
          <div className='flex  justify-center items-center '>
            <p className='text-center'>Reviews</p>
          </div>
          {reviews.map((review: iReview) => (
            // NOTE reviewcard here
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reviews



