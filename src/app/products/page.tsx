'use client'
import React from 'react'
import { useQuery, } from "@tanstack/react-query";
import { getReviews } from "@/app/util/serverFunctions"
import { ReviewUserAndItem } from '@/app/util/Interfaces';
import ProductCard from '../components/ProductCard';
const Page = () => {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error?.toString()}</p>;
  console.log(data)
  return (
    <div className='flex flex-col sm:max-w-5xl mx-auto p-2 sm:p-4'>
      {data.data?.map((item: ReviewUserAndItem) => {
        console.log(item)
        return (
          <div key={item.item.itemId} className='flex flex-col w-full bg-red-300 px-2 mx-auto mb-4 rounded-md'>
            <ProductCard product={item.item} />
            {/* <h3>{item.title}</h3> */}
            {/* <p>{item.body}</p> */}
            {/* <p>{item.rating}</p> */}
            {/* <p>{`Rating ${item.rating}`}</p> */}
            {/* <br /> */}
          </div>
        )
      }
      )

      }
    </div>
  )
}

export default Page
