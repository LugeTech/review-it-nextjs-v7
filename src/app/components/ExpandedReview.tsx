"use client";
import ReviewCard from "./ReviewCard";
import { useAtom } from "jotai";
import { currentReviewAtom, currentUserAtom } from "../store/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { iReview, iComment } from "../util/Interfaces";
import { createCommentOnReview, createReplyOnComment, getReview } from "../util/serverFunctions";
import LoadingSpinner from "./LoadingSpinner";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { useEffect, useMemo, useState, useCallback } from "react";
import DisplayError from "./DisplayError";
import ProductCard from "./ProductCard";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CommentList from "./CommentList";

// export const dynamic = 'force-dynamic'
const ExpandedReview = ({ reviewId }: { reviewId: string }) => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const [reviewAtom] = useAtom(currentReviewAtom);
  const [isOpen, setIsOpen] = useState(true);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [currentUser] = useAtom(currentUserAtom);
  const router = useRouter();

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
      queryClient.setQueryData(["review"], (oldData: any) => {
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
      // if (await data) {
      //   queryClient.refetchQueries({ queryKey: ["review"] });
      //   console.log("refetched with this data, the comment now has id", data);
      // }
    },
    onMutate: (newData: iComment) => {
      queryClient.setQueryData(["review"], (oldData: any) => {
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
      if (await data) {
        queryClient.refetchQueries({ queryKey: ["review"] });
      }
    },
    onMutate: (newReply: iComment) => {
      queryClient.setQueryData(["replies"], (oldData: any) => {
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
  }, [auth.isLoaded, auth.isSignedIn, router, isOpen, mutations, comment]);

  const productCardOptions = {
    showLatestReview: true,
    size: "rating-md",
    showWriteReview: true,
    showClaimThisProduct: true,
  };

  const handleReply = useCallback(async (parentId: string, body: string) => {
    replyMutation.mutate({ ...comment, body, parentId });
    console.log("Reply mutation called");
  }, [mutations, comment]);

  const handleEdit = async (commentId: string, body: string) => {
    // Implement API call to edit a comment
  };

  const handleDelete = async (commentId: string) => {
    // Implement API call to delete a comment
    //       const deletedComment = {
    //   ...comment,
    //   isDeleted: true,
    //   body: "This comment has been deleted",
    //   user: { ...comment.user, userName: "Deleted User" }
    // };


  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      if (reviewAtom !== null) {
        return reviewAtom;
      }
      const data: any = await getReview(reviewId);
      return data.data;
    },
    refetchOnWindowFocus: true,
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

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>fetch error</p>;
  if (!data) return null;

  return (
    <div className="flex flex-col w-full p-2 md:px-36 sm:pt-8 bg-myTheme-lightbg ">
      <div className="mb-4">
        <ProductCard product={data?.product!} options={productCardOptions} />
      </div>
      <ReviewCard review={data} />
      <CommentForm
        onSubmit={handleCommentSubmit}
        isOpen={isOpen}
        onClose={setIsOpen}
      />
      <div className="space-y-1 mt-2 gap-1 flex flex-col w-full justify-end items-end ">
        <h2>Comments</h2>
        {sortedComments.length > 0 ? (
          <CommentList
            comments={sortedComments}
            onReply={handleReply}
            onEdit={handleEdit}
            onDelete={handleDelete}
          // updateParentReplies={handleReplyUpdate}
          />
        ) : (
          <div>No comments yet</div>
        )}
      </div>
    </div>
  );
};

export default ExpandedReview;
