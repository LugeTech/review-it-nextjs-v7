import client from '@/app/util/mongo';
import { Review as iReview } from "@/app/util/Interfaces";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body: iReview = await request.json();
    body.createdDate = new Date();
    console.log(body)

    try {
        if (typeof process.env.REVIEWS_COLLECTION === 'string') {
            const database = client.db(process.env.DATABASE);
            const collection = database.collection(process.env.REVIEWS_COLLECTION);
            // const reviewsData = await collection.findOne(body);
            // return NextResponse.json(reviewsData);
        }
    }
    catch (error) {
        console.log(error);
    }
}