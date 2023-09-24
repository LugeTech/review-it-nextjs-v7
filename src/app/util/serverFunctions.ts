import { iComment, iProduct, iReview, iUser } from "@/app/util/Interfaces";
import { apiUrl } from "./apiUrl";

export const getUser = async () => {
  const user = await fetch(`${apiUrl}/get/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json()
  )
  return user;
};

export const getReview = async (id: string) => {
  const body = {
    id,
  }

  const review: iReview[] = await fetch(`${apiUrl}/get/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json()
  )
  return review;
};

export const getReviews = async (id: string) => {
  const body = {
    id,
    isPublic: true,
    user: true,
    product: true,
    comments: true,
  }

  const reviews: iReview[] = await fetch(`${apiUrl}/get/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json()
  )
  return reviews;
};

export const getLatestReviews = async () => {

  const reviews: iReview[] = await fetch(`${apiUrl}/get/review/latest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json()
  )
  return reviews;
};

export const getProduct = async (id: string) => {
  const product: iProduct = await fetch(`${apiUrl}/get/product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  }).then((res) => res.json()
  )
  return product;
};

export const getProducts = async () => {
  const products: iProduct[] = await fetch(`${apiUrl}/get/all/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json()
  )
  return products;
};

export const createCommentOnReview = async (comment: iComment) => {
  console.log(comment);
  if (comment.body === "") return;
  const response = await fetch(`${apiUrl}/create/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  const data = await response.json();
  return data;
}
