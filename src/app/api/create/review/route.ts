// Importing necessary modules and packages
import {PrismaClient} from "@prisma/client";
import {NextResponse, NextRequest} from "next/server";
import {clerkClient, getAuth} from "@clerk/nextjs/server";
import {userInDb} from "@/app/util/userInDb";
import {addUserToDb} from "@/app/util/addUserToDb";
import {SentDataReviewAndItem} from "@/app/util/Interfaces";
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
    const sentDataReviewAndItem = await request.json() as SentDataReviewAndItem;
    let clerkUserData = null;
    try {
        // Extracting session claims from the request
        const {sessionClaims} = getAuth(request);
        // Casting the session claims to UserDATA type
        const clerkClaimsData = sessionClaims as unknown as UserDATA;
        // Logging the user data received
        //console.log(
        //     "create review api just got hit with this claims data",
        //     clerkClaimsData
        // );

        // Checking if the user already exists in the database
        if (!(await userInDb(clerkClaimsData.userId))) {
            clerkUserData = await addUserToDb(clerkClaimsData) // person created

        } else {
            // Retrieve the Clerk user information if the user was already in db
            clerkUserData = await clerkClient.users.getUser(clerkClaimsData.userId);
            //console.log('user was already in the db', clerkUserData);
        }

        // check if item is in db
        if (sentDataReviewAndItem.item.itemSelected) {
            console.log("about to check for item in db")

            const item = await prisma.item.findUnique({
                where: {
                    id: sentDataReviewAndItem.item.itemId
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
                console.log("item exists", item)
                console.log("this is the public meta id", clerkUserData.publicMetadata.id)


                sentDataReviewAndItem.userId = await clerkUserData.publicMetadata.id as unknown as string
                // Create a new review entry in the database
                const review = await prisma.review.create({
                    data: {
                        body: sentDataReviewAndItem.body,
                        rating: sentDataReviewAndItem.rating,
                        userId: sentDataReviewAndItem.userId,
                        title: sentDataReviewAndItem.title,
                        itemId: item.id,
                        createdDate: sentDataReviewAndItem.createdDate,
                        images: sentDataReviewAndItem.images,
                        videos: sentDataReviewAndItem.videos,
                        links: sentDataReviewAndItem.links,
                    },
                });

                // Logging a success message
                //console.log("review created with item from db");

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
                data: {
                    name: sentDataReviewAndItem.item.name,
                    description: sentDataReviewAndItem.item.description,
                    createdDate: sentDataReviewAndItem.item.createdDate,
                    images: sentDataReviewAndItem.item.images,
                    videos: sentDataReviewAndItem.item.videos,
                    links: sentDataReviewAndItem.item.links,
                    tags: sentDataReviewAndItem.item.tags,
                    openingHrs: sentDataReviewAndItem.item.openingHrs,
                    closingHrs: sentDataReviewAndItem.item.closingHrs,
                    address: sentDataReviewAndItem.item.address,
                    telephone: sentDataReviewAndItem.item.telephone,
                    website: sentDataReviewAndItem.item.website,
                    createdById: await clerkUserData.publicMetadata.id as unknown as string,

                }
            });

            sentDataReviewAndItem.itemId = item.id
            sentDataReviewAndItem.userId = clerkUserData.publicMetadata.id as unknown as string
            // Create a new review entry in the database
            const review = await prisma.review.create({
                data: {
                    body: sentDataReviewAndItem.body,
                    rating: sentDataReviewAndItem.rating,
                    userId: sentDataReviewAndItem.userId,
                    title: sentDataReviewAndItem.title,
                    itemId: sentDataReviewAndItem.itemId,
                    createdDate: sentDataReviewAndItem.createdDate,
                    images: sentDataReviewAndItem.images,
                    videos: sentDataReviewAndItem.videos,
                    links: sentDataReviewAndItem.links,
                },
            });

            // Logging a success message
            //console.log("review created with new item");

            // Returning the response as JSON
            return NextResponse.json({
                success: true,
                status: 200,
                data: review,
            });
        }
    } catch (error) {
        let e = error as Error;
        return NextResponse.json({
            success: false,
            status: 500,
            data: e.message.slice(0, 500) + '...'
        });
    }
}
