import ReviewForm from "../components/ReviewForm";

export default function CreateReview() {
  return (
    <div className="flex flex-col bg-myTheme-light dark:bg-myTheme-dark h-full w-full items-center justify-center">
      <ReviewForm />
    </div>
  );
}
