import React from 'react'
import { iReview } from '../util/Interfaces'
import { FaCamera, FaComment, FaTiktok, FaYoutube } from 'react-icons/fa6'
import { RiVideoFill } from "react-icons/ri";
import { AiFillLike } from 'react-icons/ai';
import Link from 'next/link';

interface reviewStatsProps {
  review: iReview
  setReview: React.Dispatch<React.SetStateAction<iReview>>
}

export default function ReviewStats({ review, setReview }: reviewStatsProps) {
  return (
    <div className="flex w-full gap-2 items-center justify-end text-xs text-gray-500">
      {review.comments?.length > 0 ? (
        <Link
          href={`/fr/${review.id}`}
          onClick={() => setReview(review)}
          className="flex items-center justify-center rounded-md bg-green-300 p-1"
        >
          {review.comments?.length} <FaComment className="ml-1" />
        </Link>
      )
        : null}
      {review.voteCount?.helpfulVotes! > 0 ? (
        <div className="flex items-center justify-center rounded-md bg-yellow-300 p-1">
          <div className="font-light">
            {review.voteCount?.helpfulVotes}
          </div>
          <AiFillLike className="ml-1" />
        </div>
      ) : null}
      {review.videos.length > 0 ? (
        <div className="flex items-center justify-center rounded-md  ">
          {review.videos[0].includes('youtu') ? <FaYoutube className="text-lg text-white bg-red-500" /> : <FaTiktok className="text-lg text-purple-300 bg-black" />}
        </div>
      ) : null}
      {review.images.length > 0 ? (
        <div className="flex items-center justify-center rounded-md bg-blue-300 p-1">
          {review.images.length} <FaCamera className="ml-1" />

        </div>
      ) : null}
    </div>
  )
}
