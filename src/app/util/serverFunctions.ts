import { iProduct, ReviewUserAndproduct } from "@/app/util/Interfaces";
export const getReviews = async () => {

  const include = {
    "user": true,
    "product": true
  }

  const reviewUserAndproduct: ReviewUserAndproduct = await fetch("http://localhost:3000/api/get/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(include),
  }).then((res) => res.json()
  )
  return reviewUserAndproduct
};



export const getProducts = async () => {
  const products: iProduct[] = await fetch("http://localhost:3000/api/get/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json()
  )
  return products;
};
