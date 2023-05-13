
import { Review, User, Comment, Product } from "../util/Interfaces"

import ReviewBox from './ReviewBox'

interface TopReviewsProps {
    reviews: Review[];
    users: User[];
    products: Product[];
    comments: Comment[];
}




const TopReviews: React.FC<TopReviewsProps> = ({ reviews, users, products, comments }) => {
    return (
        <>
            <h1 className=" flex flex-1 justify-center mt-2 text-xl font-bold text-mycolours-dark dark:text-mycolours-light">Top Reviews</h1>
            <div className='flex justify-between flex-col sm:flex-row gap-1'>

                {reviews.map((review, index) => {
                    return (
                        <ReviewBox key={index} review={review} products={products} users={users} comments={comments} />
                    )
                })
                }
            </div>
        </>
    )
}

export default TopReviews
