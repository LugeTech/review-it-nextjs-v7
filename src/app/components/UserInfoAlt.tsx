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
    <div className="bg-white rounded-lg shadow-lg">
      <div className="relative h-64 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-t-lg overflow-hidden">
        <div className="absolute inset-0 bg-opacity-25 bg-pattern"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          {avatar && (
            <div className="relative h-40 w-40 rounded-full overflow-hidden ring-4 ring-white">
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

      <div className="px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">{`${firstName} ${lastName}`}</h2>
          <p className="text-gray-600">@{firstName.toLowerCase()}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Reviews
            </h3>
            <div className="bg-gray-100 rounded-lg p-4">
              {reviews?.map((review) => (
                <div key={review.id} className="mb-4">
                  <Link
                    href={`/fr/${review.id}`}
                    className="text-indigo-600 hover:text-indigo-700 transition duration-200"
                  >
                    {review.title}
                  </Link>
                  <span className="text-gray-500 ml-2">4 Comments</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Comments
            </h3>
            <div className="bg-gray-100 rounded-lg p-4">
              {comments?.map((comment) => (
                <div key={comment.id} className="mb-4">
                  <Link
                    href={`/fr/${comment.reviewId}`}
                    className="text-indigo-600 hover:text-indigo-700 transition duration-200"
                  >
                    {comment.body.slice(0, 60)}...
                  </Link>
                  <span className="text-gray-500 ml-2">16 Likes</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Likes</h3>
            <div className="bg-gray-100 rounded-lg p-4">
              {likedReviews?.map((liked) => (
                <div key={liked.id} className="mb-4">
                  <Link
                    href={`/fr/${liked.id}`}
                    className="text-indigo-600 hover:text-indigo-700 transition duration-200"
                  >
                    {liked.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <nav aria-label="Pagination">
            <ul className="flex items-center">{/* Pagination buttons */}</ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
