'use client'
import CreateReviews from "../components/CreateReviews";


const WriteAReview = () => {
    return (
        <div className="flex flex-1  flex-col bg-mycolours-light dark:bg-mycolours-dark ">
            {/* <QuickReview /> */}
            <CreateReviews />
        </div>
    )
}

export default WriteAReview;
