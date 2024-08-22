import React, { useState, useEffect, ReactNode } from "react";
import { iComment } from "../util/Interfaces";
import dayjs from "dayjs";
import Link from "next/link";
import { ReplyIcon, PencilIcon, TrashIcon, SaveIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommentProps {
  comment: iComment;
  onReply: (parentId: string, body: string) => Promise<void>;
  onEdit: (commentId: string, body: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
  depth: number;
  children?: ReactNode;
}

const MAX_VISIBLE_DEPTH = 5;

const Comment: React.FC<CommentProps> = ({ comment: initialComment, onReply, onEdit, onDelete, depth = 0 }) => {
  const [comment, setComment] = useState(initialComment);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(comment.body);
  const [showFullComment, setShowFullComment] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyBody, setReplyBody] = useState("");
  const [replies, setReplies] = useState<iComment[]>(comment.replies || []);
  const [newReplyId, setNewReplyId] = useState<string | null>(null);
  const [showReplies, setShowReplies] = useState(depth < MAX_VISIBLE_DEPTH);

  useEffect(() => {
    setComment(initialComment);
    setEditedBody(initialComment.body);
    setReplies(initialComment.replies || []);
  }, [initialComment]);

  const handleReply = async () => {
    if (comment.id) {
      await onReply(comment.id, replyBody);
      const newReply: iComment = {
        id: Date.now().toString(),
        body: replyBody,
        user: { ...comment.user },
        createdDate: new Date(),
        review: comment.review,
        parentId: comment.id,
        userId: comment.userId,
        isDeleted: false,
        reviewId: comment.reviewId,
      };
      setReplies([newReply, ...replies]);
      setNewReplyId(newReply.id!);
      setIsReplying(false);
      setReplyBody("");
      setShowReplies(true);
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
      const updatedComment = { ...comment, body: editedBody };
      setComment(updatedComment);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (comment.id && window.confirm("Are you sure you want to delete this comment?")) {
      await onDelete(comment.id);

      const deletedComment = {
        ...comment,
        isDeleted: true,
        body: "This comment has been deleted",
        user: { ...comment.user, userName: "Deleted User", avatar: "/logo.png" },
      };

      setComment(deletedComment);
    }
  };

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const renderReplies = () => {
    if (!replies || replies.length === 0) return null;

    return (
      <div className={`mt-2 ${depth >= MAX_VISIBLE_DEPTH - 1 ? 'border-l-2 border-gray-300 pl-2' : 'ml-4'}`}>
        {replies.map((reply) => (
          <Comment
            key={reply.id}
            comment={reply}
            onReply={onReply}
            onEdit={onEdit}
            onDelete={onDelete}
            depth={depth + 1}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={`w-full bg-white rounded-lg shadow-md p-2 mb-2 ${depth > 0 ? 'ml-2' : ''}`}>
      <div className="flex items-start space-x-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src={comment.user?.avatar || "/default-avatar.png"} alt={`${comment.user?.firstName} ${comment.user?.lastName}`} />
          <AvatarFallback>{comment.user?.firstName?.charAt(0)}{comment.user?.lastName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <Link href={`/userprofile/${comment.user?.id}`} className="font-semibold text-blue-600 hover:underline text-sm">
              @{comment.user?.userName}
            </Link>
            <span className="text-gray-400 text-xs ml-2">
              {dayjs(comment.createdDate).format("MMM D, YYYY [at] h:mm A")}
            </span>
          </div>
          <div className="text-gray-700 text-sm">
            {isEditing ? (
              <Textarea
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
                className="w-full mt-2 text-sm"
              />
            ) : comment.isDeleted ? (
              <span className="italic text-gray-500">{comment.body}</span>
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
          {!comment.isDeleted && (
            <div className="mt-2 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="text-xs px-2 py-1" onClick={() => setIsReplying(!isReplying)}>
                <ReplyIcon className="w-3 h-3 mr-1" />
                Reply
              </Button>
              {isEditing ? (
                <Button variant="outline" size="sm" className="text-xs px-2 py-1" onClick={handleSave}>
                  <SaveIcon className="w-3 h-3 mr-1" />
                  Save
                </Button>
              ) : (
                <Button variant="outline" size="sm" className="text-xs px-2 py-1 hover:bg-yellow-500 hover:text-white" onClick={handleEdit}>
                  <PencilIcon className="w-3 h-3 mr-1" />
                  Edit
                </Button>
              )}
              <Button variant="outline" size="sm" className="text-xs px-2 py-1 hover:bg-red-500 hover:text-white" onClick={handleDelete}>
                <TrashIcon className="w-3 h-3 mr-1" />
                Delete
              </Button>
            </div>
          )}
          {isReplying && (
            <div className="mt-2">
              <Textarea
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
                className="w-full text-sm"
                placeholder="Write your reply..."
              />
              <Button className="mt-2 bg-green-500 text-white text-xs px-2 py-1" onClick={handleReply}>
                Submit Reply
              </Button>
            </div>
          )}
        </div>
      </div>
      {replies.length > 0 && (
        <div className="mt-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs px-2 py-1"
            onClick={toggleReplies}
          >
            {showReplies ? <ChevronUpIcon className="w-3 h-3 mr-1" /> : <ChevronDownIcon className="w-3 h-3 mr-1" />}
            {showReplies ? 'Hide' : 'Show'} {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
          </Button>
          {showReplies && renderReplies()}
        </div>
      )}
    </div>
  );
};

export default Comment;
