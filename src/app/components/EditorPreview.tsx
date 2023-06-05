"use client";
import parse from "html-react-parser";
import RatingModule from "./RatingModule";
import { iReview } from "../util/Interfaces";
import { useUser } from "@clerk/nextjs";

interface editorPreviewProps {
  reviewData: iReview;
}

const EditorPreview = ({ reviewData }: editorPreviewProps) => {
  const { user } = useUser();

  const handleParse = (node: any): any => {
    //in the html i get two p tags when should be <br> so i manually replace the empty p tags
    if (
      node.type === "tag" &&
      node.name === "p" &&
      (!node.children || node.children.length === 0)
    ) {
      // If empty <p> tag, replace it with a newline
      return <br />;
    }
    return undefined; // Return undefined to keep the default behavior
  };

  const options = {
    replace: handleParse,
  };

  return (
    <div className="flex flex-col flex-1 dark:bg-myTheme-dark p-4 rounded-md lg:w-1/2 bg-slate-100 overflow-scroll ">
      <p className="text-sm font-bold mb-2 text-center">Preview!</p>
      <div className="flex flex-1 flex-col p-4 overflow-scroll bg-slate-200">
        <h1 className="font-bold underline text-center">
          {parse(reviewData.title)}
        </h1>

        {reviewData.title && (
          <div className="font-extralight text-xs italic no-underline pl-2 text-center">
            by {user?.username}
          </div>
        )}

        {reviewData.title && (
          <div className="flex flex-row gap-2 justify-center mt-2">
            <RatingModule
              name="rating"
              rating={reviewData.rating}
              ratingChanged={() => {
                alert("Can't change rating here");
              }}
              size={70}
            />
          </div>
        )}

        <div className=" text-start">{parse(reviewData.body, options)}</div>
      </div>
    </div>
  );
};

export default EditorPreview;
