import { NextResponse } from 'next/server';

import { iUser } from '@/app/util/Interfaces';

export async function POST(request: Request) { // create a user using post body

    const body: iUser = await request.json();
    body.createdDate = new Date();
    console.log(body) //sanitize this
    try {
        if (typeof process.env.USERS_COLLECTION === 'string') {
            // const database = client.db(process.env.DATABASE);
            // const collection = database.collection(process.env.USERS_COLLECTION);
            // const userData = await collection.insertOne(body);
            // return NextResponse.json(userData);
        }
    }
    catch (error) {
        // await client.close();
        console.log(error);
    }



}