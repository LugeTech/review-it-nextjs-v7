
import ReviewForm from "@/app/components/ReviewForm";

export default function CreateReview({ params }: { params: { id: string } }) {
  // get params from url
  // console.log(params.id)
  return (
    <div className="flex flex-col bg-myTheme-lightbg dark:bg-myTheme-dark h-full w-full items-center justify-center">
      {/* <p>{params.id}</p> */}
      <ReviewForm id={params.id} />
    </div>
  );
}
