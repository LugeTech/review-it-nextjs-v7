
import { iReview, iUser, iComment, iProduct } from "../util/Interfaces"

import ReviewBox from './ReviewBox'

interface TopReviewsProps {
    reviews: iReview[];
    users: iUser[];
    products: iProduct[];
    comments: iComment[];
}




const TopReviews: React.FC<TopReviewsProps> = ({ reviews, users, products, comments }) => {
    return (
        <div className="flex flex-col w-full justify-center items-center">
            <h1 className=" flex flex-1 justify-center mt-2 text-xl font-bold text-mycolours-dark dark:text-mycolours-light">Top Reviews</h1>
            <div className='flex justify-between flex-col sm:flex-row gap-1'>

                {reviews.map((review, index) => {
                    return (
                        <ReviewBox key={index} review={review} products={products} users={users} comments={comments} />
                    )
                })
                }
            </div>
        </div>
    )
}

export default TopReviews
