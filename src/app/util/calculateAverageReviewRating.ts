import { iReview } from "@/app/util/Interfaces";
export function calculateAverageReviewRating(reviews: iReview[]) {
  if (reviews.length === 0) return null;
  const totalScore = reviews.reduce((acc, review) => acc + review.rating, 0);

  let averageRating = totalScore / reviews.length;
  let roundedRating = Math.round(averageRating)
  let roundedAOneDecimalPlace = {
    roundedRating: roundedRating,
    roundedRatingOneDecimalPlace: averageRating.toFixed(1),
    numberOfReviews: reviews.length
  }
  return roundedAOneDecimalPlace;
}
