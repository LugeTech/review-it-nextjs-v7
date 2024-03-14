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
import { updateHelpfulVote } from '../util/serverFunctions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from "@clerk/nextjs";
import { MdOutlineThumbUp } from "react-icons/md";
interface ReviewCardProps {
  review: iReview;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { user, createdDate, title, body, rating, helpfulVotes, comments, product, voteCount } = review;
  const [reviewAtom, setReview] = useAtom(currentReviewAtom);
  const formattedBody = body.replace(/<p><\/p>/g, '<br>'); // NOTE: line breaks werent being rendered properly. this fixes that
  const queryClient = useQueryClient();
  const [hideButtom, setHideButtom] = React.useState(false);
  const userData = useUser();
  const userInDbId = userData.user?.publicMetadata.id as unknown as string
  const helpfulData = {
    reviewId: review.id!,
    userInDbId
  }

  const mutation = useMutation({
    mutationFn: () => updateHelpfulVote(helpfulData),
    onMutate: async () => {
      // Update the local state optimistically
      voteCount!.helpfulVotes! += 1
      setHideButtom(true)
      queryClient.setQueryData([review.id], reviewAtom);
      return { reviewAtom };
    },
    onError: (err, variables, context) => {
      //NOTE: Reset to the previous state on error not tested
      if (context) {
        queryClient.setQueryData(['review', review.id], context);
      }
    },

  },)

  const handleHelpfulClick = () => {
    mutation.mutate();
  };

  const hasUserLiked = review.likedBy.some((user) => user.id === userInDbId);

  return (
    <div className="px-2 pb-2 rounded shadow-md mb-2 bg-myTheme-light dark:bg-myTheme-dark hover:shadow-xl">
      <Link href={`/user/${review.user?.id}`} className="hover:bg-zinc-100 inline-flex px-2">
        {/* TODO: Get this user endpoint working */}
        <div className="p-2 inline-flex items-center mb-2 border-b-2 border-gray-100 ">
          <Image src={user?.avatar || '/logo.png'} alt={user?.id!} width={40} height={40}
            className=" rounded-full object-cover w-[60px] h-[60px] mr-1"
          />
          <div className="flex flex-col items-start justify-center ml-2">
            <div className="flex flex-col items-center justify-start">
              <p className="font-semibold text-sm">@{user?.userName}</p>
              {/* <p className="text-gray-600 text-xs ml-1">reviewed {product?.name}</p> */}
            </div>
            <p className="text-gray-600 dark:text-gray-600 text-xs">{dayjs(createdDate?.toString()).format('MMMM D, YYYY h:mm A')}</p>
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
      <div className=" px-4  rounded-md p-2 flex flex-col">
        <Link href={`/fr/${review.id}`} onClick={() => setReview(review)} className="hover:underline">
          <h1 className="text-lg text-myTheme-dark dark:text-myTheme-light font-semibold mb-1">{title}</h1>
        </Link>
        <div className="flex flex-row">
          <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formattedBody) }} className="mb-4 text-myTheme-dark dark:text-gray-400 text-sm" />
        </div>
      </div>


      <div className="flex items-center justify-between">
        <div className="flex font-semibold text-base md:text-lg ml-4 text-center items-center justify-center gap-1 text-green-500">
          {/*FIX: currently if i vote then write a comment i can vote again*/}
          {hasUserLiked || hideButtom ? voteCount?.helpfulVotes! : <ThumbsUpButton onClick={handleHelpfulClick} count={voteCount?.helpfulVotes!} />} {hasUserLiked || hideButtom ? <MdOutlineThumbUp /> : ""}
        </div>
        <Link href={`/fr/${review.id}`} onClick={() => setReview(review)}>
          <p className="text-myTheme-dark dark:text-gray-400 text-xs">{comments?.length > 0 ? `(${comments?.length} comments)` : '(0) comments'}</p>
        </Link>
      </div>
    </div>
  );
};

export default ReviewCard;
