import React from "react";
import { iUser } from "@/app/util/Interfaces";
import Image from "next/image";
import Link from "next/link";
interface UserInfoProps {
  user: iUser;
}
//
const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const { firstName, lastName, avatar, reviews, comments, likedReviews } = user;

  return (
    <div className="flex flex-col p-4">
      <div className="flex items-center">
        {avatar && (
          <Image
            src={avatar}
            alt={firstName}
            className="mr-4 h-10 w-10 rounded-full object-cover"
            width={40}
            height={40}
          />
        )}
        <h2 className="text-xl font-semibold">
          {firstName} {lastName}
        </h2>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Reviews</h3>
        <ul className="list-disc pl-4">
          {reviews?.map((review) => (
            <li key={review.id}>
              <Link
                href={`/fr/${review.id}`}
                className="text-blue-500 hover:underline"
              >
                {review.title} - 4 Comments
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Comments</h3>
        <ul className="list-disc pl-4">
          {comments?.map((comment) => (
            <li key={comment.id}>
              <Link
                href={`/fr/${comment.reviewId}`}
                className="text-blue-500 hover:underline"
              >
                {comment.body} - 16 Likes
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Likes</h3>
        <ul className="list-disc pl-4">
          {likedReviews?.map((liked) => (
            <li key={liked.id}>
              <Link
                href={`/fr/${liked.id}`}
                className="text-blue-500 hover:underline"
              >
                {liked.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserInfo;
