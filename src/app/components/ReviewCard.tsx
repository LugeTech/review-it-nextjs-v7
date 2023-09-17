'use client';
import React from 'react';
import { iReview } from '../util/Interfaces';
import Image from 'next/image';
import RatingModule from './RatingModule';
import dayjs from 'dayjs';
import DOMPurify from 'dompurify';
import Link from 'next/link';
interface ReviewCardProps {
  review: iReview;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { user, createdDate, title, body, rating, helpfulVotes, unhelpfulVotes, comments, product } = review;
  return (
    <div className="p-4 border rounded shadow-md mb-4">
      <div className="flex items-center mb-2">
        <Image src={user?.avatar || '/logo.png'} alt={user?.id!} width={40} height={40} className="rounded-full mr-2" />
        <div>
          <div className="flex items-center justify-start">
            <span className="font-semibold">{user?.firstName} {user?.lastName}</span><span className="text-gray-600 text-sm ml-2">reviewed {product?.name}</span>
          </div>
          <p className="text-gray-600 text-xs">{dayjs(createdDate.toString()).format('MMMM D, YYYY h:mm A')}</p>
        </div>
      </div>
      <h1 className="text-xl font-semibold mb-2">{title}</h1>
      {/* Sanitize the review body */}
      <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body.substring(0, 250)) }} className="mb-4 text-sm" />
      <Link href={`/reviews/${review.id}`}>
        {body.length > 150 && <span className="text-xs text-gray-600">...read more</span>}
      </Link>
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
