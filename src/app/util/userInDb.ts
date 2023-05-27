import { clerkClient } from "@clerk/nextjs/server";
export const userInDb = async (clerkUserId: string) => {
  const user = await clerkClient.users.getUser(clerkUserId);
  if (user.privateMetadata.userInDb === true) {
    console.log("userInDb function returning true");
    return true;
  } else {
    console.log("userInDb function returning false");
    return false;
  }
};
