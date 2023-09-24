
import React from 'react';
import { iComment, iUser } from '@/app/util/Interfaces';
import dayjs from 'dayjs';
interface CommentProps {
  comment: iComment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="flex w-full flex-col md:w-full bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center mb-2">
        <img
          src={comment?.user?.avatar || '/default-avatar.png'} // Use a default avatar if no avatar is provided
          alt={`${comment?.user?.firstName} ${comment?.user?.lastName}`}
          className="w-10 h-10 rounded-full mr-2"
        />
        <span className="text-gray-800 font-semibold">
          {comment?.user?.firstName} {comment?.user?.lastName}
        </span>
        <span className="text-gray-600 text-xs ml-2">
          {comment?.createdDate && dayjs(comment.createdDate).format('MM/DD/YYYY h:mm A')}
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
