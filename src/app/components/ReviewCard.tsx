import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import { iReview } from "../util/Interfaces";
import RatingModule from "./RatingModule";
import dayjs from "dayjs";
import DOMPurify from "dompurify";
import { useAtom } from "jotai";
import { currentReviewAtom } from "../store/store";
import { ThumbsUpButton } from "@/components/thumbsUpButton";
import { updateHelpfulVote } from "../util/serverFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser, useAuth } from "@clerk/nextjs";
import { MdOutlineThumbUp } from "react-icons/md";
import { toast } from "sonner";
import ImageGallery from "./ImageGallery";
import VideoEmbed from "./VideoEmbed";
import ReviewStats from "./ReviewStats";

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
    voteCount,
    images,
  } = review;
  const auth = useAuth();
  const [reviewAtom, setReview] = useAtom(currentReviewAtom);
  const formattedBody = body.replace(/<p><\/p>/g, "<br>");
  const queryClient = useQueryClient();
  const [hideButton, setHideButton] = React.useState(false);
  const userData = useUser();
  const userInDbId = userData.user?.publicMetadata.id as unknown as string;

  const mutation = useMutation({
    mutationFn: async () => {
      await updateHelpfulVote({ reviewId: review.id!, userInDbId });
    },
    onSuccess: () => {
      toast.success("Like saved successfully!");
    },
    onMutate: async () => {
      voteCount!.helpfulVotes! += 1;
      setHideButton(true);
      queryClient.setQueryData([review.id], reviewAtom);
      return { reviewAtom };
    },
    onError: (err, variables, context) => {
      toast.error("Like failed!");
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
    <div className="bg-white  rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <div className="flex flex-col p-6">
        <div className="flex items-center justify-start">
          <Link href={`/userprofile/${review.user?.id}`} className="w-full flex items-center">
            <Image
              src={user?.avatar || "/logo.png"}
              alt={user?.id!}
              width={60}
              height={60}
              className="rounded object-cover"
            />
            <div className="flex h-full w-full justify-start">
              <div className="flex flex-col">
                <div className="ml-4">
                  <p className="font-semibold text-base ">@{user?.userName}</p>
                  <div className="flex items-center">
                    <RatingModule
                      name={review.id!}
                      rating={rating}
                      ratingChanged={() => { }}
                      size="rating-sm"
                    />
                  </div>
                  <div className="ml-2 text-xs text-gray-600 ">
                    {dayjs(createdDate?.toString()).format("MMMM D, YYYY")}
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div className="flex w-full items-center">
            <ReviewStats review={review} setReview={() => { setReview(review) }} />
          </div>
        </div>

        <Link
          href={`/fr/${review.id}`}
          onClick={() => setReview(review)}
          className="block mb-3 hover:underline"
        >
          <h2 className="text-xl font-bold text-gray-900 ">{title}</h2>
        </Link>
        <div
          className="text-gray-700  mb-1"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(formattedBody),
          }}
        />
        <div className="flex  items-center justify-center ">
          {images && images.length > 0 && (
            <ImageGallery images={images} />
          )}
        </div>
        <div className="flex items-center justify-center">
          <VideoEmbed url={review.videos[0]} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {hasUserLiked || hideButton || !auth.isSignedIn ? (
              <span className="flex items-center text-green-500">
                <MdOutlineThumbUp className="mr-1" />
                {voteCount?.helpfulVotes}
              </span>
            ) : (
              <ThumbsUpButton
                onClick={handleHelpfulClick}
                count={voteCount?.helpfulVotes!}
              />
            )}
          </div>
          <Link href={`/fr/${review.id}`} onClick={() => setReview(review)}>
            <span className="text-sm text-blue-600  hover:underline">
              {comments?.length > 0
                ? `${comments?.length} comments`
                : "Add comment"}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
