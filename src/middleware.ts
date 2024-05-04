// noinspection SpellCheckingInspection

import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/browse",
    "/reviews",
    "/fr",
    /^\/fr\/[a-zA-Z0-9-]+$/,
    "/api/get/all/products",
    "/api/get/all/reviews",
    "/api/get/products",
    "/api/get/reviews",
    "/api/get/review",
    "/api/get/user",
    "/api/webhook",
    "/api/webhook/user_update",
    "/api/get/review/latest",
    "/api/update/helpful",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  ignoredRoutes: [],
};
