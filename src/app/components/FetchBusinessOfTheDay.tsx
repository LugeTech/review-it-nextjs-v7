import { iReview } from "@/app/util/Interfaces";
import { api } from "@/app/util/apiUrl";
interface Props {
  params: {
    id: string;
  };
}

const page = async ({ params }: Props) => {
  let reviewsData = null;
  try {
    reviewsData = await fetch(api + "/getreviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      cache: "no-store",
      body: JSON.stringify({ rating: 1 }), // will fetch business of the day
    });

    reviewsData = await reviewsData.json();
  } catch (error) {
    console.log(error);
  }

  // await client.close();
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className=" flex flex-1 justify-center mt-2 text-xl font-bold text-myTheme-dark dark:text-myTheme-light">
        Business Of The Day
      </h1>
      {reviewsData ? (
        <h1 className="flex flex-1 justify-center mt-2 text-sm  text-myTheme-dark dark:text-myTheme-light">
          {JSON.stringify(reviewsData.data._id)}
        </h1>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default page;
