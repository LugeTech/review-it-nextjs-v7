/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/jJpmsiruck6
 */
import Link from "next/link"

import { Progress } from "@/components/ui/progress"
import { iReview } from "@/app/util/Interfaces";
interface SummaryCardProps {
  reviews: iReview[]
}
interface iCalculatedRating {
  roundedRating: number;
  roundedRatingOneDecimalPlace: number;
  numberOfReviews: number;
}

const ReviewsSummary: React.FC<SummaryCardProps> = ({ reviews }) => {
  const numberOfReviews = reviews.length
  return (
    <div className="w-full mx-auto items-center justify-between bg-myTheme-lightbg dark:bg-myTheme-niceGrey shadow-lg p-6 mt-3">
      <h2 className="text-xl font-semibold text-center text-myTheme-dark dark:text-myTheme-light">All Reviews</h2>
      <div className="flex flex-col mt-1 text-center">
        <p> 4.3 out of 5 </p>
        <p className="text-xs text-gray-400">{numberOfReviews} Reviews</p>
      </div>
      <div className="mt-4 space-y-2 grid grid-rows-5">

        <div className="grid grid-cols-6 items-center">
          <p className="text-sm  font-medium col-span-1">5 star</p>
          <Progress className="col-span-4 dark:bg-zinc-500" value={69} />
          <p className="text-sm font-medium col-span-1 text-right">{`${69}%`}</p>
        </div>

        <div className="grid grid-cols-6 items-center">
          <p className="text-sm font-medium col-span-1">4 star</p>
          <Progress className="col-span-4 dark:bg-zinc-400" value={45} />
          <p className="text-sm font-medium col-span-1 text-right">{`${45}%`}</p>
        </div>
        <div className="grid grid-cols-6 items-center">
          <p className="text-sm font-medium col-span-1">3 star</p>
          <Progress className="col-span-4 dark:bg-zinc-400" value={16} />
          <p className="text-sm font-medium col-span-1 text-right">{`${16}%`}</p>
        </div>
        <div className="grid grid-cols-6 items-center">
          <p className="text-sm font-medium col-span-1">2 star</p>
          <Progress className="col-span-4 dark:bg-zinc-400" value={11} />
          <p className="text-sm font-medium col-span-1 text-right">{`${11}%`}</p>
        </div>
        <div className="grid grid-cols-6 items-center">
          <p className="text-sm font-medium col-span-1">1 star</p>
          <Progress className="col-span-4 dark:bg-zinc-400" value={2} />
          <p className="text-sm font-medium col-span-1 text-right">{`${2}%`}</p>
        </div>
      </div>
      <Link className="inline-block mt-4 text-sm text-blue-600 hover:underline" href="#">
        How customer reviews and ratings work
      </Link>
    </div>
  )
}


// function StarIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//     </svg>
//   )
// }

export default ReviewsSummary
