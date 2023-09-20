'use client';
import React from 'react';
import { iReview } from '../util/Interfaces';
import Image from 'next/image';
import RatingModule from './RatingModule';
import dayjs from 'dayjs';
import DOMPurify from 'dompurify';
import Link from 'next/link';
import { useAtom } from "jotai";
import { currentReviewAtom } from "../store/store";

interface ReviewCardProps {
  review: iReview;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { user, createdDate, title, body, rating, helpfulVotes, unhelpfulVotes, comments, product } = review;
  const [reviewAtom, setReview] = useAtom(currentReviewAtom);
  return (
    <div className="p-4 border rounded shadow-md mb-4">
      <Link href={`/user/${review.user?.id}`} className="hover:bg-zinc-100 inline-flex px-2">
        <div className="inline-flex items-center mb-2 ">
          <Image src={user?.avatar || '/logo.png'} alt={user?.id!} width={40} height={40} className="rounded-full mr-2" />
          <div>
            <div className="flex items-center justify-start">
              <span className="font-semibold">{user?.firstName} {user?.lastName}</span><span className="text-gray-600 text-sm ml-2">reviewed {product?.name}</span>
            </div>
            <p className="text-gray-600 text-xs">{dayjs(createdDate.toString()).format('MMMM D, YYYY h:mm A')}</p>
          </div>
        </div>
      </Link>
      {/* Sanitize the review body */}
      <Link href={`/fullreview/${review.id}`} onClick={() => setReview(review)}>

        <div className="mb-4 px-4 hover:bg-zinc-100 rounded-md p-2 flex flex-col">
          <h1 className="text-lg font-semibold mb-1">{title}</h1>
          <div className="flex flex-row">
            {/* <span className='mr-1 text-3xl'>"</span> */}
            <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }} className="mb-4 text-sm" />
            {/* <span className='mr-1 text-3xl'>"</span> */}
          </div>
          <RatingModule
            name={review.id!}
            rating={rating}
            ratingChanged={() => { }}
            size="rating-sm"
          />

        </div>
      </Link>

      <div className="flex items-center">
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
