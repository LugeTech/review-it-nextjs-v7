import React, { useMemo, useCallback } from "react";
import { iComment, iUser } from "../util/Interfaces";
import Comment from "./Comment";

interface CommentListProps {
  comments: iComment[];
  onReply: (parentId: string, body: string) => Promise<void>;
  onEdit: (commentId: string, body: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
  clerkUserId: string;
  currentUser: iUser;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  onReply,
  onEdit,
  onDelete,
  clerkUserId,
  currentUser,
}) => {
  // Memoize the organizeComments function
  const organizeComments = useCallback((comments: iComment[]): iComment[] => {
    const commentMap = new Map<string, iComment>();
    const rootComments: iComment[] = [];

    comments.forEach((comment) => {
      comment.replies = [];
      commentMap.set(comment.id!, comment);
    });

    comments.forEach((comment) => {
      if (comment.parentId) {
        const parent = commentMap.get(comment.parentId);
        if (parent) {
          parent.replies!.push(comment);
        }
      } else {
        rootComments.push(comment);
      }
    });

    return rootComments;
  }, []);

  // Use useMemo to organize comments
  const organizedComments = useMemo(
    () => organizeComments(comments),
    [comments, organizeComments],
  );

  // Memoize the renderComment function
  const renderComment = useCallback(
    (comment: iComment, depth: number = 0) => (
      <Comment
        clerkUserId={clerkUserId}
        key={comment.id || "no key"}
        comment={comment}
        onReply={(parentId, body) => onReply(parentId, body)}
        onEdit={onEdit}
        onDelete={onDelete}
        depth={depth}
        currentUser={currentUser}
      >
        {comment.replies &&
          comment.replies.map((reply) => renderComment(reply, depth + 1))}
      </Comment>
    ),
    [clerkUserId, onReply, onEdit, onDelete, currentUser],
  );

  return (
    <div className="flex flex-col w-full p-2 sm:pt-8 bg-myTheme-lightbg">
      {organizedComments.map((comment) => renderComment(comment))}
    </div>
  );
};

export default React.memo(CommentList);
