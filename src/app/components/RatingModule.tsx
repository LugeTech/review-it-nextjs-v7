'use client'

import { Rating } from '@smastrom/react-rating'
import {styleForRating} from '@/app/util/CONST'

const RatingModule = ({name, rating, ratingChanged, size=100 }: {name: string, rating: number, ratingChanged: (rating: number) => void, size: number }) => {
    return (
        <div>
            <Rating itemStyles={styleForRating} style={{ maxWidth: size }} value={rating} onChange={ratingChanged} />
        </div>
    )
}

export default RatingModule