"use client";
import Reviews from "@/app/components/Reviews";
import { useSearchParams } from "next/navigation";
export default function CreateReview() {
  const searchParams = useSearchParams();
  // const searchRating = searchParams.get('rating')
  const id = searchParams.get("id")!;
  return (
    <div className="flex flex-col bg-myTheme-lightbg w-full items-center justify-start">
      <Reviews productId={id} />
    </div>
  );
}
