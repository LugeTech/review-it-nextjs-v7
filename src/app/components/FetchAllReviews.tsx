import {UseQueryResult, useQuery} from '@tanstack/react-query'
import axios from 'axios'
import {iReview} from '@/app/util/Interfaces'


const FetchAllReviews = () => {

    const fetchReviews = async () => {
        try {
            const res = await axios.get('http://localhost:8000/db/getallreviews')
            return res.data
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    const {data, isLoading, isError, error}: UseQueryResult<any> = useQuery(['reviews'], fetchReviews)
    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>{error?.toString()}</p>
    if (data) console.log('this is the data', data)


    return (
        <div>
            <h1>Fetch All Reviews</h1>
            <p>Reviews: {data.reviews.length}</p>
            {<div>
                {data.reviews.map((review: iReview) => {
                    return (
                        <div key={review._id}>
                            <h3>{review.title}</h3>
                            <p>{review.body}</p>
                            <p>{review.rating}</p>
                        </div>
                    )
                })}
            </div>
            }
        </div>
    )
}

export default FetchAllReviews
