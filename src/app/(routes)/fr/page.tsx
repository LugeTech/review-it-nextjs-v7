'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import ExpandedReview from '@/app/components/ExpandedReview'
const page = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const productId = searchParams.get('productId')
  return (
    <div className="max-w-5xl mx-auto">
      <ExpandedReview reviewId={id || ""} productId={productId || ""} />
    </div>
  )
}

export default page
