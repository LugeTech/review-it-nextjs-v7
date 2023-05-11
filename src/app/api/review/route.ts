import { NextResponse } from 'next/server';
import client from '@/app/tools/mongo'

let rating;
export async function GET(request: Request) { // get a review using url params
    const { searchParams } = new URL(request.url);
    if (searchParams.get('rating') !== null) { // if there is a rating then get the review
        const rating = searchParams.get('rating');
        try {
            if (typeof process.env.REVIEW_COLLECTION === 'string') {
                const database = client.db(process.env.DATABASE);
                const collection = database.collection(process.env.REVIEW_COLLECTION);
                if (rating !== null) {
                    const reviewsData = await collection.findOne({ rating: parseInt(rating) });
                    return NextResponse.json(reviewsData);
                }
            }
        }
        catch (error) {
            await client.close();
            console.log(error);
        }
    }

}

export async function POST(request: Request) { // get a review using post body
    const body = await request.json();
    console.log(body)
    try {
        if (typeof process.env.REVIEW_COLLECTION === 'string') {
            const database = client.db(process.env.DATABASE);
            const collection = database.collection(process.env.REVIEW_COLLECTION);
            const reviewsData = await collection.findOne(body);
            return NextResponse.json(reviewsData);
        }
    }
    catch (error) {
        await client.close();
        console.log(error);
    }

}
