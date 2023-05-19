'use client'

import { Rating } from '@smastrom/react-rating'
import {styleForRating} from '@/app/util/CONST'

const RatingModule = ({name, rating, ratingChanged }: {name: string, rating: number, ratingChanged: (rating: number) => void }) => {
    return (
        <div>
            <Rating itemStyles={styleForRating} style={{ maxWidth: 100 }} value={rating} onChange={ratingChanged} />
        </div>
    )
}

export default RatingModule