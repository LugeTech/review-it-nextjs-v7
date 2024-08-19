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
    <div className="bg-white dark:bg-myTheme-niceBlack rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48 bg-gradient-to-r from-myTheme-primary to-myTheme-secondary dark:from-myTheme-accent dark:to-myTheme-secondary">
        <div className="absolute inset-0 bg-opacity-25 bg-pattern"></div>
        <div className="relative flex items-center justify-center h-full">
          {avatar && (
            <div className="relative h-32 w-32 rounded-full overflow-hidden ring-2 ring-white dark:ring-myTheme-niceBlack">
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
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-myTheme-light">
            {`${firstName} ${lastName}`}
          </h2>
          <p className="text-gray-600 dark:text-myTheme-light">
            @{firstName.toLowerCase()}
          </p>
        </div>

        <div className="mb-6 md:mb-8 lg:mb-10">
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-myTheme-light mb-2">
            Reviews
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {reviews?.map((review) => (
              <li
                key={review.id}
                className="bg-gray-100 dark:bg-myTheme-niceGrey rounded-lg p-4 text-gray-600 dark:text-myTheme-light"
              >
                <Link
                  href={`/fr/${review.id}`}
                  className="text-myTheme-primary dark:text-myTheme-accent hover:underline hover:text-myTheme-accent dark:hover:text-myTheme-accent transition duration-200"
                >
                  {review.title}
                </Link>
                <span className="block text-gray-500 dark:text-myTheme-light mt-1">
                  4 Comments
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6 md:mb-8 lg:mb-10">
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-myTheme-light mb-2">
            Comments
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {comments?.map((comment) => (
              <li
                key={comment.id}
                className="bg-gray-100 dark:bg-myTheme-niceGrey rounded-lg p-4 text-gray-600 dark:text-myTheme-light"
              >
                <Link
                  href={`/fr/${comment.reviewId}`}
                  className="text-indigo-500 dark:text-myTheme-accent hover:underline hover:text-indigo-600 dark:hover:text-myTheme-accent transition duration-200"
                >
                  {comment.body.slice(0, 40)}...
                </Link>
                <span className="block text-gray-500 dark:text-myTheme-light mt-1">
                  16 Likes
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-4">
            {/* Pagination */}
            {/* Same as above */}
          </div>
        </div>

        <div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-myTheme-light mb-2">
            Likes
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {likedReviews?.map((liked) => (
              <li
                key={liked.id}
                className="bg-gray-100 dark:bg-myTheme-niceGrey rounded-lg p-4 text-gray-600 dark:text-myTheme-light"
              >
                <Link
                  href={`/fr/${liked.id}`}
                  className="text-indigo-500 dark:text-myTheme-accent hover:underline hover:text-indigo-600 dark:hover:text-myTheme-accent transition duration-200"
                >
                  {liked.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-4">
            {/* Pagination */}
            {/* Same as above */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
