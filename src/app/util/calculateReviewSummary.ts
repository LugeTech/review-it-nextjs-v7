// import ReviewsSummary from "@/components/reviews-summary";
import { iReview, ReviewSummaryData } from "./Interfaces";

export const calculateReviewsSummary = (reviews: iReview[]): ReviewSummaryData => {
        let count5Stars = 0;
        let count4Stars = 0;
        let count3Stars = 0;
        let count2Stars = 0;
        let count1Star = 0;

        // Iterate over each review to count star ratings
        reviews.forEach(review => {
                switch (review.rating) {
                        case 5:
                                count5Stars++;
                                break;
                        case 4:
                                count4Stars++;
                                break;
                        case 3:
                                count3Stars++;
                                break;
                        case 2:
                                count2Stars++;
                                break;
                        case 1:
                                count1Star++;
                                break;
                        default:
                                // Handle other ratings if necessary
                                break;
                }
        });

        // Calculate total number of ratings
        const totalCount = count5Stars + count4Stars + count3Stars + count2Stars + count1Star;

        // Calculate percentages
        const percentage5Stars = Math.round((count5Stars / totalCount) * 100);
        const percentage4Stars = Math.round((count4Stars / totalCount) * 100);
        const percentage3Stars = Math.round((count3Stars / totalCount) * 100);
        const percentage2Stars = Math.round((count2Stars / totalCount) * 100);
        const percentage1Star = Math.round((count1Star / totalCount) * 100);
        return {
                percentage5Stars,
                percentage4Stars,
                percentage3Stars,
                percentage2Stars,
                percentage1Star,
                totalCount
        }
}
