import client from "@/app/tools/mongo";
import { NextResponse } from "next/server";


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