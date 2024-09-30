'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import ExpandedReview from '@/app/components/ExpandedReview'
const Page = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const productId = searchParams.get('productid')
  const cId = searchParams.get('cid')
  return (
    <div className="max-w-5xl mx-auto w-full">
      <ExpandedReview reviewId={id || ""} productId={productId || ""} cId={cId || ""} />
    </div>
  )
}

export default Page
