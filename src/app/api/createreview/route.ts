import { NextResponse } from 'next/server';
import Review from '@/app/util/models/Review';
import connectMongoose from '../../util/mongooseConnect'
import mongoose from 'mongoose';
import { iReview } from '@/app/util/Interfaces';

const connect = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }
    await connectMongoose();
}

connect();


export async function POST(request: Request) {
    console.log('running create review');
    try {
        const body: iReview = await request.json();
        console.log('This is body', body);

        const result: iReview = await Review.create(body);
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
