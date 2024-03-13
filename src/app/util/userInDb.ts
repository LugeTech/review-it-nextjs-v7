import { clerkClient } from "@clerk/nextjs/server";
export const userInDb = async (clerkUserId: string) => {
  const user = await clerkClient.users.getUser(clerkUserId);
  if (user.publicMetadata.userInDb === true) {
    return true;
  } else {
    return false;
  }
};
