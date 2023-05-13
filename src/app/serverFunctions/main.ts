import { Review } from '@/app/util/Interfaces'
import client from '../util/mongo'

export async function addReview(review: Review) {
    let reviewsData
    try {
        if (typeof process.env.REVIEW_COLLECTION === 'string') {
            const database = client.db(process.env.DATABASE);
            const collection = database.collection(process.env.REVIEW_COLLECTION);
            reviewsData = await collection.findOne({ rating: 3 });
        }
    }
    catch (error) {
        await client.close();
        console.log(error);
    }
    return reviewsData
}
