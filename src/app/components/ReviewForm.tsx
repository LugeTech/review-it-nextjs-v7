"use client";
import { iReview, iProduct } from "../util/Interfaces";
import { useState } from "react";
import RatingModule from "./RatingModule";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from "@clerk/nextjs";
import Editor from "./Editor";
import EditorPreview from "./EditorPreview";
import { apiUrl } from "../util/apiUrl";
import DisplayError from "@/app/components/DisplayError"
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../util/serverFunctions";
import LoadingSpinner from "./LoadingSpinner";
import { useAtom } from "jotai";
import { allProductsAtom } from "../store/store";
import { useRouter, useParams, useSearchParams } from 'next/navigation'

const ReviewForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchRating = searchParams.get('rating')
  const id = searchParams.get('id')!
  console.log(id, searchRating!)
  const [disabled, setDisabled] = useState(false);
  const { user } = useUser();
  // make sure there is an int in searchRating and make sure its between 1 and 5
  const [rating, setRating] = useState(searchRating ? parseInt(searchRating) : 2); // Initial value
  const [startDate, setStartDate] = useState(new Date());
  const [error, setError] = useState<string | null>(null);
  const [reviewData, setReviewData] = useState<iReview>({
    id: null,
    body: "",
    createdDate: new Date(),
    rating: rating,
    title: "",
    productId: id,
    userId: user?.publicMetadata.id! as string,
    isVerified: null,
    verifiedBy: null,
    isPublic: true,
    images: [],
    videos: [],
    links: [],
    comments: [],
    createdBy: user?.firstName + " " + user?.lastName,
    isDeleted: false,
  });
  const [products, setProducts] = useAtom(allProductsAtom);
  const productCardOptions = {
    showLatestReview: false,
    size: 'rating-md',
    showWriteReview: false,
    showClaimThisProduct: true
  }

  const handleEditorValue = (value: string) => {
    if (value === "" || value === "<p></p>") {
      setReviewData(
        (prevData): iReview => ({ ...prevData, body: "" })
      );

      return;
    }
    setReviewData(
      (prevData): iReview => ({ ...prevData, body: value })
    );
    setError((prevError) => (prevError = null));
  };

  const ratingChanged = (newRating: number) => {
    setRating(newRating);
    function addRating(rating: number) {
      // not sure if this is necessary, but it should be the safest way. test before making simpler
      setReviewData(
        (prevData): iReview => ({ ...prevData, rating: rating })
      );
    }
    addRating(newRating);
  };

  const sendToServer = async () => {
    try {
      const response = await fetch(`${apiUrl}/create/review`, {
        method: "POST",
        body: JSON.stringify(reviewData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push('/reviews/' + id)
        // console.log("response ok", response);
        // const responseData = await response.json();
        // console.log(responseData);
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      let err = error as Error;
      setError((prevError) => (prevError = err.message));
      console.log(err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReviewData(
      (prevData): iReview => ({ ...prevData, [name]: value })
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setDisabled(true);
    e.preventDefault();
    //disable the form form
    e.currentTarget.disabled = true

    e.currentTarget.checkValidity()
    if (!e.currentTarget.checkValidity()) {
      setError("Please fill out all fields");
      return;
    }
    if (reviewData.body === "" || reviewData.body === null) {
      setError((prevError) => (prevError = "body empty" + ''));
      console.log("body is empty");
      return;
    }
    await sendToServer();
    setDisabled(false);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      if (products !== null) {
        const data = products?.find((product) => product.id === id)
        return data
      }

      // else return getProduct(id)
      const data: any = await getProduct(id)
      return data.data
    },
    refetchOnWindowFocus: false,
  }) as any

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>fetch error - cannot give more details cause error variable was taken</p>;
  const product = data as iProduct
  // filter allPproductsatom for id variable and return product


  return (
    <div className="flex flex-col h-full sm:w-3/4 lg:w-1/2 items-center bg-myTheme-lightbg dark:bg-myTheme-dark ">
      <h1 className="text-2xl font-bold mb-2">Write a review</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-4 h-full w-full rounded-md bg-white dark:bg-myTheme-dark overflow-y-auto"
      >
        {/* business info */}
        <div className="flex flex-row justify-center w-full items-center gap-2 mb-2">
          {product && <ProductCard options={productCardOptions} product={product} />}
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
            size={"rating-lg"}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="title" className="text-base">
            Title your experience:
          </label>
          <input
            required={true}
            placeholder="Be creative"
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

        <div className="flex flex-col  w-full mb-2">
          <label htmlFor="rating" className="text-base mb-2">
            Tell us more about your experience
          </label>
          <Editor onEditorValue={handleEditorValue} />
        </div>

        <div className="flex gap-4 w-full">
          {!disabled && reviewData.body !== "" && <div>
            <EditorPreview reviewData={reviewData} />
          </div>}

          <button
            disabled={disabled}
            type="submit"
            className=" bg-myTheme-primary hover:bg-myTheme-secondary text-white font-base p-2 rounded-md w-full"
          >
            Submit review
          </button>
        </div>
      </form>
      <DisplayError error={error} />

    </div>
  );
};

export default ReviewForm;
