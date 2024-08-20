import { iComment } from "./Interfaces";

export function organizeComments(comments: iComment[]): iComment[] {
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
}
