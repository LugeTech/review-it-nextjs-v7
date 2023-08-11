'use client'
import React from 'react'
import { useQuery, } from "@tanstack/react-query";
import { getReviews } from "@/app/util/serverFunctions"
const Page = () => {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error?.toString()}</p>;
  console.log(data)
  return (
    <div>
      <h1>Review</h1>
      {data.data?.map((item: any) => {
        console.log(item)
        return (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <p>{item.rating}</p>
            <p>{`Rating ${item.rating}`}</p>
            <br />
          </div>
        )
      }
      )

      }
    </div>
  )
}

export default Page
