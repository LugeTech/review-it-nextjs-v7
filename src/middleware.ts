import { authMiddleware } from "@clerk/nextjs";
import { api } from "@/app/util/CONST";
import { clerkClient } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ["/", "/api/get/"],
  // async afterAuth(auth, req, evt) {
  //   if (auth.userId) {
  //     console.log(
  //       "afterAuth detected the user is not in the mongodb, sending request to add"
  //     );

  //     const user = await clerkClient.users.getUser(auth.userId);
  //     if (user.privateMetadata.userInDb !== true) {
  //       console.log(
  //         "afterAuth detected userInDb false, sending request to add"
  //       );
  //       await fetch(`${api}/create/user`, {
  //         method: "POST",
  //         cache: "no-store",
  //       });
  //     } else {
  //       console.log("afterAuth detected userInDb true");
  //     }
  //   }
  // },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
