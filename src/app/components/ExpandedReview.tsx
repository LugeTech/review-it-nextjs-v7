"use client";
import ReviewCard from "./ReviewCard";

import { useAtom } from "jotai";
import { currentReviewAtom, currentUserAtom } from "../store/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { iReview, iComment } from "../util/Interfaces";
import { createCommentOnReview, getReview } from "../util/serverFunctions";
import LoadingSpinner from "./LoadingSpinner";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { useEffect, useState } from "react";
import DisplayError from "./DisplayError";
import ProductCard from "./ProductCard";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const ExpandedReview = ({ reviewId }: { reviewId: string }) => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const [reviewAtom] = useAtom(currentReviewAtom);
  const [isOpen, setIsOpen] = useState(true);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [currentUser] = useAtom(currentUserAtom);
  const router = useRouter();

  const [comment, setComment] = useState<iComment>({
    reviewId: reviewId,
    body: textAreaValue,
    createdDate: new Date(),
  });

  const mutations = useMutation({
    mutationFn: async (comment: iComment) => {
      const data = createCommentOnReview(comment);
      toast.promise(data, {
        loading: "Loading...",
        success: () => {
          return "Comment saved successfully!";
        },
        error: "Error saving comment",
      });
    },
    onMutate: (newData: iComment) => {
      // Update the UI optimistically before the actual mutation
      queryClient.setQueryData(["review", reviewId], (oldData: any) => {
        // create a structure like the old data but with the new data
        newData.reviewId = reviewId;
        newData.isDeleted = false;
        newData.user = currentUser; //FIX: this works i just need to get my user // I want to remove atoms if possible -- or maybe i keep this it is convenient
        let iReviewOldData: iReview = { ...oldData };
        iReviewOldData?.comments!.push(newData);
        iReviewOldData.comments = iReviewOldData?.comments!.reverse();
        return { ...iReviewOldData };
      });
    },
    // onSuccess: (data: iComment) => {
    // console.log('this is the comment', data);
    //pop up a notofication or a saving spinner on the comment
    // },
    onError: (error: Error) => {
      <DisplayError error={error.message} />;
      console.error(error);
    },
  });

  const handleCommentSubmit = async (newTextAreaValue: string) => {
    if (auth.isLoaded && !auth.isSignedIn) {
      router.push("/sign-in");
      return;
    }
    setTextAreaValue(newTextAreaValue);
    setIsOpen(!isOpen);
    mutations.mutate({ reviewId, body: newTextAreaValue });
  };

  useEffect(() => {
    setComment({
      ...comment,
      body: textAreaValue,
    });
  }, [textAreaValue]);

  // NOTE: query to get the comments... really it gets the review and it contains the comments
  const { data, isLoading, isError } = useQuery({
    queryKey: ["review", reviewId],
    queryFn: async () => {
      if (reviewAtom !== null) {
        const data = reviewAtom;
        return data;
      }
      // else return getProduct(id)
      const data: any = await getReview(reviewId);
      return data.data;
    },
    refetchOnWindowFocus: false,
  }) as any;

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>fetch error</p>;
  const review = data as iReview;

  const productCardOptions = {
    showLatestReview: true,
    size: "rating-md",
    showWriteReview: true,
    showClaimThisProduct: true,
  };

  return (
    <div className="flex flex-col w-full p-2 md:px-36 sm:pt-8 bg-myTheme-lightbg dark:bg-myTheme-niceBlack">
      <div className="mb-4">
        <ProductCard product={review?.product!} options={productCardOptions} />
      </div>
      {review ? (
        <>
          <ReviewCard review={review} />
          {/* create submit commit form here i removed the ! from setIsOpen to disable hiding the form */}
          <CommentForm
            onSubmit={handleCommentSubmit}
            isOpen={isOpen}
            onClose={(isOpen: boolean) => {
              setIsOpen(isOpen);
            }}
          />
        </>
      ) : (
        <LoadingSpinner />
      )}
      <div className="space-y-1 mt-2 gap-1 flex flex-col w-full justify-end items-end ">
        <h2>Comments</h2>
        {/* arrange comments from newest to oldest */}
        {review?.comments!.length > 0 ? (
          <>
            {review
              ?.comments!.slice()
              .sort(
                (a, b) =>
                  new Date(b.createdDate!).valueOf() -
                  new Date(a.createdDate!).valueOf(),
              )
              .map((comment, index) => (
                <div className="w-full px-4 py-2" key={index}>
                  <Comment comment={comment} key={index} />
                </div>
              ))}
          </>
        ) : (
          <div>No comments yet</div>
        )}
      </div>
    </div>
  );
};

export default ExpandedReview;
