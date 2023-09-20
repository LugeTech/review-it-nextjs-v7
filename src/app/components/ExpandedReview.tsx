'use client';
// import { currentReviewAtom } from '@/app/store/store';
import CommentForm from './CommentForm';
import { useState } from 'react';
import ReviewCard from './ReviewCard';
import { useAtom } from "jotai";
import { currentReviewAtom } from "../store/store";
import { useQuery } from '@tanstack/react-query';
import { iReview } from '../util/Interfaces';
import { getProduct, getReview } from '../util/serverFunctions';
import LoadingSpinner from './LoadingSpinner';
import Comment from './Comment';

const ExpandedReview = ({ reviewId }: { reviewId: string }) => {
  const [reviewAtom, setReview] = useAtom(currentReviewAtom);
  const [comments, setComments] = useState<string[]>([]);

  const handleCommentSubmit = (commentText: string) => {
    // Add the new comment to the comments list
    setComments((prevComments) => [...prevComments, commentText]);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["review", reviewId],
    queryFn: async () => {
      if (reviewAtom !== null) {
        const data = reviewAtom
        return data
      }
      // else return getProduct(id)
      const data: any = await getReview(reviewId)
      return data.data
    },
    refetchOnWindowFocus: false,
  }) as any

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>fetch error - cannot give more details cause error variable was taken</p>;
  const review = data as iReview
  // filter allPproductsatom for id variable and return product


  return (
    <div>
      {/* Display the full review details here */}
      {review ? (
        <>
          <ReviewCard review={review} />
          <h2>Add a Comment</h2>
          {/* <CommentForm onSubmit={handleCommentSubmit} /> */}
        </>
      ) : (
        // Render a loading state or fetch the review details based on reviewId
        <div>Loading...</div>
      )}
      <h2>Comments</h2>
      <div className="space-y-6 mt-4 gap-2 flex flex-1 flex-col w-full justify-end items-end">
        <ul>
          {review?.comments.map((comment, index) => (
            <Comment comment={comment} key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpandedReview;
