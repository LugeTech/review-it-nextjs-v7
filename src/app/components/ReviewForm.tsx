"use client";
import { iReview } from "../util/Interfaces";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import RatingModule from "./RatingModule";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from "@clerk/nextjs";
import { faker } from "@faker-js/faker";
import Image from "next/image";
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
  const { user } = useUser();
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
    console.log(reviewData);
    return;
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
    <div className="flex flex-col md:flex-row gap-4 p-4 flex-1 h-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:w-1/2 bg-gray-100 dark:bg-myTheme-dark p-2 "
      >
        {/* business info */}
        <div className="flex flex-row justify-center w-full items-center gap-2 mb-2">
          <Image
            src={faker.image.business()}
            alt="avatar"
            width={60}
            height={60}
            className=""
          />

          <div className="flex flex-col text-xs">
            <p>Business Name</p>
            <p>www.business.com</p>
            <p>592-645274</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mb-2 gap-2 border dark:border-myTheme-dark2 p-1 shadow-sm">
          <label htmlFor="rating" className="w-full text-base">
            Rate your experience
          </label>
          <RatingModule
            name="rating"
            rating={rating}
            ratingChanged={ratingChanged}
            size={250}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="title" className="text-base">
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

        {/* date and trans # */}
        <div className=" flex flex-row gap-4">
          <div className="flex flex-1 flex-col">
            <label htmlFor="date" className="text-base">
              Happened when?
            </label>
            <DatePicker
              id="dateItHappened"
              name="dateItHappened"
              selected={startDate}
              onChange={(date) => setStartDate(date!)}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-1 flex-col">
            <label htmlFor="date" className="text-base">
              Transaction #
            </label>
            <input
              placeholder="(optional)"
              type="text"
              id="transactionNumber"
              name="transactionNumber"
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col h-80 mt-2 w-full">
          <label htmlFor="rating" className="text-base mb-2">
            Tell us more about your experience
          </label>
          <ReactQuill
            // theme="snow"
            value={quillValue}
            onChange={setQuillValue}
            className="h-[240px] bg-transparent editor-font-size"
            modules={modules}
            formats={formats}
            placeholder="Write something..."
          />
        </div>

        <div className="flex">
          <button
            type="submit"
            className=" bg-myTheme-primary hover:bg-myTheme-secondary text-white font-base p-2 rounded-md w-full"
          >
            Submit review
          </button>
        </div>
      </form>

      {/* Preview area */}
      <div className="flex flex-col flex-1 dark:bg-myTheme-dark p-2 rounded-md w-full md:w-1/2 bg-slate-100 overflow-scroll h-[240px] md:h-[400px]">
        <h2 className="text-sm font-bold mb-2 text-center">Preview!</h2>
        <div className="flex flex-1 flex-col p-4 max-h-full overflow-scroll bg-slate-200">
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
                rating={rating}
                ratingChanged={() => {
                  alert("cnt change rating here");
                }}
                size={70}
              />
            </div>
          )}

          <div className=" text-start">{parse(quillValue)}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
