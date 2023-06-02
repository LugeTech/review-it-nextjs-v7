import ReviewForm from "../components/ReviewForm";
// const  ReviewForm = lazy(() => import("../components/ReviewForm"));


export default function CreateReview() {
    return (
        <div className="flex flex-1  flex-col bg-myTheme-light dark:bg-myTheme-dark ">
            <ReviewForm />

        </div>
    )
}



