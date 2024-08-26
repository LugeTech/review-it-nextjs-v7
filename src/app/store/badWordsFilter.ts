// lib/badWordsFilter.ts

import { Filter } from 'bad-words';
import { iComment, iReview } from '../util/Interfaces';

// Function to fetch bad words from the API
export async function fetchBadWords(): Promise<string[]> {
  const response = await fetch("http://localhost/badwords");
  return response.json();
}

export async function createFilter(): Promise<Filter> {
  const badWords = await fetchBadWords();
  const filter = new Filter();
  filter.addWords(...badWords);
  return filter;
}

export function cleanText(filter: Filter, text: string): string {
  return filter.clean(text);
}

export function cleanReview(filter: Filter, review: iReview): iReview {
  const cleanedReview = { ...review };
  cleanedReview.body = filter.clean(review.body);
  cleanedReview.title = filter.clean(review.title);

  if (cleanedReview.comments) {
    cleanedReview.comments = cleanedReview.comments.map(comment => cleanComment(filter, comment));
  }
  return cleanedReview;
}

function cleanComment(filter: Filter, comment: iComment): iComment {
  const cleanedComment = { ...comment };
  cleanedComment.body = filter.clean(comment.body);

  if (cleanedComment.replies) {
    cleanedComment.replies = cleanedComment.replies.map(reply => cleanComment(filter, reply));
  }
  return cleanedComment;
}
