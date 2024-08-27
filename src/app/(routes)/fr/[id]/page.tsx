'use client'
import React from 'react'
import ExpandedReview from '@/app/components/ExpandedReview'
const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <ExpandedReview reviewId={params.id} />
    </div>
  )
}

export default page
