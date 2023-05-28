// Importing necessary modules and packages
import {PrismaClient} from "@prisma/client";
import {NextResponse, NextRequest} from "next/server";
import {clerkClient, getAuth} from "@clerk/nextjs/server";
import {userInDb} from "@/app/util/userInDb";
import {addUserToDb} from "@/app/util/addUserToDb";

// Initializing Prisma client
const prisma = new PrismaClient();

// Interface representing user data
interface UserDATA {
    avatar?: string;
    azp: string;
    email: string;
    exp: number;
    firstName: string;
    lastName: string;
    fullName: string;
    iat: number;
    iss: string;
    jti: string;
    nbf: number;
    sub: string;
    userId: string;
    userName: string;
}

// Exporting the POST function that handles the API request
export async function POST(request: NextRequest) {
    const body = await request.json();
    let clerkUser = null;
    try {
        // Extracting session claims from the request
        const {sessionClaims} = getAuth(request);
        // Casting the session claims to UserDATA type
        const clerkUserData = sessionClaims as unknown as UserDATA;
        // Logging the user data received
        console.log(
            "create review api just got hit with this user data",
            clerkUserData
        );

        // Checking if the user already exists in the database
        if (!(await userInDb(clerkUserData.userId))) {
            clerkUser = await addUserToDb(clerkUserData) // person created
        } else {
            // Retrieve the Clerk user information if the user was already in db
            clerkUser = await clerkClient.users.getUser(clerkUserData.userId);
            console.log('user was already in the db', clerkUser);
        }

        // check if item is in db
        if (body.item.itemSelected) {
            const item = await prisma.item.findUnique({
                where: {
                    id: body.itemId
                }
            })
            if (!item) {
                return NextResponse.json({
                    success: false,
                    status: 500,
                    data: "item not found",
                });
            } else {
                // item exists
                body.userId = clerkUser.publicMetadata.id as unknown as string
                // Create a new review entry in the database
                const review = await prisma.review.create({
                    data: body.review, // will need to deserialize the data to get only what is needed
                });

                // Logging a success message
                console.log("review created with item from db");

                // Returning the response as JSON
                return NextResponse.json({
                    success: true,
                    status: 200,
                    data: review,
                });
            }
        } else {
            // create a new item
            const item = await prisma.item.create({
                data: body.item
            });

            body.itemId = item.id
            body.userId = clerkUser.publicMetadata.id as unknown as string
            // Create a new review entry in the database
            const review = await prisma.review.create({
                data: body,
            });

            // Logging a success message
            console.log("review created with new item");

            // Returning the response as JSON
            return NextResponse.json({
                success: true,
                status: 200,
                data: review,
            });
        }
    } catch (error) {
        // Handling errors and returning error response
        console.log(error);
        return NextResponse.json({
            success: false,
            status: 500,
            data: error,
        });
    }
}
