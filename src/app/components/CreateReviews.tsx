'use client'
// import axios from 'axios';
// import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Review } from '../tools/Interfaces';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser'
import { lazy, Suspense, useState } from 'react';
// import GetReview from './GetReview';
const ReactQuill = lazy(() => import('react-quill'))


const modules = {
    toolbar: [
        // Remove the bullet point button
        ['bold', 'italic', 'underline', 'strike'], ['link'], ['clean']
    ]
};

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'link'
];

const CreateReviews = () => {
    const [quillValue, setQuillValue] = useState('');
    const [reviewData, setReviewData] = useState<Review>({
        body: "",
        comments: [],
        date: undefined,
        helpfulVotes: 0,
        productId: "",
        rating: 1,
        title: "",
        unhelpfulVotes: 0,
        userId: ""
    });

    // const queryClient = useQueryClient();

    const sendToServer = async () => {
        // reviewData.body = quillValue;
        // axios.post('http://localhost:8000/db/createreview', reviewData)
        //     .then((response) => {
        //         console.log(response.data);
        //         // handle success
        //     })
        //     .catch((error) => {
        //         console.log(error.response.data);
        //         // handle error
        //     });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setReviewData((prevData): Review => ({ ...prevData, [name]: value }));

    };


    // const { mutate, isLoading, isError, isSuccess } = useMutation(sendToServer, {
    //     // onSuccess: () => {
    //     //     queryClient.invalidateQueries(['reviews'])
    //     //     queryClient.refetchQueries(['reviews'])
    //     // },

    // });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e)
        // mutate();

    };

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
        <div className='flex flex-col md:flex-row gap-4 mt-8 p-4 flex-grow h-screen'>

            <form onSubmit={handleSubmit} className='flex flex-col md:w-1/2 bg-gray-100 p-2 rounded-md md:max-w-screen h-[90%]'>

                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" onChange={handleChange} />
                </div>

                {/* <div>
                    <label htmlFor="body">Body:</label>
                    <input type="text" id="body" name="body" onChange={handleChange} />
                </div> */}
                <div>
                    <label htmlFor="rating">Rating:</label>
                    <input type="number" id="rating" name="rating" min="1" max="5" onChange={handleChange} />
                </div>

                {/* Quill */}
                <div className='max-h-fit'>
                    <Suspense fallback={<div>Loading Text editor...</div>}>
                        <ReactQuill theme="snow" value={quillValue} onChange={setQuillValue} className=" h-[60vh]  mb-4" modules={modules}
                            formats={formats} />
                    </Suspense>
                </div>
                <button type='submit' className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md ">
                    Submit Review
                </button>

            </form>

            {/* Preview */}
            <div className=" flex w-full md:w-1/2 ">
                <div className=" flex flex-col flex-1 bg-gray-100 p-2 rounded-md w-full h-[90%] overflow-scroll">
                    <h2 className="text-sm font-bold mb-2 ">Preview!</h2>
                    <div className=' my-4 overflow-scroll bg-slate-200'>
                        {parse(quillValue)}
                    </div>
                    {/* <GetReview /> */}
                </div>

            </div>

        </div>
    );
}
export default CreateReviews