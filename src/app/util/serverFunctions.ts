import { iProduct, iReview, iUser } from "@/app/util/Interfaces";
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

