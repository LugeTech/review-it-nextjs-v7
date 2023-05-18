import ReviewForm from "../components/ReviewForm";
// const  ReviewForm = lazy(() => import("../components/ReviewForm"));


export default function CreateReview() {
    return (
        <div className="flex flex-1  flex-col bg-mycolours-light dark:bg-mycolours-dark ">
            <ReviewForm />

        </div>
    )
}



