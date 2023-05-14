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


export async function GET(req: Request) {
    console.log('running find');
    console.log(mongoose.connection.readyState);

    try {
        const reviews = await Review.find({});
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


export async function POST(request: Request) {
    console.log('running insert');
    try {
        const body: iReview = await request.json();
        console.log(body);

        const result = await Review.create(body);
        return NextResponse.json({
            success: true,
            status: 200,
            data: result
        }); 
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            status: 500,
            data: error
        });
    }
}
