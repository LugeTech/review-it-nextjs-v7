import React from "react";
import { iComment } from "@/app/util/Interfaces";
import dayjs from "dayjs";
import Image from "next/legacy/image";
import Link from "next/link";
// import Votes from "./Votes";
interface CommentProps {
  comment: iComment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  if (!comment) {
    return <p>No comment</p>;
  }
  return (
    <div className="flex w-full flex-col md:w-full  p-2 rounded-lg shadow-md mb-1 bg-myTheme-lightbg dark:bg-myTheme-niceGrey border-l-8 ml-2 ">
      <div className="flex items-center mb-1">
        <Image
          src={comment?.user?.avatar || "/default-avatar.png"} // Use a default avatar if no avatar is provided
          alt={`${comment?.user?.firstName} ${comment?.user?.lastName}`}
          className="w-10 h-10 rounded-full mr-2"
          width={50}
          height={50}
        />
        <Link href={`/userprofile/${comment?.user?.id}`}>
          <span className="text-myTheme-dark dark:text-myTheme-light font-semibold">
            @{comment?.user?.userName}
          </span>
          <span className="text-gray-500 text-xs ml-2">
            {comment?.createdDate &&
              dayjs(comment.createdDate).format("MM/DD/YYYY h:mm A")}
          </span>
        </Link>
      </div>
      <div className="text-myTheme-lightTextBody dark:text-myTheme-darkTextBody text-sm">
        {comment.body && comment.body.length > 90
          ? comment.body.slice(0, 90) + "...read more"
          : comment.body}
      </div>
      {/* <p className="text-gray-700">{comment.body}</p> */}
      {/* <Votes element={comment} /> */}
    </div>
  );
};

export default Comment;
