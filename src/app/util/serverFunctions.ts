import { iComment, iProduct, iReview } from "@/app/util/Interfaces";
import { apiUrl } from "./apiUrl";

interface helpfulData {
  reviewId: string;
  userInDbId: string;
}
export const updateHelpfulVote = async (data: helpfulData) => {
  const body = {
    reviewId: data.reviewId,
    userId: data.userInDbId,
  };
  const response = await fetch(`${apiUrl}/update/helpful`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(body),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to increment helpful votes");
    }
    return res.json();
  });

  return response;
};

export const getUserWithId = async (userId: string) => {
  const user = await fetch(`${apiUrl}/get/userwithid`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  console.log(user);
  return user;
};

export const getUser = async () => {
  console.log("this is getUser function");
  const user = await fetch(`${apiUrl}/get/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  console.log(user);
  return user;
};

export const getReview = async (id: string) => {
  const body = {
    id,
  };

  const review: iReview[] = await fetch(`${apiUrl}/get/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
  return review;
};

export const getReviews = async (id: string) => {
  const body = {
    id,
    isPublic: true,
    user: true,
    product: true,
    comments: true,
    likedBy: true,
  };

  const reviews: iReview[] = await fetch(`${apiUrl}/get/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
  return reviews;
};

export const getLatestReviews = async () => {
  const reviews: iReview[] = await fetch(`${apiUrl}/get/review/latest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return reviews;
};

export const getProduct = async (id: string) => {
  const product: iProduct = await fetch(`${apiUrl}/get/product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  }).then((res) => res.json());
  return product;
};

export const getProducts = async () => {
  const products: iProduct[] = await fetch(`${apiUrl}/get/all/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return products;
};

export const createCommentOnReview = async (comment: iComment) => {
  if (comment.body === "") return;
  const response = await fetch(`${apiUrl}/create/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  const data = (await response.json()) as unknown as iComment;
  return data;
};
