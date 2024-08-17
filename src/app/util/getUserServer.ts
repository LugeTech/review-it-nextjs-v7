
import { UserDATA } from "./Interfaces";
import { getAuth } from "@clerk/nextjs/server";
export async function getUserData(request: any) {
  const { sessionClaims } = getAuth(request);
  if (!sessionClaims) {
    return null;
  }
  const userData = sessionClaims as unknown as UserDATA;

  return userData;
}
