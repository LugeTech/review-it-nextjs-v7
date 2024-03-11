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
import { ThumbsUpButton } from '@/components/thumbsUpButton';
import { ThumbsDownButton } from '@/components/thumbsDownButton';
import { updateHelpfulVote } from '../util/serverFunctions';
interface ReviewCardProps {
  review: iReview;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { user, createdDate, title, body, rating, helpfulVotes, unhelpfulVotes, comments, product } = review;
  const [reviewAtom, setReview] = useAtom(currentReviewAtom);
  const formattedBody = body.replace(/<p><\/p>/g, '<br>'); // line breaks werent being rendered properly. this fixes that
  const handleHelpfulClick = () => {
    updateHelpfulVote(review.id!);
  };

  return (
    <div className="p-2 border rounded shadow-md mb-2 bg-myTheme-light dark:bg-myTheme-dark hover:shadow-xl">
      <Link href={`/user/${review.user?.id}`} className="hover:bg-zinc-100 inline-flex px-2">
        {/* TODO: Get this user endpoint working */}
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
      <div className="mb-1 px-4  rounded-md p-2 flex flex-col">
        <Link href={`/fr/${review.id}`} onClick={() => setReview(review)} className="hover:underline">
          <h1 className="text-lg font-semibold mb-1">{title}</h1>
        </Link>
        <div className="flex flex-row">
          <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formattedBody) }} className="mb-4 text-sm" />
        </div>
      </div>


      <div className="flex items-center justify-between">
        <div className="flex text-xs md:text-base ml-2">
          <ThumbsUpButton onClick={handleHelpfulClick} count={review.helpfulVotes!} />
          {/* NOTE: decided to only keep helpful for now. */}
          {/* <ThumbsDownButton onClick={handleDislikeClick} count={5} /> */}
        </div>
        <Link href={`/fr/${review.id}`} onClick={() => setReview(review)}>
          <p className="text-gray-600 text-xs">{comments?.length > 0 ? `(${comments?.length} comments)` : '(0) comments'}</p>
        </Link>
      </div>
    </div>
  );
};

export default ReviewCard;
