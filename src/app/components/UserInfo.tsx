import React from 'react';
import { iUser } from '@/app/util/Interfaces';
import Image from 'next/image';
interface UserInfoProps {
  user: iUser;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const { firstName, lastName, avatar, reviews, comments } = user;


  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        {avatar && (
          <Image
            src={avatar}
            alt={firstName}
            className="w-10 h-10 rounded-full mr-4 object-cover"
            width={40}
            height={40}
          />
        )}
        <h2 className="text-xl font-semibold">{firstName} {lastName}</h2>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Reviews</h3>
        <ul className="list-disc pl-4">
          {reviews?.map((review) => (
            <li key={review.id}>
              <a href="#" className="text-blue-500 hover:underline">
                {review.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Comments</h3>
        <ul className="list-disc pl-4">
          {comments?.map((comment) => (
            <li key={comment.id}>
              <a href="#" className="text-blue-500 hover:underline">
                {comment.body}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserInfo;
