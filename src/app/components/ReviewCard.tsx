"use client";
import React from "react";
import { iReview } from "../util/Interfaces";
import Image from "next/image";
import RatingModule from "./RatingModule";
import dayjs from "dayjs";
import DOMPurify from "dompurify";
import Link from "next/link";
import { useAtom } from "jotai";
import { currentReviewAtom } from "../store/store";
import { ThumbsUpButton } from "@/components/thumbsUpButton";
import { updateHelpfulVote } from "../util/serverFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { MdOutlineThumbUp } from "react-icons/md";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
interface ReviewCardProps {
  review: iReview;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const {
    user,
    createdDate,
    title,
    body,
    rating,
    comments,
    product,
    voteCount,
  } = review;
  const auth = useAuth();
  const [reviewAtom, setReview] = useAtom(currentReviewAtom);
  const formattedBody = body.replace(/<p><\/p>/g, "<br>"); // NOTE: line breaks werent being rendered properly. this fixes that
  const queryClient = useQueryClient();
  const [hideButtom, setHideButtom] = React.useState(false);
  const userData = useUser();
  const userInDbId = userData.user?.publicMetadata.id as unknown as string;
  const helpfulData = {
    reviewId: review.id!,
    userInDbId,
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const data = await updateHelpfulVote(helpfulData);
    },
    onSuccess: () => {
      toast.success("Like saved successfully!");
    },
    onMutate: async () => {
      // Update the local state optimistically
      voteCount!.helpfulVotes! += 1;
      setHideButtom(true);
      queryClient.setQueryData([review.id], reviewAtom);
      return { reviewAtom };
    },
    onError: (err, variables, context) => {
      toast.error("Like failed!");
      //NOTE: Reset to the previous state on error not tested
      if (context) {
        queryClient.setQueryData(["review", review.id], context);
      }
    },
  });

  const handleHelpfulClick = () => {
    mutation.mutate();
  };

  const hasUserLiked = review.likedBy.some((user) => user.id === userInDbId);

  return (
    <div className="px-2 pb-2 rounded shadow-md mb-2 bg-myTheme-lightbg dark:bg-myTheme-niceGrey hover:shadow-xl">
      <Link
        href={`/userprofile/${review.user?.id}`}
        className="inline-flex px-2"
      >
        <div className="p-2 inline-flex items-center mb-2 ">
          <Image
            src={user?.avatar || "/logo.png"}
            alt={user?.id!}
            width={40}
            height={40}
            className=" rounded-full object-cover w-[60px] h-[60px] mr-1"
          />
          <div className="flex flex-col items-start justify-center ml-2">
            <div className="flex flex-col items-center justify-start">
              <p className="font-semibold text-sm">
                @{user?.userName}&apos;s {rating} star review
              </p>
              {/* <p className="text-gray-600 text-xs ml-1">reviewed {product?.name}</p> */}
            </div>
            <p className="dark:text-myTheme-darkTextBody text-myTheme-lightTextBody text-xs">
              {dayjs(createdDate?.toString()).format("MMMM D, YYYY h:mm A")}
            </p>
            <div>
              <RatingModule
                name={review.id!}
                rating={rating}
                ratingChanged={() => {}}
                size="rating-sm"
              />
            </div>
          </div>
        </div>
      </Link>

      <div className=" px-4  rounded-md p-2 flex flex-col">
        <Link
          href={`/fr/${review.id}`}
          onClick={() => setReview(review)}
          className="hover:underline"
        >
          <h1 className="text-lg text-myTheme-dark dark:text-myTheme-light font-semibold mb-1">
            {title}
          </h1>
        </Link>
        <div className="flex flex-row">
          <span
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(formattedBody),
            }}
            className="mb-4 text-myTheme-dark dark:text-gray-400 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex font-semibold text-base md:text-lg ml-4 text-center items-center justify-center gap-1 text-green-500">
          {hasUserLiked || hideButtom || !auth.isSignedIn ? (
            voteCount?.helpfulVotes!
          ) : (
            <ThumbsUpButton
              onClick={handleHelpfulClick}
              count={voteCount?.helpfulVotes!}
            />
          )}{" "}
          {hasUserLiked || hideButtom || !auth.isSignedIn ? (
            <MdOutlineThumbUp />
          ) : (
            ""
          )}
        </div>
        <Link href={`/fr/${review.id}`} onClick={() => setReview(review)}>
          <p className="text-myTheme-dark dark:text-gray-400 text-xs">
            {comments?.length > 0
              ? `(${comments?.length} comments)`
              : "(0) comments"}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ReviewCard;
