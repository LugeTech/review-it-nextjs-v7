"use client";
import { iReview, iProduct } from "../util/Interfaces";
import { useEffect, useState } from "react";
import RatingModule from "./RatingModule";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from "@clerk/nextjs";
import Editor from "./Editor";
import EditorPreview from "./EditorPreview";
import DisplayError from "@/app/components/DisplayError";
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../util/serverFunctions";
import LoadingSpinner from "./LoadingSpinner";
import { useAtom } from "jotai";
import { allProductsAtom } from "../store/store";
import { useRouter, useSearchParams } from "next/navigation";
import MultiFileUpload from "./fileUpload/MultiFileUpload";
import VideoEmbed from "./VideoEmbed";

const ReviewForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchRating = searchParams.get("rating");
  const id = searchParams.get("id")!;
  const [disabled, setDisabled] = useState(false);
  const { user } = useUser();
  const [linksArray, setLinksArray] = useState<string[]>([]);
  const [videosArray, setVideosArray] = useState<string[]>([]);
  const [url, setUrl] = useState('');
  const [allUploaded, setAllUploaded] = useState(false);
  // make sure there is an int in searchRating and make sure its between 1 and 5
  const [rating, setRating] = useState(
    searchRating ? parseInt(searchRating) : 2,
  ); // Initial value
  const [startDate, setStartDate] = useState(new Date());
  const [error, setError] = useState<string | null>(null);
  const [reviewData, setReviewData] = useState<iReview>({
    body: "",
    createdDate: new Date(),
    rating: rating,
    title: "",
    productId: id,
    userId: user?.publicMetadata.id! as string,
    isPublic: true,
    images: linksArray,
    videos: [],
    links: [],
    comments: [],
    createdBy: user?.firstName + " " + user?.lastName,
    isDeleted: false,
    likedBy: [],
  });

  const [products, setProducts] = useAtom(allProductsAtom);
  const productCardOptions = {
    showLatestReview: false,
    size: "rating-md",
    showWriteReview: false,
    showClaimThisProduct: true,
  };

  useEffect(() => {
    if (linksArray.length > 0) {
      setReviewData((prevData): iReview => ({
        ...prevData,
        images: linksArray,
      }));
    }
  }, [linksArray]);

  const handleEditorValue = (value: string) => {
    if (value === "" || value === "<p></p>") {
      setReviewData((prevData): iReview => ({ ...prevData, body: "" }));
      return;
    }
    setReviewData((prevData): iReview => ({ ...prevData, body: value }));
    setError((prevError) => (prevError = null));
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
    try {
      console.log("here is reviewData", reviewData);
      const response = await fetch(`/api/create/review`, {
        method: "POST",
        body: JSON.stringify(reviewData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push(`/reviews?id=${id}`);
      } else {
        const errorData = await response.json();
        console.log(errorData);
        // TODO: display error on the frontend also useMutation
      }
    } catch (error) {
      let err = error as Error;
      setError((prevError) => (prevError = err.message));
      console.log(err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setReviewData((prevData): iReview => {
      if (name === 'videoUrl') {
        return {
          ...prevData,
          videos: prevData.videos.length > 0
            ? [value, ...prevData.videos.slice(1)] // Update if array has items
            : [value] // Create new array if empty
        };
      } else {
        // Handle other fields normally
        return { ...prevData, [name]: value };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setDisabled(true);
    e.preventDefault();
    //disable the form form
    e.currentTarget.disabled = true;

    e.currentTarget.checkValidity();
    if (!e.currentTarget.checkValidity()) {
      setError("Please fill out all fields");
      return;
    }
    if ((reviewData.body === "" || reviewData.body === null) && linksArray.length === 0 && reviewData.videos.length === 0) {
      setError((prevError) => (prevError = "Review body is empty"));
      setDisabled(false);
      return;
    }
    // INFO: enable this to send to server
    await sendToServer();
    setDisabled(false);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      if (products !== null) {
        const data = products?.find((product) => product.id === id);
        return data;
      }

      // else return getProduct(id)
      const data: any = await getProduct(id);
      return data.data;
    },
    refetchOnWindowFocus: false,
  }) as any;

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <p>
        fetch error - cannot give more details cause error variable was taken
      </p>
    );
  const product = data as iProduct;
  // filter allPproductsatom for id variable and return product

  const amITheOwner = product.business?.ownerId === user?.id;
  if (amITheOwner) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg shadow-md">
        {amITheOwner ? (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700 mb-2">
              You&#39;re the owner of this business
            </p>
            <p className="text-sm text-gray-600">
              As the owner, you can&#39;t write a review for your own business.
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg font-semibold text-green-600 mb-2">
              You can write a review
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
              Write a Review
            </button>
          </div>
        )}
      </div>
    );

  }


  return (
    <div className="pt-8 flex flex-col h-full w-full sm:w-3/4 lg:w-1/2 items-center bg-myTheme-white  rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-myTheme-niceGrey ">Write a Review</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full space-y-6 bg-myTheme-white  rounded-md p-6 overflow-y-auto"
      >
        {product && (
          <div className="flex justify-center items-center mb-4">
            <ProductCard options={productCardOptions} product={product} currentUserId={user?.id ? user.id : null} />
          </div>
        )}

        <div className="space-y-2 border-b  pb-4">
          <label htmlFor="rating" className="block text-lg font-semibold text-myTheme-primary ">
            Rate your experience
          </label>
          <RatingModule
            name="rating"
            rating={rating}
            ratingChanged={ratingChanged}
            size="rating-lg"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="title" className="block text-lg font-semibold text-myTheme-primary ">
            Title your experience
          </label>
          <input
            required
            placeholder="Be creative"
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300  rounded-md bg-myTheme-white  focus:ring-2 focus:ring-myTheme-primary  focus:border-transparent"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <label htmlFor="dateItHappened" className="block text-lg font-semibold text-myTheme-primary ">
              Date
            </label>
            <DatePicker
              id="dateItHappened"
              name="dateItHappened"
              selected={startDate}
              onChange={(date) => setStartDate(date!)}
              className="z-50 w-full px-4 py-2 border border-gray-300  rounded-md bg-myTheme-white  focus:ring-2 focus:ring-myTheme-primary  focus:border-transparent"
            />
          </div>
          <div className="flex-1 space-y-2">
            <label htmlFor="transactionNumber" className="block text-lg font-semibold text-myTheme-primary ">
              Receipt #
            </label>
            <input
              placeholder="(optional)"
              type="text"
              id="transactionNumber"
              name="transactionNumber"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300  rounded-md bg-myTheme-white  focus:ring-2 focus:ring-myTheme-primary  focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-2 ">
          <label htmlFor="experience" className="block text-lg font-semibold text-myTheme-primary ">
            Tell us more about your experience
          </label>
          <Editor onEditorValue={handleEditorValue} />
        </div>
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">Embed Video</h1>
          <input
            type="text"
            name="videoUrl"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value)
              handleChange(e)
            }}
            placeholder="Enter YouTube, Instagram, or TikTok video URL"
            className="w-full p-2 border rounded mb-4 bg-white"
          />
          <VideoEmbed url={url} />
        </div>
        <div className="flex justify-center items-center w-full">
          <MultiFileUpload setLinksArray={setLinksArray} setAllUploaded={setAllUploaded} allUploaded={allUploaded} />
        </div>

        <div className="flex gap-2 h-full">
          {!disabled && reviewData.body !== "" && (
            <div className="bg-gray-100  rounded-md h-full">
              <EditorPreview reviewData={reviewData} />
            </div>
          )}
          {allUploaded && <button
            disabled={disabled}
            type="submit"
            className="w-full bg-myTheme-primary hover:bg-myTheme-secondary text-white font-semibold py-3 px-6 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Review
          </button>}
        </div>
      </form>
      <DisplayError error={error} />
    </div>
  );
};

export default ReviewForm;
