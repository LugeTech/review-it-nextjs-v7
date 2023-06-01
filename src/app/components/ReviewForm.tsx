"use client";
import { iReview } from "../util/Interfaces";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import RatingModule from "./RatingModule";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  const [startDate, setStartDate] = useState(new Date());
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
      } else {
        const errorData = await response.json();
      }
    } catch (error) {}
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReviewData((prevData): iReview => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendToServer();
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-2 p-4 flex-grow h-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:w-1/2 bg-gray-100 p-2 rounded-md md:max-w-screen h-[90%]"
      >
        <div className=" flex flex-col justify-center items-center mb-4 gap-2 border p-1 shadow-sm">
          <label htmlFor="rating" className="w-full font-semibold text-base">
            Rate your experience
          </label>

          <RatingModule
            name="rating"
            rating={rating}
            ratingChanged={ratingChanged}
            size={200}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="text-sm font-bold">
            Title your experience:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        {/* Quill */}
        <div className="mt-4">
          <label htmlFor="rating" className="font-semibold text-base mb-2">
            Tell us more about your experience
          </label>
          <ReactQuill
            theme="snow"
            value={quillValue}
            onChange={setQuillValue}
            className="h-[200px] mb-4 bg-white editor-font-size"
            modules={modules}
            formats={formats}
            placeholder="Write something..."
          />
        </div>
        {/* <div className="mb-4">
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
        </div> */}
        <div className="mt-14 mb-4">
          <label htmlFor="date" className="text-sm font-bold">
            When did your experience happen:
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date!)}
            className=" p-2 w-full text-center"
          />
        </div>

        <button
          type="submit"
          className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Submit Review
        </button>
      </form>

      {/* Preview */}
      <div className="flex flex-col flex-1 w-full md:w-1/2 bg-slate-100 h-[90%]">
        {/* <div className="flex flex-col flex-1 bg-gray-100 p-2 rounded-md w-full h-[90%] overflow-auto"> */}
        <h2 className="text-sm font-bold mb-2 text-center">Preview!</h2>
        <div className="flex flex-1 flex-col p-4 overflow-scroll bg-slate-200">
          <h1 className=" font-bold underline text-center">
            {parse(reviewData.title)}
          </h1>
          <p>{parse(quillValue)}</p>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default ReviewForm;
