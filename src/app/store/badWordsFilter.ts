// lib/badWordsFilter.ts

import { Filter } from 'bad-words';
import { iComment, iReview } from '../util/Interfaces';

// Function to fetch bad words from the API
export async function fetchBadWords(): Promise<string[]> {
  const response = await fetch("http://127.0.0.1:3002/words");
  return response.json();
}

export async function createFilter(): Promise<Filter> {
  let filter = new Filter()
  try {
    const badwords = await fetchBadWords();
    if (badwords.length > 0) {
      filter.addWords(...badwords.map(word => word.toLowerCase()))
    }
    return filter;

  } catch {
    console.log("bad words server not running")
  }
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

export function cleanReviews(filter: Filter, reviews: iReview[]): iReview[] {
  return reviews.map(review => cleanReview(filter, review));
}

function cleanComment(filter: Filter, comment: iComment): iComment {
  const cleanedComment = { ...comment };
  cleanedComment.body = filter.clean(comment.body);

  if (cleanedComment.replies) {
    cleanedComment.replies = cleanedComment.replies.map(reply => cleanComment(filter, reply));
  }
  return cleanedComment;
}
