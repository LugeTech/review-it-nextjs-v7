import React from "react";
import { iUser } from "@/app/util/Interfaces";
import Image from "next/image";
import Link from "next/link";

interface UserInfoProps {
  user: iUser;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const { firstName, lastName, avatar, reviews, comments, likedReviews } = user;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48 bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="absolute inset-0 bg-opacity-25 bg-pattern"></div>
        <div className="relative flex items-center justify-center h-full">
          {avatar && (
            <div className="relative h-32 w-32 rounded-full overflow-hidden ring-2 ring-white">
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
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
            {`${firstName} ${lastName}`}
          </h2>
          <p className="text-gray-600">@{firstName.toLowerCase()}</p>
        </div>

        <div className="mb-6 md:mb-8 lg:mb-10">
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-2">
            Reviews
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {reviews?.map((review) => (
              <li
                key={review.id}
                className="bg-gray-100 rounded-lg p-4 text-gray-600"
              >
                <Link
                  href={`/fr/${review.id}`}
                  className="text-indigo-500 hover:underline hover:text-indigo-600 transition duration-200"
                >
                  {review.title}
                </Link>
                <span className="block text-gray-500 mt-1">4 Comments</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-4">
            <nav aria-label="Pagination">
              <ul className="flex items-center">
                <li>
                  <a
                    href="#"
                    className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 hover:bg-gray-300 transition duration-200"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="h-8 w-8 rounded-full flex items-center justify-center bg-indigo-500 text-white hover:bg-indigo-600 transition duration-200"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 hover:bg-gray-300 transition duration-200"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 hover:bg-gray-300 transition duration-200"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 hover:bg-gray-300 transition duration-200"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mb-6 md:mb-8 lg:mb-10">
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-2">
            Comments
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {comments?.map((comment) => (
              <li
                key={comment.id}
                className="bg-gray-100 rounded-lg p-4 text-gray-600"
              >
                <Link
                  href={`/fr/${comment.reviewId}`}
                  className="text-indigo-500 hover:underline hover:text-indigo-600 transition duration-200"
                >
                  {comment.body.slice(0, 40)}...
                </Link>
                <span className="block text-gray-500 mt-1">16 Likes</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-4">
            {/* Pagination */}
            {/* Same as above */}
          </div>
        </div>

        <div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-2">
            Likes
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {likedReviews?.map((liked) => (
              <li
                key={liked.id}
                className="bg-gray-100 rounded-lg p-4 text-gray-600"
              >
                <Link
                  href={`/fr/${liked.id}`}
                  className="text-indigo-500 hover:underline hover:text-indigo-600 transition duration-200"
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
