import React, { useState } from "react";
import { iComment } from "../util/Interfaces";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { ReplyIcon, PencilIcon, TrashIcon, SaveIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommentProps {
  comment: iComment;
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

  const queryClient = useQueryClient();

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
    }
  };

  const handleEdit = () => {
    if (comment.id) {
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (comment.id) {
      await onEdit(comment.id, editedBody);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (comment.id) {
      await onDelete(comment.id);
    }
  };

  if (!comment) {
    return <p className="text-gray-500 italic">No comment</p>;
  }
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-2 sm:p-4 mb-2 sm:mb-4">
      <div className="flex items-start space-x-2 sm:space-x-4">
        <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
          <AvatarImage src={comment.user?.avatar || "/default-avatar.png"} alt={`${comment.user?.firstName} ${comment.user?.lastName}`} />
          <AvatarFallback>{comment.user?.firstName?.charAt(0)}{comment.user?.lastName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center mb-1">
            <Link href={`/userprofile/${comment.user?.id}`} className="font-semibold text-blue-600 hover:underline text-sm sm:text-base">
              @{comment.user?.userName}
            </Link>
            <span className="text-gray-400 text-xs sm:ml-2">
              {dayjs(comment.createdDate).format("MMM D, YYYY [at] h:mm A")}
            </span>
          </div>
          <div className="text-gray-700 text-sm sm:text-base">
            {isEditing ? (
              <Textarea
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
                className="w-full mt-2 text-sm sm:text-base"
              />
            ) : showFullComment || comment.body.length <= 100 ? (
              comment.body
            ) : (
              <>
                {comment.body.slice(0, 100)}...
                <button
                  onClick={() => setShowFullComment(true)}
                  className="text-blue-500 hover:underline ml-1 text-sm"
                >
                  read more
                </button>
              </>
            )}
          </div>
          <div className="mt-2 sm:mt-3 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1" onClick={() => setIsReplying(!isReplying)}>
              <ReplyIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Reply
            </Button>
            {isEditing ? (
              <Button variant="outline" size="sm" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1" onClick={handleSave}>
                <SaveIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Save
              </Button>
            ) : (
              <Button variant="outline" size="sm" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1 hover:bg-yellow-500 hover:text-white" onClick={handleEdit}>
                <PencilIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Edit
              </Button>
            )}
            <Button variant="outline" size="sm" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1 hover:bg-red-500 hover:text-white" onClick={handleDelete}>
              <TrashIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Delete
            </Button>
          </div>
          {isReplying && (
            <div className="mt-2 sm:mt-3">
              <Textarea
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
                className="w-full text-sm sm:text-base"
                placeholder="Write your reply..."
              />
              <Button className="mt-2 bg-green-500 text-white text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1" onClick={handleReply}>
                Submit Reply
              </Button>
            </div>
          )}
        </div>
      </div>
      {replies && replies.length > 0 && (
        <div className="mt-2 sm:mt-4 ml-6 sm:ml-14 space-y-2 sm:space-y-4">
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
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
