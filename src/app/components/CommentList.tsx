import React, { useEffect, useState } from 'react';
import { iComment } from "../util/Interfaces";
import Comment from './Comment';

interface CommentListProps {
  comments: iComment[];
  onReply: (parentId: string, body: string) => Promise<void>;
  onEdit: (commentId: string, body: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
}

const CommentList: React.FC<CommentListProps> = ({ comments, onReply, onEdit, onDelete }) => {
  const [organizedComments, setOrganizedComments] = useState<iComment[]>([]);

  // Function to organize comments into a tree structure
  const organizeComments = (comments: iComment[]): iComment[] => {
    const commentMap = new Map<string, iComment>();
    const rootComments: iComment[] = [];

    // First pass: create a map of all comments
    comments.forEach(comment => {
      comment.replies = [];
      commentMap.set(comment.id!, comment);
    });

    // Second pass: organize into tree structure
    comments.forEach(comment => {
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
  };

  useEffect(() => {
    setOrganizedComments(organizeComments(comments));
  }, [comments]);

  return (
    <div className="flex flex-col w-full p-2  sm:pt-8 bg-myTheme-lightbg ">
      {organizedComments.map(comment => (
        <Comment
          key={comment.id || "no key"}
          comment={comment}
          onReply={onReply}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CommentList;
