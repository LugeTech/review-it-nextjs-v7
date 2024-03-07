'use client'
import { iProduct, iUser } from '@/app/util/Interfaces';
import { getUser } from "@/app/util/serverFunctions";
import { useQuery, } from "@tanstack/react-query";
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from "@clerk/nextjs";
import Image from 'next/image'
import RatingModule from './RatingModule';
import { useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';

const Page = () => {
  const [rating, setRating] = useState(3); // Initial value
  const auth = useAuth();
  const searchParams = useSearchParams()


  const id = searchParams.get('id')!
  const router = useRouter()
  const ratingChanged = (newRating: number) => {
    setRating(newRating);

    // console.log(`/cr/?id=${id}&rating=${newRating}`)
    router.push(`/cr/?id=${id}&rating=${newRating}`)
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", auth.userId],
    queryFn: async () => await getUser(),
    refetchOnWindowFocus: false,
  }) as any

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>{error?.toString()}</p>;
  const user: iUser | undefined = data?.data as iUser

  return (
    <div className='flex flex-col w-full rounded-lg shadow-sm p-2 mt-2 justify-center items-center border-b-2 border-gray-200  '>
      <div className='flex flex-row gap-2 items-center'>
        <Image src={user?.avatar!} width={48} height={48} alt='avatar' className='rounded-full w-12 h-12' />
        <p className='text-sm'>{user?.userName} write a review now!</p>
      </div>
      <p className='text-sm'>How many stars?</p>
      {<RatingModule
        name={Date.now().toString()}
        rating={0}
        ratingChanged={ratingChanged}
        size={'rating-lg'}
      />}


    </div>
  )
}
export default Page
