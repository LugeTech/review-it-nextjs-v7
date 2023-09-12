
import Reviews from "@/app/components/Reviews";

export default function CreateReview({ params }: { params: { id: string } }) {
  // get params from url
  return (
    <div className="flex flex-col bg-myTheme-light dark:bg-myTheme-dark h-full w-full items-center justify-start">
      <Reviews productId={params.id} />
    </div>
  );
}
