import { iProduct, iReview } from "@/app/util/Interfaces";
import { apiUrl } from "./apiUrl";

// export const getAllReviews = async () => {
//   const include = {
//     "user": true,
//     "product": true
//   }
//
//   const reviewUserAndproduct: ReviewUserAndproduct = await fetch(`${apiUrl}/get/all/reviews`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(include),
//   }).then((res) => res.json()
//   )
//   return reviewUserAndproduct
// };


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

