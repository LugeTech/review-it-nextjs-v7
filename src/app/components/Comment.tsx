
import React from 'react';
import { iComment } from '@/app/util/Interfaces';
import dayjs from 'dayjs';
import Image from 'next/image';
import Votes from './Votes';
interface CommentProps {
  comment: iComment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  if (!comment) {
    return <p>No comment</p>;
  }
  return (
    <div className="flex w-full flex-col md:w-full bg-white p-4 rounded-lg mb-4">
      <div className="flex items-center mb-2">
        <Image
          src={comment?.user?.avatar || '/default-avatar.png'} // Use a default avatar if no avatar is provided
          alt={comment?.user?.firstName!}
          className="w-10 h-10 rounded-full mr-2 object-cover"
          width={40}
          height={40}
        />
        <span className="text-gray-800 font-semibold">
          @{comment?.user?.userName}
        </span>
        <span className="text-gray-600 text-xs ml-2">
          {comment?.createdDate && dayjs(comment.createdDate).format('MM/DD/YYYY h:mm A')}
        </span>
      </div>
      <p className="text-gray-700">{comment.body}</p>
      <Votes element={comment} />
    </div>
  );
};


export default Comment;
