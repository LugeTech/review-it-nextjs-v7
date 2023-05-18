'use client';
import { iReview } from "../util/Interfaces";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
// import ReactQuill from "react-quill";
// fixed build error here: https://stackoverflow.com/questions/73047747/error-referenceerror-document-is-not-defined-nextjs



const modules = {
  toolbar: [
    // Remove the bullet point button
    ["bold", "italic", "underline", "strike"],
    ["link"],
    ["clean"],
  ],
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
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

  // const queryClient = useQueryClient();

  const sendToServer = async () => {
    reviewData.body = quillValue;
    try {
      const response = await fetch('http://localhost:3000/api/createreview', {
        method: 'POST',
        body: JSON.stringify(reviewData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        // handle success
      } else {
        const errorData = await response.json();
        console.log(errorData);
        // handle error
      }
    } catch (error) {
      console.log(error);
      // handle error
    }
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReviewData((prevData): iReview => ({ ...prevData, [name]: value }));
  };

  // const { mutate, isLoading, isError, isSuccess } = useMutation(sendToServer, {
  //     // onSuccess: () => {
  //     //     queryClient.invalidateQueries(['reviews'])
  //     //     queryClient.refetchQueries(['reviews'])
  //     // },

  // });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    sendToServer()

    // mutate();
  };

  // const handleOtherSubmit = async (data: FormData) => { 
  //   console.log(data);

  // }

  // if (isLoading) {
  //     return <div>Loading...</div>;
  // }

  // if (isError) {
  //     return <div>Error</div>;
  // }

  // if (isSuccess) {
  //     queryClient.invalidateQueries(['reviews'])
  //     queryClient.refetchQueries(['reviews'])
  //     return <div>Review sent...</div>;
  // }

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-8 p-4 flex-grow h-screen">
      <form onSubmit={handleSubmit}
        className="flex flex-col md:w-1/2 bg-gray-100 p-2 rounded-md md:max-w-screen h-[90%]"
      >
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="5"
            onChange={handleChange}
          />
        </div>

        {/* Quill */}
        <div className="max-h-fit">
          <ReactQuill
            theme="snow"
            value={quillValue}
            onChange={setQuillValue}
            className=" h-[60vh]  mb-4"
            modules={modules}
            formats={formats}
          />
        </div>
        <button
          type="submit"
          className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md "
        >
          Submit Review
        </button>
      </form>

      {/* Preview */}
      <div className=" flex w-full md:w-1/2 ">
        <div className=" flex flex-col flex-1 bg-gray-100 p-2 rounded-md w-full h-[90%] overflow-scroll">
          <h2 className="text-sm font-bold mb-2 ">Preview!</h2>
          <div className=" my-4 overflow-scroll bg-slate-200">
            {parse(quillValue)}
          </div>
          {/* <GetReview /> */}
        </div>
      </div>
    </div>
  );
}
export default ReviewForm;


