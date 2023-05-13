import { Review } from '@/app/util/Interfaces'
import client from '../util/mongo'

interface Props {
    params: {
        id: string
    }
}

const page = async ({ params }: Props) => {

    let reviewsData
    try {
        if (typeof process.env.REVIEW_COLLECTION === 'string') {
            const database = client.db(process.env.DATABASE);
            const collection = database.collection(process.env.REVIEW_COLLECTION);
            reviewsData = await collection.findOne({ rating: 3 });
            console.log('confirmed strings')
        }

    }
    catch (error) {
        await client.close();
        console.log(error);
    }


    console.log(reviewsData);

    // await client.close();
    return (
        <div>
            <h1>{JSON.stringify(reviewsData)}</h1>
        </div>


    )
}

export default page
