import { NextResponse } from 'next/server';
import client from '@/app/util/mongo'

export async function POST(request: Request) { // get a review using post body
    const body = await request.json();
    console.log(body)
    try {
        if (typeof process.env.REVIEWS_COLLECTION === 'string') {
            const database = client.db(process.env.DATABASE);
            const collection = database.collection(process.env.REVIEWS_COLLECTION);
            const reviews = await collection.find({}).toArray()
            return NextResponse.json({
                success: true,
                status: 200,
                data: reviews
            })
        }
    }
    catch (error) {
        await client.close();
        return NextResponse.json({
            success: true,
            status: 500,
            data: error
        })
    }

}