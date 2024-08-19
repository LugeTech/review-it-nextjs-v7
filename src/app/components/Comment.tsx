import React, { useState } from "react";
import { iComment } from "@/app/util/Interfaces";
import dayjs from "dayjs";
import Image from "next/legacy/image";
import Link from "next/link";

interface CommentProps {
  comment: iComment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(comment.body);
  const [showFullComment, setShowFullComment] = useState(false);

  if (!comment) {
    return <p>No comment</p>;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // TODO: Implement save logic
    setIsEditing(false);
  };

  const handleDelete = () => {
    // TODO: Implement delete logic
    console.log("Delete comment");
  };

  const handleReply = () => {
    // TODO: Implement reply logic
    console.log("Reply to comment");
  };

  return (
    <div className="flex w-full flex-col md:w-full p-2 rounded-lg shadow-md mb-1 bg-myTheme-lightbg border-l-8 ml-2">
      <div className="flex items-center mb-1">
        <Image
          src={comment?.user?.avatar || "/default-avatar.png"}
          alt={`${comment?.user?.firstName} ${comment?.user?.lastName}`}
          className="w-10 h-10 rounded-full mr-2"
          width={50}
          height={50}
        />
        <Link href={`/userprofile/${comment?.user?.id}`}>
          <span className="text-myTheme-dark font-semibold">
            @{comment?.user?.userName}
          </span>
          <span className="text-gray-500 text-xs ml-2">
            {comment?.createdDate &&
              dayjs(comment.createdDate).format("MM/DD/YYYY h:mm A")}
          </span>
        </Link>
      </div>
      <div className="text-myTheme-lightTextBody text-sm">
        {isEditing ? (
          <textarea
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
            className="w-full p-2 border rounded"
          />
        ) : showFullComment || comment.body.length <= 90 ? (
          comment.body
        ) : (
          <>
            {comment.body.slice(0, 90)}...
            <button
              onClick={() => setShowFullComment(true)}
              className="text-blue-500 hover:underline"
            >
              read more
            </button>
          </>
        )}
      </div>
      <div className="mt-2 flex space-x-2">
        <button
          onClick={handleReply}
          className="text-blue-500 hover:underline text-sm"
        >
          Reply
        </button>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="text-green-500 hover:underline text-sm"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="text-yellow-500 hover:underline text-sm"
          >
            Edit
          </button>
        )}
        <button
          onClick={handleDelete}
          className="text-red-500 hover:underline text-sm"
        >
          Delete
        </button>
      </div>
      {/* TODO: Add nested replies here */}
    </div>
  );
};

export default Comment;
