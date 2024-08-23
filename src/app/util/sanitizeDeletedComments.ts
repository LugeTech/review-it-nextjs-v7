import { iProduct, iReview } from "./Interfaces";

export function sanitizeDeletedCommentsInReviews(reviews: iReview[]): iReview[] {
  reviews.forEach(review => {
    if (review.comments) {
      review.comments.forEach(comment => {
        if (comment.isDeleted) {
          comment.body = "This comment has been deleted.";
          if (comment.user) {
            comment.user.userName = "Deleted User";
            comment.user.avatar = undefined;
          }
        }
      });
    }
  });

  return reviews;
}

export function sanitizeDeletedCommentsInProducts(products: iProduct[]): iProduct[] {
  products.forEach(product => {
    product.reviews?.forEach(review => {
      if (review.comments) {
        review.comments.forEach(comment => {
          if (comment.isDeleted) {
            comment.body = "This comment has been deleted.";
            if (comment.user) {
              comment.user.userName = "Deleted User";
              comment.user.avatar = undefined;
            }
          }
        });
      }
    });
  });

  return products;
}

export function sanitizeDeletedCommentsInReview(review: iReview): iReview {
  if (review.comments) {
    review.comments.forEach(comment => {
      if (comment.isDeleted) {
        comment.body = "This comment has been deleted.";
        if (comment.user) {
          comment.user.userName = "Deleted User";
          comment.user.avatar = undefined;
        }
      }
    });
  }

  return review;
}

export function sanitizeDeletedCommentsInProduct(product: iProduct): iProduct {
  product.reviews?.forEach(review => {
    if (review.comments) {
      review.comments.forEach(comment => {
        if (comment.isDeleted) {
          comment.body = "This comment has been deleted.";
          if (comment.user) {
            comment.user.userName = "Deleted User";
            comment.user.avatar = undefined;
          }
        }
      });
    }
  });

  return product;
}

