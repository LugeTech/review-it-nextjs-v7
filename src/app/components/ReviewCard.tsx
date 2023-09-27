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
    <div className="p-4 border rounded shadow-md mb-4 bg-myTheme-light dark:bg-myTheme-dark hover:shadow-xl">
      <Link href={`/user/${review.user?.id}`} className="hover:bg-zinc-100 inline-flex px-2">
        <div className="p-2 inline-flex items-center mb-2 border-b-2 border-gray-100 ">
          <Image src={user?.avatar || '/logo.png'} alt={user?.id!} width={40} height={40}
            className=" rounded-full object-cover w-[60px] h-[60px] mr-1"
          />
          <div >
            <div className="flex items-center justify-start">
              <span className="font-semibold text-sm">@{user?.userName}</span><span className="text-gray-600 text-xs ml-1">reviewed {product?.name}</span>
            </div>
            <p className="text-gray-600 text-xs">{dayjs(createdDate?.toString()).format('MMMM D, YYYY h:mm A')}</p>
          </div>

        </div>
      </Link>
      <div className="flex ml-4">
        <RatingModule
          name={review.id!}
          rating={rating}
          ratingChanged={() => { }}
          size="rating-sm"
        />
      </div>
      {/* Sanitize the review body */}

      <div className="mb-4 px-4  rounded-md p-2 flex flex-col">
        <Link href={`/fr/${review.id}`} onClick={() => setReview(review)} className="hover:underline">
          <h1 className="text-lg font-semibold mb-1">{title}</h1>
        </Link>
        <div className="flex flex-row">
          {/* <span className='mr-1 text-3xl'>"</span> */}
          <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }} className="mb-4 text-sm" />
          {/* <span className='mr-1 text-3xl'>"</span> */}
        </div>
      </div>


      <div className="flex items-center">
        <div className="flex text-xs md:text-base ml-2">
          <button className="mr-2">
            <span className="text-gray-600">({helpfulVotes || 0})</span> up
          </button>
          <button>
            <span className="text-gray-600">({unhelpfulVotes || 0})</span> down
          </button>
        </div>
        <Link href={`/fr/${review.id}`} className="ml-auto">
          <p className="text-gray-600 text-xs hover:underline">{comments?.length > 0 ? `(${comments?.length} comments)` : '(0) comments'}</p>
        </Link>
      </div>
    </div>
  );
};

export default ReviewCard;
