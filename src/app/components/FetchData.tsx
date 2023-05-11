import {Review} from '@/app/tools/Interfaces'
import client from '../tools/mongo'

  interface Props {
    params: {
        id: string
    }
}

const page = async ({params}: Props) => {
    // const response = await fetch('http://localhost:8000/db/getallreviews', { cache: 'no-store' })
    // const {reviews}:{reviews:Review[]} = await response.json()
    // const reviews: Review[] = await ReviewModel.find({})

    let reviewsData: Review[] = []
        try {
          const database = client.db(process.env.DATABASE);
          // Specifying a Schema is always optional, but it enables type hinting on
          // finds and inserts
          const collection = database.collection(process.env.COLLECTION);
          reviewsData = await collection.findOne({rating:3});
          await client.close();
        } 
        catch (error) {
            await client.close();
          console.log(error);
        }


    return (
        <div>
            <h1>{JSON.stringify(reviewsData)}</h1>
        </div>


    )
}

export default page
