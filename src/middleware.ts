// noinspection SpellCheckingInspection

import { authMiddleware } from "@clerk/nextjs";

console.log('hello from midleware thigfgfgfs')
export default authMiddleware({
  publicRoutes: ["/"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
