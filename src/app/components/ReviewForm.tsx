"use client";
import { iReview } from "../util/Interfaces";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import RatingModule from "./RatingModule";
// import ReactQuill from "react-quill";
// fixed build error here: https://stackoverflow.com/questions/73047747/error-referenceerror-document-is-not-defined-nextjs

const modules = {
  toolbar: [["bold", "italic", "underline", "strike"], ["link"], ["clean"]],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "link",
];

const ReviewForm = () => {
  const [quillValue, setQuillValue] = useState("");
  const [reviewData, setReviewData] = useState<iReview>({
    body: "",
    comments: [],
    date: undefined,
    helpfulVotes: 0,
    product: "",
    rating: 1,
    title: "",
    unhelpfulVotes: 0,
    user: "",
  });

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const [rating, setRating] = useState(1); // Initial value

  const ratingChanged = (newRating: number) => {
    setRating(newRating);

    function addRating(rating: number) {
      // not sure if this is necessary, but it should be the safest way. test before making simpler
      setReviewData((prevData): iReview => ({ ...prevData, rating: rating }));
    }

    addRating(newRating);
  };

  const sendToServer = async () => {
    reviewData.body = quillValue;
    try {
      const response = await fetch("http://localhost:3000/api/createreview", {
        method: "POST",
        body: JSON.stringify(reviewData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReviewData((prevData): iReview => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(reviewData);
    await sendToServer()
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-8 p-4 flex-grow h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:w-1/2 bg-gray-100 p-2 rounded-md md:max-w-screen h-[90%]"
      >
        <div className="mb-4">
          <label htmlFor="title" className="text-sm font-bold">
            Product
          </label>
          <input
            type="text"
            id="title"
            name="product"
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="text-sm font-bold">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className=" flex justify-start items-center mb-4 gap-2">
          <label htmlFor="rating" className="text-sm font-bold">
            Rating:
          </label>

          <RatingModule
            name="rating"
            rating={rating}
            ratingChanged={ratingChanged}
          />
        </div>

        {/* Quill */}
        <div className="max-h-fit">
          <ReactQuill
            theme="snow"
            value={quillValue}
            onChange={setQuillValue}
            className="h-[60vh] mb-4"
            modules={modules}
            formats={formats}
          />
        </div>
        <button
          type="submit"
          className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Submit Review
        </button>
      </form>

      {/* Preview */}
      <div className="flex w-full md:w-1/2">
        <div className="flex flex-col flex-1 bg-gray-100 p-2 rounded-md w-full h-[90%] overflow-auto">
          <h2 className="text-sm font-bold mb-2">Preview!</h2>
          <div className="my-4 overflow-auto bg-slate-200">
            {parse(quillValue)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
