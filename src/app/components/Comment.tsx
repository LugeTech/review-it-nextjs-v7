import React, { useState } from "react";
import { Comment as CommentType, User } from "@prisma/client";
import { iComment } from "../util/Interfaces";
import dayjs from "dayjs";
import Image from "next/legacy/image";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { FaReply, FaEdit, FaTrash, FaSave } from 'react-icons/fa';

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
  const [replies, setReplies] = useState<iComment[]>(comment.replies || []);

  const handleReply = async () => {
    if (comment.id) {
      await onReply(comment.id, replyBody);
      setReplies([...replies, {
        id: Date.now().toString(),
        body: replyBody,
        user: { ...comment.user },
        createdDate: new Date(),
        review: comment.review,
        parentId: comment.id,
        userId: comment.userId,
        isDeleted: false,
        reviewId: comment.reviewId,
      }]);
      setIsReplying(false);
      setReplyBody("");
      // queryClient.invalidateQueries({ queryKey: ["review"] });
    }
  };

  {
    replies.length > 0 && (
      <div className="mt-2 ml-4">
        {replies.map((reply) => (
          <Comment
            key={reply.id}
            comment={reply as iComment}
            onReply={onReply}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    )
  }
  const queryClient = useQueryClient();

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

  // const handleReply = async () => {
  //
  //   if (comment.id) {
  //     await onReply(comment.id, replyBody);
  //   }
  //   setIsReplying(false);
  //   setReplyBody("");
  // };

  return (
    <div className="flex w-full flex-col md:w-full p-2  mb-1 bg-myTheme-lightbg border-l-2 ">
      <div className="flex items-center mb-1">
        <Image
          src={comment.user?.avatar || "/default-avatar.png"}
          alt={`${comment.user?.firstName} ${comment.user?.lastName}`}
          className="w-8 h-8 rounded-full mr-2"
          width={32}
          height={32}
        />
        <Link href={`/userprofile/${comment.user?.id}`}>
          <span className="text-myTheme-dark text-sm ml-1 font-semibold">
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

      <div className="mt-2 flex space-x-4 justify-start items-start">
        <button
          onClick={() => setIsReplying(!isReplying)}
          className="text-blue-500 hover:underline text-sm flex items-center"
        >
          <FaReply className="inline mr-1" />
          Reply
        </button>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="text-green-500 hover:underline text-sm flex items-center"
          >
            <FaSave className="inline mr-1" />
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="text-blue-500 hover:underline text-sm flex items-center"
          >
            <FaEdit className="inline mr-1" />
            Edit
          </button>
        )}
        <button
          onClick={handleDelete}
          className="text-red-500 hover:underline text-sm flex items-center"
        >
          <FaTrash className="inline mr-1" />
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
      {replies && replies.length > 0 && (
        <div className="mt-2 ml-2">
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply} // Change this line to use iComment directly
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
