"use client";
import ReviewCard from "./ReviewCard";
import { useAtom } from "jotai";
import { currentReviewAtom, currentUserAtom } from "../store/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { iReview, iComment } from "../util/Interfaces";
import { createCommentOnReview, createReplyOnComment, deleteComment, editComment, getReview, getReviews } from "../util/serverFunctions";
import LoadingSpinner from "./LoadingSpinner";
import CommentForm from "./CommentForm";
import { useEffect, useMemo, useState, useCallback, lazy, Suspense } from "react";
import DisplayError from "./DisplayError";
import ProductCard from "./ProductCard";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const CommentList = lazy(() => import('./CommentList'));

const ExpandedReview = ({ reviewId, productId }: { reviewId: string, productId: string }) => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const [reviewAtom] = useAtom(currentReviewAtom);
  const [isOpen, setIsOpen] = useState(true);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [currentUser] = useAtom(currentUserAtom);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { userId } = useAuth();
  const clerkUserId = userId as string;
  const [allReviews, setAllReviews] = useState<iReview[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const mutations = useMutation({
    mutationFn: async (comment: iComment) => {
      const data = createCommentOnReview(comment);
      toast.promise(data, {
        loading: "Loading...",
        success: () => "Comment saved successfully!",
        error: "Error saving comment",
      });
    },
    onMutate: (newData: iComment) => {
      queryClient.setQueryData(["review", reviewId], (oldData: any) => {
        newData.reviewId = reviewId;
        newData.isDeleted = false;
        newData.user = currentUser;
        let iReviewOldData: iReview = { ...oldData };
        iReviewOldData.comments = [...(iReviewOldData.comments || []), newData];
        return iReviewOldData;
      });
    },
    onError: (error: Error) => {
      <DisplayError error={error.message} />;
      console.error(error);
    },
  });

  const commentMutation = useMutation({
    mutationFn: async (comment: iComment) => {
      const data = createCommentOnReview(comment);
      toast.promise(data, {
        loading: "Loading...",
        success: () => "Comment saved successfully!",
        error: "Error saving comment",
      });
    },
    onMutate: (newData: iComment) => {
      queryClient.setQueryData(["review", reviewId], (oldData: any) => {
        newData.reviewId = reviewId;
        newData.isDeleted = false;
        newData.user = currentUser;
        let iReviewOldData: iReview = { ...oldData };
        iReviewOldData.comments = [...(iReviewOldData.comments || []), newData];
        return iReviewOldData;
      });
    },
    onError: (error: Error) => {
      <DisplayError error={error.message} />;
      console.error(error);
    },
  })

  const replyMutation = useMutation({
    mutationFn: async (reply: iComment) => {
      const data = createReplyOnComment(reply);
      toast.promise(data, {
        loading: "Saving reply...",
        success: () => "Reply saved successfully!",
        error: "Error saving reply",
      });
      // if (await data) {
      //   queryClient.refetchQueries({ queryKey: ["review", reviewId] });
      // }
    },
    onMutate: (newReply: iComment) => {
      queryClient.setQueryData(["review", reviewId], (oldData: any) => {
        let iReviewOldData: iReview = { ...oldData };
        const updatedComments = iReviewOldData.comments?.map(comment => {
          if (comment.id === newReply.parentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply],
            };
          }
          return comment;
        });
        iReviewOldData.comments = updatedComments;
        return iReviewOldData;
      });
    },
    onError: (error: Error) => {
      <DisplayError error={error.message} />;
      console.error(error);
    },
  });

  const [comment, setComment] = useState<iComment>({
    reviewId: "",
    body: "",
    createdDate: new Date(),
    user: currentUser,
    review: reviewAtom || {} as iReview,
    userId: currentUser?.id || "",
    isDeleted: false,
  });

  const handleCommentSubmit = useCallback(async (newTextAreaValue: string) => {
    if (auth.isLoaded && !auth.isSignedIn) {
      router.push("/sign-in");
      return;
    }
    setTextAreaValue(newTextAreaValue);
    setIsOpen(!isOpen);
    commentMutation.mutate({ ...comment, body: newTextAreaValue });
  }, [auth.isLoaded, auth.isSignedIn, router, isOpen, commentMutation, comment]);

  const productCardOptions = {
    showLatestReview: true,
    size: "rating-md",
    showWriteReview: true,
    showClaimThisProduct: true,
  };

  const handleReply = useCallback(async (parentId: string, body: string) => {
    replyMutation.mutate({ ...comment, body, parentId });
    console.log("Reply mutation called");
  }, [replyMutation, comment]);

  const handleEdit = async (commentId: string, body: string) => {
    editComment(commentId, body);
  };

  const handleDelete = async (commentId: string) => {
    const deleteResponse = await deleteComment(commentId);
    if (deleteResponse.success) {
      console.log(deleteResponse.success);
      toast.message("Comment successfully deleted!");
    } else {
      toast.error(deleteResponse.message);
    };
  }

  const { data, isPending, isError } = useQuery({
    queryKey: ["review", reviewId],
    queryFn: async () => {
      setIsLoading(true);
      if (reviewAtom !== null) {
        setIsLoading(false);
        return reviewAtom;
      }
      const data: any = await getReviews(productId);
      setIsLoading(false);
      console.log(data);
      setAllReviews(data.data.reviews);
      return data.data.reviews.find((review: iReview) => review.id === reviewId);
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setComment(prevComment => ({
        ...prevComment,
        reviewId: reviewId,
        body: textAreaValue,
        createdDate: new Date(),
        user: currentUser,
        review: reviewAtom || data,
        userId: currentUser?.id || "",
      }));
    }
  }, [data, textAreaValue, currentUser, reviewAtom, reviewId]);

  const sortedComments = useMemo(() => {
    return data?.comments?.slice().sort((a: iComment, b: iComment) =>
      new Date(b.createdDate!).valueOf() - new Date(a.createdDate!).valueOf()
    ) || [];
  }, [data?.comments]);

  const reviewData = useMemo(() => {
    return reviewAtom || data;
  }, [reviewAtom, data]);

  if (isPending || isLoading) return <LoadingSpinner />;
  if (isError) return <p>fetch error</p>;
  if (!reviewData) return null;
  // productcard makes it's own query for all the reviews for this product
  return (
    <div className="flex flex-col w-full p-2 md:px-36 sm:pt-8 bg-myTheme-lightbg ">
      <div className="mb-4 w-full">
        <ProductCard product={reviewData?.product!} options={productCardOptions} reviews={allReviews} />
      </div>
      <ReviewCard review={reviewData} />
      <CommentForm
        onSubmit={handleCommentSubmit}
        isOpen={isOpen}
        onClose={setIsOpen}
      />
      <div className="space-y-1 mt-2 gap-1 flex flex-col w-full justify-end items-end ">
        <h2>Comments</h2>
        {sortedComments.length > 0 ? (
          <Suspense fallback={<LoadingSpinner />}>
            <CommentList
              clerkUserId={clerkUserId}
              comments={sortedComments}
              onReply={handleReply}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Suspense>
        ) : (
          <div>No comments yet</div>
        )}
      </div>
    </div>
  );
};

export default ExpandedReview;
