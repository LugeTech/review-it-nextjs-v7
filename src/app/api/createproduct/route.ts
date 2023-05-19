import { NextResponse } from 'next/server';
import Product from '@/app/util/models/Review';
import connectMongoose from '../../util/mongooseConnect'
import mongoose from 'mongoose';
import { iProduct } from '@/app/util/Interfaces';

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
        const body: iProduct = await request.json();
        console.log('This is body', body);

        const result: iProduct = await Product.create(body);
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
