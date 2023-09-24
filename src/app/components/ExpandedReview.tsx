'use client';
import ReviewCard from './ReviewCard';
import { useAtom } from "jotai";
import { currentReviewAtom, currentUserAtom } from "../store/store";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { iProduct, iReview, iComment } from '../util/Interfaces';
import { createCommentOnReview, getReview } from '../util/serverFunctions';
import LoadingSpinner from './LoadingSpinner';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { useEffect, useState } from 'react';

const ExpandedReview = ({ reviewId }: { reviewId: string }) => {
  const queryClient = useQueryClient();
  const [reviewAtom] = useAtom(currentReviewAtom);
  const [isOpen, setIsOpen] = useState(true);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [comment, setComment] = useState<iComment>({
    reviewId: reviewId,
    body: textAreaValue,
  }
  )
  const [currentUser] = useAtom(currentUserAtom);


  const mutations = useMutation(
    createCommentOnReview,
    {
      onMutate: (newData) => {
        // Update the UI optimistically before the actual mutation
        queryClient.setQueryData(["review", reviewId], (oldData: any) => {
          console.log('oldData', oldData);
          console.log('newData', newData);
          // create a structure like the old data but with the new data
          newData.reviewId = reviewId;
          newData.createdDate = new Date();
          newData.isDeleted = false;
          newData.user = currentUser; // this works i just need to get my user
          oldData.comments.push(newData);
          return { ...oldData };
        });
      }, onSuccess: (data: iComment) => {
        // invalidate the cache
        // queryClient.invalidateQueries(["review", reviewId]);
        console.log('this is the comment', data);
      },
      onError: (error: Error) => {
        console.error(error);
      }
    }
  )

  const handleCommentSubmit = async (newTextAreaValue: string) => {
    setTextAreaValue(newTextAreaValue);
    setIsOpen(!isOpen);
    mutations.mutate({ reviewId, body: newTextAreaValue });

  };

  useEffect(() => {
    console.log('running 1', textAreaValue)
    // Update the comment object whenever textAreaValue changes
    setComment({
      ...comment,
      body: textAreaValue,
    });
  }, [textAreaValue]);

  // useEffect(() => {
  //   console.log('running 2', comment)
  //   // Call mutations.mutate(comment) whenever comment changes
  // }, [comment]);


  // NOTE query to get the comments... really it gets the review and it contains the comments
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

  // NOTE this is the useMutation mostly to do optimistic updates to the comments


  return (
    <div className="flex flex-col w-full p-2 md:px-36 sm:pt-8 ">
      {/* Display the full review details here */}
      {review ? (
        <div>
          <ReviewCard review={review} />
          {/* create submit commit form here */}
          <CommentForm onSubmit={handleCommentSubmit} isOpen={isOpen} onClose={(isOpen: boolean) => { setIsOpen(!isOpen) }} />
        </div>
      ) : (
        // Render a loading state or fetch the review details based on reviewId
        <div>Loading...</div>
      )}
      <h2>Comments</h2>
      <div className="space-y-6 mt-4 gap-2 flex flex-1 flex-col w-full justify-end items-end">
        <ul>
          {review?.comments?.length > 0 ? <div>{review?.comments.map((comment, index) => (
            <Comment comment={comment} key={index} />
          ))}</div> : <div>No comments yet</div>}
        </ul>
      </div>
    </div>
  );
};

export default ExpandedReview;
