import React from 'react'
import ExpandedReview from '@/app/components/ExpandedReview'
const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <ExpandedReview reviewId={params.id} />
    </div>
  )
}

export default page
