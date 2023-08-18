"use client"
import React from 'react'
import { iReview } from '../util/Interfaces'
import { useQuery } from '@tanstack/react-query';
import { getReviews } from '../util/serverFunctions';
import LoadingSpinner from './LoadingSpinner';

const Reviews = ({ id }: { id: string }) => {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["review", id],
    queryFn: () => getReviews(id),
    refetchOnWindowFocus: false,
  }) as any
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>{error?.toString()}</p>;
  const reviews = data?.data as iReview[]
  console.log(reviews)

  return (
    <div className='flex flex-col w-full p-2 md:px-28 sm:pt-8 bg-myTheme-light'>
      <div className='flex flex-col w-full lg:flex-row justify-evenly items-center gap-2'>

        <div className='flex flex-col  h-full w-full lg:w-1/4 justify-start items-center gap-2 '>
          {/* space */}
        </div>
        <div className='flex flex-col lg:w-1/2 justify- items-center gap-2 bg-myTheme-base-100 rounded-lg'>
          {reviews[1].title}
        </div>

      </div>
    </div>
  )
}

export default Reviews
