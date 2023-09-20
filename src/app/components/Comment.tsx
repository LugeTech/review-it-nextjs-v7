
import React from 'react';
import { iComment, iUser } from '@/app/util/Interfaces';

interface CommentProps {
  comment: iComment;
  user: iUser;
}

const Comment: React.FC<CommentProps> = ({ comment, user }) => {
  return (
    <div className="flex w-full flex-col md:w-3/4 bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center mb-2">
        <img
          src={user.avatar || '/default-avatar.png'} // Use a default avatar if no avatar is provided
          alt={`${user.firstName} ${user.lastName}`}
          className="w-10 h-10 rounded-full mr-2"
        />
        <span className="text-gray-800 font-semibold">
          {user.firstName} {user.lastName}
        </span>
      </div>
      <p className="text-gray-700">{comment.body}</p>
      <div className="mt-2 flex justify-between text-gray-600">
        <span>
          Helpful: {comment.helpfulVotes || 0}
        </span>
        <span>
          Unhelpful: {comment.unhelpfulVotes || 0}
        </span>
      </div>
    </div>
  );
};


export default Comment;
