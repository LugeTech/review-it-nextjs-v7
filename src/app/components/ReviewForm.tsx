"use client";
import { iReview } from "../util/Interfaces";
import { Suspense, useState } from "react";
import RatingModule from "./RatingModule";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from "@clerk/nextjs";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import Editor from "./Editor";
import EditorPreview from "./EditorPreview";

const ReviewForm = () => {
  const { user } = useUser();
  const [rating, setRating] = useState(1); // Initial value
  const [startDate, setStartDate] = useState(new Date());
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

  const handleEditorValue = (value: string) => {
    setReviewData((prevData): iReview => ({ ...prevData, body: value }));
    console.log(reviewData);
  };

  const ratingChanged = (newRating: number) => {
    setRating(newRating);
    function addRating(rating: number) {
      // not sure if this is necessary, but it should be the safest way. test before making simpler
      setReviewData((prevData): iReview => ({ ...prevData, rating: rating }));
    }

    addRating(newRating);
  };

  const sendToServer = async () => {
    console.log(reviewData);
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
  const businessImage = faker.image.business();

  function openModal(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex flex-col flex-1 overflow-scroll h-full md:w-3/4 lg:w-1/2 items-center mt-8 bg-myTheme-light dark:bg-myTheme-dark">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-4 h-full w-full rounded-md bg-myTheme-light dark:bg-myTheme-dark"
      >
        {/* business info */}
        <div className="flex flex-row justify-center w-full items-center gap-2 mb-2">
          <Image src={businessImage} alt="avatar" width={50} height={50} />
          <div className="flex flex-col text-xs">
            <p className="font-bold">Business Name</p>
            <p>www.business.com</p>
            <p>592-645274</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mb-2 border-b dark:border-myTheme-dark2 p-1 shadow-sm">
          <label
            htmlFor="rating"
            className="flex w-full text-base justify-center items-center"
          >
            Rate your experience
          </label>
          <RatingModule
            name="rating"
            rating={rating}
            ratingChanged={ratingChanged}
            size={220}
          />
        </div>

        <div className="mb-2">
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
        <div className=" flex flex-row gap-4 mb-2">
          <div className="flex flex-1 flex-col z-10">
            <label htmlFor="date" className="text-base">
              Happened when?
            </label>
            <DatePicker
              id="dateItHappened"
              name="dateItHappened"
              selected={startDate}
              onChange={(date) => setStartDate(date!)}
              className=" border border-gray-300 rounded-md px-3 py-2 mt-1 w-full md:w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-1 flex-col">
            <label htmlFor="date" className="text-base">
              Receipt #
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

        <div className="flex flex-col h-80 w-full mb-2">
          <label htmlFor="rating" className="text-base mb-2">
            Tell us more about your experience
          </label>
          <Editor onEditorValue={handleEditorValue} />
        </div>

        <div className="flex gap-4">
          <div>
            <EditorPreview reviewData={reviewData} />
          </div>

          <button
            type="submit"
            className=" bg-myTheme-primary hover:bg-myTheme-secondary text-white font-base p-2 rounded-md w-full"
          >
            Submit review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
