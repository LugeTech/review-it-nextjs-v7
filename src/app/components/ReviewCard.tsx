'use client';
import React from 'react';
import { iReview } from '../util/Interfaces';
import Image from 'next/image';
import RatingModule from './RatingModule';
import dayjs from 'dayjs';
import DOMPurify from 'dompurify';
interface ReviewCardProps {
  review: iReview;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { user, createdDate, title, body, rating, helpfulVotes, unhelpfulVotes, comments } = review;
  console.log('review', review)

  return (
    <div className="p-4 border rounded shadow-md mb-4">
      <div className="flex items-center mb-2">
        <Image src={user?.avatar || '/logo.png'} alt={user?.id!} width={32} height={32} className="rounded-full mr-2" />
        <div>
          <div className="flex items-center justify-start">
            <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
          </div>
          <p className="text-gray-600 text-xs">{dayjs(createdDate.toString()).format('MMMM D, YYYY h:mm A')}</p>
        </div>
      </div>
      <h1 className="text-xl font-semibold mb-2">{title}</h1>
      {/* Sanitize the review body */}
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body.substring(0, 150)) }} className="mb-4 text-sm" />
      {/* <div dangerouslySetInnerHTML={{ __html: review.body }} className="mb-4" /> */}
      {/* <p className="text-gray-700 mb-4">{body.substring(0, 150)}...</p> */}
      <div className="flex items-center">
        <RatingModule
          name={review.id!}
          rating={rating}
          ratingChanged={() => { }}
          size="rating-sm"
        />
        <div className="flex text-xs md:text-base ml-2">
          <button className="mr-2">
            <span className="text-gray-600">({helpfulVotes || 0})</span> up
          </button>
          <button>
            <span className="text-gray-600">({unhelpfulVotes || 0})</span> down
          </button>
        </div>
        <div className="ml-auto">
          <p className="text-gray-600 text-xs">{comments?.length > 0 ? `(${comments?.length} comments)` : '(0) comments'}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
