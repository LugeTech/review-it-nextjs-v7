import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isOnLockDownList = createRouteMatcher([
  "/cr(.*)",
  "/submit(.*)",
  // "/myactivity(.*)",
  // "/userprofile(.*)",
]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware((auth, req) => {
  // Restrict admin route to users with specific role
  if (isAdminRoute(req)) auth().protect({ role: "org:admin" });

  // Restrict routes to signed in users
  if (isOnLockDownList(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
