import {Review} from '@/app/tools/Interfaces'
import ReviewModel from '@/app/tools/ReviewModel'
  interface Props {
    params: {
        id: string
    }
}


const page = async ({params}: Props) => {



    const response = await fetch('http://localhost:8000/db/getallreviews', { cache: 'no-store' })
    const {reviews}:{reviews:Review[]} = await response.json()
    console.log(reviews)
    return (
        <div>
            <h1>{params.id}</h1>
            <h1>{JSON.stringify(reviews)}</h1>
        </div>


    )
}

export default page
