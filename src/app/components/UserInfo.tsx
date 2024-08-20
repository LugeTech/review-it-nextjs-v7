import React from "react";
import { iUser } from "@/app/util/Interfaces";
import Image from "next/legacy/image";
import Link from "next/link";

interface UserInfoProps {
  user: iUser;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const { firstName, lastName, avatar, reviews, comments, likedReviews } = user;

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg ">
      <div className="relative h-48 bg-gradient-to-r from-myTheme-primary to-myTheme-secondary ">
        <div className="bg-pattern absolute inset-0 bg-opacity-25"></div>
        <div className="relative flex h-full items-center justify-center">
          {avatar && (
            <div className="relative h-32 w-32 overflow-hidden rounded-full ring-2 ring-white ">
              <Image
                src={avatar}
                alt={firstName}
                className="object-cover"
                layout="fill"
              />
            </div>
          )}
        </div>
      </div>

      <div className="p-6 md:p-8 lg:p-10">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800  md:text-3xl lg:text-4xl">
            {`${firstName} ${lastName}`}
          </h2>
          <p className="text-gray-600 ">
            @{firstName.toLowerCase()}
          </p>
        </div>

        <div className="mb-6 md:mb-8 lg:mb-10">
          <h3 className="mb-2 text-lg font-semibold text-gray-800  md:text-xl lg:text-2xl">
            Reviews
          </h3>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {reviews?.map((review) => (
              <li
                key={review.id}
                className="rounded-lg bg-gray-100 p-4 text-gray-600 "
              >
                <Link
                  href={`/fr/${review.id}`}
                  className="text-myTheme-primary transition duration-200 hover:text-myTheme-accent hover:underline "
                >
                  {review.title}
                </Link>
                <span className="mt-1 block text-gray-500 ">
                  4 Comments
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6 md:mb-8 lg:mb-10">
          <h3 className="mb-2 text-lg font-semibold text-gray-800  md:text-xl lg:text-2xl">
            Comments
          </h3>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {comments?.map((comment) => (
              <li
                key={comment.id}
                className="rounded-lg bg-gray-100 p-4 text-gray-600 "
              >
                <Link
                  href={`/fr/${comment.reviewId}`}
                  className="text-indigo-500 transition duration-200 hover:text-indigo-600 hover:underline "
                >
                  {comment.body.slice(0, 40)}...
                </Link>
                <span className="mt-1 block text-gray-500 ">
                  16 Likes
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-center">
            {/* Pagination */}
            {/* Same as above */}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-lg font-semibold text-gray-800  md:text-xl lg:text-2xl">
            Likes
          </h3>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {likedReviews?.map((liked) => (
              <li
                key={liked.id}
                className="rounded-lg bg-gray-100 p-4 text-gray-600 "
              >
                <Link
                  href={`/fr/${liked.id}`}
                  className="text-indigo-500 transition duration-200 hover:text-indigo-600 hover:underline "
                >
                  {liked.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-center">
            {/* Pagination */}
            {/* Same as above */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
