import { NextResponse } from 'next/server';
import Review from '@/app/util/models/Review';
import connectMongoose from '../../util/mongooseConnect';
import mongoose from 'mongoose';
import { iReview } from '@/app/util/Interfaces';

const connect = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }
    await connectMongoose();
}
connect();

// currently only _id. will use post for complex queries
export async function GET(request: Request) {
    console.log('getting by id')
    let body = {};
    const { searchParams } = new URL(request.url);
    if (searchParams.get('_id') !== null) { // if there is a rating then get the review
        const _id = searchParams.get('_id');
        const isValidId = mongoose.Types.ObjectId.isValid(_id!);
        if (isValidId) {
            body = { _id: _id };
        } else {
            return NextResponse.json({
                success: false,
                status: 500,
                data: { error: "the id is not valid" }
            });
        }
        console.log('body contains rating from search params, running search', body)
    }

    try {
        if (!body) {
            console.log('Body empty retu7rning all reviews', body)
        }
        const reviews = await Review.findOne(body);
        console.log('returning :', reviews)
        return NextResponse.json({
            success: true,
            status: 200,
            data: reviews
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            status: 500,
            data: error
        });
    }
}


// send empty body and will return the full reviews data | send ratings to get all ratings or whatever
// will reply with single object
export async function POST(request: Request) {
    const body = await request.json()
    console.log('this is body, if it isn\'t empty then thats the search criteria:', body);

    try {
        const reviews = await Review.findOne(body);
        console.log('returning :', reviews)
        return NextResponse.json({
            success: true,
            status: 200,
            data: reviews
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            status: 500,
            data: error
        });
    }
}