import { iReview } from "@/app/util/Interfaces";
export const getReviews = async () => {

  const include = {
    "user": true,
    "item": true
  }

  const tools = await fetch("http://localhost:3000/api/get/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(include),
  }).then((res) => res.json()
  )
  console.log(tools)
  return tools;
};


// export const getToolDetail = async (id: string) => {
//   const tool = await prisma.tools.findUnique({
//     where: {
//       id: id,
//     },
//   }) as unknown as iTool
//
//   return tool;
// };
//
// export const writeToDb = async (data: any) => {
//   const prismaResult = await prisma.tools.create({
//     data: data,
//   }) as unknown as iTool
//   return prismaResult;
// };
