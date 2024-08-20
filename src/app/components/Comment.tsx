import React, { useState } from "react";
import { Comment as CommentType, User } from "@prisma/client";
import { iComment } from "../util/Interfaces";
import dayjs from "dayjs";
import Image from "next/legacy/image";
import Link from "next/link";

interface CommentProps {
  comment: iComment;
  // comment: CommentType & { user: User; replies?: CommentType[] };
  onReply: (parentId: string, body: string) => Promise<void>;
  onEdit: (commentId: string, body: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
}

const Comment: React.FC<CommentProps> = ({ comment, onReply, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(comment.body);
  const [showFullComment, setShowFullComment] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyBody, setReplyBody] = useState("");

  if (!comment) {
    return <p>No comment</p>;
  }

  const handleEdit = () => {
    if (comment.id) {
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (comment.id) {
      await onEdit(comment?.id!, editedBody);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (comment.id) {
      await onDelete(comment?.id!);
    }
  };

  const handleReply = async () => {
    if (comment.id) {
      await onReply(comment.id, replyBody);
    }
    setIsReplying(false);
    setReplyBody("");
  };

  return (
    <div className="flex w-full flex-col md:w-full p-2 rounded-lg shadow-md mb-1 bg-myTheme-lightbg border-l-8 ml-2">
      <div className="flex items-center mb-1">
        <Image
          src={comment.user?.avatar || "/default-avatar.png"}
          alt={`${comment.user?.firstName} ${comment.user?.lastName}`}
          className="w-10 h-10 rounded-full mr-2"
          width={50}
          height={50}
        />
        <Link href={`/userprofile/${comment.user?.id}`}>
          <span className="text-myTheme-dark font-semibold">
            @{comment.user?.userName}
          </span>
        </Link>
        <span className="text-gray-500 text-xs ml-2">
          {dayjs(comment.createdDate).format("MM/DD/YYYY h:mm A")}
        </span>
      </div>
      <div className="text-myTheme-lightTextBody text-sm">
        {isEditing ? (
          <textarea
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
            className="w-full p-2 border rounded bg-white"
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
          onClick={() => setIsReplying(!isReplying)}
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
      {isReplying && (
        <div className="mt-2">
          <textarea
            value={replyBody}
            onChange={(e) => setReplyBody(e.target.value)}
            className="w-full p-2 border rounded bg-white"
            placeholder="Write your reply..."
          />
          <button
            onClick={handleReply}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit Reply
          </button>
        </div>
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2 ml-4">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply as iComment} // Change this line to use iComment directly
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
