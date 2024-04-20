import React from "react";
import { iUser } from "../util/Interfaces";

interface Props {
  user: iUser;
}

const UserProfile: React.FC<Props> = ({ user }) => {
  return (
    <div className="max-w-md p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-4">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full"
        />
      </div>
      <h2 className="text-2xl font-bold mb-2">
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-gray-600">Joined: {user.createdDate.toString()}</p>
      {user.reviews.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Reviews:</h3>
          <ul className="list-none m-0 p-0">
            {user.reviews.map((review) => (
              <li key={review.id} className="text-gray-600 py-2 border-b">
                {review.title}
              </li>
            ))}
          </ul>
        </div>
      )}
      {user.comments.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Comments:</h3>
          <ul className="list-none m-0 p-0">
            {user.comments.map((comment) => (
              <li key={comment.id} className="text-gray-600 py-2 border-b">
                {comment.body}
              </li>
            ))}
          </ul>
        </div>
      )}
      {user.likedReviews.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Liked Reviews:</h3>
          <ul className="list-none m-0 p-0">
            {user.likedReviews.map((review) => (
              <li key={review.id} className="text-gray-600 py-2 border-b">
                {review.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
