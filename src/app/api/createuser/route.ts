import { NextResponse } from 'next/server';
import User from '@/app/util/models/User';
import connectMongoose from '../../util/mongooseConnect'
import mongoose from 'mongoose';
import { iUser } from '@/app/util/Interfaces';

const connect = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }
    await connectMongoose();
}




export async function POST(request: Request) {
    await connect();
    console.log('running create user');
    try {
        const body: iUser = await request.json();
        console.log('This is body', body);

        const result: iUser = await User.create(body);
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
